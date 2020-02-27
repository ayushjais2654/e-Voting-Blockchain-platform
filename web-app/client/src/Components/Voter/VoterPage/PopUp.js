import React,{Component} from "react";
import {Modal, Alert, Button} from "react-bootstrap";

class PopUp extends Component{
    constructor(props) {
        super(props);
        this.state={
            alertType : this.props.alertType,
            alertData : this.props.alertData,
            alertShow : this.props.alertShow,
            alertCloseFunc : this.props.alertCloseFunc,
        }
    }
    componentDidUpdate() {
        if(this.state.alertShow !== this.props.alertShow){
            this.setState({
                alertType : this.props.alertType,
                alertData : this.props.alertData,
                alertShow : this.props.alertShow,
                alertCloseFunc : this.props.alertCloseFunc,
            });
        }
    }

    render(){
        return (
            <div>
                <Modal  show={this.state.alertShow}
                        onHide={() => this.state.alertCloseFunc()} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Info
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant={this.state.alertType } >
                            <Alert.Heading>
                                {this.state.alertData}
                            </Alert.Heading>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.state.alertCloseFunc() }>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default PopUp;
