import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ADDRESS} from "../../constants";
import {Input} from "semantic-ui-react";
import {Button, Modal, Spinner} from "react-bootstrap";



class MainContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            votedTo: null,
            candidateList : [],
            isEligible : false,
            electionPeriod: {},
            electionPresent : "false",
            spinner:false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.username !== this.props.username){
            this.setState({
                username: this.props.username,
                candidateList : this.props.candidateList,
                isEligible : this.props.isEligible,
                electionPeriod:this.props.electionPeriod,
                electionPresent : this.props.electionPresent
            });
        }
    }

    alertShowFunc = (type, data) => {
      this.props.alertShowFunc(type,data);
    };

    castVote = async (event) => {
        if(this.state.votedTo === null){
            this.alertShowFunc("info", "Please select a party ");
        }
        this.setState({spinner:true});
        if(this.state.isEligible.toString() === 'false'){
            return;
        }
        let voterDetails = {
            username: this.state.username,
            votedTo: this.state.votedTo,
        };
        console.log(voterDetails.username+" MainContent " + this.state.votedTo);
        let response = await axios.post(ADDRESS + `castVote`, voterDetails);
        this.setState({spinner:false});

        console.log(JSON.stringify(response.data.error));

        if(response.data.error === undefined)
            this.alertShowFunc("info",response.data);
        else {
            this.alertShowFunc("danger",response.data.error);
        }
    };

    render() {
        let divStyle = {
            width: "60%",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%",
            marginBottom: "2%",
            textAlign:"center",
            backgroundColor : "rgb(220,220,220)"
        };
        if(this.state.isEligible.toString() === "false"){
            return (
                <div style={divStyle}>
                    <h1>You are Not Eligible to Vote</h1>
                </div>
            );
        }

        if(this.state.electionPresent.toString() === "false"){
            return (
                <div style={divStyle}>
                    <h1> No election is going on in your constituency </h1>
                </div>
            )
        }
        let currentDate =  Date.now();
        let fromDate = Date.parse(this.state.electionPeriod["fromDate"]);
        let toDate =  Date.parse(this.state.electionPeriod["toDate"]);
        // let fromDate    = new Date(d1[2],d1[1]-1,d1[0]);
        // let toDate      = new Date(d2[2],d2[1]-1,d2[0]);
        if(!(currentDate >= fromDate && currentDate <= toDate)){
            return <div style={divStyle}>
                <h1>Election Period is not yet started ({this.state.electionPeriod["fromDate"]} -
                    {this.state.electionPeriod["toDate"]})</h1>
            </div>
        }

        return (
            <div>
                <Modal show={this.state.spinner} onHide={() => this.setState({spinner: false})}>
                    <Modal.Header>
                        <Modal.Title>Vote Inprogress</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Spinner animation="border" variant="primary"/>
                    </Modal.Body>
                </Modal>
                <h1 style={{    marginTop: "2%",
                                marginBottom: "2%",
                                textAlign:"center",}}
                > Welcome {this.state.username} </h1>
                <marquee style={{
                                marginTop: "2%",
                                marginBottom: "3%",
                                textAlign:"center",
                                color:"white",
                                fontSize:"30px"
                }}
                         scrollamount={15}
                >Election period <br/>
                {this.state.electionPeriod["fromDate"]}<span> : </span>
                    {this.state.electionPeriod["toDate"]}
                </marquee>
                <div style={divStyle}>
                    <table className="table table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Candidates</th>
                            <th scope="col">Selected</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.candidateList.map((item,index) => {
                                    return (
                                        <tr id={index}
                                            onClick={() => this.setState({votedTo:item.username})}
                                        >
                                            <th scope="row" >{index+1}</th>
                                            <td align={"center"}>{item.name + " " + item.partyName}</td>
                                            <td>
                                                <Input type={"radio"}
                                                       value={item.username}
                                                       id={index}
                                                       name={"partyname"}
                                                       checked={this.state.votedTo === item.username}
                                                       />
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <Button variant={"primary"} size={"lg"} onClick={this.castVote}
                        style={{
                            marginLeft: "48%",
                            marginRight: "48%",
                            marginTop: "2%",
                            marginBottom: "2%",
                            textAlign:"center",
                        }}
                >
                    Vote
                </Button>
            </div>
        );
    }
}

export default MainContent;
