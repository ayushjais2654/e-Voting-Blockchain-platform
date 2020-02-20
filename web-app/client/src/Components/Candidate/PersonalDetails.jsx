import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { throws } from 'assert';
import './candidateRegister.css';
import axios from "axios";

class PersonalDetails extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { firstName, lastName, age, username, password, mobileNo, partyName, constituency  }} = this.props;
        return(
            <div className="container">
                <p className="sign" align="center">Candidate Registration</p>
                <ul className="progressbar">
                    <li className="active">User Profile</li>
                    <li className="active">Account Details</li>
                    <li>Party Info</li>
                    <li>Success</li>
                </ul>
                <div className="main">
                    <Form className="form1" onSubmit={this.saveAndContinue}>
                        <h1 className="sign">Enter Personal Details</h1>
                        <Form.Field>
                            <label className="ids">UserName</label>
                            <br/>
                            <input type="text"
                                   className="gen"
                                   name="username"
                                   value={username}
                                   placeholder='UserName'
                                   onChange={this.props.handleChange('username')}
                                   required/>
                        </Form.Field>
                        <br/><br/>
                        <Form.Field>
                            <label className="ids">Password</label>
                            <br/>
                            <input type="password"
                                   className="gen"
                                   name="password"
                                   value={password}
                                   placeholder="xxxxxxxx"
                                   onChange={this.props.handleChange('password')}
                                   required/>
                        </Form.Field>
                        <br/><br/>
                        <Form.Field>
                            <label className="ids">Phone Number</label>
                            <br/>
                            <input type="number"
                                   className="gen"
                                   name="mobileNo"
                                   value={mobileNo}
                                   placeholder='Mobile Number'
                                   onChange={this.props.handleChange('mobileNo')}
                                   required/>

                        </Form.Field>
                        <br/><br/>
                        <input type="button" className="next" value="Back" onClick={this.back}/>
                        <input className="next" type="submit" value="Save and Continue"/>
                       {/* <Button className="next" onClick={this.back}>Back</Button>
                        <Button className="next" onClick={this.saveAndContinue}>Save And Continue </Button>*/}
                    </Form>
                </div>
            </div>
        )
    }
    saveAndContinue = async (event) => {
        const {values: { firstName, lastName, age, username, password, mobileNo, partyName, constituency  }} = this.props;
        if(validateMobileNo(mobileNo) === false){
            alert("Mobile number is invalid ..." + mobileNo);
            return ;
        }
        this.props.nextStep()
    }
}

function validateMobileNo(number){
    let valid = true;
    if(number.length !== 10)
        valid = false;
    if( !(number[0] === '9' || number[0] === '8' || number[0] === '7' || number[0] === '6')) {
        valid = false;
    }
    return valid;
}

export default PersonalDetails;