import React,{Component} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Icon, Input} from "semantic-ui-react";
import axios from "axios";
import {ADDRESS} from "../constants";


class VoterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.voterDetails.username,
            firstName: this.props.voterDetails.firstName,
            lastName: this.props.voterDetails.lastName,
            mobileNo: this.props.voterDetails.mobileNo,
            aadharCard: this.props.voterDetails.aadharCard,
            votedTo: this.props.voterDetails.votedTo,
            transId: this.props.voterDetails.transId,
            isEligible : this.props.voterDetails.isEligible,
            description : this.props.voterDetails.description,
            isDenied : this.props.isDenied,
            constituency : this.props.voterDetails.constituency,
            isDisplayDesc: false,
            error:"",
            closeVoterDetails:this.props.closeVoterDetails,
        };
        this.denyVoter=this.denyVoter.bind(this);
        this.acceptVoter = this.acceptVoter.bind(this);
        this.deleteVoter = this.deleteVoter.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.username !== this.props.voterDetails.username) {
            this.setState({
                username: this.props.voterDetails.username,
                firstName: this.props.voterDetails.firstName,
                lastName: this.props.voterDetails.lastName,
                mobileNo: this.props.voterDetails.mobileNo,
                aadharCard: this.props.voterDetails.aadharCard,
                votedTo: this.props.voterDetails.votedTo,
                transId: this.props.voterDetails.transId,
                description : this.props.voterDetails.description,
                isEligible : this.props.voterDetails.isEligible,
                // isDenied : this.props.isDenied,
                // constituency : this.voterDetails.constituency,
                constituency: "nothing",
                closeVoterDetails:this.props.closeVoterDetails,
            });
        }
    }

    async acceptVoter(event) {
        console.log("this.acceptvoter");
        this.state.isEligible = "true";
        this.state.isDenied = "false";
        await this.updateDetails();
        this.state.closeVoterDetails();
    }

    denyVoter() {
        this.setState({
            isDisplayDesc: true,
            isDenied : true,
        });
    }
    async updateDetails(){
        let response = await axios.post(ADDRESS + `updateVoter`, this.state);
        if (response.data === 'Correct') {
            this.setState({
                error:"Details Submitted Successfully",
            });
        } else {
            this.setState({
                error:response.data,
            });
        }
        this.state.closeVoterDetails();
    }

    async deleteVoter() {
        let response = await axios.post(ADDRESS + `deleteVoter`, this.state.username);
        if (response.data === 'Correct') {
            this.setState({
                error:"Details Submitted Successfully",
            });
        } else {
            this.setState({
                error:response.data,
            });
        }
        this.state.closeVoterDetails();
    }

    render() {

        let divStyle = {
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "2%",
            marginBottom: "2%",
            textAlign: "center",
        };

        let displayDesc = (this.state.isDisplayDesc)?"block":"none";
        displayDesc = {
            display:displayDesc,
        };

        return (
            <div>
                <div>
                    <Form>
                        <Form.Group as={Row} controlId="formFirstName">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                First Name
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="firstName"
                                              value={this.state.firstName}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formLastName">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Last Name
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="lastName"
                                              value={this.state.lastName}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formMobileNumber">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Mobile Number
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number"
                                              name="mobileNo"
                                              value={this.state.mobileNo}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formAadhar">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Aadhar Number
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number"
                                              name="aadharCard"
                                              value={this.state.aadharCard}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formUserName">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Username
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="username"
                                              value={this.state.username}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formVotedID">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Voted To:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="votedTo"
                                              value={this.state.votedTo}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formTransID">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Transaction ID
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="transId"
                                              value={this.state.transId}
                                              disabled={true}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <fieldset disabled={true}>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={3} style={{textAlign: "center"}}>
                                    Gender
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        id="formHorizontalRadios1"
                                        checked={true}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        id="formHorizontalRadios2"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Form>
                    <div style={divStyle}>
                        <Button onClick={this.acceptVoter}
                                variant={"success"}
                        ><Icon name={"check circle outline"}></Icon>
                            Grant
                        </Button>

                        <Button onClick={this.denyVoter}
                                variant={"danger"}
                        ><Icon name={"dont"}></Icon>
                            Deny
                        </Button>

                        <Button onClick={this.deleteVoter}
                                variant={"warning"}
                        ><Icon name={"x"}></Icon>
                            Delete
                        </Button>
                    </div>
                </div>
                <div style={displayDesc}>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        placeholder={"Enter description here"}
                        value={this.state.description}
                        onChange={(event)=>this.setState({
                            description:event.target.value,
                        })}
                    />
                    <Button variant={"secondary"} size={"md"} onClick={this.updateDetails}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default VoterDetails;