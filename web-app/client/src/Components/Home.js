import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
// import axios from "axios";

class Home extends Component {


    // componentDidMount() {
    //     axios.get(`/api`).then(response => {
    //         console.log(response.data);
    //         this.setState({
    //             users : response.data.user
    //         })
    //     });
    // }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tokenVoter : localStorage.getItem("token"),
            tokenCandidate : localStorage.getItem("token-candidate")
        }
    }

    render() {

        if(this.state.tokenCandidate != null)
            return <Redirect to="/candidatePage" />
        if(this.state.tokenVoter != null)
            return <Redirect to="/voterPage" />
        return (
            <div>
                <h1> Welcome to Home page ... </h1>
                <Link to="/voterLogin"> VoterLogin </Link> <br/><br/>
                <Link to="/candidateLogin"> CandidateLogin </Link> <br/><br/>
                <Link to="/registerVoter"> RegisterVoter </Link> <br/><br/>
                {/*<p> {this.state.users.map(user => <li key={user.id}> {user.name} </li>)} </p>*/}
            </div>
        );
    }
}

export default Home;