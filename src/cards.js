import React, {Component} from "react";
import './css/cards.css';
import {CirclePercentageWrapper} from "./widgets/circlePercentage";
import {FOOD_DATABASE, QUOTA, QUOTA_PER_CATEGORY, QUOTA_TEXT, TRANSPORT_DATABASE} from "./data/database";
import {formatNumber} from "./utils";

const findClosestCarbonValue = (value, otherCards) => {
  // TODO this could be very much optimised

  let toReturn = {};
  let closestDistance = Infinity;
  otherCards.forEach((card, ix) => {
    let newDistance = Math.abs(card.carbonValue - value);
    if (newDistance < closestDistance){
      closestDistance = newDistance;
      toReturn['text'] = card.nameWithValue;
      toReturn['ixInType'] = ix;
    }
  });

  return toReturn;
};

const START_LEFT = 127;
const START_IX = 2;
const MOVE_LEFT_EVERY_CARD = 272;
const ONE_SLIDER_HEIGHT = 500;
const SLIDER_START = 65;

const leftDistance = (currentIx) => {
  return START_LEFT - (currentIx - START_IX) * MOVE_LEFT_EVERY_CARD;
};

const buildCards = dataType => {
  let data = {};
  let unit = '';
  if (dataType === 'food'){
    data = FOOD_DATABASE;
    unit = 'kg';
  }
  else if (dataType === 'transport'){
    data = TRANSPORT_DATABASE;
    unit = 'km';
  }
  else{
    throw "expected dataType to be one of (food, transport, ...), was " + dataType;
  }

  let cards = [];
  data.forEach(foodData => {
    foodData.possibleValues.forEach(value => {
      cards.push({
        name: foodData.name,
        icon: foodData.icon,
        value: value,
        carbonValue: value.value * foodData.carbonIntensity,
        carbonBreakdown: foodData.carbonBreakdown,
        nameWithValue: foodData.name + ' (' + formatNumber(value.value) + ' ' + unit + ')',
      })
    })
  });

  // sort cards by carbonValue
  cards.sort((card, card_other) => card.carbonValue - card_other.carbonValue);

  return cards;
};

const buildAllCards = () => {
  let toReturn = {};
  verticalOrder.forEach(dataType => {
    toReturn[dataType] = buildCards(dataType)
  });

  return toReturn
};

let verticalOrder = ['transport', 'food'];

export class Slider extends Component{
  constructor(){
    super();
    this.cards = buildAllCards();
    this.state = {
      currentCardIndices: verticalOrder.map(type => type === 'food' ? 2 : 0),
      topButtonInfo: '',
      bottomButtonInfo: '',
      currentTypeIx: 1,
    };
  }

  componentDidMount = () => {
    this.updateComparison();
  };

  currentType = () => verticalOrder[this.state.currentTypeIx];
  currentCardIx = () => this.state.currentCardIndices[this.state.currentTypeIx];

  updateComparison = () => {
    console.log('update comparison');
    // get current carbon value
    let currentCarbonValue = this.cards[this.currentType()][this.currentCardIx()].carbonValue;
    // get top and bottom cards
    let currentVerticalIx = this.state.currentTypeIx;

    let newCardIndices = Object.assign({}, this.state.currentCardIndices);

    // for all other types, we update the index to the index whose carbon value
    // is the closest to the current one
    verticalOrder.forEach((type, ix) => {
      if (ix === this.state.currentTypeIx){
        return
      }
      let res = findClosestCarbonValue(currentCarbonValue, this.cards[type]);
      newCardIndices[ix] = res['ixInType'];
    });

    let topInfo = '';
    let bottomInfo = '';
    if (currentVerticalIx > 0){
      topInfo = {
        comparison: findClosestCarbonValue(currentCarbonValue, this.cards[verticalOrder[currentVerticalIx - 1]]),
        type: verticalOrder[currentVerticalIx - 1],
      };
    }
    if (currentVerticalIx < verticalOrder.length - 1){
      bottomInfo = {
        comparison: findClosestCarbonValue(currentCarbonValue, this.cards[verticalOrder[currentVerticalIx + 1]]),
        type: verticalOrder[currentVerticalIx + 1],
      };
    }

    this.setState({
      topButtonInfo: topInfo,
      bottomButtonInfo: bottomInfo,
      currentCardIndices: newCardIndices,
    });
  };

  handleCardsMove = (increment) => {
    console.log('handle cards move', this.currentCardIx(), increment);
    this.setState((prevState) => {
      let newCardIndices = Object.assign({}, prevState.currentCardIndices);
      newCardIndices[prevState.currentTypeIx] += increment;
      return {currentCardIndices: newCardIndices};
    }, this.updateComparison);
  };

  handleMoveVertically = top => {
    console.log('currentTypeIx', this.state.currentTypeIx, 'verticalOrder', verticalOrder);
    let newIx = this.state.currentTypeIx + 1 - 2 * top;

    if ((newIx > verticalOrder.length - 1) || (newIx < 0)){
      // throw 'Problem with currentTypeIx';
      return
    }

    this.setState({
      currentTypeIx: newIx,
    }, this.updateComparison);
  };

  handleGoToTop = () => {this.handleMoveVertically(true)};
  handleGoToBottom = () => {this.handleMoveVertically(false)};

  moveCards = (increment) => {
    // make sure we don't move further than 0 or max
    increment = Math.max(-this.currentCardIx(), increment);
    increment = Math.min((this.cards[this.currentType()].length - this.currentCardIx() - 1), increment);
    this.handleCardsMove(increment);
  };

  handleMoveRight = () => {this.moveCards(1)};
  handleMoveRight5 = () => {this.moveCards(5)};
  handleMoveFirst = () => {this.moveCards(-this.currentCardIx())};
  handleMoveLast = () => {this.moveCards(this.cards[this.currentType()].length - this.currentCardIx()- 1)};
  handleMoveLeft = () => {this.moveCards(-1)};
  handleMoveLeft5 = () => {this.moveCards(-5)};

  render(){
    let topButton = '';
    let bottomButton = '';

    if (this.state.topButtonInfo || true) {
      topButton = <button className="button topComparisonButton" onClick={this.handleGoToTop}>
        Compare with {this.state.topButtonInfo.type} - {this.state.topButtonInfo.comparison && this.state.topButtonInfo.comparison.text}
      </button>;
    }
    if (this.state.bottomButtonInfo || true) {
      bottomButton = <button className="button bottomComparisonButton" onClick={this.handleGoToBottom}>
        Compare with {this.state.bottomButtonInfo.type} - {this.state.bottomButtonInfo.comparison && this.state.bottomButtonInfo.comparison.text}
      </button>;
    }

    let sliders = verticalOrder.map((type, ix) => {
      let handleMove = null;
      // buttons

      let navButtons = '';

      if (ix === this.state.currentTypeIx){
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
      let slider = <CardsSlider cards={this.cards[type]} currentCardIx={this.state.currentCardIndices[ix]} key={'slider-' + ix}/>;
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
      <div className={'SlidersContainer'} style={{top: (-this.state.currentTypeIx * ONE_SLIDER_HEIGHT + SLIDER_START)+ 'px'}}>
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
      <Card data={card} central={this.props.currentCardIx === ix} key={ix}/>);
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
    return <div className={'card ' + (this.props.central ? 'card-central' : '')}>
      {inside}
    </div>
  }
}
