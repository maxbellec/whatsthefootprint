import React, {Component} from "react";
import {insideSvgCoordinates, colorFromIntensity, findClosestCarbonValue, formatNumber} from './utils'
import {VERTICAL_ORDER, YEARLY_PER_CAPITA_CARBON_ALLOWANCE} from "./data/database";

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
  // handleZoom = (more) => {
  //   console.log('zoom, ', more);
  //   const coeff = more ? 2 : 1/2;
  //   this.setState((prevState) => {
  //     console.log('prevstate', prevState);
  //     return afterZoomParams(prevState, coeff);
  //   });
  // };
  // handleZoomLess = () => {this.handleZoom(false)};
  // handleZoomMore = () => {this.handleZoom(true)};

  handleMouseLeave = () => {
    if (!this.state.fullSize || true)
      return;
    console.log('chart mouse leave', this.props.carbonValue, this.state.maxCarbonValue);
    this.setState(this.updateParams((this.props.carbonValue / this.state.maxCarbonValue)**(1/3),
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
      height: fullsize ? '500px' : '100px',
      maxWidth: fullsize ? '1000px' : '400px',
      width: fullsize ? '90%' : '400px',
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
        if (this.state.closeItems.hasOwnProperty(dataType)){
          let card = this.state.closeItems[dataType];
          closeItems.push(<li key={dataType} style={{cursor: 'pointer'}} onClick={() => this.handleItemClick(dataType, card.ixInType)}><img style={{width: '30px'}} src={'img/emojis/' + card.card.icon} alt={card.text}/>{card.text}</li>)
        }

      }
      bottomDiv = <div style={{height: '250px', cursor: 'default'}}>
        <ul style={{marginLeft: 'calc(' + (100 * this.state.curveX / SVG_WIDTH) + '% - 150px)',
                    listStyleType: 'none', textAlign: 'center', width: '300px'}}>
          <h3 style={{fontSize: '2.7rem', marginBottom: '1.5rem'}}>{formatNumber(this.state.currentCarbonValue)} kg CO2-eq</h3>
          <h3 style={{fontSize: '2.3rem', marginBottom: 0}}>items with similar footprint</h3>
          {closeItems}
        </ul>
      </div>
    }

    // max allowance of 2000kg per person, red line
    let maxLine = '';
    let maxText = '';
    if (this.state.fullSize){
      let maxAllowanceHeight = SVG_HEIGHT * (1 - YEARLY_PER_CAPITA_CARBON_ALLOWANCE / this.state.maxCarbonValue);
      maxLine = <line x1={0} x2={SVG_WIDTH} y1={maxAllowanceHeight} y2={maxAllowanceHeight} strokeWidth={1} stroke={'red'}/>;
      maxText = <text x={5} y={maxAllowanceHeight - 5} fontSize={8} fill={'red'}>max yearly carbon allowance per capita</text>;
    }

    let lineAndCircleX = this.state.curveX;
    let lineAndCircleY = this.state.curveY;
    if (this.state.fullSize){
      console.log('fullSize, lineAndCircleX ', lineAndCircleX);
    }
    else{
      let prop = this.props.carbonValue / this.state.maxCarbonValue;
      lineAndCircleX = (prop)**(1/3) * SVG_WIDTH;
      lineAndCircleY = (1 - prop) * SVG_HEIGHT;
      console.log('smallSize, lineAndCircleX ', lineAndCircleX, lineAndCircleY);
    }

    return <div style={divStyle}
                className="container" onClick={this.handleClick}>
      <img src="img/close.svg" alt="close" onClick={this.handleClose} style={{position: 'absolute', right: '3%', top: '-2vw', maxWidth: '60px', width: fullsize ? '6vw' : '0', transition: 'width 0.4s ease-in-out'}}/>
      <svg width={'100%'} viewBox={'0 0 ' + SVG_WIDTH + ' ' +  SVG_HEIGHT}
           onMouseMove={this.handleMouseOver} id={'svgChart'}
           onMouseLeave={this.handleMouseLeave}>
        <rect width={'100%'} height={'100%'} fill={'#fafafa'}/>
        <path d={svgPath}
              fill="none" strokeWidth="2" stroke="black"/>
        <path d={svgPath + " L800,200 z"} fill="rgba(0,0,0,0.2)" stroke="none" />
        <line x1={lineAndCircleX} y1={SVG_HEIGHT} x2={lineAndCircleX} y2={lineAndCircleY}
              stroke={'black'} strokeWidth={4} pointerEvents={'none'} />
        <circle r={10} cx={lineAndCircleX} cy={lineAndCircleY} fill={'black'} pointerEvents={'none'} />
        {maxLine}
        {maxText}
      </svg>
      {/*<p style={{textAlign: 'center'}}>{this.state.currentCarbonValue}</p>*/}
      {bottomDiv}
    </div>
  }
}
