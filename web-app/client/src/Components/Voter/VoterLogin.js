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
            firstName: "",
            lastName: "",
            mobileNo: 9515365125,
            aadharCard: 123456789123,
            votedTo: null,
            transId: null,
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
        const voterCredentials = {
            username: this.state.username,
            password: this.state.password
        };

        alert(voterCredentials.username);
        let response = await axios.post(`http://172.30.143.206:4000/voterLogin`, voterCredentials);

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
        }
    };

    render() {

        if (this.state.loggedIn === true) {
            return < VoterPage username={this.state.username} firstName={this.state.firstName} lastName={this.state.lastName} mobileNo={this.state.mobileNo} votedTo={this.state.votedTo}
                               aadharCard={this.state.aadharCard} transId={this.state.transId}/>;
        }
        return (
            <div>
                <h1> Welcome to Voter Login Page ... </h1>
                <h2> changed </h2>
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
