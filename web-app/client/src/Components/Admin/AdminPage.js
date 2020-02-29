import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../constants";
import {Modal, Button, Accordion, DropdownButton} from "react-bootstrap";
import VoterDetails from "./VoterDetails";
import "./AdminPage.css";
import {Input} from "semantic-ui-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {MDBDataTable} from 'mdbreact'
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";


class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingVoters: [],
            candidateList:[],
            electionList:[],
            selectedVoter: 0,
            isDisplayActive: false,
            constituency: "",
            electionPeriod: {"fromDate": "2020-02-12", "toDate": "2020-03-15"},
            dateObj: [new Date(2020, 2, 12), new Date(2020, 3, 23)],
        };
        this.updateDate = this.updateDate.bind(this);
        this.addElection = this.addElection.bind(this);
    }

    componentDidMount = async () => {
        let response = await axios.get(ADDRESS + `fetchPendingVoters`);

        this.setState({
            pendingVoters: response.data.voterList.map((item) => {
                return item.Record
            }),
            candidateList:response.data.candidateList.map((item) => {
                return item.Record
            }),
        });
        for(let i=0;i<response.data.electionList.length;i++)
            if(response.data.electionList[i].Key !== 'default')
                this.state.electionList.push(response.data.electionList[i].Record);
        this.setState({electionList:this.state.electionList});
        console.log(this.state);
    };

    async addElection() {
        console.log(this.state);
        let response = await axios.post(ADDRESS + "addElection", this.state);
        console.log(response.data);
    };

    updateDate = (date) => {
        this.setState({
            dateObj: date,
            electionPeriod: {
                "fromDate": date[0].getFullYear().toString() + "-" + (date[0].getMonth() + 1).toString() + "-" + date[0].getDate().toString(),
                "toDate": date[1].getFullYear().toString() + "-" + (date[1].getMonth() + 1).toString() + "-" + date[1].getDate().toString(),
            }
        });
    };

    render() {
        let divStyleOuter = {
            width: "96%",
            height: "60%",
            marginLeft: "2%",
            marginRight: "2%",
            marginTop: "0%",
            marginBottom: "0%",
            textAlign: "center",
            backgroundColor: "rgb(220,220,220)"
        };
        let displayVoterDiv = {
            display: (this.state.pendingVoters.length === 0) ? "None" : "Block",
        };
        let displayVoterNone = {
            display: (this.state.pendingVoters.length !== 0) ? "None" : "Block",
        };
        let displayCandidateDiv = {
            display: (this.state.candidateList.length === 0 ) ? "None" : "Block",
        };
        let displayCandidateNone = {
            display: (this.state.candidateList.length !== 0 ) ? "None" : "Block",
        };
        let displayElectionDiv = {
            display: (this.state.electionList.length === 0 ) ? "None" : "Block",
        };
        let displayElectionNone = {
            display: (this.state.electionList.length !== 0 ) ? "None" : "Block",
        };

        return (
            <>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "6%",
                    marginTop: "2%",
                }}> Welcome to the admin Page.. </h1>
                <div style={{
                    width: "60%",
                    height: "60%",
                    marginLeft: "20%",
                    marginRight: "20%",
                    marginTop: "2%",
                    marginBottom: "2%",
                    textAlign: "center",
                }}>
                    <Accordion>
                        <Accordion.Toggle as={Button} variant="primary" eventKey="0" style={{"marginBottom": "2%"}}>
                            Add Election Dates
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div>
                                <label style={{
                                    textAlign: "center",
                                }}>Constituency: </label>
                                <Input type={"text"}
                                       value={this.state.constituency}
                                       onChange={(event) => this.setState({constituency: event.target.value})}
                                       required
                                />

                                <DateRangePicker onChange={this.updateDate}
                                                 value={this.state.dateObj}
                                                 showNavigation={"false"}
                                />
                                <br/>
                                <br/>
                                <Button variant={"Success"} size={"lg"}
                                        onClick={this.addElection}
                                        style={{backgroundColor: "yellow"}}
                                >
                                    Add Election
                                </Button>
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>

                <Modal show={this.state.isDisplayActive} onHide={() => this.setState({isDisplayActive: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title> Voter Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VoterDetails voterDetails={this.state.pendingVoters[this.state.voterSelected]}
                                      closeVoterDetails={() => this.setState({isDisplayActive: false})}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({isDisplayActive: false})}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <br/>
                <br/>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first"
                >
                    <Row>
                        <Col sm={3}>
                            <div style={{fontSize:"8px",textAlign:"center",backgroundColor:"rgb(220,220,220)"}}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" >Pending Voters</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Candidates</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Elections</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </div>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div style={divStyleOuter}>
                                        <div style={displayVoterDiv}>
                                            <table className="table table-hover">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">UserName</th>
                                                    <th scope="col">Aadhar no.</th>
                                                    <th scope="col">Eligible</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.pendingVoters.map((item, index) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td align={"center"}
                                                                        onClick={() => this.setState({
                                                                            voterSelected: index,
                                                                            isDisplayActive: true,
                                                                        })}
                                                                        className="username"
                                                                    >
                                                                        {item.username}
                                                                    </td>
                                                                    <td align={"center"}
                                                                    >
                                                                        {item.aadharCard}
                                                                    </td>
                                                                    <td align={"center"}
                                                                    >
                                                                        {item.isEligible}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={displayVoterNone}>
                                            <h1> No Pending Voters </h1>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div style={divStyleOuter}>
                                        <div style={displayCandidateDiv}>
                                            <table className="table table-hover">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">UserName</th>
                                                    <th scope="col">Constituency</th>
                                                    <th scope="col">Party Name</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.candidateList.map((item, index) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td align={"center"} >
                                                                        {item.username}
                                                                    </td>
                                                                    <td align={"center"}
                                                                    >
                                                                        {item.constituency}
                                                                    </td>
                                                                    <td align={"center"}
                                                                    >
                                                                        {item.partyName}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={displayCandidateNone}>
                                            <h1> No Candidate Registered </h1>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <div style={divStyleOuter}>
                                        <div style={displayElectionDiv}>
                                            <table className="table table-hover">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Constituency</th>
                                                    <th scope="col">Start Date</th>
                                                    <th scope="col">End Date</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.electionList.map((item, index) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td align={"center"}>
                                                                        {item.constituency}
                                                                    </td>
                                                                    <td align={"center"}
                                                                    >
                                                                        {item.startDate}
                                                                    </td>
                                                                    <td align={"center"}
                                                                    >
                                                                        {item.endDate}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={displayElectionNone}>
                                            <h1> No Election Going ON!!! </h1>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
        );
    }
}

export default AdminPage;
