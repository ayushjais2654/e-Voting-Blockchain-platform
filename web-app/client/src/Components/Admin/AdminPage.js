import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../constants";
import {Redirect} from 'react-router-dom';
import {Input} from "semantic-ui-react";
import {Button} from "react-bootstrap";
import "./AdminPage.css";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingVoters: [],
            voterSelected: 0,
            isDisplayActive:false,
            isDisplayDesc : false,
        };
    }

    componentDidMount = async () => {
        let response = await axios.get(ADDRESS + `fetchPendingVoters`);
        this.setState({
            pendingVoters: response.data.map((item) => {
                return item.Record
            }),
        });
        this.setState({
            pendingVoters: this.state.pendingVoters.splice(0, this.state.pendingVoters.length - 1),
        });
        console.log(this.state.pendingVoters);
    };

    acceptVoter = (event) => {
        let index = event.target.id;
        console.log(index);
    };
    denyVoter = (event) => {
        let index = event.target.id;
        console.log(index);
    };
    deleteVoter = (event) => {
        let index = event.target.id;
        console.log(index);
    };
    displayData = (event) => {
        let index = event.target.id;
        console.log(index);
        this.setState({
            voterSelected : index,
            isDisplayActive : true,
        });
    };

    render() {
        let divStyleOuter = {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "2%",
            marginBottom: "2%",
            textAlign: "center",
            backgroundColor: "rgb(220,220,220)"
        };
        let displayDiv = {
            display: (this.state.pendingVoters.length === 0) ? "None" : "Block",
        };
        let displayNone = {
            display: (this.state.pendingVoters.length !== 0) ? "None" : "Block",
        };

        return (
            <div style={divStyleOuter}>
                <h1> Welcome to the admin Page .... </h1>
                <div style={displayDiv}>
                    <table className="table table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Allow</th>
                            <th scope="col">Deny</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.pendingVoters.map((item, index) => {
                                    return (
                                        <tr id={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td align={"center"} id={index}
                                                onClick={this.displayData}
                                                className="table-danger username"
                                            >
                                                {item.username}
                                            </td>
                                            <td>
                                                <Button variant={"success"} size={"sm"} id={index}
                                                        onClick={this.acceptVoter}
                                                >.</Button>
                                            </td>
                                            <td>
                                                <Button variant={"warning"} size={"sm"} id={index}
                                                        onClick={this.denyVoter}
                                                >.</Button>
                                            </td>
                                            <td>
                                                <Button variant={"danger"} size={"sm"} id={index}
                                                        onClick={this.deleteVoter}
                                                >.</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div style={displayNone}>
                    <h1> No Pending Voters </h1>
                </div>
            </div>
        );
    }
}

export default AdminPage;
