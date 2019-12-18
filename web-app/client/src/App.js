import React, {Component} from 'react';
import './App.css';

import RegisterVoter from './Components/RegisterVoter'
import AdminLogin from './Components/AdminLogin'
import Home from './Components/Home'
import VoterLogin from './Components/VoterLogin'
import VoterPage from './Components/VoterPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

    render() {
        return (
                <Router>
                    <Route path="/" exact component={Home}/>
                    <Route path="/voterPage" component={VoterPage}/>
                    <Route path="/voterLogin" exact component={VoterLogin}/>
                    <Route path="/adminLogin" exact component={AdminLogin}/>
                    <Route path="/registerVoter" exact component={RegisterVoter}/>
                </Router>
        );
    }
}

export default App;
