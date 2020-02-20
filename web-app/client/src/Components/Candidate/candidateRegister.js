import React, {Component} from 'react';
import './candidateRegister.css';
import axios from 'axios';
import Home from "../Home";


/**
 *  @author : Ayush Jaiswal
 *  @Date : 19/12/2019
 */

class CandidateRegister extends Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
        this.state = {
            firstName: "First Name",
            lastName: "Last Name",
            partyName: "Party Name",
            age: 34,
            username: "Username",
            password: "Password",
            constituency: "Constituency",
            mobileNo : 9515364515,
            isRegistered : false
        }
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render() {

        if(this.state.isRegistered === true){
            return <Home/>;
        }
        return (
            <div class="container">
                <p className="sign" align="center">Candidate Registration</p>
                <ul className="progressbar">
                    <li className="active">User Profile</li>
                    <li>Account Details</li>
                    <li>Party Info</li>
                    <li>Success</li>
                </ul>
                <div class="main">
                    <form className="form1" onSubmit={this.submitForm}>
                        <p className="ids" align="center">First Name</p>
                        <input type="text"
                                className="gen"
                                name="firstName"
                                placeholder={this.state.firstName}
                                onChange={this.handleChange}
                                required/> <br/> <br/>
                        <p className="ids" align="center">Last Name</p>
                        <input type="text"
                                className="gen"
                                name="lastName"
                                placeholder={this.state.lastName}
                                onChange={this.handleChange}
                                required/> <br/> <br/>
                        <p className="ids" align="center">Age</p>
                        <input type="number"
                               className="gen"
                               name="age"
                               placeholder={this.state.age}
                               onChange={this.handleChange}
                               required/> <br/> <br/>
                    <br/>
                        <input type="button" class="next" align="center" value="Save and Continue >"/>


                        <p className="ids" align="center">Username</p>
                        <input type="text"
                               className="gen"
                               name="username"
                               placeholder={this.state.username}
                               onChange={this.handleChange}
                               required/> <br/> <br/>
                        <p className="ids" align="center">Password</p>
                        <input type="password"
                               className="gen"
                               name="password"
                               onChange={this.handleChange}
                               required/> <br/> <br/>
                        <p className="ids" align="center">Number</p>
                        <input type="number"
                               name="mobileNo"
                               placeholder={this.state.mobileNo}
                               onChange={this.handleChange}
                               required/> <br/> <br/>

                        <p className="ids" align="center">Party Name</p>
                        <input type="text"
                            class="gen"
                            name="partyName"
                            placeholder={this.state.partyName}
                            onChange={this.handleChange}
                            required/> <br/> <br/>



                        <input type="text"
                                              class="gen"
                                              name="constituency"
                                              placeholder={this.state.constituency}
                                              onChange={this.handleChange}
                                              required/> <br/> <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };

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

        if(validateMobileNo(this.state.mobileNo) === false){
            alert("Mobile number is invalid ..." + this.state.mobileNo[1]);
            return ;
        }

        let response = await axios.post(`http://localhost:4000/registerCandidate`, this.state);
        alert(response.data);
        if(response.data === "Candidate is successfully registered .."){
            this.setState({
                isRegistered : true
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

export default CandidateRegister;