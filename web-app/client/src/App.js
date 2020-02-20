import React, {Component} from 'react';
import './App.css';

import RegisterVoter from './Components/Voter/RegisterVoter'
import Home from './Components/Home'
import VoterLogin from './Components/Voter/VoterLogin'
import VoterPage from './Components/Voter/VoterPage'
import CandidateLogin from "./Components/Candidate/candidateLogin";
import CandidatePage from "./Components/Candidate/candidatePage";
import CandidateRegister from "./Components/Candidate/candidateRegister";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Button, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

/**
 *  @author : Ayush Jaiswal
 *  @Date : 15/12/2019
 */

class App extends Component {

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">E-Voting Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>

                            <Button variant="outline-success">About</Button>
                            <pre> </pre>
                            <Button variant="outline-success">Contact</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <Route path="/" exact component={Home}/>
                    <Route path="/voterPage" component={VoterPage}/>
                    <Route path="/voterLogin" exact component={VoterLogin}/>
                    <Route path="/registerVoter" exact component={RegisterVoter}/>
                    <Route path="/candidateLogin" exact component={CandidateLogin} />
                    <Route path="/candidatePage/" exact component={CandidatePage} />
                    <Route path="/registerCandidate" exact component={CandidateRegister} />
                </Router>
            </>
        );
    }
}

export default App;
