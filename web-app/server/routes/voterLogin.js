const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'blockchain-network', 'first-network', 'connection-org1.json');

/**
 * @author : Ayush Jaiswal
 * @Date : 04/01/2020
 */

router.post('/',async (req,res) => {

    try{

    } catch (error) {
        console.log("Failed to fetch details from wallet");
        res.send('Error occurred in fetching details from wallet');
        process.exit(1);
    }
});

module.exports = router;
