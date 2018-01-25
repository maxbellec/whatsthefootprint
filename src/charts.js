import React, {Component} from "react";
import {insideSvgCoordinates, colorFromIntensity} from './utils'
import {getData} from "./data";
import {VictoryBar, VictoryChart, VictoryTooltip} from 'victory';

const afterZoomParams = (prevState, coeff) => {
  // the scale gets bigger, so the x index is lower. The currentCarbonValue,
  // widthPropotion**3 * scale is unchanged
  // so newWidthProp**3 = 2 * oldWidthProp**3
  // newWidthProp = 2**(1/3)
  const newWidthProportion = prevState.curveX / prevState.width * (1 / coeff)**(1/3);
  return {
    curveX: newWidthProportion * prevState.width,
    curveY: (1 - newWidthProportion**3) * prevState.height,
    curveScale: coeff * prevState.curveScale,
  }
};

const updateParams = (widthProportion, scale, width, height) => {
  console.log('new params', widthProportion, scale, width, height);
  return {
    curveY: (1 - widthProportion**3) * height,
    curveX: widthProportion * width,
    currentCarbonValue: widthProportion**3 * scale,
    curveScale: scale,
  }
};

export class SvgChart extends Component{
  constructor(props){
    super();
    this.state = {
      curveX: 0,
      curveY: 400,
      width: 800,
      height: 400,
      curveScale: 10, // max value
      currentCarbonValue: 0,
    }
  }
  handleMouseOver = (ev) => {
    const realCoordinates = insideSvgCoordinates(ev);
    console.log(realCoordinates);
    let widthProportion = realCoordinates.x / this.state.width;
    this.setState(updateParams(widthProportion, this.state.curveScale, this.state.width, this.state.height));
  };

  handleZoom = (more) => {
    console.log('zoom, ', more);
    const coeff = more ? 2 : 1/2;
    this.setState((prevState, props) => {
      console.log('prevstate', prevState);
      return afterZoomParams(prevState, coeff);
    });
  };

  handleZoomLess = () => {this.handleZoom(false)};
  handleZoomMore = () => {this.handleZoom(true)};


  render(){
    return <div className="container" style={{width: this.state.width + 'px', height: this.state.height + 'px', margin: 'auto'}}>
      <svg width={'100%'} height={'100%'} onMouseMove={this.handleMouseOver}>
        <rect width={'100%'} height={'100%'} fill={'rgba(0,0,0,0.03)'}></rect>
        {/*<polygon points={'0,400 800,400, 800,0'} fill={'grey'} stroke={'black'} onMouseOver={this.onMouseOver()} />*/}
        <path d="M0,400 c266,0 533,0 800,-400" fill="none" strokeWidth="2" stroke="black"/>
        <path d="M0,400 c266,0 533,0 800,-400 L800,400 z" fill="rgba(0,0,0,0.2)" stroke="none" />
        {/* TODO transformation: transition works on the circle (but not line) in Chrome, none of them works in Firefox*/}
        {/*tranform: translate works but is only relative, so this is annoying. Could be enough for when doing zoom though*/}
        <line x1={this.state.curveX} y1={this.state.height} x2={this.state.curveX} y2={this.state.curveY}
              stroke={'black'} strokeWidth={4} pointerEvents={'none'}
              style={{transition: 'x1 0.5s, x2 0.5s, y1 0.5s, y2 0.5s'}}/>
        <circle r={10} cx={this.state.curveX} cy={this.state.curveY} fill={'black'} pointerEvents={'none'}
                style={{transition: 'cx 0.1s, cy 0.1s'}}/>



      </svg>
      <p style={{textAlign: 'center'}}>{this.state.currentCarbonValue}</p>
      <div>
        <button className={'button'} onClick={this.handleZoomLess}>Less</button>
        <button className={'button'} onClick={this.handleZoomMore}>More</button>
      </div>
    </div>
  }
}

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {data: []};
  }

  componentDidMount(){
    let data = getData();
    // for (let i = 0; i < data.length; i++){
    //     setTimeout(() => {this.setState({data: data.slice(0, i + 1)})}, i * 10);
    // }
    this.setState({data: data});
    console.log('change data');
  }

  render(){
    return <VictoryChart
      domain={{ x: [0, 200], y: [0, 90] }}
      // animate={{duration: 3}}
    >
      <VictoryBar
        labelComponent={
          <VictoryTooltip
            cornerRadius={(d) => 10}
            pointerLength={(d) => 20}
            flyoutStyle={{stroke: (d) => 'black'}}
          />
        }
        events={[
          {
            target: "data",
            eventHandlers: {
              onMouseEnter: () => {
                return [{
                  target: "labels",
                  mutation: (props) => {
                    console.log('label props', props);
                    this.props.onMouseEnter(props.text);
                    return props.text === "clicked" ?
                      null : { text: "clicked" }
                  }
                },
                  {
                    target: 'data',
                    mutation: (props) => {
                      console.log('data props', props);

                      return {'style': Object.assign(props.style, {'filter': 'grayscale(0%)'})}
                    }
                  }];
              },
              onMouseLeave: () => {
                return [{
                  target: 'data',
                  mutation: (props) => {
                    return {'style': Object.assign(props.style, {'filter': 'grayscale(100%)'})}
                  }
                }]
              }
            }
          },

        ]}
        data={this.state.data}
        style={{
          data: {fill: d => colorFromIntensity(d.y), width: 10, filter: 'grayscale(100%)'}
        }}
      />
    </VictoryChart>
  }
}