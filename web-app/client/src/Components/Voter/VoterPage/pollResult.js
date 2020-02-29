import React,{Component} from "react";
import {ADDRESS} from "../../constants";
import axios from 'axios';
import CanvasJSReact  from "./canvasjs.react";
import {Accordion, Button} from "react-bootstrap";
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PollResult extends Component{
    constructor(props) {
        super(props);
        this.state={
            constituency:"warangal",
            results : [],
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.constituency !== this.props.constituency){
            this.setState({
                constituency:this.props.constituency,
            });
        }
    }

    componentDidMount =async () => {
        console.log("did mount");
        let response = await axios.post(ADDRESS+"fetchResults",{constituency:this.state.constituency});
        if(response.data === 'Election does not exists'){
            console.log(response.data);
            return ;
        }
        this.setState({
           results : response.data.results,
        });
        if(this.state.results === undefined)
                this.state.results = [];
        console.log(this.state.results);
    };

    render() {
        if(this.state.results.length === 0 ){
            return (
                <div></div>
            );
        }
        let data = [];
        for(let i=0;i<this.state.results.length;i++){
            data.push({
               y:this.state.results[i].voteCount,
               label:this.state.results[i].partyName,
            });
        }
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            // title: {
            //     text: "Polling Result"
            // },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: data
                    // [{ y: 18, label: "Direct" },]
            }]
        };
        let divStyle = {
            width: "60%",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%",
            marginBottom: "2%",
            textAlign: "center",
            // backgroundColor: "rgb(220,220,220)",
        };
        return (
            <div style={divStyle}>
                <Accordion>
                    <Accordion.Toggle as={ Button } variant="primary" eventKey="0" style={{"marginBottom":"2%"}}>
                        Show Poll Results
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={"0"} style={divStyle}>
                        <CanvasJSChart options={options}/>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        );
    }
}

export default PollResult;