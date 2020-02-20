import React, { Component } from 'react';
import {Button, Form, List} from 'semantic-ui-react';
import './candidateRegister.css';
import axios from "axios";

class Confirmation extends Component{

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
            mobileNo : this.props.values.mobileNo,
        };

    }
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { firstName, lastName, age, username, password, mobileNo, partyName, constituency }} = this.props;

        return(
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
                                <List.Icon name='users' />
                                <List.Content>First Name: {firstName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users' />
                                <List.Content>Last Name: {lastName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='calendar' />
                                <List.Content>Age: {age}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users' />
                                <List.Content>User Name: {username}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='users' />
                                <List.Content>Last Name: {lastName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='phone' />
                                <List.Content>Contact Number: {mobileNo}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='user' />
                                <List.Content>Party Name: {partyName}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='marker' />
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


        console.log(JSON.stringify(this.state));
        let response = await axios.post(`http://localhost:4000/registerCandidate`, this.state);
        alert(response.data);
        if(response.data === "Candidate is successfully registered .."){
            this.setState({
                isRegistered : true
            });
        }
    }
}

export default Confirmation;