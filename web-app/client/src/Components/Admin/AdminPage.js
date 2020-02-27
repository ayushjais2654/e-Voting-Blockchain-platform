import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../constants";
import {Redirect} from 'react-router-dom';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pendingVoters : []
        };
    }

    componentDidMount = async () => {

        let response = await axios.get(ADDRESS+`fetchPendingVoters`);
        console.log(response.data[0].Record);
    };

    render() {
        return (
            <div>
                    <h1> Welcome to the admin Page .... </h1>
            </div>
        );
    }
}

export default AdminPage;
