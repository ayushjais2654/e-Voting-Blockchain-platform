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
    }

    submitForm = event => {
        event.preventDefault();
        // const {username, password} = this.state;
        // const voterCredentials = {
        //     username: this.state.username,
        //     password: this.state.password
        // }


        // axios.post(`http://localhost:4000/candidateLogin`, voterCredentials)
        //     .then(() => {
        //         console.log("Details sent to candidate server");
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        alert(JSON.stringify(this.state));
        localStorage.setItem("token-candidate", "hredgjkljggdfr");
        this.setState({loggedIn: true});
    }

    render() {

        if (this.state.loggedIn === true) {
            return <Redirect to='/candidatePage'/>
        }

        return (
            <div>
                <form onSubmit={this.submitForm}>
                    Username : <input type="text" name = "username" value = {this.state.username} onChange={this.handleChange} required /> <br/><br/>
                    Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/> <br/> <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default CandidateLogin;