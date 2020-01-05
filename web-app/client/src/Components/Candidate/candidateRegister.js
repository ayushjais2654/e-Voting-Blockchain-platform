import React, {Component} from 'react';
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
            firstName: "ayush",
            lastName: "jaiswal",
            partyName: "BJP",
            age: 34,
            username: "ayush123",
            password: "",
            constituency: "Haridwar",
            mobileNo : 9515364515,
            isRegistered : false
        }
    }

    render() {

        if(this.state.isRegistered === true){
            return <Home/>;
        }
        return (
            <div>
                <h1> Welcome to Candidate Registration Page .. </h1>
                <form onSubmit={this.submitForm}>

                    First Name : <input type="text"
                                        name="firstName"
                                        placeholder={this.state.firstName}
                                        onChange={this.handleChange}
                                        required/> <br/> <br/>

                    Last Name : <input type="text"
                                       name="lastName"
                                       placeholder={this.state.lastName}
                                       onChange={this.handleChange}
                                       required/> <br/> <br/>

                    Party Name : <input type="text"
                                        name="partyName"
                                        placeholder={this.state.partyName}
                                        onChange={this.handleChange}
                                        required/> <br/> <br/>

                    Age : <input type="number"
                                 name="age"
                                 placeholder={this.state.age}
                                 onChange={this.handleChange}
                                 required/> <br/> <br/>

                    Username : <input type="text"
                                      name="username"
                                      placeholder={this.state.username}
                                      onChange={this.handleChange}
                                      required/> <br/> <br/>

                    Password : <input type="password"
                                      name="password"
                                      onChange={this.handleChange}
                                      required/> <br/> <br/>
                    Mobile Number : <input type="number"
                                 name="mobileNo"
                                 placeholder={this.state.mobileNo}
                                 onChange={this.handleChange}
                                 required/> <br/> <br/>

                    Constituency : <input type="text"
                                          name="constituency"
                                          placeholder={this.state.constituency}
                                          onChange={this.handleChange}
                                          required/> <br/> <br/>
                    <input type="submit" value="Submit"/>
                </form>
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

        let response = await axios.post(`http://172.30.143.206:4000/registerCandidate`, this.state);
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
