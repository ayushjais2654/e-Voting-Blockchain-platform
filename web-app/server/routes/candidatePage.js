const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

/**
 * @author : Ayush Jaiswal
 * @Date : 04/01/2020
 */

router.post('/', async (req, res) => {

    let client = await mongo.connect(url);
    let results = await client.db('Candidate').collection('CandidateList').find({
        "username" : req.body.username
    }).toArray();
    console.log(results[0]);
   await res.json(results[0]);
});

module.exports = router;
