import React, {Component} from 'react';
import {SearchBar} from "./search-bar/searchBar";
import {parse} from "./search-bar/elliptical";

export class Header extends Component{
  constructor(props){
    super();
    this.state = {
      searchValue: '',
      results: parse(''),
    }
  }

  handleSearchChange = (event) => {
    let newValue = event.target.value;
    if (newValue === ''){
      this.setState({
        searchValue: '',
        results: [],
      })
    }
    this.setState({
      searchValue: newValue,
      results: parse(newValue),
    });
    console.log('new search value', newValue);
  };

  // handleEnterPress = (event) => {
  //   console.log('key down', event.key);
  //   if (event.key !== 'Enter')
  //     return;
  //   console.log('OK, enter!', parse(this.state.searchValue));
  // };
  //
  // handleListClick = (resultIx) => {
  //   console.log('handleListClick', resultIx);
  // };

  handleResult = resultIx => {
    this.props.handleSearchResult(this.state.results[resultIx]);
  };

  render(){
    // show first result
    let sentence = '';
    if (this.state.searchValue.length > 0){
      let results = parse(this.state.searchValue);
      if (results.length){
        console.log('first result', results[0], results.length, results);
        let result = results[0].words;
        if (result)
          sentence = result.map(data => <span style={{color: data.input ? 'black': 'grey'}}>{data.text}</span>);
      }
    }

    return <div style={{textAlign: 'center', marginTop: '10px', marginBottom: '20px'}}>
      <img src="/logo.png" alt="logo tomato" style={{'width': '22%'}}/>
      <SearchBar searchValue={this.state.searchValue} handleChange={this.handleSearchChange}
                 handleResult={this.handleResult} results={this.state.results}/>
      <h3>{sentence}</h3>
    </div>
  }
}
