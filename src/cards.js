import React, {Component} from "react";
import './css/cards.css';

const buildCardsFromData = data => {
    let cards = [];
    data.forEach(foodData => {
       foodData.possible_values.forEach(value => {
           cards.push({
               name: foodData.name,
               icon: foodData.icon,
               value: value,
               carbon_value: value.value * foodData.carbon_instensity,
               carbon_breakdown: foodData.carbon_breakdown,
           })
       })
    });

    // sort cards by carbon_value
    cards.sort((card, card_other) => card.carbon_value - card_other.carbon_value);

    return cards;
};

export class CardsSlider extends Component{
    constructor(props){
        super();
        // build cards
        this.cards = buildCardsFromData(props.data);
        console.log('cards', this.cards);
        this.state = {
            currentCardId: 2,
            left: -455,
        };
    }

    moveCards = (increment) => {
        // make sure we don't move further than 0 or max
        increment = Math.max(-this.state.currentCardId, increment);
        increment = Math.min((this.cards.length - this.state.currentCardId - 1), increment);
        this.setState((prevState, props) => {
            return {
                currentCardId: prevState.currentCardId + increment,
                left: prevState.left - increment * 420,
            };
        });
    };

    handleMoveRight = () => {this.moveCards(1)};
    handleMoveRight5 = () => {this.moveCards(5)};
    handleMoveFirst = () => {this.moveCards(-this.state.currentCardId)};
    handleMoveLast = () => {this.moveCards(this.cards.length - this.state.currentCardId - 1)};
    handleMoveLeft = () => {this.moveCards(-1)};
    handleMoveLeft5 = () => {this.moveCards(-5)};

    render(){
        let cards = this.cards.map((card, ix) =>
            <Card data={card} central={this.state.currentCardId === ix} key={ix} onClick={() => {console.log('click on card', ix); this.moveCards(ix - this.state.currentCardId)}}/>);
        return <div className={'sliderWrapper'}>
            <div style={{textAlign: 'center'}} onClick={() => console.log('click on button wrapper')}>
                <button className={'button'} onClick={this.handleMoveFirst}>First</button>
                <button className={'button'} onClick={this.handleMoveLeft5}>Previous 5</button>
                <button className={'button'} onClick={this.handleMoveLeft}>Previous</button>
                <button className={'button'} onClick={this.handleMoveRight}>Next</button>
                <button className={'button'} onClick={this.handleMoveRight5}>Next 5</button>
                <button className={'button'} onClick={this.handleMoveLast}>Last</button>
            </div>
            <div className={'cardsWrapper'} style={{left: this.state.left + 'px'}}>
                {cards}
            </div>
        </div>
    }
}

class Card extends Component{
    constructor(props){
        super();
    }

    render(){
        return  <div className={'card ' + (this.props.central ? 'card-central' : '')}>
            <h4>{this.props.data.name}</h4>
            <h4>{this.props.data.value.name}</h4>
            <h5>{this.props.data.value.value} kg</h5>
            <h6>{this.props.data.carbon_value} kg CO2 eq</h6>
        </div>
    }
}