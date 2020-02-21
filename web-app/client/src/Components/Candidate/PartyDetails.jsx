import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { throws } from 'assert';
import './candidateRegister.css';

class PartyDetails extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    render(){
        const {values: { firstName, lastName, age, username, password, mobileNo, partyName, constituency  }} = this.props;
        return(
            <div className="container">
                <p className="sign" align="center">Candidate Registration</p>
                <ul className="progressbar">
                    <li className="active">User Profile</li>
                    <li className="active">Account Details</li>
                    <li className="active">Party Info</li>
                    <li>Success</li>
                </ul>
                <div className="main">
                    <Form className="form1" onSubmit={this.saveAndContinue}>
                        <h1 className="sign" align="center">Enter Party Details</h1>
                        <Form.Field>
                            <label  className="ids">Party Name</label>
                            <br/>
                            <input type="text"
                                   className="gen"
                                   name="partyName"
                                   value={partyName}
                                   placeholder='Party Name'
                                   onChange={this.props.handleChange('partyName')}
                                   required/>
                        </Form.Field>
                        <br/><br/>
                        <Form.Field>
                            <label className="ids">Constituency</label>
                             <br/>
                             <input type="text"
                                   className="gen"
                                   name="constituency"
                                   value={constituency}
                                   placeholder='Constituency'
                                   onChange={this.props.handleChange('constituency')}
                                   required/>
                        </Form.Field>
                        <br/><br/>
                        <input type="button" className="next" value="Back" onClick={this.back}/>
                        <input className="next" type="submit" value="Save and Continue"/>
                      {/*  <Button className="next" onClick={this.back}>Back</Button>
                        <Button className="next" onClick={this.saveAndContinue}>Save And Continue </Button>*/}
                    </Form>
                </div>
            </div>
        )
    }
}

export default PartyDetails;
