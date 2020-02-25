import React, {Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ADDRESS} from "../constants";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/**
 *  @author : Ayush Jaiswal
 *  @Date : 18/12/2019
 */

class RegisterVoter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "Ayush",
            lastName: "Jaiswal",
            mobileNumber: "9515365125",
            cardNumber: "275860362335",
            username: "ayush12",
            password: "123",
            spinner: false,
            isRegistered: false
        }
    }

    handleClose = () => {
        this.setState({
            spinner: false
        });
    };

    render() {
        if (this.state.isRegistered === true) {
            return <Redirect to='/'/>;
        }
        if (this.state.spinner) {
            return (
                <Modal show={this.state.spinner} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Registring User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Spinner animation="grow" variant="primary"/>
                        <Spinner animation="grow" variant="secondary"/>
                        <Spinner animation="grow" variant="success"/>
                        <Spinner animation="grow" variant="danger"/>
                        <Spinner animation="grow" variant="warning"/>
                        <Spinner animation="grow" variant="info"/>
                        <Spinner animation="grow" variant="light"/>
                        <Spinner animation="grow" variant="dark"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (
                <div>
                    <form onSubmit={this.handleRegisterVoter}>

                        First Name : <input type="text"
                                            name="firstName"
                                            onChange={this.changeStateValues}
                                            value={this.state.firstName}
                                            required/> <br/> <br/>

                        Last Name : <input type="text"
                                           name="lastName"
                                           onChange={this.changeStateValues}
                                           value={this.state.lastName}
                                           required/> <br/> <br/>

                        Mobile Number : <input type="number"
                                               name="mobileNumber"
                                               onChange={this.changeStateValues}
                                               value={this.state.mobileNumber}
                                               required/> <br/> <br/>

                        Aadhar Card Number : <input type="text"
                                                    name="cardNumber"
                                                    onChange={this.changeStateValues}
                                                    value={this.state.cardNumber}
                                                    required/><br/> <br/>

                        Username : <input type="text"
                                          name="username"
                                          onChange={this.changeStateValues}
                                          value={this.state.username}
                                          required/><br/> <br/>

                        Password : <input type="password"
                                          name="password"
                                          onChange={this.changeStateValues}
                                          value={this.state.password}
                                          required/> <br/> <br/>

                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            );
        }
    }

    handleRegisterVoter = async (event) => {

        event.preventDefault();
        this.setState({
            spinner: true
        });

        if (validateName(event.target.firstName.value) === false) {
            this.setState({
                spinner: false
            });
            alert("First Name of Register Voter is not compatible");
            return;
        }

        if (validateName(event.target.lastName.value) === false) {
            this.setState({
                spinner: false
            });
            alert("Last Name of Register Voter is not compatible");
            return;
        }

        if (validateMobilNo(event.target.mobileNumber.value) === false) {
            this.setState({
                spinner: false
            });
            alert("Mobile Number is Invalid");
            return;
        }

        let response = await axios.post(ADDRESS + `registerVoter`, this.state);
        if (response.data === 'Correct') {
            this.setState({
                spinner: false,
                isRegistered: true
            });
            alert("Voter Successfully Registered");
        }
        else{
            this.setState({
               spinner : false
            });
            alert(response.data);
        }
        console.log(response.data);
    };

    changeStateValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
}

function validateName(name) {

    let valid = true;
    console.log(name);

    for (let i = 0; i < name.length; i++) {
        console.log(name.length);
        if (!(name[i] >= 'a' && name[i] <= 'z') && !(name[i] >= 'A' && name[i] <= 'Z')) {
            valid = false;
            break;
        }
    }
    console.log(valid);
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

export default RegisterVoter;
