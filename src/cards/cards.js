import React, {Component} from "react";
import './cards.css';
import {CirclePercentageWrapper} from "../widgets/circlePercentage";
import {
  DAILY_PER_CAPITA_CARBON_ALLOWANCE, MONTHLY_PER_CAPITA_CARBON_ALLOWANCE, QUOTA_PER_CATEGORY,
  VERTICAL_ORDER, YEARLY_PER_CAPITA_CARBON_ALLOWANCE
} from "../data/database";
import {formatNumber} from "../utils";

const START_IX = 2;
const MOVE_LEFT_EVERY_CARD = 272;
const ONE_SLIDER_HEIGHT = 500;
const SLIDER_START = 65;

const leftDistance = (currentIx) => {
  let px = -833 - MOVE_LEFT_EVERY_CARD * (currentIx - START_IX);
  return 'calc(50vw + ' + px + 'px)';
};


export class Slider extends Component{
  componentDidMount = () => {
    this.props.updateComparison();
  };

  currentType = () => VERTICAL_ORDER[this.props.currentTypeIx];
  currentCardIx = () => this.props.currentCardIndices[this.props.currentTypeIx];

  handleGoToTop = () => {this.props.handleMoveVertically(-1)};
  handleGoToBottom = () => {this.props.handleMoveVertically(1)};

  moveCards = (increment) => {
    // make sure we don't move further than 0 or max
    increment = Math.max(-this.currentCardIx(), increment);
    increment = Math.min((this.props.cards[this.currentType()].length - this.currentCardIx() - 1), increment);
    this.props.handleCardsMove(increment);
  };

  handleMoveRight = () => {this.moveCards(1)};
  handleMoveLeft = () => {this.moveCards(-1)};


  render(){
    let topButton = '';
    let bottomButton = '';

    if (this.props.topButtonInfo) {
      topButton = <button className="button topComparisonButton" onClick={this.handleGoToTop}>
        Compare with {this.props.topButtonInfo.type} - {this.props.topButtonInfo.comparison && this.props.topButtonInfo.comparison.text}
      </button>;
    }
    if (this.props.bottomButtonInfo) {
      bottomButton = <button className="button bottomComparisonButton" onClick={this.handleGoToBottom}>
        Compare with {this.props.bottomButtonInfo.type} - {this.props.bottomButtonInfo.comparison && this.props.bottomButtonInfo.comparison.text}
      </button>;
    }

    let sliders = VERTICAL_ORDER.map((type, ix) => {
      let slider = <CardsSlider cards={this.props.cards[type]} currentCardIx={this.props.currentCardIndices[ix]}
                                key={'slider-' + ix} handleCardClick={this.props.handleCardClick}/>;
      // let space = ix == 0 ? '' : <div style={{marginTop: '350px'}}></div>;
      return <div style={{height: '500px'}}>
        {slider}
      </div>;
    });

    let navigation = <div>
      {topButton}
      <img src="/img/right_arrow.png" alt="right arrow" className={'rightArrow'} onClick={() => {console.log('CLICKARROW'); this.handleMoveRight()}}/>
      <img src="/img/right_arrow.png" alt="right arrow" className={'leftArrow'} onClick={this.handleMoveLeft}/>
      {bottomButton}
    </div>;

    return <div className={'SliderBigWrapper'}>
      <div className={'SlidersContainer'} style={{top: (-this.props.currentTypeIx * ONE_SLIDER_HEIGHT + SLIDER_START)+ 'px'}}>
        {sliders}
      </div>
      {navigation}
    </div>
  }
}

class CardsSlider extends Component{
  render(){
    if (this.props.cards === undefined)
      return null;
    let cards = this.props.cards.map((card, ix) =>
      <Card data={card} central={this.props.currentCardIx === ix} key={ix} handleClick={() => this.props.handleCardClick(ix)}/>);
    return <div className={'sliderWrapper'}>
      <div className={'cardsWrapper'} style={{left: leftDistance(this.props.currentCardIx)}}>
        {cards}
      </div>
    </div>
  }
}

class Card extends Component{
  render(){
    let inside = '';

    if (this.props.central){
      let percentages = [
        100 * this.props.data.carbonValue / DAILY_PER_CAPITA_CARBON_ALLOWANCE,
        100 * this.props.data.carbonValue / MONTHLY_PER_CAPITA_CARBON_ALLOWANCE,
        100 * this.props.data.carbonValue / YEARLY_PER_CAPITA_CARBON_ALLOWANCE
      ];
      percentages = percentages.map(n => (n > 999) ? '∞' : n);

      let valueName = this.props.data.value.name;
      if (!valueName)
        valueName = '⁣'; // string contains unicode 'Invisible Separator'

      inside = <div>
        <div>
          <img src={'img/emojis/' + this.props.data.icon} alt={this.props.data.name} style={{maxWidth: '50px', maxHeight: '50px'}}/>
        </div>
        <h4 style={{fontSize: '1.8rem', marginBottom: 0}}>{this.props.data.nameWithValue}</h4>
        <h4 style={{fontSize: '2rem'}}>{valueName}</h4>
        <h6>{formatNumber(this.props.data.carbonValue)} kg CO2 eq</h6>

        {/*bottom stat*/}
        <div>
          <CirclePercentageWrapper width={100} strokeWidth={3} percentage={percentages[0]} text={'daily carbon allowance'}/>
          <div style={{display: 'inline-block', width: '40px'}}/>
          <CirclePercentageWrapper width={100} strokeWidth={3} percentage={percentages[1]} text={'monthly carbon allowance'}/>
          <div style={{display: 'inline-block', width: '40px'}}/>
          <CirclePercentageWrapper width={100} strokeWidth={3} percentage={percentages[2]} text={'yearly carbon allowance'}/>
        </div>


      </div>;
    }
    else{
      let valueName = this.props.data.value.name;
      if (!valueName)
        valueName = '⁣'; // string contains unicode 'Invisible Separator'
      inside = <div>
        <div>
          <img src={'img/emojis/' + this.props.data.icon} alt={this.props.data.name} style={{maxWidth: '50px', maxHeight: '50px'}}/>
        </div>
        <h4 style={{fontSize: '2.2rem', marginBottom: 0}}>{this.props.data.name + ' (' + this.props.data.value.value + ' kg)'}</h4>
        <h4 style={{fontSize: '2rem'}}>{valueName}</h4>
        <h6>{formatNumber(this.props.data.carbonValue)} kg CO2 eq</h6>
        {/*{bottom}*/}
      </div>;
    }
    return <div className={'card ' + (this.props.central ? 'card-central' : '')}
                onClick={this.props.handleClick} style={{cursor: 'pointer'}}>
      {inside}
    </div>
  }
}
