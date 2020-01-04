import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'

class VoterPage extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token == null ){
            loggedIn = false;
        }
        this.state = {
            loggedIn
        }
    }

    async componentDidMount() {
        console.log(JSON.stringify(this.props));
    }

    handleChange = (event) => {
        this.setState({
            loggedIn : false
        });
        localStorage.removeItem("token");
    };

    render() {
        if(this.state.loggedIn === false){
            return < Redirect to="/" />
        }
        return (
            <div>
                <h1> Welcome to Logged in page .. </h1>
                <Link to="/" onClick={this.handleChange}> Logout </Link>
            </div>
        );
    }
}

export default VoterPage;
