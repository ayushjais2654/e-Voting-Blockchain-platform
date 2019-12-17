import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        localStorage.removeItem("token");
    }
    render() {
        return (
            <div>
                <h1> Welcome to Home page ... </h1>
                <Link to="/voterLogin"> VoterLogin </Link> <br/><br/>
                <Link to="/adminLogin"> AdminLogin </Link> <br/><br/>
                <Link to="/registerVoter"> RegisterVoter </Link> <br/><br/>
            </div>
        );
    }
}

export default Home;