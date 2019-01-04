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
      <img src="img/right_arrow.png" alt="right arrow" className={'rightArrow'} onClick={() => {console.log('CLICKARROW'); this.handleMoveRight()}}/>
      <img src="img/right_arrow.png" alt="right arrow" className={'leftArrow'} onClick={this.handleMoveLeft}/>
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
        <h4 style={{fontSize: '2.2rem', marginBottom: 0}}>{this.props.data.nameWithValue}</h4>
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

export const KG_FOOD_PER_PRODUCER_TRUCK = 1000;  // kg
export const PRODUCER_FUEL_INTENSITY = 0.4; // kg CO2-eq / km
export const PRODUCER_DISTANCE_INTENSITY = PRODUCER_FUEL_INTENSITY / KG_FOOD_PER_PRODUCER_TRUCK;
export const ORGANIC_PRODUCTIVITY_FACTOR = 0.8;
export const GREENHOUSE_INTENSITY = 0.1; // kg CO2-eq / kg food
export const PESTICIDES_INTENSITIES = {
  tomato: 1,
};
export const MACHINE_CONSUMPTIONS = {
  tomato: 1,
};

export class VegetableWidget extends Component{
  constructor(){
    super();
    this.state = {
      whereGrownValue: 'field',
      organic: false,
      producerDistance: 300, // km
      carbonValue: 0,
    }
  };

  componentDidMount = () => {this.updateCarbonValue()};

  updateCarbonValue = () => {
    console.log('update carbon value', this.state.whereGrownValue, this.state.organic);
    if (this.state.whereGrownValue === 'garden'){
      let carbonValue = this.state.organic ? 0 : PESTICIDES_INTENSITIES[this.props.name.toLowerCase()]; // kg CO2-eq / kg of food
      console.log('in the garden', this.state.organic, carbonValue);
      this.setState({carbonValue: carbonValue});
      return;
    }
    let organicFactor = this.organic ? ORGANIC_PRODUCTIVITY_FACTOR : 1;
    let carbonValue = (MACHINE_CONSUMPTIONS[this.props.name.toLowerCase()] / organicFactor +
      this.state.producerDistance * PRODUCER_DISTANCE_INTENSITY
      + (this.state.whereGrownValue === 'greenhouse') * GREENHOUSE_INTENSITY); // kg CO2-eq / kg of food
    this.setState({carbonValue: carbonValue});
  };

  handleDistanceChange = (ev) => {
    this.setState({producerDistance: ev.target.value}, this.updateCarbonValue);
  };

  handleWhereGrownChange= (ev) => {
    console.log('where grown change', ev.target.value);
    this.setState({whereGrownValue: ev.target.value}, this.updateCarbonValue);
  };

  handleOrganicChange= (ev) => {
    console.log('organic change', ev.target.value);
    this.setState({organic: ev.target.value}, this.updateCarbonValue);
  };

  render(){
    let whereGrown = <select className={'simpleSelect'} value={this.state.whereGrownValue} onChange={this.handleWhereGrownChange}>
      <option value={'field'}>in a field</option>
      <option value={'greenhouse'}>in a greenhouse</option>
      <option value={'garden'}>in your garden</option>
    </select>;

    let organic = <select className={'simpleSelect'} value={this.state.organic} onChange={this.handleOrganicChange}>
      <option value={true}>organically</option>
      <option value={false}>conventionally</option>
    </select>;

    let producerDistance = '';

    if (this.state.whereGrownValue !== 'garden'){
      producerDistance = <span>The producer is
        <input name={'producerDistance'} value={this.state.producerDistance} type={'number'}
               onChange={this.handleDistanceChange} className={'simpleInput'}/>
        km from the shop.
      </span>;
    }

    return <div>
      {this.props.name} grown {whereGrown}, {organic}. {producerDistance}
      <p>{formatNumber(this.state.carbonValue)}</p>
    </div>
  }
}
