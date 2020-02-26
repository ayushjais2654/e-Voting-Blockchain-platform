import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../constants";

class AdminPage extends Component {
    constructor(props) {
        super(props);
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
