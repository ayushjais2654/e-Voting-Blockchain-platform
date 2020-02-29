const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

router.post('/',async (req,res) => {
    try{
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        const electionExists = await wallet.exists(req.body.constituency);
        console.log(JSON.stringify(req.body.constituency)," jakjakj");
        if (!electionExists) {
            res.send('Election does not exists');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: req.body.constituency,
            discovery: {enabled: true, asLocalhost: true}
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('contract');

        let candidates = await contract.evaluateTransaction('getCandidateInConstituency',req.body.constituency);
        candidates = JSON.parse(candidates.toString());
        console.log(candidates + "hello");
        let candidateList = [];
        for(let i=0;i<candidates.length;i++){
            candidateList.push({
                username : candidates[i].Record.username,
                name : candidates[i].Record.firstName + " " + candidates[i].Record.lastName,
                partyName : candidates[i].Record.partyName,
                voteCount : candidates[i].Record.voteCount
            });
        }
        console.log(candidateList);
        let response = {
            results : candidateList,
        };

        await res.json(response);
    }catch (error) {
        console.log(error);
        res.send("unable to fetch user");
    }
});

module.exports = router;