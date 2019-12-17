import React, {Component} from 'react';
import './App.css';

import RegisterVoter from './Components/RegisterVoter'
import AdminLogin from './Components/AdminLogin'
import Home from './Components/Home'
import VoterLogin from './Components/VoterLogin'
import {Link, Switch, Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
          // <Switch>
          //     <Link to="/" exact component={Home}/>
          //     <Link to="/VoterLogin" exact component={VoterLogin} />
          //     <Link to="/AdminLogin" exact component={AdminLogin} />
          //     <Link to="/RegisterVoter" exact component={RegisterVoter} />
          // </Switch>
            <div>
                <VoterLogin/>
            </div>
        );
    }
}

export default App;
