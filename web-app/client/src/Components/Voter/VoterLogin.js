import React, {Component} from 'react';
import axios from 'axios';
import VoterPage from "./VoterPage";

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
    };

    submitForm = async (event) => {

        event.preventDefault();
        const {username, password} = this.state;
        const voterCredentials = {
            username: this.state.username,
            password: this.state.password
        };


        let response = await axios.post(`http://localhost:4000/voterLogin` , voterCredentials);
        if(response.data === "Correct"){
            localStorage.setItem("token", "hbfjkfbfergner");
            this.setState({loggedIn: true});
        }
        else{
            alert("Invalid Credentials");
        }
    };

    render() {

        if (this.state.loggedIn === true) {
            return < VoterPage username={this.state.username} />;
        }
        return (
            <div>
                <h1> Welcome to Voter Login Page ... </h1>
                <form onSubmit={this.submitForm}>
                    Username : <input type="text" name="username" value={this.state.username}
                                      onChange={this.handleChange} required/> <br/><br/>
                    Password : <input type="password" name="password" value={this.state.password}
                                      onChange={this.handleChange} required/> <br/><br/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

export default VoterLogin;
