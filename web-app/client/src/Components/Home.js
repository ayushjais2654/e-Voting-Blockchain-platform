import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import VoterLogin from "./Voter/VoterLogin";
import "./Home.css"
import CandidateLogin from "./Candidate/candidateLogin";
import {Button, Modal, Container, Row, Col, Card} from "react-bootstrap";


class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tokenVoter: localStorage.getItem("token"),
            tokenCandidate: localStorage.getItem("token-candidate"),
            showmodal: false,
            voter_modal: true,
            evoting_data:true,
        };
    }

    render() {
        if (this.state.tokenCandidate != null)
            return <Redirect to="/candidatePage"/>;
        if (this.state.tokenVoter != null)
            return <Redirect to="/voterPage"/>;

        let evoting_dat="Electronic voting (also known as e-voting) is voting that uses electronic means to either aid or take care of casting and counting votes.\n" +
            "\n" +
            "Depending on the particular implementation, e-voting may use standalone electronic voting machines (also called EVM) or computers connected to the Internet. It may encompass a range of Internet services, from basic transmission of tabulated results to full-function online voting through common connectable household devices. The degree of automation may be limited to marking a paper ballot, or may be a comprehensive system of vote input, vote recording, data encryption and transmission to servers, and consolidation and tabulation of election results.";

        return (
            <>
                <Modal
                    size="md"
                    centered
                    show={this.state.showmodal}
                    onHide={() => this.setState({showmodal: false})}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.voter_modal ? "Voter " : "Candidate "}
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {this.state.voter_modal ? <VoterLogin/> : <CandidateLogin/>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({showmodal: false})}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Container fluid>
                    <Row>
                        <Col>
                            &nbsp;
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Card style={{ width: '47rem' }}>
                                    <Card.Body>
                                        <Card.Title><strong>What is E-Voting</strong></Card.Title>
                                        <Card.Text>
                                            { this.state.evoting_data? evoting_dat.substr(0,100)+"....":evoting_dat}
                                        </Card.Text>
                                            <Button variant="secondary" onClick={() => this.setState({evoting_data:!this.state.evoting_data})} >
                                                { this.state.evoting_data ?"Show more":"Show less" }
                                            </Button>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Col align={"center"}>
                                    <div>
                                        <Card style={{width: '18rem', height: '30rem'}}>
                                            {/*<Card.Img variant="top" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />*/}
                                            <Card.Img variant="top" src='./voter_pic.png'/>
                                            <Card.Body align={"center"}>
                                                <Card.Title>Voters</Card.Title>
                                                <Card.Text>
                                                    Voters click here to login into the system and contribute there work
                                                    towards society
                                                </Card.Text>
                                                <Button variant="primary"
                                                        onClick={() => this.setState({
                                                            showmodal: true,
                                                            voter_modal: true
                                                        })}>
                                                    Voter Login
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <div>
                                    <Card style={{width: '18rem', height: '30rem'}}>
                                        {/*<Card.Img variant="top" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />*/}
                                        <Card.Img src='./candidate_pic.png' style={{"width": "100%", "height": "60%"}}/>
                                        <Card.Body align={"center"}>
                                            <Card.Title>Candidates</Card.Title>
                                            <Card.Text>
                                                Eligible Candidate login herere
                                            </Card.Text>
                                            <Button variant="primary"
                                                    onClick={() => this.setState({
                                                        showmodal: true,
                                                        voter_modal: false
                                                    })}>
                                                Candidate Login
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;
