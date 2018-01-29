import React, { Component } from 'react';
import './css/App.css';
import {SvgChart} from './charts';
import {Slider} from './cards/cards';
import {buildAllCards, cardFromData, findClosestCarbonValue, resultsForFood, UNIT_FROM_VERTICAL} from "./utils";
import {Header} from "./header";
import {DATABASE, VERTICAL_ORDER} from "./data/database";
import {parse} from "./search-bar/elliptical";


class App extends Component {
  constructor(props){
    super();
    this.state = {
      detailText: '',
      currentTypeIx: 1,
      currentCardIndices: VERTICAL_ORDER.map(type => type === 'food' ? 2 : 0),
      topButtonInfo: '',
      bottomButtonInfo: '',
      searchValue: '',
      searchResults: parse(''),
      cards: buildAllCards(),
    }
  }

  handleSearchChange = (event) => {
    let newValue = event.target.value;
    this.setState({
      searchValue: newValue,
      searchResults: parse(newValue),
    });
  };

  handleSearchResult = (resultIx) => {
    let result = this.state.searchResults[resultIx];
    console.log('handleSearchResult', result);
    console.log(result.result, result.result.whichSequence, Object.keys(result.result.whichSequence)[0]);
    let resultDetail = result.result.whichSequence;
    let number = 1;
    if (Object.keys(resultDetail)[0] === 'withQuantity'){
      let numbers = resultDetail.withQuantity.number;
      let number = parseInt(numbers.map(String).join(''));
      let item = resultDetail.withQuantity.category.item;
      console.log('number ', number, 'item', item, this.state.cards);

      console.log('dataType', result.arguments[1].value, result.arguments);
      let dataType = result.arguments[1].value;

      let newVerticalIx = VERTICAL_ORDER.indexOf(dataType);
      let cardIx = -1;

      // check if corresponding card exists
      this.state.cards[dataType].forEach((card, ix) => {
        if ((card.name === item) && (card.value.value === number)){
          cardIx = ix;
        }
      });

      let isInsertingCard = true;

      if (cardIx !== -1){
        // if card is found
        console.log('FOUND CARD!!');
        isInsertingCard = false;
      }
      else{
        // card was not found, we're creating it
        console.log('inserting card');
        var cards = Object.assign({}, this.state.cards);
        let data = {};
        DATABASE[dataType].forEach((card, ix) => {
          if (card.name === item)
            data = Object.assign({}, card);
        });
        let newCard = cardFromData(data,
          {name: '', value: number, comparisonTime: 'daily', comparisonSize: 'personal',},
          UNIT_FROM_VERTICAL[dataType]);

        // search where to insert the card
        cards[dataType].forEach((card, ix) => {
          if (card.value.value < number)
            cardIx = ix + 1;
        });

        console.log('card to insert', newCard, 'at position', cardIx);

        cards[dataType].splice(cardIx, 0, newCard);
      }

      let newCardIndices = Object.assign([], this.state.currentCardIndices);
      newCardIndices[newVerticalIx] = cardIx;
      document.getElementById('searchInput').blur();
      let newState = {
        currentTypeIx: newVerticalIx,
        currentCardIndices: newCardIndices,
        searchValue: '',
        searchResults: parse(''),
      };
      if (isInsertingCard)
        newState['cards'] = cards;
      this.setState(newState, this.updateComparison);
    }
  };

  // current vertical
  currentType = () => VERTICAL_ORDER[this.state.currentTypeIx];
  currentCardIx = () => this.state.currentCardIndices[this.state.currentTypeIx];
  currentCard = () => this.state.cards[this.currentType()][this.currentCardIx()];

  /* align vertical items */
  updateComparison = () => {
    console.log('update comparison', this.currentType(), this.currentCardIx(), this.state.cards);
    // get current carbon value
    let currentCarbonValue = this.state.cards[this.currentType()][this.currentCardIx()].carbonValue;
    // get top and bottom cards
    let currentVerticalIx = this.state.currentTypeIx;

    let newCardIndices = Object.assign({}, this.state.currentCardIndices);

    // for all other types, we update the index to the index whose carbon value
    // is the closest to the current one
    VERTICAL_ORDER.forEach((type, ix) => {
      if (ix === this.state.currentTypeIx){
        return
      }
      let res = findClosestCarbonValue(currentCarbonValue, this.state.cards[type]);
      newCardIndices[ix] = res['ixInType'];
    });

    let topInfo = '';
    let bottomInfo = '';
    if (currentVerticalIx > 0){
      topInfo = {
        comparison: findClosestCarbonValue(currentCarbonValue, this.state.cards[VERTICAL_ORDER[currentVerticalIx - 1]]),
        type: VERTICAL_ORDER[currentVerticalIx - 1],
      };
    }
    if (currentVerticalIx < VERTICAL_ORDER.length - 1){
      bottomInfo = {
        comparison: findClosestCarbonValue(currentCarbonValue, this.state.cards[VERTICAL_ORDER[currentVerticalIx + 1]]),
        type: VERTICAL_ORDER[currentVerticalIx + 1],
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
    console.log('currentTypeIx', this.state.currentTypeIx, 'VERTICAL_ORDER', VERTICAL_ORDER);
    let newIx = this.state.currentTypeIx + 1 - 2 * top;

    if ((newIx > VERTICAL_ORDER.length - 1) || (newIx < 0)){
      // throw 'Problem with currentTypeIx';
      return
    }

    this.setState({
      currentTypeIx: newIx,
    }, this.updateComparison);
  };

  updateSearchValue = (newValue) => this.setState({searchValue: newValue});

  handleCardClick = (ix) => {
    console.log('app card click', ix);
    this.handleCardsMove(ix - this.currentCardIx());
  };

  render() {
    return (
      <div className="App">
        <Header handleSearchResult={this.handleSearchResult} searchValue={this.state.searchValue}
                updateSearchValue={this.updateSearchValue} searchResults={this.state.searchResults}
                handleSearchChange={this.handleSearchChange}/>
        <SvgChart carbonValue={this.currentCard().carbonValue}/>
        {/*<SvgChart />*/}
        <Slider currentTypeIx={this.state.currentTypeIx} currentCardIndices={this.state.currentCardIndices}
                topButtonInfo={this.state.topButtonInfo} bottomButtonInfo={this.state.bottomButtonInfo}
                cards={this.state.cards} updateComparison={this.updateComparison} handleCardsMove={this.handleCardsMove}
                handleMoveVertically={this.handleMoveVertically}
                handleCardClick={this.handleCardClick}/>

      </div>
    );
  }
}


export default App;
