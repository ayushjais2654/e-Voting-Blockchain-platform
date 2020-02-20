import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class CandidatePage extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token-candidate");
        let loggedIn = true;
        if(token == null ){
            loggedIn = false;
        }
        this.state = {
            loggedIn
        }
    }

    handleChange = (event) => {
            this.setState({
               loggedIn : false
            });
            localStorage.removeItem("token-candidate");
    }


    render() {
        if(this.state.loggedIn === false){
            return < Redirect to="/" />
        }

        return (
            <div>
                <h1>Welcome to the Candidate Page ... </h1>
                <Link to="/" onClick={this.handleChange}> Logout </Link>
            </div>
        );
    }
}

export default CandidatePage;