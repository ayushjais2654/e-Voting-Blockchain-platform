import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {ADDRESS} from "../constants";
import Spinner from "react-bootstrap/Spinner";
import {Input,Button} from "semantic-ui-react";

class CandidateLogin extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token-candidate");
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }

        this.state = {
            spinner: false,
            username: "",
            password: "",
            loggedIn
        }
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitForm = async (event) => {
        this.setState({
            spinner: true
        });
        event.preventDefault();
        const candidateCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        let response = await axios.post(ADDRESS + `candidateLogin`, candidateCredentials);
        console.log(response.data);

        if (response.data === "Correct") {
            localStorage.setItem("token-candidate", "hredgjkljggdfr");
            this.setState({
                loggedIn: true,
                spinner: false
            });
        } else {
            this.setState({
                spinner: false
            });
            alert("Invalid Credentials");
        }
    };

    render() {

        if (this.state.loggedIn === true) {
            return <Redirect to='/candidatePage'/>
        }
        if (this.state.spinner) {
            return <Spinner animation="border"/>;
        } else {

            return (
                <div>
                    <br/>
                    <form onSubmit={this.submitForm}>
                        <table style={{"width": "100%", "borderCollapse": "collapse", "cellspacing": "20px"}}>
                            <tbody>
                            <tr aria-rowspan="3" align="center">
                                <td colSpan="2">
                                    <div style={{"backgroundColor": "white"}}>
                                        <img src="./img_avatar2.jpg" alt="Avatar"
                                             style={{
                                                 "borderRadius": "50%", "height": "20%",
                                                 "width": "30%"
                                             }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>&nbsp;</tr>
                            <tr>
                                <td style={{"width": "30%"}}>Username:</td>
                                <td>
                                    <Input type="text" name="username" value={this.state.username}
                                           onChange={this.handleChange} required style={{"width": "80%"}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Password :</td>
                                <td>
                                    <Input type="password" name="password" value={this.state.password}
                                           onChange={this.handleChange} required style={{"width": "80%"}}/>
                                </td>
                            </tr>
                            <tr align="center">
                                <td colSpan="2">
                                    <Button primary type="submit" value="Login">Login</Button>
                                </td>
                            </tr>
                            <tr rowSpan="2">&nbsp;</tr>
                            <tr>
                                <td colSpan="2">
                                    <span>Don't have an account? </span>
                                    <Link style={{"color": "blue"}} to="/registerCandidate"> Register here</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            );
        }
    }
}

export default CandidateLogin;
