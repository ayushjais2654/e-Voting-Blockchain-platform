/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const {Contract} = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');
const ballotPathJson = path.join(process.cwd(), './lib/data/Ballot.json');
const ballotDataJson = fs.readFileSync(ballotPathJson, 'utf8');
const ballotData = JSON.parse(ballotDataJson);

class VotingContract extends Contract {

    async initLedger(ctx) {

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

        console.info(JSON.stringify(ballotData));
        for (let i = 0; i < ballotData.length; i++) {
            let ballot = {
                partyName: ballotData[i].name,
                voteCount: 0,
                docType: "ballot",
                transIds: []
            };
            await ctx.stub.putState(ballot.partyName, Buffer.from(JSON.stringify(ballot)));
            console.log('============= Party Added ===========');
        }
        console.log('============= END : Initialize Ledger ===========');

    }

    async myAssetExists(ctx, myAssetId) {

        const buffer = await ctx.stub.getState(myAssetId);
        return (!!buffer && buffer.length > 0);

    }

    async readMyAsset(ctx, myAssetId) {

        const exists = await this.myAssetExists(ctx, myAssetId);

        if (!exists) {
            // throw new Error(`The my asset ${myAssetId} does not exist`);
            let response = {};
            response.error = `The voter ${myAssetId} does not exist`;
            return response;
        }

        const buffer = await ctx.stub.getState(myAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async deleteMyAsset(ctx, myAssetId) {

        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {

            let response = {};
            response.error = ` Asset with Id ${myAssetId} doesn't exists in the World State `;
            return response;
        }

        await ctx.stub.deleteState(myAssetId);

    }

    async createVoter(ctx, args) {

        args = JSON.parse(args);
        let voter = {
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            password: args.password,
            mobileNo: args.mobileNo,
            aadharCard: args.aadharCard,
            votedTo: null,
            transId: null,
            docType: 'voter'
        };

        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        let response = `Voter with username ${voter.username} is successfully registered in the World State`;
        return response;

    }

    async castVote(ctx, args, partyName) {

        let electionStartDate = new Date(2020, 4, 21);
        let electionEndDate = new Date(2020, 4, 22);

        args = await JSON.parse(args);

        const existsVoter = await this.myAssetExists(ctx, args.username);
        if (!existsVoter) {

            let response = {};
            response.error = ` Voter with username ${args.username} doesn't exists in the World State `;
            return response;
        }

        let voterAsBytes = await ctx.stub.getState(args.username);
        let voter = await JSON.parse(voterAsBytes);

        if (voter.votedTo !== null) {
            let response = {};
            response.error = ' You have already given your vote in this election ';
            return response;
        }

        electionStartDate = await Date.parse(electionStartDate);
        electionEndDate = await Date.parse(electionEndDate);

        let currentTime = new Date();
        currentTime = await Date.parse(currentTime);

        if (currentTime < electionStartDate || currentTime > electionEndDate) {

            let response = {};
            response.error = ' Election period has already ended ';
            return response;
        }

        const existsBallot = await this.myAssetExists(ctx, partyName);
        if (!existsBallot) {

            let response = {};
            response.error = ` Ballot with party name ${partyName} doesn't exists in the World State `;
            return response;
        }

        let ballotAsBytes = await ctx.stub.getState(partyName);
        let ballot = await JSON.parse(ballotAsBytes);

        ballot.voteCount++;
        let transId = await getTransactionId(voter.aadharCard, currentTime);
        ballot.transIds.push(transId);
        await ctx.stub.putState(ballot, Buffer.from(JSON.stringify(ballot)));

        voter.votedTo = partyName;
        voter.transId = transId;

        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        let response = ` Your vote has been casted with transaction Id : ${transId}`;
        return response;
    }

    async getTransactionId(aadharCard, currentTime) {

        return aadharCard + currentTime;
    }

    async queryByObjectType(ctx, objectType) {

        let queryString = {
            selector: {
                docType: objectType
            }
        };

        let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
        return queryResults;

    }


    async queryWithQueryString(ctx, queryString) {

        console.log('query String');
        console.log(JSON.stringify(queryString));

        let resultsIterator = await ctx.stub.getQueryResult(queryString);

        let allResults = [];

        // eslint-disable-next-line no-constant-condition
        while (true) {
            let res = await resultsIterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};

                console.log(res.value.value.toString('utf8'));

                jsonRes.Key = res.value.key;

                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }

                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await resultsIterator.close();
                console.info(allResults);
                console.log(JSON.stringify(allResults));
                return JSON.stringify(allResults);
            }
        }
    }
}

module.exports = VotingContract;
