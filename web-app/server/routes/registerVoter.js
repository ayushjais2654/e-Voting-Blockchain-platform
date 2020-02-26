const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const validator = require('aadhaar-validator');

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 01/01/2020
 */

router.post('/', async (req, res) => {

    try {

        if(!validator.isValidNumber(req.body.cardNumber)){
            console.log("Invalid Aadhar Number");
            res.send('Adhaar number is invalid');
            return;
        }
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        // Check to see if we've already enrolled the user

        const userExists = await wallet.exists(req.body.username);
        if (userExists) {
            res.send('Voter has been already registered ... ');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            res.send(' Admin is not currently enrolled. Please wait for sometime ...');
            console.log('Please run enrollAdmin.js file first ... ');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, {wallet, identity: 'admin', discovery: {enabled: true, asLocalhost: true}});

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // console.log(JSON.parse(adminIdentity.toString()));
        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: req.body.username,
            role: 'client'
        }, adminIdentity);
        const enrollment = await ca.enroll({enrollmentID: req.body.username, enrollmentSecret: secret});

        // console.log(JSON.parse(enrollment.toString()));

        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());

        await wallet.import(req.body.username, userIdentity);

        gateway.disconnect();

        let response = await registerInLedger(req);
        res.send("Correct");

    } catch (error) {
        console.error(`Failed to register user ${req.body.username}: ${error}`);
        res.send("Failed to register voter");
        process.exit(1);
    }
});

async function registerInLedger(req) {

    try {
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
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

        // Submit the specified transaction.
        let response = await contract.submitTransaction('createVoter', req.body.firstName, req.body.lastName,
            req.body.username, req.body.password, req.body.mobileNumber, req.body.cardNumber,"false","null");
        console.log(response + "");

        // Disconnect from the gateway.
        await gateway.disconnect();

        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
        process.exit(1);
    }
}

module.exports = router;
