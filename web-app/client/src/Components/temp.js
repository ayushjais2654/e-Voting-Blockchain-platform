import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import VoterLogin from "./Voter/VoterLogin";
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './Home.css';
// import axios from "axios";

class Home extends Component {
    // componentDidMount() {
    //     axios.get(`/api`).then(response => {
    //         console.log(response.data);
    //         this.setState({
    //             users : response.data.user
    //         })
    //     });
    // }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tokenVoter : localStorage.getItem("token"),
            tokenCandidate : localStorage.getItem("token-candidate"),
            showmodal : false,
        };
    }

    render() {
        if(this.state.tokenCandidate != null)
            return <Redirect to="/candidatePage" />
        if(this.state.tokenVoter != null)
            return <Redirect to="/voterPage" />
        return (
            <>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"/>
                        <div className="w3-light-grey font_family">
                            <header className="w3-container w3-center w3-padding-32">
                                <h1><b>E-Voting Platform</b></h1>
                                <p>Based on revolutionary concept of the <span className="w3-tag">blockchain</span></p>
                                <Button className="w3-button w3-black w3-padding-large w3-large w3-margin-top"
                                        style={{"width":"15%"}}
                                        onClick={()=> this.setState({showmodal: true})} >
                                    {/*<Link to="/voterLogin" style={{"text-decoration":"none"}}>  </Link>*/}
                                    Voter Login

                                    <div id={"id01"} className="modal">
                                        <div className="imgcontainer">
                                            <span onClick={this.loginnone} className="close" title="Close Modal">&times;</span>
                                            <img src="./img_avatar2.png" alt="Avatar" className="avatar"/>
                                        </div>
                                        <div className="container">
                                            <div className="modal-content animate">
                                            <VoterLogin></VoterLogin>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                                <pre>      </pre>
                                <Button className="w3-button w3-black w3-padding-large w3-large w3-margin-top" style={{"width":"15%"}}>
                                    <Link to="/candidateLogin" style={{"text-decoration":"none"}}> Candidate Login </Link>
                                </Button>
                            </header>
                <div className="w3-row">
                    <div className="w3-col l8 s12">
                        {/*// <!-- Blog entry -->*/}
                        <div className="w3-card-4 w3-margin w3-white">
                            <img src="./woods.jpg" alt="Nature" style={{"width":"100%"}}/>
                            <div className="w3-container">
                                <h3><b>TITLE HEADING</b></h3>
                                <h5>Title description, <span className="w3-opacity">April 7, 2014</span></h5>
                            </div>

                            <div className="w3-container">
                                <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl.
                                    Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim,
                                    ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper.
                                    Praesent tincidunt sedlus ut rutrum. Sed vitae justo condimentum, porta lectus vitae,
                                    ultricies congue gravida diam non fringilla.
                                </p>
                                <div className="w3-row">
                                    <div className="w3-col m8 s12">
                                        <p><button className="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                </div>
                <Link to="/registerVoter"> RegisterVoter </Link> <br/><br/>
                <Link to="/registerCandidate" > RegisterCandidate</Link>
                {/*<p> {this.state.users.map(user => <li key={user.id}> {user.name} </li>)} </p>*/}
            </>
        );
    }
}

export default Home;
