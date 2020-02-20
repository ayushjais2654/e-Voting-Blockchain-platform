import React, {Component} from 'react';
import axios from 'axios';
import CandidatePage from "./candidatePage";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 *  @author : Ayush Jaiswal
 *  @Date : 18/12/2019
 */
class CandidateLogin extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token-candidate");
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }

        this.state = {
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
        event.preventDefault();
        const candidateCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        let response = await axios.post(`http://172.30.143.206:4000/candidateLogin`,candidateCredentials);
        alert(response.data);

        if(response.data === "Correct") {
            localStorage.setItem("token-candidate", "hredgjkljggdfr");
            this.setState({loggedIn: true});
        }
        else{
            alert("Invalid credentials");
        }
    };

    render() {

        if (this.state.loggedIn === true) {
            return <CandidatePage username={this.state.username} />;
        }

        return (
            <div>
                <br/>
                <form onSubmit={this.submitForm}>
                    <table style={{"width":"100%","border-collapse":"collapse","cellspacing":"20px"}} >
                        <tr rowspan="3" align="center">
                            <td colSpan="2">
                                <img src="./img_avatar2.png" alt="Avatar"
                                     style={{"border-radius":"50%","height":"30%",
                                         "width":"30%" }}
                                />
                            </td>
                        </tr>
                        <tr><br/></tr>
                        <tr>
                            <td style={{"width":"30%"}}>Username:</td>
                            <td>
                                <input type="text" name="username" value={this.state.username}
                                       onChange={this.handleChange} required style={{"width":"80%"}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password  :</td>
                            <td>
                                <input type="password" name="password" value={this.state.password}
                                       onChange={this.handleChange} required style={{"width":"80%"}}/>
                            </td>
                        </tr>
                        <tr align="center">
                            <td colSpan="2">
                                <Button variant="primary" type="submit" value="Login">Login</Button>
                            </td>
                        </tr>
                        <tr rowspan="2"><br/></tr>
                        <tr >
                            <td colSpan="2">
                                <span>Don't have an account? </span>
                                <Link style={{"color":"blue"}} to="/registerCandidate"> Register here</Link>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        );
    }
}

export default CandidateLogin;
