const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 01/01/2020
 */

router.post('/', async (req, res) => {

    try {


        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`************** Wallet path: ${walletPath} **************************`);

        // Check to see if we've already enrolled the user

        const userExists = await wallet.exists(req.body.username);
        if (userExists) {
            res.send('Candidate has been already registered ... ');
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

        console.log(response.length + " hey");

        if(response.length === 73){
            const enrollment = await ca.revoke({enrollmentID: req.body.username}, adminIdentity);
            await wallet.delete(req.body.username);
            res.send(response);
        }
        else {
            res.send("Correct");
        }

    } catch (error) {
        console.error(`Failed to register user ${req.body.username}: ${error}`);
        res.send("Failed to register candidate");
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
        let response = await contract.submitTransaction('createCandidate', req.body.firstName, req.body.lastName,
            req.body.partyName, req.body.age, req.body.username, req.body.password,req.body.constituency,req.body.mobileNo);
        response = JSON.stringify(response.toString());
        console.log(response);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return response;

    } catch (error) {
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
        process.exit(1);
    }
}

module.exports = router;
