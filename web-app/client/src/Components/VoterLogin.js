import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

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
            loggedIn
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm = (event) => {

        event.preventDefault();
        const {username, password} = this.state;
        const voterCredentials = {
            username: this.state.username,
            password: this.state.password
        }


        axios.post(`http://localhost:4000/voterLogin`, voterCredentials)
            .then(() => {
                console.log("Details sent to server");
            })
            .catch(error => {
                console.log(error);
            });

        alert(JSON.stringify(this.state));
        if (username === 'a' && password === 'b') {
            localStorage.setItem("token", "hbfjkfbfergner");
            this.setState({loggedIn: true})
        }
    }

    render() {

        if (this.state.loggedIn === true) {
            return <Redirect to='/voterPage'/>
        }
        return (
            <div>
                <h1> Welcome to Voter Login Page ... </h1>
                <form onSubmit={this.submitForm}>
                    Username : <input type="text" name="username" value={this.state.username}
                                      onChange={this.handleChange} required/> <br/><br/>
                    Password : <input type="password" name="password" value={this.state.password}
                                      onChange={this.handleChange} requiredreac/> <br/><br/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

export default VoterLogin;