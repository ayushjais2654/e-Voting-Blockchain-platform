import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Button} from "react-bootstrap";
import "./voterLogin.css";
import {ADDRESS} from "../constants";
import {Redirect} from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import {Input} from "semantic-ui-react";
import PopUp from "./VoterPage/PopUp";

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
            alertType:"danger",
            alertData:"",
            alertShow:false,
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
            localStorage.setItem("token", this.state.username);
            this.setState({
                loggedIn: true,
            });
        } else {
            this.setState({
                spinner: false,
                alertShow:true,
                alertType:"danger",
                alertData:response.data,
            });
        }
    };

    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to={{
                pathname: '/voterPage',
            }}/>;
        }
        if (this.state.spinner) {
            return <Spinner animation="border"/>;
        } else {
            return (
                <div>
                    <PopUp  alertType={this.state.alertType}
                            alertData={this.state.alertData}
                            alertShow={this.state.alertShow}
                            alertCloseFunc = {()=>this.setState({alertShow:false})}
                    />
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
                                <tr> &nbsp;</tr>
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
                                        <Link style={{"color": "blue"}} to="/registerVoter"> Register here</Link>
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

export default VoterLogin;
