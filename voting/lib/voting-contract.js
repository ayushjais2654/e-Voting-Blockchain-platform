/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');
const ballotPathJson = path.join(process.cwd(),'./Ballot.json');
const ballotDataJson = fs.readFileSync(ballotPathJson, 'utf8');
const ballotData = JSON.parse(ballotDataJson);

class VotingContract extends Contract {

    async initLedger(ctx){
        
        console.log('============= START : Initialize Ledger ===========');
        
            let voter = {
                firstName: 'Ayush',
                lastName: 'Jaiswal',
                username: 'ayush123',
                password: 'ayush123',
                mobileNo: 9515365125,
                aadharCard: 123456789123,
                votedTo: null,
                transId: null,
                docType: 'voter'
            };
        
        
            console.log('============= Voter Added to the WorldState ===========');
            await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));
        
            // for (let i = 0; i < ballotData.length; i++) {
            //     let ballot = {
            //         partyName: ballotData[i].name,
            //         voteCount: 0,
            //         transIds: []
            //     };
            //     await ctx.stub.putState(ballot.partyName, Buffer.from(JSON.stringify(ballot)));
            //     console.log('============= Party Added ===========');
            // }
            // console.log('============= END : Initialize Ledger ===========');
        
    }

}

module.exports = VotingContract;
