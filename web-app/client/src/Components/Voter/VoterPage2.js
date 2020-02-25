import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import {ADDRESS} from "../constants";
import {Modal} from "react-bootstrap";
import VoterLogin from "./VoterLogin";
import {Button} from "semantic-ui-react";


function validateName(name) {

    let valid = true;
    console.log(name);

    for (let i = 0; i < name.length; i++) {
        console.log(name.length);
        if (!(name[i] >= 'a' && name[i] <= 'z') && !(name[i] >= 'A' && name[i] <= 'Z')) {
            valid = false;
            break;
        }
    }
    console.log(valid);
    return valid;
}

function validateMobilNo(number) {
    let valid = true;
    if (number.length !== 10)
        valid = false;
    if (!(number[0] === '9' || number[0] === '8' || number[0] === '7' || number[0] === '6'))
        valid = false;
    return valid;
}


class PopUp extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}


class VoterPage2 extends React.Component{
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
            isEligible : false,
            showModal : false,
            loggedIn
        }
    }
    handleUpdateVoter = async (event) => {
        event.preventDefault();

        let error_string = "";
        let info_string  = "";

        if (validateName(event.target.firstName.value) === false) {
            error_string="First Name of Register Voter is not compatible";
        }
        else if (validateName(event.target.lastName.value) === false) {
            error_string="Last Name of Register Voter is not compatible";
        }
        else if (validateMobilNo(event.target.mobileNumber.value) === false) {
            error_string="Mobile Number is Invalid";
        }
        if(error_string.length !== 0){

        }

        let response = await axios.post(ADDRESS + `registerVoter`, this.state);
        if (response.data === 'Correct') {
            this.setState({
                isRegistered: true
            });
            alert("Voter Successfully Registered");
        }
        else{
            alert(response.data);
        }
        console.log(response.data);
    };
    changeStateValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    render() {
        return (

            <div>
                <form onSubmit={this.handleRegisterVoter}>

                    First Name : <Input type="text"
                                        name="firstName"
                                        onChange={this.changeStateValues}
                                        value={this.state.firstName}
                                        required/> <br/> <br/>

                    Last Name : <input type="text"
                                       name="lastName"
                                       onChange={this.changeStateValues}
                                       value={this.state.lastName}
                                       required/> <br/> <br/>

                    Mobile Number : <input type="number"
                                           name="mobileNumber"
                                           onChange={this.changeStateValues}
                                           value={this.state.mobileNumber}
                                           required/> <br/> <br/>

                    Aadhar Card Number : <input type="text"
                                                name="cardNumber"
                                                onChange={this.changeStateValues}
                                                value={this.state.cardNumber}
                                                required/><br/> <br/>

                    Username : <input type="text"
                                      name="username"
                                      onChange={this.changeStateValues}
                                      value={this.state.username}
                                      required/><br/> <br/>

                    Password : <input type="password"
                                      name="password"
                                      onChange={this.changeStateValues}
                                      value={this.state.password}
                                      required/> <br/> <br/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}





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
            username: response.data.username,
            password: response.data.password,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            mobileNo: response.data.mobileNo,
            aadharCard: response.data.aadharCard,
            votedTo: response.data.votedTo,
            transId: response.data.transId,
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

        alert(voterDetails.username + " voterPage");

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
