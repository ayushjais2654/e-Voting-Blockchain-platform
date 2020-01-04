const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 * @author : Ayush Jaiswal
 * @Date : 04/01/2020
 */

router.post('/', async (req, res) => {

    try {

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

        let response = await contract.evaluateTransaction('readMyAsset', req.body.username);
        response = JSON.parse(response.toString());
        console.log(response);
        if (response.error) {
            console.log(response.error);
            res.send(response.error);
            return;
        }
        console.log(response.password);
        if(response.password === req.body.password){
           await res.json(response);
        }
        else{
            res.send("Invalid Credentials");
        }

    } catch (error) {
        console.log("Failed to fetch details from wallet");
        res.send('Error occurred in fetching details from wallet');
        process.exit(1);
    }
});

module.exports = router;
