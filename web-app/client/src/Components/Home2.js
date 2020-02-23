import React from 'react'
import {
    Button, Container, Divider, Grid, GridColumn, GridRow, Header, Icon,
    Image, List, Menu, Segment, Input
} from 'semantic-ui-react';
import {Modal} from "react-bootstrap";
import VoterLogin from "./Voter/VoterLogin";
import CandidateLogin from "./Candidate/candidateLogin";
import {Redirect, Link} from "react-router-dom";

class HomepageHeading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_modal: false,
            voter_modal: true,
        };
    }

    render() {
        return (
            <div>
                <Modal
                    size="md"
                    centered
                    show={this.state.show_modal}
                    onHide={() => this.setState({show_modal: false})}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.voter_modal ? "Voter " : "Candidate "}
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {this.state.voter_modal ? <VoterLogin/> : <Redirect to='/registerCandidate'/>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({show_modal: false})}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Segment
                    inverted
                    textAlign='center'
                    style={{minHeight: 700, padding: '1em 0em'}}
                    vertical
                >
                    <Container text>
                        <Header as={'h1'}
                                content={"OTIS"}
                                inverted
                                style={{
                                    fontSize: '4em',
                                    fontWeight: 'normal',
                                    marginBottom: 0,
                                    marginTop: '1em',
                                    textDecoration: 'underline'
                                }}
                        />
                        <h1 style={{
                            fontSize: '3.5em',
                            fontWeight: 'normal',
                            marginBottom: 0,
                            marginTop: '0.4em',
                        }}>
                            INDIA's first
                            <br/>
                            <strong>
                                <span style={{color: "Red"}}>O</span>
                                nline vo
                                <span style={{color: "Red"}}>TI</span>
                                ng <span style={{color: "Red"}}> S</span>ystem
                            </strong>
                        </h1>
                        <Header
                            as='h2'
                            content='Click images here to login'
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                                marginTop: '1.9em',
                            }}
                        />
                        <table style={{width: "100%"}}>
                            <tbody>
                            <tr align="center">
                                <td align={"center"}>
                                    <input type="image" src="./voter_pic.png" alt="Voter pic" width="160" height="190"
                                           onClick={() => this.setState({
                                               show_modal: true,
                                               voter_modal: true
                                           })}
                                    />
                                    <br/>
                                    <span style={{"fontSize": "1.8em", "color": "White"}}>Voter</span>
                                    {/*<Button primary size='huge'*/}
                                    {/*        onClick={() => this.setState({*/}
                                    {/*            show_modal: true,*/}
                                    {/*            voter_modal: true*/}
                                    {/*        })}>*/}
                                    {/*    <Icon name='left arrow'/>*/}
                                    {/*    Voter Login*/}
                                    {/*</Button>*/}
                                </td>
                                <td align={"center"}>
                                    <input type="image" src={"./candidate_pic.png"} alt={"Candidate pic"} width="160"
                                           height="190"
                                           onClick={() => this.setState({
                                               show_modal: true,
                                               voter_modal: false
                                           })}
                                    />
                                    <br/>
                                    <span style={{"fontSize": "1.8em", "color": "White"}}>Candidate</span>
                                    {/*<Button primary size='huge'*/}
                                    {/*        onClick={() => this.setState({*/}
                                    {/*            show_modal: true,*/}
                                    {/*            voter_modal: false*/}
                                    {/*        })}>*/}
                                    {/*    Candidate Login*/}
                                    {/*    <Icon name='right arrow'/>*/}
                                    {/*</Button>*/}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Container>
                </Segment>
            </div>
        );
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tokenVoter: localStorage.getItem("token"),
            tokenCandidate: localStorage.getItem("token-candidate"),
        };

    }

    componentDidMount() {
        let props = this.props;
        console.log(JSON.stringify(props));

    }

    render() {
        if (this.state.tokenCandidate != null)
            return <Redirect to="/candidatePage"/>;
        if (this.state.tokenVoter != null)
            return <Redirect to="/voterPage"/>;

        return (
            <div>
                <HomepageHeading id={"home"}/>
                <Segment style={{padding: '8em 0em'}} vertical id={"announcement"}>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h2' style={{fontSize: '2em'}}>
                                    Announcements
                                </Header>
                                <p style={{fontSize: '1.33em'}}>
                                    We can give your company superpowers to do things that they never thought possible.
                                    Let us delight your customers and empower your needs... through pure data analytics.
                                    Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                                    bioengineered.
                                </p>
                            </Grid.Column>
                            <Grid.Column floated='right' width={6}>
                                <Image bordered rounded size='large' src='./woods.jpg'/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Divider
                                as='h4'
                                className='header'
                                horizontal
                                style={{margin: '3em 0em', textTransform: 'uppercase'}}
                            >
                            </Divider>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment style={{padding: '0em'}} vertical id={"result"}>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    Results
                                </Header>
                                <p style={{fontSize: '1.33em'}}>That is what they all say about us</p>
                            </Grid.Column>
                            <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    Graphical representation
                                </Header>
                                <p style={{fontSize: '1.33em'}}>
                                    <Image avatar src='/images/avatar/large/nan.jpg'/>
                                    <b>Nan</b> Chief Fun Officer Acme Toys
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment style={{padding: '8em 0em'}} vertical id={"intro"}>
                    <Container text>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            Introduction about the system
                        </Header>
                        <p style={{fontSize: '1.33em'}}>
                            You all must be intrested to know how this system is secure and works . so here is it......
                        </p>
                        <Button as='a' size='large'>
                            Read More
                        </Button>

                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{margin: '3em 0em', textTransform: 'uppercase'}}
                        >
                            <a href='#'>Case Studies</a>
                        </Divider>

                        <Header as='h3' style={{fontSize: '2em'}}>
                            Did We Tell You About Security of this Webapp?
                        </Header>
                        <p style={{fontSize: '1.33em'}}>
                            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                            it's really true. It took years of gene splicing and combinatory DNA research, but our
                            bananas can really dance.
                        </p>
                    </Container>
                </Segment>

                <Segment inverted vertical style={{padding: '5em 0em'}} id={"about"}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='About'/>
                                    <List link inverted>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Us</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Services'/>
                                    <List link inverted>
                                        <List.Item as='a'>Banana Pre-Order</List.Item>
                                        <List.Item as='a'>DNA FAQ</List.Item>
                                        <List.Item as='a'>How To Access</List.Item>
                                        <List.Item as='a'>Favorite X-Men</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Header as='h4' inverted>
                                        Footer Header
                                    </Header>
                                    <p>
                                        Extra space for a call to action inside the footer that could help re-engage
                                        users.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default Home;