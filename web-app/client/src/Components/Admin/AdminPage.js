import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../constants";
import {Modal, Button, Accordion } from "react-bootstrap";
import VoterDetails from "./VoterDetails";
import "./AdminPage.css";
import {Input} from "semantic-ui-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingVoters: [],
            selectedVoter: 0,
            isDisplayActive: false,
            constituency : "",
            electionPeriod:{"fromDate":"2020-02-12","toDate":"2020-03-15"},
            dateObj : [new Date(2020,2,12), new Date(2020,3,23)],
        };
        this.updateDate=this.updateDate.bind(this);
        this.addElection = this.addElection.bind(this);
    }

    componentDidMount = async () => {
        let response = await axios.get(ADDRESS + `fetchPendingVoters`);
        this.setState({
            pendingVoters: response.data.map((item) => {
                return item.Record
            }),
        });
        console.log(this.state.pendingVoters);
    };

    async addElection(){
        console.log(this.state);
        let response = await axios.post(ADDRESS+"addElection",this.state);
        console.log(response.data);
    };

    updateDate = (date) =>{
        this.setState({
            dateObj:date,
            electionPeriod:{
                "fromDate":date[0].getFullYear().toString()+"-"+(date[0].getMonth()+1).toString()+"-"+date[0].getDate().toString(),
                "toDate":date[1].getFullYear().toString()+"-"+(date[1].getMonth()+1).toString()+"-"+date[1].getDate().toString(),
            }
        });
    };
    render() {
        let divStyleOuter = {
            width: "60%",
            height: "60%",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%",
            marginBottom: "2%",
            textAlign: "center",
            backgroundColor: "rgb(220,220,220)"
        };
        let displayDiv = {
            display: (this.state.pendingVoters.length === 0) ? "None" : "Block",
        };
        let displayNone = {
            display: (this.state.pendingVoters.length !== 0) ? "None" : "Block",
        };

        return (
            <>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "6%",
                    marginTop: "2%",
                }}> Welcome to the admin Page.. </h1>
                <div style={{...divStyleOuter,"backgroundColor":"white",}}>
                    <Accordion>
                        <Accordion.Toggle as={ Button } variant="primary" eventKey="0" style={{"marginBottom":"2%"}}>
                            Add Election Dates
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div>
                                <label style={{
                                    textAlign:"center",
                                }}>Constituency: </label>
                                <Input  type={"text"}
                                        value={this.state.constituency}
                                        onChange={(event)=> this.setState({constituency:event.target.value})}
                                        required
                                />
                                <DateRangePicker   onChange={this.updateDate}
                                                   value={this.state.dateObj}
                                                   showNavigation={"false"}
                                />
                                <br/>
                                <Button variant={"Success"} size={"md"}
                                        onClick={this.addElection}
                                        >
                                    Add
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

                <div style={divStyleOuter}>
                    <div style={displayDiv}>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">UserName</th>
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
                                            </tr>
                                        )
                                    }
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div style={displayNone}>
                        <h1> No Pending Voters </h1>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminPage;
