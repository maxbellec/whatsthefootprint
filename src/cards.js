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
    constructor(props){
        super();
        this.cards = buildAllCards();
        console.log('transport cards', this.transportCards);
        this.state = {
            currentCardIx: 2,
            topButtonInfo: '',
            bottomButtonInfo: '',
            currentType: 'food',
        };
    }

    componentDidMount = () => {
        this.updateComparison();
    };

    updateComparison = () => {
        console.log('update comparison');
        // get current carbon value
        let currentCarbonValue = this.cards[this.state.currentType][this.state.currentCardIx].carbonValue;
        // get top and bottom cards
        let currentVerticalIx = verticalOrder.indexOf(this.state.currentType);

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
        });
    };

    handleCardsMove = (increment) => {
        console.log('handle cards move', this.state.currentCardIx, increment);
        this.setState((prevState, props) => {
            return {currentCardIx: prevState.currentCardIx + increment};
        });
        this.updateComparison();
    };

    handleMoveVertically = top => {
        let currentTypeIx = verticalOrder.indexOf(this.state.currentType);
        console.log('currentTypeIx', currentTypeIx, 'verticalOrder', verticalOrder);
        let newIx = currentTypeIx + 1 - 2 * top;
        let newType = verticalOrder[newIx];

        if ((newIx > verticalOrder.length - 1) || (newIx < 0)){
            throw 'Problem with currentTypeIx';
        }

        let newCardIx = top ? this.state.topButtonInfo.comparison.ixInType : this.state.bottomButtonInfo.comparison.ixInType;

        this.setState({
            currentType: newType,
            currentCardIx: newCardIx,
        }, this.updateComparison);
    };

    handleGoToTop = () => {this.handleMoveVertically(true)};
    handleGoToBottom = () => {this.handleMoveVertically(false)};

    render(){
        let topButton = '';
        let bottomButton = '';
        console.log('slider render', this.state);
        if (this.state.topButtonInfo){
            topButton = <button className="button" onClick={this.handleGoToTop}>Compare with {this.state.topButtonInfo.type} - {this.state.topButtonInfo.comparison.text}</button>;
        }
        if (this.state.bottomButtonInfo){
            bottomButton = <button className="button" onClick={this.handleGoToBottom}>Compare with {this.state.bottomButtonInfo.type} - {this.state.bottomButtonInfo.comparison.text}</button>;
        }

        return <div style={{textAlign: 'center'}}>
            {topButton}
            <CardsSlider cards={this.cards[this.state.currentType]} currentCardIx={this.state.currentCardIx} handleMove={this.handleCardsMove}/>
            <div style={{marginTop: '350px'}}></div>
            {bottomButton}
        </div>
    }
}

class CardsSlider extends Component{
    constructor(props){
        super();
        this.state = {
            left: leftDistance(props.currentCardIx),
        };
    }

    moveCards = (increment) => {
        // make sure we don't move further than 0 or max
        increment = Math.max(-this.props.currentCardIx, increment);
        increment = Math.min((this.props.cards.length - this.props.currentCardIx - 1), increment);

        this.props.handleMove(increment);
        this.setState((prevState, props) => {
            return {
                left:START_LEFT - (this.props.currentCardIx + increment - START_IX) * MOVE_LEFT_EVERY_CARD,
            };
        });
    };

    handleMoveRight = () => {this.moveCards(1)};
    handleMoveRight5 = () => {this.moveCards(5)};
    handleMoveFirst = () => {this.moveCards(-this.props.currentCardIx)};
    handleMoveLast = () => {this.moveCards(this.props.cards.length - this.props.currentCardIx- 1)};
    handleMoveLeft = () => {this.moveCards(-1)};
    handleMoveLeft5 = () => {this.moveCards(-5)};

    render(){
        console.log('cardsSlider render', this.props.cards);
        if (this.props.cards === undefined)
            return null;
        let cards = this.props.cards.map((card, ix) =>
            <Card data={card} central={this.props.currentCardIx === ix} key={ix} onClick={() => {console.log('click on card', ix); this.moveCards(ix - this.state.currentCardId)}}/>);
        return <div className={'sliderWrapper'}>
            <div style={{textAlign: 'center'}} onClick={() => console.log('click on button wrapper')}>
                <button className={'button'} onClick={this.handleMoveFirst}>First</button>
                <button className={'button'} onClick={this.handleMoveLeft5}>Previous 5</button>
                <button className={'button'} onClick={this.handleMoveLeft}>Previous</button>
                <button className={'button'} onClick={this.handleMoveRight}>Next</button>
                <button className={'button'} onClick={this.handleMoveRight5}>Next 5</button>
                <button className={'button'} onClick={this.handleMoveLast}>Last</button>
            </div>
            <div className={'cardsWrapper'} style={{left: leftDistance(this.props.currentCardIx) + 'px'}}>
                {cards}
            </div>
        </div>
    }
}

class Card extends Component{
    constructor(props){
        super();
        this.showBottom = true;
    }

    render(){
        let inside = '';

        if (this.props.central){
            let quota = QUOTA[this.props.data.value.comparisonSize][this.props.data.value.comparisonTime];
            let foodQuota = QUOTA_PER_CATEGORY['food'] * quota;
            let percentageText = QUOTA_TEXT[this.props.data.value.comparisonSize][this.props.data.value.comparisonTime];
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
