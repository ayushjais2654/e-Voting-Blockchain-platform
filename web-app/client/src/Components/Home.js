import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import VoterLogin from "./Voter/VoterLogin";
import {Modal, Button} from 'react-bootstrap';
import "./Home.css"
import CandidateLogin from "./Candidate/candidateLogin";
import Particles from 'react-particles-js';

class Home extends Component {
/**
 * @author : Ayush Jaiswal
 * @Date : 19/12/2019
 */

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tokenVoter : localStorage.getItem("token"),
            tokenCandidate : localStorage.getItem("token-candidate"),
            showmodal : false,
            voter_modal: true,
        };
    }

    render() {
        if(this.state.tokenCandidate != null)
            return <Redirect to="/candidatePage" />
        if(this.state.tokenVoter != null)
            return <Redirect to="/voterPage" />
        return (
            <>
                <Modal
                    size="md"
                    centered
                    show={this.state.showmodal}
                    onHide={() => this.setState({showmodal:false})}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            { this.state.voter_modal? "Voter ":"Candidate " }
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            { this.state.voter_modal?<VoterLogin/>:<CandidateLogin/>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  onClick={() => this.setState({showmodal: false})}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"/>
                <div className="w3-light-grey font_family">
                    <header className="w3-container w3-center w3-padding-32">
                        <h1><b>E-Voting Platform</b></h1>
                        <p>Based on revolutionary concept of the <span className="w3-tag">blockchain</span></p>
                        <table style={{"width":"60%","margin-left":"auto","margin-right":"auto"}}>
                            <tr align="center">
                                <td>
                                    <Button variant="primary" className="w3-button w3-black w3-padding-large w3-large w3-margin-top"
                                            onClick={()=> this.setState({showmodal: true, voter_modal: true})} >
                                        Voter Login
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="primary" className="w3-button w3-black w3-padding-large w3-large w3-margin-top"
                                            onClick={()=> this.setState({showmodal: true, voter_modal: false})} >
                                        Candidate Login
                                    </Button>
                                </td>
                            </tr>
                        </table>
                    </header>
                </div>
            </>
        );
    }
}

export default Home;
