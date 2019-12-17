import React, {Component} from 'react';

class VoterLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : null,
            password : null,
            isLoggedIn : false
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    submitForm = (event) => {

        event.preventDefault();
        alert(JSON.stringify(this.state));
    }

    render() {
        return (
            <div>
                <h1> Welcome to Voter Login Page ... </h1>
                <form onSubmit={this.submitForm}>
                    Username : <input type="text" name="username" value = {this.state.username} onChange={this.handleChange}/> <br/><br/>
                    Password : <input type="password" name="password" value = {this.state.password} onChange={this.handleChange}/> <br/><br/>
                    <input type="submit"  value = "Login"/>
                </form>
            </div>
        );
    }
}

export default VoterLogin;