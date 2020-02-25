import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import {ADDRESS} from "../constants";

class VoterPage extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            mobileNo: null,
            aadharCard: null,
            votedTo: null,
            transId: null,
            partyNames : [],
            loggedIn
        }
    }

    componentDidMount = async () => {
        const voter = {
            username: localStorage.getItem("token")
        };
        let response = await axios.post(ADDRESS + `fetchVoter`, voter);
        console.log(JSON.stringify(response.data) + "mann maein");

        this.setState({
            username: response.data.voterDetail.username,
            password: response.data.voterDetail.password,
            firstName: response.data.voterDetail.firstName,
            lastName: response.data.voterDetail.lastName,
            mobileNo: response.data.voterDetail.mobileNo,
            aadharCard: response.data.voterDetail.aadharCard,
            votedTo: response.data.voterDetail.votedTo,
            transId: response.data.voterDetail.transId,
            partyNames : []
        });


    };

    handleChange = (event) => {
        this.setState({
            loggedIn: false
        });
        localStorage.removeItem("token");
    };

    castVote = async (event) => {
        let voterDetails = {
            username: this.state.username,
            votedTo: "BJP"
        };

        //alert(voterDetails.username + " voterPage");

        let response = await axios.post(ADDRESS + `castVote`, voterDetails);
        alert(JSON.stringify(response.data));
    };

    render() {
        if (this.state.loggedIn === false) {
            return < Redirect to="/"/>;
        }
        return (
            <div>
                <h1> Welcome to Logged in page .. </h1>
                <button onClick={this.castVote}> Cast Vote</button>
                <br/><br/>
                <Link to="/" onClick={this.handleChange}> Logout </Link>
            </div>
        );
    }
}

export default VoterPage;
