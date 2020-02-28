import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../../constants";
import MainContent from "./MainContent";
import PopUp from "./PopUp";
import UpdateDetails from "./UpdateDetails";
import {Button} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";

class VoterPage2 extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            mobileNo: null,
            aadharCard: null,
            votedTo: null,
            transId: null,
            candidateList : [],
            isEligible : true,
            constituency: "",
            gender : "",
            alertShow: false,
            alertType: "danger",
            alertData: "",
            electionPeriod:{"fromDate":"2020-02-20","toDate":"2020-05-30"},
            electionPresent : "false",
            loggedIn
        }
    }

    componentDidMount = async () => {
        const voter = {
            username: localStorage.getItem("token")
        };
        let response = await axios.post(ADDRESS + `fetchVoter`, voter);
        console.log(JSON.stringify(response.data.voterDetail) + "mann maein");

        this.setState({
            username: response.data.voterDetail.username,
            password: "",
            firstName: response.data.voterDetail.firstName,
            lastName: response.data.voterDetail.lastName,
            mobileNo: response.data.voterDetail.mobileNo,
            aadharCard: response.data.voterDetail.aadharCard,
            isEligible : response.data.voterDetail.isEligible,
            constituency : response.data.voterDetail.constituency,
            gender : response.data.voterDetail.gender,
            votedTo: response.data.voterDetail.votedTo,
            transId: response.data.voterDetail.transId,
            candidateList : response.data.candidateList,
            description : response.data.voterDetail.description,
            isDenied : response.data.voterDetail.isDenied,
            electionPeriod : response.data.electionPeriod,
            electionPresent : response.data.electionPresent
        });


    };

    logout = (event) => {
        this.setState({
            loggedIn: false
        });
        localStorage.removeItem("token");
    };
    alertShowFunc = (type, data) => {
        this.setState({
            alertShow : true,
            alertType : type,
            alertData : data,
        });
    };

    render() {
        if (this.state.loggedIn === false) {
            return < Redirect to="/"/>;
        }
        return (
            <div>
                <PopUp  alertShow={this.state.alertShow}
                        alertType={this.state.alertType}
                        alertData={this.state.alertData}
                        alertCloseFunc={()=> this.setState({alertShow:false})}
                />
                <MainContent    username   = {this.state.username}
                                candidateList = {this.state.candidateList}
                                isEligible = {this.state.isEligible}
                                electionPeriod = {this.state.electionPeriod}
                                electionPresent = {this.state.electionPresent}
                                alertShowFunc = {this.alertShowFunc}
                />
                <UpdateDetails  username    = {this.state.username}
                                firstName   = {this.state.firstName}
                                lastName    = {this.state.lastName}
                                mobileNo    = {this.state.mobileNo}
                                aadharCard  = {this.state.aadharCard}
                                votedTo     = {this.state.votedTo}
                                transId     = {this.state.transId}
                                description = {this.state.description}
                                constituency ={this.state.constituency}
                                gender       = {this.state.gender}
                                isDenied    = {this.state.isDenied}
                                alertShowFunc = {this.alertShowFunc}
                />
                <Button variant={"danger"} onClick={this.logout}
                        style={{
                            marginLeft: "48%",
                            marginRight: "48%",
                            marginTop: "2%",
                            marginBottom: "5%",
                            textAlign:"center",
                        }}
                        size = "lg"
                >
                    Logout
                </Button>
            </div>
        );
    }
}

export default VoterPage2;
