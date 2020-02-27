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
            firstName: '',
            lastName: '',
            username: 'jvhgvhgvbvcgvvcghcvghcjvchcvfghjvcghcvghcfchf',
            password: '',
            mobileNo: 9515365125,
            aadharCard: 123456789123,
            isEligible: false,
            votedTo: null,
            transId: null,
            description: null,
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
        return JSON.parse(buffer.toString());
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
     * @param isEligible
     * @param description
     * @returns {Promise<string>} - response message on successful creation of voter in world state
     */
    async createVoter(ctx, firstName, lastName, username, password, mobileNo, aadharCard, isEligible, description) {

        let voter = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            mobileNo: mobileNo,
            aadharCard: aadharCard,
            isEligible: isEligible,
            description: description,
            votedTo: null,
            transId: null,
            docType: 'voter'
        };

        let voterExists = await this.myAssetExists(ctx, voter.username);
        if (voterExists) {
            return 'Voter already registered in World State';
        }
        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        return `Voter with username ${voter.username} is successfully registered in the World State`;
    }

    async updateVoter(ctx, firstName, lastName, username, password, mobileNo, aadharCard, isEligible, description,votedTo,transId) {

        let voterExists = await this.myAssetExists(ctx,username);
        if (!voterExists) {
            return 'Voter is not registered in World State';
        }

        let voterAsBytes = await ctx.stub.getState(username);
        let voter = JSON.parse(voterAsBytes);
        voter.firstName = firstName;
        voter.lastName = lastName;
        voter.password = password;
        voter.mobileNo = mobileNo;
        voter.isEligible = isEligible;
        voter.description = description;


        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        return `Voter with username ${voter.username} is successfully updated in the World State`;
    }

    /**
     *
     * @param ctx - Transaction context
     * @param username
     * @param partyName
     * @returns {Promise<string|{}>} - response message on successful voting
     */
    async castVote(ctx, username, partyName) {

        let electionStartDate = await Date.parse("2020-2-12");
        let electionEndDate = await Date.parse("2020-5-30");

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

        let currentTime = await Date.now();

        if (currentTime > electionEndDate) {

            let response = {};
            response.error = ' Election period has already ended ';
            return response;
        }

        if (currentTime < electionStartDate) {
            let response = {};
            response.error = ' Election period has not started ';
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
        await ctx.stub.putState(ballot.partyName, Buffer.from(JSON.stringify(ballot)));

        voter.votedTo = partyName;
        voter.transId = transId;
        await ctx.stub.putState(voter.username, Buffer.from(JSON.stringify(voter)));

        return ` Your vote has been casted `;
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
