import React, { Component } from 'react';
import './css/App.css';
import {SvgChart} from './charts';
import {Slider} from './cards';
import {resultsForFood} from "./utils";
import {Header} from "./header";


class App extends Component {
  constructor(props){
    super();
    this.state = {
      detailText: '',
    }
  }

  handleSearchResult = (result) => {
    console.log('handleSearchResult', result);
    console.log(result.result);
  };

  render() {
    return (
      <div className="App">
        <Header handleSearchResult={this.handleSearchResult}/>
        <Slider />
        <Detail text={this.state.detailText}/>

      </div>
    );
  }
}


export default App;
