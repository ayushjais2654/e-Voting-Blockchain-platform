const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 22/02/2020
 */

router.post('/', async (req, res) => {

    try {

        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);


        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('Please run enrollAdmin.js file first ... ');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {wallet, identity: 'admin', discovery: {enabled: true, asLocalhost: true}});

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('contract');
        let response = await contract.submitTransaction('deleteMyAsset', req.body.username);
        if (response.toString()) {
            console.log(`${req.body.username} is deleted from ledger`);
            const enrollment = await ca.revoke({enrollmentID: req.body.username}, adminIdentity);
            await wallet.delete(req.body.username);
        } else {
            console.log(`${req.body.username} cannot be deleted from ledger`);
        }
        gateway.disconnect();
        res.send(`${req.body.username} deleted from World State`);

    } catch (error) {
        console.error(`Failed to delete voter ${error}`);
        process.exit(1);
    }
});

module.exports = router;
