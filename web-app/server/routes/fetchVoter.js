const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 21/02/2020
 */
router.post('/', async (req, res) => {

    try{

        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        const userExists = await wallet.exists(req.body.username);
        console.log(JSON.stringify(req.body.username));
        if (!userExists) {
            res.send('Voter not registered in Wallet');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: req.body.username,
            discovery: {enabled: true, asLocalhost: true}
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('contract');

        let voterDetail = await contract.evaluateTransaction('readMyAsset',req.body.username);
        voterDetail = JSON.parse(voterDetail.toString());
        let ballotDetails = await contract.evaluateTransaction('queryByObjectType','ballot');
        ballotDetails = JSON.parse(ballotDetails.toString());
        let partyNames = [];
        for(let i=0;i<ballotDetails.length;i++){
            console.log(JSON.parse(ballotDetails[i]) + " h ");
           // partyNames.push(ballotDetails[i].partyName);
        }

        console.log(partyNames);

        let response = {
            voterDetail : voterDetail,
            partyNames : partyNames
        };
        // console.log(response + "  fetchVoter");
        await res.json(response);

    }catch (error) {
        console.log("Error occurred while fetching voter from blockchain");
        console.log(error);
    }
});

module.exports = router;
