import React, {Component} from "react";
import './circlePercentage.css';

export class CirclePercentage extends Component{
    constructor(props){
        super();
        // width, strokeWidth, percentage
        this.circleLength = props.width * 0.4 * 2 * Math.PI;
        this.state = {
            percentage: 0,
        }
    }

    componentDidMount(){
        setTimeout(() => {this.setState({percentage: this.props.percentage})}, 10);
    }

    render(){
        // source: https://www.cssscript.com/pure-css-circular-percentage-bar/
        return <div className={'c100' + (this.props.percentage > 50 ? ' p' : '') + ' big'}>
            <span>{this.props.percentage}%</span>
            <div className={'slice'}>
                <div className={'bar'} style={{transform: 'rotate(' + this.state.percentage / 100 * 360 + 'deg)'}}></div>
                <div className={'fill'}></div>
            </div>
        </div>;




        {/*<div className="circleContainer" style={{width: this.props.width + 'px', height: this.props.width + 'px'}}>*/}
            {/*<svg className={'bag'} height={this.props.width} width={this.props.width}>*/}
                {/*<circle  cx={this.props.width / 2} cy={this.props.width / 2} r={this.props.width * 0.4} stroke={'#F8BBD0'} strokeWidth={this.props.strokeWidth} fill={"none"}></circle>*/}
            {/*</svg>*/}
            {/*<svg className={'over'} height={this.props.width} width={this.props.width}>*/}
                {/*<circle className={'circleOver'} cx={this.props.width / 2} cy={this.props.width / 2} r={this.props.width *0.4} stroke={'#E91E63'} strokeWidth={this.props.strokeWidth}*/}
                         {/*fill={"none"} strokeDasharray={this.circleLength * this.state.percentage / 100+ ',' + this.circleLength}>*/}
                    {/*<animate attributeType={'CSS'} attributeName={'stroke-dasharray'} from={1 + ',' + this.circleLength} to={this.circleLength * this.state.percentage / 100+ ',' + this.circleLength} dur={'0.4s'} repeatCount={'1'} />*/}
                {/*</circle>*/}
            {/*</svg>*/}
        {/*</div>*/}
    }
}