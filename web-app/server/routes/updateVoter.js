const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 @author : Ayush Jaiswal
 @Date : 26/02/2020
 */

router.post('/',async (req,res) => {

    try{

        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: 'admin',
            discovery: {enabled: true, asLocalhost: true}
        });

        // console.log((req.body.username + " " + req.body.aadharCard));
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('contract');

        let voterDetail = await contract.evaluateTransaction('readMyAsset',req.body.username);
        voterDetail = JSON.parse(voterDetail.toString());

        console.log(voterDetail);
        let voter = {
            firstName: (req.body.firstName === undefined)?voterDetail.firstName:req.body.firstName,
            lastName: (req.body.lastName === undefined)?voterDetail.lastName:req.body.lastName,
            username: voterDetail.firstName,
            password: (req.body.password === undefined)?voterDetail.password:req.body.password,
            mobileNo: (req.body.mobileNo === undefined)?voterDetail.mobileNo:req.body.mobileNo,
            aadharCard: voterDetail.aadharCard,
            isEligible: (req.body.isEligible === undefined)?voterDetail.isEligible:req.body.isEligible,
            description: (req.body.description === undefined)?voterDetail.description:req.body.description,
            votedTo: (voterDetail.votedTo === null)?"":voterDetail.votedTo,
            transId:(voterDetail.transId === null)?"":voterDetail.transId,
        };

        console.log(voter);

        voter.description = (voter.description === null) ? "" : voter.description;
        let response = await contract.submitTransaction('updateVoter', voter.firstName, voter.lastName,
            voter.username, voter.password, voter.mobileNo.toString(), voter.aadharCard.toString(),voter.isEligible.toString(),
            voter.description.toString(),voter.votedTo.toString(),
            voter.transId.toString());
        await res.send('Correct');

    }catch (error) {
        console.log("Error occurred while fetching voter from blockchain");
        console.log(error);
    }
});

module.exports = router;
