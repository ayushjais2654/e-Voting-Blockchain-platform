import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Button} from "react-bootstrap";
import "./voterLogin.css";
import {ADDRESS} from "../constants";
import {Redirect} from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";

class VoterLogin extends Component {

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
            mobileNo: 9515365125,
            aadharCard: 123456789123,
            votedTo: null,
            transId: null,
            spinner: false,
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
        const voterCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        let response = await axios.post(ADDRESS + `voterLogin`, voterCredentials);

        if (typeof response.data === "object") {
            localStorage.setItem("token", "hbfjkfbfergner");
            this.setState({
                loggedIn: true,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                mobileNo: response.data.mobileNo,
                aadharCard: response.data.aadharCard,
                votedTo: response.data.votedTo,
                transId: response.data.transId,
            });
        } else {
            alert(response.data);
            this.setState({
                spinner : false
            });
        }
    };

    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to={{
                pathname: '/voterPage',
                state: {username: this.state.username}
            }}/>;
        }
        if (this.state.spinner) {
            return <Spinner animation="grow"/>;
        } else {
            return (
                <div>
                    <br/>
                    <form onSubmit={this.submitForm}>
                        <table style={{"width": "100%", "border-collapse": "collapse", "cellspacing": "20px"}}>
                            <tr rowspan="3" align="center">
                                <td colSpan="2">
                                    <img src="./img_avatar2.png" alt="Avatar"
                                         style={{
                                             "border-radius": "50%", "height": "30%",
                                             "width": "30%"
                                         }}
                                    />
                                </td>
                            </tr>
                            <tr><br/></tr>
                            <tr>
                                <td style={{"width": "30%"}}>Username:</td>
                                <td>
                                    <input type="text" name="username" value={this.state.username}
                                           onChange={this.handleChange} required style={{"width": "80%"}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Password :</td>
                                <td>
                                    <input type="password" name="password" value={this.state.password}
                                           onChange={this.handleChange} required style={{"width": "80%"}}/>
                                </td>
                            </tr>
                            <tr align="center">
                                <td colSpan="2">
                                    <Button variant="primary" type="submit" value="Login">Login</Button>
                                </td>
                            </tr>
                            <tr rowspan="2"><br/></tr>
                            <tr>
                                <td colSpan="2">
                                    <span>Don't have an account? </span>
                                    <Link style={{"color": "blue"}} to="/registerVoter"> Register here</Link>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            );
        }
    }
}

export default VoterLogin;
