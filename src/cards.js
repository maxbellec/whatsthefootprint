import React, {Component} from "react";

export class CardsSlider extends Component{
    constructor(props){
        super();
        this.state = {
            cards: ['Tomato', 'Aubergine', 'Car', 'Bus', 'Heating', 'Building'],
            currentCardId: 2,
            left: -250,
        };
    }

    moveCards = (increment) => {
        this.setState((prevState, props) => {
            return {
                currentCardId: prevState.currentCardId + increment,
                left: prevState.left - increment * 420,
            };
        });
    };

    handleMoveRight = () => {this.moveCards(1)};
    handleMoveLeft = () => {this.moveCards(-1)};

    render(){
        let cards = this.state.cards.map((cardName, ix) =>
            <Card name={cardName} central={this.state.currentCardId === ix} key={ix} onClick={() => {console.log('click on card', ix); this.moveCards(ix - this.state.currentCardId)}}/>);
        return <div className={'sliderWrapper'}>
            <div style={{textAlign: 'center'}} onClick={() => console.log('click on button wrapper')}>
                <button className={'button'} onClick={this.handleMoveLeft}>Previous</button>
                <button className={'button'} onClick={this.handleMoveRight}>Next</button>
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
            <h4>{this.props.name}</h4>
            <p>This index.html page is a placeholder with the CSS, font and favicon. It's just waiting for you to add some content! If you need some help hit up the <a href="http://www.getskeleton.com">Skeleton documentation</a>.</p>
        </div>
    }
}