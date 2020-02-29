import React, { Component } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import PartyDetails from "./PartyDetails";
import Confirmation from './Confirmation';
import Success from './Success';
import {Redirect} from "react-router-dom";
import axios from 'axios';
const ADDRESS = `http://localhost:4000/`;

class MainForm extends Component {
    state = {
        step: 1,
        firstName: "Aditya",
        lastName: "Narayan",
        partyName: "jdk",
        age: "45",
        username: "adit123",
        password: "123",
        constituency: "haha",
        mobileNo: "9717411923",
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step + 1
        })
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step : step - 1
        })
    };

    handleChange = input => event => {
        this.setState({ [input] : event.target.value });
    };

    render(){
        if(this.state.isRegistered){
            return <Redirect to="/"/>;
        }
        const {step} = this.state;
        const { firstName, lastName, age, username, password, mobileNo, partyName, candImage,constituency} = this.state;
        const values = { firstName, lastName, age, username, password, mobileNo, partyName, candImage, constituency };
        switch(step) {
            case 1:
                return <UserDetails
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    values={values}
                />;
            case 2:
                return <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    values={values}
                />;
            case 3:
                return <PartyDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    values={values}
                />;
            case 4:
                return <Confirmation
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                />;
            case 5:
                return <Redirect to="/" />;
        }
    }
}

export default MainForm;
