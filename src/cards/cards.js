import React, {Component} from "react";
import './cards.css';
import {CirclePercentageWrapper} from "../widgets/circlePercentage";
import {DATABASE, QUOTA, QUOTA_PER_CATEGORY, QUOTA_TEXT, VERTICAL_ORDER} from "../data/database";
import {formatNumber} from "../utils";
import {findClosestCarbonValue} from "../utils";

const START_LEFT = 127;
const START_IX = 2;
const MOVE_LEFT_EVERY_CARD = 272;
const ONE_SLIDER_HEIGHT = 500;
const SLIDER_START = 65;

const leftDistance = (currentIx) => {
  return START_LEFT - (currentIx - START_IX) * MOVE_LEFT_EVERY_CARD;
};


export class Slider extends Component{
  componentDidMount = () => {
    this.props.updateComparison();
  };

  currentType = () => VERTICAL_ORDER[this.props.currentTypeIx];
  currentCardIx = () => this.props.currentCardIndices[this.props.currentTypeIx];

  handleGoToTop = () => {this.props.handleMoveVertically(true)};
  handleGoToBottom = () => {this.props.handleMoveVertically(false)};

  moveCards = (increment) => {
    // make sure we don't move further than 0 or max
    increment = Math.max(-this.currentCardIx(), increment);
    increment = Math.min((this.props.cards[this.currentType()].length - this.currentCardIx() - 1), increment);
    this.props.handleCardsMove(increment);
  };

  handleMoveRight = () => {this.moveCards(1)};
  handleMoveRight5 = () => {this.moveCards(5)};
  handleMoveFirst = () => {this.moveCards(-this.currentCardIx())};
  handleMoveLast = () => {this.moveCards(this.props.cards[this.currentType()].length - this.currentCardIx()- 1)};
  handleMoveLeft = () => {this.moveCards(-1)};
  handleMoveLeft5 = () => {this.moveCards(-5)};


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
      let handleMove = null;
      // buttons

      let navButtons = '';

      if (ix === this.props.currentTypeIx){
        handleMove = this.handleCardsMove;

        navButtons = <div style={{textAlign: 'center'}}>
          <button className={'button'} onClick={this.handleMoveFirst}>First</button>
          <button className={'button'} onClick={this.handleMoveLeft5}>Previous 5</button>
          <button className={'button'} onClick={this.handleMoveLeft}>Previous</button>
          <button className={'button'} onClick={this.handleMoveRight}>Next</button>
          <button className={'button'} onClick={this.handleMoveRight5}>Next 5</button>
          <button className={'button'} onClick={this.handleMoveLast}>Last</button>
        </div>;
      }
      let slider = <CardsSlider cards={this.props.cards[type]} currentCardIx={this.props.currentCardIndices[ix]}
                                key={'slider-' + ix} handleCardClick={this.props.handleCardClick}/>;
      // let space = ix == 0 ? '' : <div style={{marginTop: '350px'}}></div>;
      let space = '';
      return <div style={{height: '500px'}}>
        {/*{topButton}*/}
        {/*{navButtons}*/}
        {slider}
        {/*{bottomButton}*/}
      </div>;
    });

    let navigation = <div>
      {topButton}
      <img src="/img/right_arrow.png" alt="right arrow" className={'rightArrow'} onClick={() => {console.log('CLICKARROW'); this.handleMoveRight()}}/>
      <img src="/img/right_arrow.png" alt="right arrow" className={'leftArrow'} onClick={this.handleMoveLeft}/>
      {bottomButton}
    </div>;

    return <div className={'SliderBigWrapper'}>
      {/*{navigation}*/}
      <div className={'SlidersContainer'} style={{top: (-this.props.currentTypeIx * ONE_SLIDER_HEIGHT + SLIDER_START)+ 'px'}}>
        {sliders}
      </div>
      {navigation}
    </div>
  }
}

class CardsSlider extends Component{
  render(){
    console.log('cardsSlider render', this.props.cards);
    if (this.props.cards === undefined)
      return null;
    let cards = this.props.cards.map((card, ix) =>
      <Card data={card} central={this.props.currentCardIx === ix} key={ix} handleClick={() => this.props.handleCardClick(ix)}/>);
    return <div className={'sliderWrapper'}>
      <div className={'cardsWrapper'} style={{left: leftDistance(this.props.currentCardIx) + 'px'}}>
        {cards}
      </div>
    </div>
  }
}

class Card extends Component{
  render(){
    let inside = '';

    if (this.props.central){
      if (QUOTA[this.props.data.value.comparisonSize] === undefined)
        console.warn('QUOTA undefined', this.props.data.value.comparisonSize);

      let quota = QUOTA[this.props.data.value.comparisonSize][this.props.data.value.comparisonTime];
      let foodQuota = QUOTA_PER_CATEGORY['food'] * quota;

      let percentageText = QUOTA_TEXT[this.props.data.value.comparisonSize][this.props.data.value.comparisonTime];
      if (percentageText === undefined)
        console.warn('percentage text undefined', this.props.data.value.comparisonSize, this.props.data.value.comparisonTime);
      let firstPercentageText = percentageText.replace('%TYPE%', '');
      let secondPercentageText = percentageText.replace('%TYPE%', 'food');

      let firstPercentage = 100 * this.props.data.carbonValue / quota;
      let secondPercentage = 100 * this.props.data.carbonValue / foodQuota;

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
        <div><CirclePercentageWrapper width={100} strokeWidth={3} percentage={firstPercentage} text={firstPercentageText}/>
          <div style={{display: 'inline-block', width: '40px'}}></div>
          <CirclePercentageWrapper width={100} strokeWidth={3} percentage={secondPercentage} text={secondPercentageText}/></div>

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
    return <div className={'card ' + (this.props.central ? 'card-central' : '')} onClick={this.props.handleClick}>
      {inside}
    </div>
  }
}
