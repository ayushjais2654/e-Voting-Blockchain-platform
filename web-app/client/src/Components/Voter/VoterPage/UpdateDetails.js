import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../../constants";
import {Col, Form, Modal, Row, Button, Spinner} from "react-bootstrap";

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

class UpdateDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: "",
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            mobileNo: this.props.mobileNo,
            aadharCard: this.props.aadharCard,
            readOnly: true,
            spinner: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.username !== this.props.username) {
            this.setState({
                username: this.props.username,
                password: "",
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                mobileNo: this.props.mobileNo,
                aadharCard: this.props.aadharCard,
            });
        }
    }

    alertShowFunc = (type, data) => {
        this.props.alertShowFunc(type, data);
    };
    handleUpdateVoter = async (event) => {
        event.preventDefault();
        let error_string = "";

        this.setState({
            spinner: true,
        });

        if (validateName(event.target.firstName.value) === false) {
            error_string = "First Name of Register Voter is not compatible";
        } else if (validateName(event.target.lastName.value) === false) {
            error_string = "Last Name of Register Voter is not compatible";
        } else if (validateMobilNo(event.target.mobileNo.value) === false) {
            error_string = "Mobile Number is Invalid";
        }
        if (error_string.length !== 0) {
            this.setState({
                spinner: false,
            });
            this.alertShowFunc("danger", error_string);
            return;
        }
        console.log("register Voter called");
        let response = await axios.post(ADDRESS + `updateVoter`, this.state);
        this.setState({
            spinner: false,
        });
        if (response.data === 'Correct') {
            this.alertShowFunc("success", "Details Updated Successfully")
        } else {
            this.alertShowFunc("danger", response.data);
        }
    };

    changeStateValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
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
            borderRadius: "5%"
        };
        return (
            <div style={divStyleOuter}>
                <div style={divStyleInner}>
                    <Modal show={this.state.spinner} onHide={() => this.setState({spinner: false})}>
                        <Modal.Header>
                            <Modal.Title>Update Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Spinner animation="border" variant="primary"/>
                        </Modal.Body>
                    </Modal>
                    <Button variant={"success"}
                            style={{"marginLeft": "40%", "marginRight": "35%", "marginTop": "2%", "marginBottom": "2%"}}
                            onClick={() => this.setState({readOnly: !this.state.readOnly})}
                    >{this.state.readOnly ? "Enable" : "Disable"} Editing</Button>
                    <h1 style={{textAlign: "center", "marginTop": "2%", "marginBottom": "3%"}}>Update Details</h1>
                    <Form onSubmit={this.handleUpdateVoter}>
                        <Form.Group as={Row} controlId="formFirstName">
                            <Form.Label column sm={3} style={{textAlign: "center"}}>
                                First Name
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text"
                                              name="firstName"
                                              onChange={this.changeStateValues}
                                              value={this.state.firstName}
                                              disabled={this.state.readOnly}
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
                                              disabled={this.state.readOnly}
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
                                              onChange={this.changeStateValues}
                                              value={this.state.mobileNo}
                                              disabled={this.state.readOnly}
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
                                              onChange={this.changeStateValues}
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
                                              onChange={this.changeStateValues}
                                              value={this.state.username}
                                              disabled={true}
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
                                              disabled={this.state.readOnly}
                                              required
                                />
                            </Col>
                        </Form.Group>
                        <fieldset disabled={this.state.readOnly}>
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
                                        checked = {true}
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
                        <Form.Group as={Row}>
                            <Col style={{textAlign: "center", "marginBottom": "2%", "marginTop": "2%"}}>
                                <Button variant={"outline-primary"} size={"lg"} type="submit"
                                        disabled={this.state.readOnly}>Update</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}

export default UpdateDetails;
