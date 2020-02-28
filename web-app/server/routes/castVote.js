const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');
const twilio = require('twilio')('ACe871a01e4b8b623110ade5f6dc80c4ef','8e7c11390eab32c21eed926f6df480fb');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 05/01/2020
 */
router.post('/', async (req, res) => {

    try{

        console.log(req.body.votedTo);

        // if(!req.body.isEligible){
        //     res.send('Sorry you cannot vote verification is still pending...');
        //     return ;
        // }

        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        const userExists = await wallet.exists(req.body.username);
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

        console.log(req.body.votedTo + "  castVote");

       let response = await contract.submitTransaction('castVote',req.body.username,req.body.votedTo);
        response = response.toString();
        console.log(JSON.stringify(response));

        //await sendSmsToMobile(req.body.username,contract);

        let resp = await contract.evaluateTransaction('queryByObjectType','candidate');
        resp = resp.toString();
        console.log(JSON.parse(resp));


        await res.send(response);

    }catch (error) {
        console.log(`Failed to cast vote ${error}`);
        res.send('Failed to cast Vote');
    }
});

async function sendSmsToMobile(username,contract){

    let voterDetail = await contract.evaluateTransaction('readMyAsset',username);
    voterDetail = JSON.parse(voterDetail.toString());
    await twilio.messages.create({
        to: '+917983540808',
        from: '+12058131223',
        body: `Your vote has been casted with transaction Id ${voterDetail.transactionId}`
    });
}
module.exports = router;
