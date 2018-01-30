import React, {Component} from "react";
import {insideSvgCoordinates, colorFromIntensity} from './utils'
import {getData} from "./data";
import {VictoryBar, VictoryChart, VictoryTooltip} from 'victory';

const afterZoomParams = (prevState, coeff) => {
  // the scale gets bigger, so the x index is lower. The currentCarbonValue,
  // widthPropotion**3 * scale is unchanged
  // so newWidthProp**3 = 2 * oldWidthProp**3
  // newWidthProp = 2**(1/3)
  const newWidthProportion = prevState.curveX / SVG_WIDTH * (1 / coeff)**(1/3);
  return {
    curveX: newWidthProportion * SVG_WIDTH,
    curveY: (1 - newWidthProportion**3) * SVG_HEIGHT,
    maxCarbonValue: coeff * prevState.maxCarbonValue,
  }
};

const updateParams = (widthProportion, scale, fullSize) => {
  console.log('updateParasm, fullsize', fullSize);
  if (fullSize === undefined)
    fullSize = this.state.fullSize;
  return {
    curveY: (1 - widthProportion**3) * SVG_HEIGHT,
    curveX: widthProportion * SVG_WIDTH,
    currentCarbonValue: widthProportion**3 * scale,
    maxCarbonValue: scale,
    fullSize: fullSize,
  }
};

const SVG_HEIGHT = 200;
const SVG_WIDTH = 800;

export class SvgChart extends Component{
  constructor(props){
    super();
    this.state = {
      curveX: 0,
      curveY: 200,
      maxCarbonValue: 10000,
      currentCarbonValue: 0,
      fullSize: false,
    }
  }
  handleMouseOver = (ev) => {
    if (!this.state.fullSize)
      return;
    const realCoordinates = insideSvgCoordinates(ev);
    let widthProportion = realCoordinates.x / SVG_WIDTH;
    this.setState(updateParams(widthProportion, this.state.maxCarbonValue, true));
  };


  /* functions to change scale, not used at the moment. Could be used with a button such as */
  /* <button className={'button'} onClick={this.handleZoomLess}>Zoom out</button> */
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

  handleMouseLeave = () => {
    console.log('chart mouse leave', this.props.carbonValue, this.state.maxCarbonValue);
    this.setState(prevState => updateParams((this.props.carbonValue / this.state.maxCarbonValue)**(1/3),
                                this.state.maxCarbonValue, prevState.fullSize));
  };



  handleClick = () => {
    console.log('click on chart');
    this.setState({
      fullSize: true,
      width: 1000,
      height: 250,
    });
  };

  handleClose = (ev) => {
    ev.stopPropagation();
    console.log('close');
    this.setState({fullSize: false});
  };


  render(){
    let svgPath = ("M0," + SVG_HEIGHT + " c" + SVG_WIDTH / 3 + ",0 " + SVG_WIDTH * 2 / 3 + ",0 " +
      SVG_WIDTH + ",-" + SVG_HEIGHT);

    let fullsize = this.state.fullSize;

    let divStyle = {
      // width: '80%',
      height: fullsize ? '600px' : '',
      maxWidth: fullsize ? '1000px' : '400px',
      maxHeight: fullsize ? '600px' : '100px',
      cursor: 'pointer',
      position: 'relative',
      paddingTop: fullsize ? '20px' : '',
      margin: '0 auto 20px auto',
      transition: 'width 0.4s ease-in-out, height 0.4s ease-in-out, max-width 0.4s ease-in-out, max-height ease-in-out',
    };

    let bottomDiv = '';

    if (fullsize){
      bottomDiv = <div style={{height: '250px'}}>

      </div>
    }

    return <div style={divStyle}
                className="container" onClick={this.handleClick}>
      <img src="/img/close.svg" alt="close" onClick={this.handleClose} style={{position: 'absolute', right: '3%', top: '-2vw', maxWidth: '60px', width: fullsize ? '6vw' : '0', transition: 'width 0.4s ease-in-out'}}/>
      <svg width={'100%'} viewBox={'0 0 ' + SVG_WIDTH + ' ' +  SVG_HEIGHT}
           onMouseMove={this.handleMouseOver} id={'svgChart'}
           onMouseLeave={this.handleMouseLeave}>
        <rect width={'100%'} height={'100%'} fill={'#fafafa'}/>
        <path d={svgPath}
              fill="none" strokeWidth="2" stroke="black"/>
        <path d={svgPath + " L800,200 z"} fill="rgba(0,0,0,0.2)" stroke="none" />
        <line x1={this.state.curveX} y1={SVG_HEIGHT} x2={this.state.curveX} y2={this.state.curveY}
              stroke={'black'} strokeWidth={4} pointerEvents={'none'} />
        <circle r={10} cx={this.state.curveX} cy={this.state.curveY} fill={'black'} pointerEvents={'none'} />
      </svg>
      {/*<p style={{textAlign: 'center'}}>{this.state.currentCarbonValue}</p>*/}
      {bottomDiv}
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