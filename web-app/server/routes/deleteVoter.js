
// noinspection BadExpressionStatementJS
'use-strict';
const args = require('yargs').argv;

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 *  @author : Ayush Jaiswal
 *  @Date : 22/02/2020
 */

async function main() {

    try {

        console.log("Enter show as a argument to show all voters");
        let username = args._[0];
        const walletPath = path.join(process.cwd(), '../../wallet');
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
        if(username === "show") {
            const contract = network.getContract('contract');
            let response = await contract.evaluateTransaction('queryByObjectType', 'voter');
            response = JSON.parse(response.toString());
            console.log(response);
        }
        else{
            const contract = network.getContract('contract');
            let response = await contract.submitTransaction('deleteMyAsset', username);
            if(response.toString()){
                console.log(`${username} is deleted from ledger`);
                const enrollment = await ca.revoke({enrollmentID: username}, adminIdentity);
                await wallet.delete(username);
            }
            else{
                console.log(`${username} cannot be deleted from ledger`);
            }
        }
        gateway.disconnect();

    } catch (error) {
        console.error(`Failed to delete voter ${error}`);
        process.exit(1);
    }
}

main();
