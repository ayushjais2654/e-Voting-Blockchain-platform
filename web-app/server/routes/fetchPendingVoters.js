const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
  @author : Ayush Jaiswal
  @Date : 26/02/2020
 */

router.get('/',async (req,res) => {

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

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        const contract = network.getContract('contract');

        let voters = await contract.evaluateTransaction('queryByObjectType','voter');
        voters = JSON.parse(voters.toString());

        let candidates = await contract.evaluateTransaction('queryByObjectType','candidate');
        candidates = JSON.parse(candidates.toString());

        let election = await contract.evaluateTransaction('queryByObjectType','election');
        election = JSON.parse(election.toString());

        let response = [];
        for(let i=0;i<voters.length;i++){
            if(voters[i].Record.isEligible.toString() === "false" && voters[i].Record.isDenied.toString() === 'false')
                response.push(voters[i]);
        }
        response={
          voterList:response,
          candidateList:candidates,
          electionList:election,
        };
        console.log(response);
        await res.json(response);

    }catch (error) {
        console.log("Error occurred while fetching voter from blockchain");
        console.log(error);
    }
});

module.exports = router;
