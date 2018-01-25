import React, {Component} from "react";
import './circlePercentage.css';
import {QUOTA, QUOTA_PER_CATEGORY} from "../data/database";

export class CirclePercentage extends Component{
    constructor(props){
        super();
        // width, strokeWidth, percentage
        this.percentage = Math.round(props.percentage);
        this.textPercentage = this.percentage;
        this.circlePercentage = Math.min(this.percentage, 100);
        this.state = {
            percentage: 0,
        }
    }

    componentDidMount(){
        setTimeout(() => {this.setState({percentage: this.circlePercentage})}, 300);
    }

    render(){
        // source: https://www.cssscript.com/pure-css-circular-percentage-bar/
        return <div style={{width: this.props.size, height: this.props.size, display: 'inline-block'}}>
            <div className={'c100' + (this.props.percentage > 50 ? ' p' : '')} style={{fontSize: this.props.size}}>
                <span>{this.textPercentage}%</span>
                <div className={'slice'}>
                    <div className={'bar'} style={{transform: 'rotate(' + this.state.percentage / 100 * 360 + 'deg)'}}></div>
                    <div className={'fill'}></div>
                </div>
            </div>
        </div>;
    }
}

export const CirclePercentageWrapper = (props) => {
    return <div style={{textAlign: 'center', 'width': props.width + 'px', display: 'inline-block'}}>
        <CirclePercentage strokeWidth={props.strokeWidth} percentage={props.percentage} size={props.width}/>
        <div style={{minWidth: 100 + 'px', fontSize: 17 * props.width / 200 + 'px'}}>{props.text}</div>
    </div>
};
