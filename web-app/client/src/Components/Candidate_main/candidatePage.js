import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {ADDRESS} from "../constants";

class CandidatePage extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token-candidate");
        let loggedIn = true;
        if(token == null ){
            loggedIn = false;
        }
        this.state = {
            loggedIn,
            firstName: "ayush",
            lastName: "jaiswal",
            partyName: "BJP",
            age: 34,
            username: "ayush123",
            password: "",
            constituency: "Haridwar",
            mobileNo : 9515364515,
        };

    }

    componentDidMount = async () => {
        console.log(this.props.username);
        let username = {
            username : this.props.username
        };
        let response = await axios.post(ADDRESS+`candidatePage`,username);

        this.setState({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            partyName: response.data.partyName,
            age: response.data.age,
            username: response.data.username,
            password: response.data.password,
            constituency: response.data.constituency,
            mobileNo : response.data.mobileNo,
        });

        console.log(JSON.stringify(this.state));
    };

    handleChange = (event) => {
            this.setState({
               loggedIn : false
            });
            localStorage.removeItem("token-candidate");
    };


    render() {
        if(this.state.loggedIn === false){
            return < Redirect to="/" />
        }

        return (
            <div>
                <h1>Welcome to the Candidate Page ... </h1>
                <Link to="/" onClick={this.handleChange}> Logout </Link>
            </div>
        );
    }
}

export default CandidatePage;
