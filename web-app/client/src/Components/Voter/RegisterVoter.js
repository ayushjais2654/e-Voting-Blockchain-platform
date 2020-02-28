import React, {Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ADDRESS} from "../constants";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form, Row, Col} from "react-bootstrap";
import PopUp from "./VoterPage/PopUp";


function validateName(name) {
    let valid = true;
    for (let i = 0; i < name.length; i++) {
        if (!(name[i] >= 'a' && name[i] <= 'z') && !(name[i] >= 'A' && name[i] <= 'Z')) {
            valid = false;
            break;
        }
    }
    return valid;
}

function validateMobilNo(number) {
    let valid = true;
    if (number.length !== 10)
        valid = false;
    if (!(number[0] === '9' || number[0] === '8' || number[0] === '7' || number[0] === '6'))
        valid = false;
    return valid;
}

class RegisterVoter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "Ayush",
            lastName: "Jaiswal",
            mobileNumber: "9515365125",
            cardNumber: "275860362335",
            username: "ayush12",
            password: "",
            gender  : "male",
            constituency : "warangal",
            spinner: false,
            alertType: "danger",
            alertData: "",
            alertShow: false,
            isRegistered: false,
            toRedirect: false,
        }
    }

    handleRegisterVoter = async (event) => {
        console.log(this.state);
        event.preventDefault();
        let error_string = "";

        this.setState({
            spinner: true,
        });

        if (validateName(event.target.firstName.value) === false) {
            error_string = "First Name of Register Voter is not compatible";
        } else if (validateName(event.target.lastName.value) === false) {
            error_string = "Last Name of Register Voter is not compatible";
        } else if (validateMobilNo(event.target.mobileNumber.value) === false) {
            error_string = "Mobile Number is Invalid";
        }
        if (error_string.length !== 0) {
            this.setState({
                spinner: false,
                alertShow: true,
                alertData: error_string,
                alertType: "danger",
            });
            return;
        }
        console.log("register Voter called");
        let response = await axios.post(ADDRESS + `registerVoter`, this.state);
        if (response.data === 'Correct') {
            this.setState({
                spinner: false,
                alertShow: true,
                toRedirect: true,
                alertData: "Voter Successfully Registered",
                alertType: "success",
            });
        } else {
            this.setState({
                spinner: false,
                alertShow: true,
                alertData: response.data,
                alertType: "danger",
            });
        }
    };

    changeStateValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    alertCloseFunc = () => {
        this.setState({
            alertShow: false,
        });
        if (this.state.toRedirect) {
            this.setState({
                isRegistered: true,
            });
        }
    };

    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/'/>;
        }
        let divStyleInner = {
            width: "80%",
            backgroundColor: "white",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "2%",
            marginBottom: "2%"
        };

        let divStyleOuter = {
            width: "60%",
            backgroundColor: "white",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%",
            marginBottom: "2%",
            borderRadius : "5%"
        };
        return (
            <div style={divStyleOuter}>
                <div style={divStyleInner}>
                    <Modal show={this.state.spinner} onHide={() => this.setState({spinner: false})}>
                        <Modal.Header>
                            <Modal.Title>Registering User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Spinner animation="border" variant="primary"/>
                        </Modal.Body>
                    </Modal>
                    <PopUp alertType={this.state.alertType}
                           alertData={this.state.alertData}
                           alertShow={this.state.alertShow}
                           alertCloseFunc={this.alertCloseFunc}
                    />
                    <h1 style={{textAlign: "center", "marginTop": "2%", "marginBottom": "2%"}}>Registration Form</h1>
                    <Form onSubmit={this.handleRegisterVoter}>
                        <Form.Group as={Row} controlId="formFirstName">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                First Name
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="firstName"
                                              onChange={this.changeStateValues}
                                              value={this.state.firstName}
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
                                              onChange={this.changeStateValues}
                                              value={this.state.lastName}
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
                                              name="mobileNumber"
                                              onChange={this.changeStateValues}
                                              value={this.state.mobileNumber}
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
                                              name="cardNumber"
                                              onChange={this.changeStateValues}
                                              value={this.state.cardNumber}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formConstituency">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Constituency
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="constituency"
                                              onChange={this.changeStateValues}
                                              value={this.state.constituency}
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
                                              onChange={this.changeStateValues}
                                              value={this.state.username}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPassword">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                Password
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password"
                                              name="password"
                                              onChange={this.changeStateValues}
                                              value={this.state.password}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <fieldset onChange={this.changeStateValues}>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={3} style={{textAlign: "center"}}>
                                    Gender
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        value="Male"
                                        name="gender"
                                        id="formHorizontalRadios1"
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        value="Female"
                                        name="gender"
                                        id="formHorizontalRadios2"
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Others"
                                        value="Others"
                                        name="gender"
                                        id="formHorizontalRadios3"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row}>
                            <Col style={{textAlign: "center", "marginBottom": "2%", "marginTop": "2%"}}>
                                <Button variant={"primary"} size={"lg"} type="submit">Sign up</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}


export default RegisterVoter;
