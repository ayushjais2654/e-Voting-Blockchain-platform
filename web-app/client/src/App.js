import React, {Component} from 'react';
import './App.css';

import RegisterVoter from './Components/Voter/RegisterVoter'
import Home from './Components/Home'
import VoterLogin from './Components/Voter/VoterLogin'
import VoterPage from './Components/Voter/VoterPage'
import CandidateLogin from "./Components/Candidate/candidateLogin";
import CandidatePage from "./Components/Candidate/candidatePage";
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

    render() {
        return (
                <Router>
                    <Route path="/" exact component={Home}/>
                    <Route path="/voterPage" component={VoterPage}/>
                    <Route path="/voterLogin" exact component={VoterLogin}/>
                    <Route path="/registerVoter" exact component={RegisterVoter}/>
                    <Route path="/candidateLogin" exact component={CandidateLogin} />
                    <Route path="/candidatePage" exact component={CandidatePage} />
                </Router>
        );
    }
}

export default App;
