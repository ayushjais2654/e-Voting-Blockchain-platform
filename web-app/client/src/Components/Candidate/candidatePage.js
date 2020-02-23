import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {ADDRESS} from "../constants";
import axios from 'axios';

class CandidatePage extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token-candidate");
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            firstName: "First Name",
            lastName: "Last Name",
            partyName: "Party Name",
            age: 34,
            username: "Username",
            password: "Password",
            constituency: "Constituency",
            mobileNo: 9515364515,
            loggedIn
        }
    }

    componentDidMount = async () => {
        try {
            console.log((JSON.parse(this.props)));
            const candidate = {
                username: this.props.history.location.state.username
            };
            let response = await axios.post(ADDRESS + `fetchCandidate`, candidate);
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                partyName: response.data.partyName,
                age: response.data.age,
                username: response.data.username,
                password: response.data.password,
                constituency: response.data.constituency,
                mobileNo: response.data.mobileNo,
            });
            console.log(JSON.stringify(this.state));
        }
        catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        this.setState({
            loggedIn: false
        });
        localStorage.removeItem("token-candidate");
    };


    render() {
        if (this.state.loggedIn === false) {
            return < Redirect to="/"/>;
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
