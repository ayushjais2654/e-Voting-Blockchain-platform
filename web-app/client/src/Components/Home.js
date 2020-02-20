import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

/**
 * @author : Ayush Jaiswal
 * @Date : 19/12/2019
 */

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tokenVoter: localStorage.getItem("token"),
            tokenCandidate: localStorage.getItem("token-candidate")
        }
    }

    render() {

        if (this.state.tokenCandidate != null)
            return <Redirect to="/candidatePage"/>;
        if (this.state.tokenVoter != null)
            return <Redirect to="/voterPage"/>;
        return (
            <div>
                <h1> Welcome to Home page ... </h1>
                <Link to="/voterLogin"> VoterLogin </Link> <br/><br/>
                <Link to="/candidateLogin"> CandidateLogin </Link> <br/><br/>
                <Link to="/registerVoter"> RegisterVoter </Link> <br/><br/>
                <Link to="/registerCandidate"> RegisterCandidate</Link>
            </div>
        );
    }
}

export default Home;
