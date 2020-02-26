import React, {Component} from 'react';
import RegisterVoter from './Components/Voter/RegisterVoter'
import VoterLogin from './Components/Voter/VoterLogin'
import VoterPage from './Components/Voter/VoterPage'
import CandidateLogin from "./Components/Candidate/candidateLogin";
import CandidatePage from "./Components/Candidate/candidatePage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navbar,Nav} from "react-bootstrap";
import MainForm from "./Components/Candidate/MainForm";
import Background from "./background_particles";
import Home from "./Components/Home2";
import "./App.css"
import AdminPage from "./Components/Admin/AdminPage";

class App extends Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/"><span style={{fontSize:"1.8em"}}>Election System</span> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link active href="/#home"><span style={{fontSize:"1.2em"}}>Home</span></Nav.Link>
                            <Nav.Link href="/#announcement"><span style={{fontSize:"1.2em"}}>Announcements</span></Nav.Link>
                            <Nav.Link href="/#result"><span style={{fontSize:"1.2em"}}>Results</span></Nav.Link>
                            <Nav.Link href="/#intro"><span style={{fontSize:"1.2em"}}>Intro</span></Nav.Link>
                            <Nav.Link href="/#about"><span style={{fontSize:"1.2em"}}>About</span></Nav.Link>
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
                    <Route path="/admin" exact component={AdminPage}/>
                </Router>
                <Background/>
            </div>
        );
    }
}

export default App;
