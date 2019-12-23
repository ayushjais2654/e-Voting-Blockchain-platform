const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';


router.post('/', async function (req, res) {

    let candidate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        partyName: req.body.partyName,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        constituency: req.body.constituency,
        mobileNo: req.body.mobileNo
    };

    if (await validatePartyName(candidate.partyName) === false) {
        res.send("Party Name is not valid...");
        return;
    }

    if (candidate.age <= 24 || candidate.age >= 60) {
        res.send("Candidate age is not acceptable...");
        return;
    }

    if (await alreadyRegistered(candidate.username) === true) {
        res.send("Username already registered...");
        return;
    }

    let client = await mongo.connect(url);
    client.db('Candidate').collection('CandidateList').insertOne(candidate).catch((error) => {
        if (error) throw error;
    });
    console.log("Candidate is successfully registered ...");
    res.send("Candidate is successfully registered ...");
    await client.close();

});

async function alreadyRegistered (username){

    let usernameExists = false;
    let client = await mongo.connect(url);
    let results = await client.db('Candidate').collection('CandidateList').find().toArray();
    for (let i = 0; i < results.length; i++) {
        if (results[i].username === username) {
            usernameExists = true;
            break;
        }
    }
    await client.close();
    return usernameExists;
}

async function validatePartyName(partyName) {

    let partyValid = false;
    let client = await mongo.connect(url);
    let results = await client.db('Candidate').collection('partyName').find().toArray();
    for (let i = 0; i < results.length; i++) {
        if (results[i].name === partyName) {
            partyValid = true;
            break;
        }
    }
    await client.close();
    return partyValid;
}


module.exports = router;