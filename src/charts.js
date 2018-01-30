import React, {Component} from "react";
import {insideSvgCoordinates, colorFromIntensity, findClosestCarbonValue, formatNumber} from './utils'
import {getData} from "./data";
import {VictoryBar, VictoryChart, VictoryTooltip} from 'victory';
import {VERTICAL_ORDER} from "./data/database";

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
    closeItems: {},
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
    let widthProportion = 0.5;
    if (ev !== undefined){
      let realCoordinates = insideSvgCoordinates(ev);
      widthProportion = realCoordinates.x / SVG_WIDTH;
    }
    this.setState(this.updateParams(widthProportion, this.state.maxCarbonValue));
  };
  handleMouseEnters = ev => {
    console.log('handle mouse enters');
  };

  updateParams = (widthProportion, scale) => {
    let currentCarbonValue = widthProportion**3 * scale;
    let closeItems = {};

    if (this.state.fullSize){
      // find the closest cards for this value
      VERTICAL_ORDER.forEach(dataType => {
        closeItems[dataType] = findClosestCarbonValue(currentCarbonValue, this.props.cards[dataType]);
      });
    }

    return {
      curveY: (1 - widthProportion**3) * SVG_HEIGHT,
      curveX: widthProportion * SVG_WIDTH,
      currentCarbonValue: currentCarbonValue,
      maxCarbonValue: scale,
      closeItems: closeItems,
    }
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
    if (!this.state.fullSize || true)
      return;
    console.log('chart mouse leave', this.props.carbonValue, this.state.maxCarbonValue);
    this.setState(prevState => this.updateParams((this.props.carbonValue / this.state.maxCarbonValue)**(1/3),
                                this.state.maxCarbonValue));
  };



  handleClick = () => {
    console.log('click on chart');
    if (!this.state.fullSize)
      this.setState({
        fullSize: true,
        width: 1000,
        height: 250,
      }, this.handleMouseOver);
  };

  handleClose = (ev) => {
    if (ev)
      ev.stopPropagation();
    console.log('close');
    this.setState({fullSize: false});
  };

  handleItemClick = (dataType, ixInType) => {
    this.props.moveToPosition(VERTICAL_ORDER.indexOf(dataType), ixInType);
    this.handleClose();
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
    let closeItems = [];
    if (fullsize){
      for (let dataType in this.state.closeItems){
        let card = this.state.closeItems[dataType];
        closeItems.push(<li style={{cursor: 'pointer'}} onClick={() => this.handleItemClick(dataType, card.ixInType)}><img style={{width: '30px'}} src={'img/emojis/' + card.card.icon} alt={card.text}/>{card.text}</li>)
      }
      bottomDiv = <div style={{height: '250px', cursor: 'default'}}>
        <ul style={{marginLeft: (this.state.curveX / SVG_WIDTH * 1000 - 150) + 'px',
                    listStyleType: 'none', textAlign: 'center', width: '300px'}}>
          <h3 style={{fontSize: '2.7rem', marginBottom: 0}}>{formatNumber(this.state.currentCarbonValue)} kg CO2-eq</h3>
          <h3 style={{fontSize: '2.3rem', marginBottom: 0}}>items with similar footprint</h3>
          {closeItems}
        </ul>
      </div>
    }

    return <div style={divStyle}
                className="container" onClick={this.handleClick}>
      <img src="/img/close.svg" alt="close" onClick={this.handleClose} style={{position: 'absolute', right: '3%', top: '-2vw', maxWidth: '60px', width: fullsize ? '6vw' : '0', transition: 'width 0.4s ease-in-out'}}/>
      <svg width={'100%'} viewBox={'0 0 ' + SVG_WIDTH + ' ' +  SVG_HEIGHT}
           onMouseMove={this.handleMouseOver} id={'svgChart'}
           onMouseEnter={this.handleMouseEnters}
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