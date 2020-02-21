import React, {Component} from 'react';
import RegisterVoter from './Components/Voter/RegisterVoter'
import Home from './Components/Home'
import VoterLogin from './Components/Voter/VoterLogin'
import VoterPage from './Components/Voter/VoterPage'
import CandidateLogin from "./Components/Candidate/candidateLogin";
import CandidatePage from "./Components/Candidate/candidatePage";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Button, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import MainForm from "./Components/Candidate/MainForm";
import Background from "./bg";


class App extends Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">E-Voting Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="#link">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <Route path="/" exact component={Home}/>
                    <Route path="/voterPage" component={VoterPage}/>
                    <Route path="/voterLogin" exact component={VoterLogin}/>
                    <Route path="/registerVoter" exact component={RegisterVoter}/>
                    <Route path="/candidateLogin" exact component={CandidateLogin} />
                    <Route path="/candidatePage/" exact component={CandidatePage} />
                    <Route path="/registerCandidate" exact component={MainForm} />
                </Router>
                <Background/>
            </div>
        );
    }
}

export default App;
