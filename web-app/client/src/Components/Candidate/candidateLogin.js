import React, {Component} from 'react';
import axios from 'axios';
import CandidatePage from "./candidatePage";

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

        let response = await axios.post(`http://localhost:4000/candidateLogin`,candidateCredentials);
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
