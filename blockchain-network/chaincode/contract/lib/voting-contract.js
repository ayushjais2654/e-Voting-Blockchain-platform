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

/**
 * @author : Ayush Jaiswal
 * @Date : 01/01/2020
 */

class VotingContract extends Contract {

    /**
     *
     * @param ctx  - Transaction context
     * @returns returns nothing
     * It is called byDefault at the time of ChainCode instantiation
     */

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

    /**
     *
     * @param ctx - Transaction context
     * @param myAssetId - Id of the object to search in the world state
     * @returns {Promise<boolean|boolean>}
     */
    async myAssetExists(ctx, myAssetId) {

        const buffer = await ctx.stub.getState(myAssetId);
        return (!!buffer && buffer.length > 0);

    }

    /**
     *
     * @param ctx - Transaction context
     * @param myAssetId - Id of the object to search in the world state
     * @returns {Promise<{}|any>} - returns the asset if found otherwise error in response
     */
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

    /**
     *
     * @param ctx - Transaction context
     * @param myAssetId - Id of the object to search in the world state
     * @returns {Promise<{}|boolean>}
     */
    async deleteMyAsset(ctx, myAssetId) {

        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {

            let response = {};
            response.error = ` Asset with Id ${myAssetId} doesn't exists in the World State `;
            return response;
        }

        await ctx.stub.deleteState(myAssetId);
        return true;
    }

    /**
     *
     * @param ctx - Transaction context
     * @param firstName
     * @param lastName
     * @param username
     * @param password
     * @param mobileNo
     * @param aadharCard
     * @returns {Promise<string>} - response message on successful creation of voter in world state
     */
    async createVoter(ctx, firstName, lastName, username,password,mobileNo,aadharCard) {

        let voter = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            mobileNo: mobileNo,
            aadharCard: aadharCard,
            votedTo: null,
            transId: null,
            docType: 'voter'
        };

        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        return `Voter with username ${voter.username} is successfully registered in the World State`;
    }

    /**
     *
     * @param ctx - Transaction context
     * @param firstName
     * @param lastName
     * @param username
     * @param password
     * @param mobileNo
     * @param aadharCard
     * @param partyName
     * @returns {Promise<string|{}>} - response message on successful voting
     */
    async castVote(ctx, firstName, lastName, username,password,mobileNo,aadharCard, partyName) {

        let electionStartDate = new Date(2020, 4, 21);
        let electionEndDate = new Date(2020, 4, 22);


        const existsVoter = await this.myAssetExists(ctx, username);
        if (!existsVoter) {

            let response = {};
            response.error = ` Voter with username ${username} doesn't exists in the World State `;
            return response;
        }

        let voterAsBytes = await ctx.stub.getState(username);
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

        async function getTransactionId(aadharCard, currentTime) {
            return aadharCard + currentTime;
        }

        let transId = await getTransactionId(voter.aadharCard, currentTime);
        ballot.transIds.push(transId);
        await ctx.stub.putState(ballot, Buffer.from(JSON.stringify(ballot)));

        voter.votedTo = partyName;
        voter.transId = transId;

        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        return ` Your vote has been casted with transaction Id : ${transId}`;
    }

    /**
     *
     * @param ctx - Transaction context
     * @param objectType - can be voter or ballot
     * @returns {Promise<string>} - result of query
     */
    async queryByObjectType(ctx, objectType) {

        let queryString = {
            selector: {
                docType: objectType
            }
        };

        return await this.queryWithQueryString(ctx, JSON.stringify(queryString));

    }

    /**
     *
     * @param ctx
     * @param queryString - query how to search in couchDB
     * @returns {Promise<string>} - result of query
     */
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
