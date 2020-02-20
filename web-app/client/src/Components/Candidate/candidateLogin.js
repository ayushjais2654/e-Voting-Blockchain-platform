import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";


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

        let response = await axios.post(`http://localhost:4000/candidateLogin`,candidateCredentials);
        alert(response.data);

        if(response.data === "Correct") {
            localStorage.setItem("token-candidate", "hredgjkljggdfr");
            this.setState({loggedIn: true});
        }
    };

    render() {

        if (this.state.loggedIn === true) {
            return <Redirect to='/candidatePage'/>
        }

        return (
            <div className="main">
                <p className="sign" align="center">Sign in</p>
                <form class="form1" onSubmit={this.submitForm}>
                   <input class="un" type="text" align="center" placeholder="Username" name = "username" value = {this.state.username} onChange={this.handleChange} required /> <br/><br/>
                   <input class="pass" type="password" align="center" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/> <br/> <br/>
                   <input class="submit" align="center" type="submit" value="Submit"/>
                 {/*<p className="forgot" align="center"><a href="#">Forgot Password?</p>*/}
                </form>
            </div>
        );
    }
}

export default CandidateLogin;
