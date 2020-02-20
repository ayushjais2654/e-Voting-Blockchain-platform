import React, { Component } from 'react';
import './candidateRegister.css';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';

class UserDetails extends Component{
/*
    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }
*/

    render(){
        const {values: { firstName, lastName, age, username, password, mobileNo, partyName, constituency  }} = this.props;
        return(
            <div className="container">
                <p className="sign" align="center">Candidate Registration</p>
                    <ul className="progressbar">
                        <li className="active">User Profile</li>
                        <li>Account Details</li>
                        <li>Party Info</li>
                        <li>Success</li>
                      </ul>
                <div className="main">
                    <Form className="form1" onSubmit={this.saveAndContinue}>
                        <p className="sign">Enter User Details</p>
                        <Form.Field>
                            <label className="ids">First Name</label>
                            <br/>
                            <input
                                type="text"
                                className="gen"
                                name="firstName"
                                placeholder='First Name'
                                value={firstName}
                                onChange={this.props.handleChange('firstName')}
                                required/>
                        </Form.Field>
                        <br/> <br/>
                        <Form.Field>
                            <label className="ids">Last Name</label>
                            <br/>
                            <input type="text"
                                   className="gen"
                                   name="lastName"
                                   value={lastName}
                                   placeholder='Last Name'
                                   onChange={this.props.handleChange('lastName')}
                                   required/>
                        </Form.Field>
                        <br/><br/>
                        <Form.Field>
                            <label className="ids">Age</label>
                            <br/>
                            <input type="number"
                                   className="gen"
                                   name="age"
                                   placeholder='Age'
                                   value={age}
                                   onChange={this.props.handleChange('age')}
                                   required/>
                        </Form.Field>
                        <br/><br/>
                        <input className="next" type="submit" value="Save and Continue"/>
                       {/*<Button className="next" onClick={this.saveAndContinue}>Save And Continue </Button>   */}
                    </Form>
                </div>
            </div>
        )
    }
    saveAndContinue = async (event) => {
        const {values: { firstName, lastName, age, username, password, mobileNo, partyName, constituency  }} = this.props;
        // event.preventDefault();
        if (validateName(firstName) === false) {
            alert("First Name of Candidate is not valid");
            return;
        }
        if (validateName(lastName) === false) {
            alert("Last Name of Candidate is not valid");
            return;
        }
        this.props.nextStep()
    }
}

function validateName(name){
    let valid = true;
    if(name.length === 0)
        valid = false;
    for (let i = 0; i < name.length; i++) {
        if (!(name[i] >= 'a' && name[i] <= 'z') && !(name[i] >= 'A' && name[i] <= 'Z')) {
            valid = false;
            break;
        }
    }
    if(name === "First Name")
        valid = false;
    return valid;
}


export default UserDetails