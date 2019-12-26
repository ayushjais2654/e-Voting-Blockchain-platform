const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

router.post('/',async  (req,res) => {

    let candidate = {
        username : req.body.username,
        password : req.body.password
    };

    console.log(JSON.stringify(candidate));
    if(await validateCandidate(candidate) === true){
        res.send("Correct");
    }
    else{
        res.send("Not Correct");
    }
});

async function validateCandidate(candidate){

    let candidatePresent = true;
    let client = await mongo.connect(url);
    let results = await client.db('Candidate').collection('CandidateList').find({
            "username": candidate.username,
            "password" : candidate.password
        }).toArray();
    if(results.length === 0){
        candidatePresent = false;
    }
    await client.close();
    return candidatePresent;
}

module.exports = router;