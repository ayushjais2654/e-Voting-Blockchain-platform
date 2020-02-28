import React, { Component } from 'react';
import {Button, Form, List} from 'semantic-ui-react';
import './candidateRegister.css';
import axios from "axios";
import {ADDRESS} from "../constants";
import {Redirect} from "react-router-dom";
import {Image} from "react-bootstrap";

class Confirmation extends Component {

    constructor(props) {
        super(props);

        console.log(JSON.stringify(this.props));
        console.log(this.props.values.firstName);
        this.state = {
            firstName: this.props.values.firstName,
            lastName: this.props.values.lastName,
            partyName: this.props.values.partyName,
            age: this.props.values.age,
            username: this.props.values.username,
            password: this.props.values.password,
            constituency: this.props.values.constituency,
            mobileNo: this.props.values.mobileNo,
            candImage : this.props.values.candImage,
        };

    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        if(this.state.isRegistered){
            return <Redirect to="/"/>;
        }

        const {values: {firstName, lastName, age, username, password, mobileNo, partyName, candImage, constituency}} = this.props;

        return (
            <div className="container">
                <p className="sign" align="center">Candidate Registration</p>
                <ul className="progressbar">
                    <li className="active">User Profile</li>
                    <li className="active">Account Details</li>
                    <li className="active">Party Info</li>
                    <li className="active">Success</li>
                </ul>
                <div className="main">
                    <Form className="form1" onSubmit={this.submitForm}>
                        <h1 className="sign" align="center">Confirm your Details</h1>
                        <p margin="5 auto">Click Confirm if the following details have been correctly entered</p>
                        <List className="gen" align="center">
                            <List.Item>
                                <List.Icon name='Pic'/>
                                <List.Content>
                                    <img src={candImage} height={"100px"} width={"100px"}/>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users'/>
                                <List.Content>First Name: {firstName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users'/>
                                <List.Content>Last Name: {lastName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='calendar'/>
                                <List.Content>Age: {age}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users'/>
                                <List.Content>User Name: {username}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users'/>
                                <List.Content>Password: {password}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users'/>
                                <List.Content>Last Name: {lastName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='phone'/>
                                <List.Content>Contact Number: {mobileNo}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='user'/>
                                <List.Content>Party Name: {partyName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='marker'/>
                                <List.Content>Constituency: {constituency}</List.Content>
                            </List.Item>
                        </List>
                        <input type="button" className="next" value="Back" onClick={this.back}/>
                        <input className="next" type="submit" value="Register"/>
                    </Form>
                </div>
            </div>
        )
    }


    submitForm = async (event) => {

        // event.preventDefault();
        if (validateName(this.state.firstName) === false) {
            alert("First Name of Candidate is not valid");
            return;
        }
        if (validateName(this.state.lastName) === false) {
            alert("Last Name of Candidate is not valid");
            return;
        }

        if (validateMobileNo(this.state.mobileNo) === false) {
            alert("Mobile number is invalid ..." + this.state.mobileNo);
            return;
        }

        let response = await axios.post(ADDRESS+`registerCandidate`, this.state);
        alert(response.data);
        if (response.data === "Correct") {
            this.setState({
                isRegistered: true
            });
        }
    }
}

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

function validateMobileNo(number) {
    let valid = true;
    if(number.length !== 10)
        valid = false;
    if( !(number[0] === '9' || number[0] === '8' || number[0] === '7' || number[0] === '6')) {
        valid = false;
    }
    return valid;
}

export default Confirmation;
