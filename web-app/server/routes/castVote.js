const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 05/01/2020
 */
router.post('/', async (req, res) => {

    try{

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

        let response = await contract.submitTransaction('castVote',req.body.username,req.body.votedTo);
        response = JSON.parse(response.toString());
        console.log(response);
        await res.json(response);

    }catch (error) {
        console.log(`Failed to cast vote ${error}`);
        res.send('Failed to cast Vote');
        process.exit(1);
    }
});

module.exports = router;
