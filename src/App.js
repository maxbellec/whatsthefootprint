import React, { Component } from 'react';
import './css/App.css';
import {SvgChart} from './charts';
import {Slider} from './cards/cards';
import {buildAllCards, findClosestCarbonValue, resultsForFood} from "./utils";
import {Header} from "./header";
import {VERTICAL_ORDER} from "./data/database";


class App extends Component {
  constructor(props){
    super();
    this.cards = buildAllCards();
    this.state = {
      detailText: '',
      currentTypeIx: 1,
      currentCardIndices: VERTICAL_ORDER.map(type => type === 'food' ? 2 : 0),
      topButtonInfo: '',
      bottomButtonInfo: '',
    }
  }

  handleSearchResult = (result) => {
    console.log('handleSearchResult', result);
    console.log(result.result);
  };

  currentType = () => VERTICAL_ORDER[this.state.currentTypeIx];
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
    VERTICAL_ORDER.forEach((type, ix) => {
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
        comparison: findClosestCarbonValue(currentCarbonValue, this.cards[VERTICAL_ORDER[currentVerticalIx - 1]]),
        type: VERTICAL_ORDER[currentVerticalIx - 1],
      };
    }
    if (currentVerticalIx < VERTICAL_ORDER.length - 1){
      bottomInfo = {
        comparison: findClosestCarbonValue(currentCarbonValue, this.cards[VERTICAL_ORDER[currentVerticalIx + 1]]),
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

  render() {
    return (
      <div className="App">
        <Header handleSearchResult={this.handleSearchResult}/>
        {/*<SvgChart />*/}
        <Slider currentTypeIx={this.state.currentTypeIx} currentCardIndices={this.state.currentCardIndices}
                topButtonInfo={this.state.topButtonInfo} bottomButtonInfo={this.state.bottomButtonInfo}
                cards={this.cards} updateComparison={this.updateComparison} handleCardsMove={this.handleCardsMove}
                handleMoveVertically={this.handleMoveVertically}/>

      </div>
    );
  }
}


export default App;
