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

  handleResult = resultIx => {
    this.props.handleSearchResult(this.state.results[resultIx]);
  };

  render(){
    return <div style={{textAlign: 'center', marginTop: '10px', marginBottom: '20px'}}>
      <img src="/logo.png" alt="logo tomato" style={{'width': '22%'}}/>
      <SearchBar searchValue={this.state.searchValue} handleChange={this.handleSearchChange}
                 handleResult={this.handleResult} results={this.state.results}/>
    </div>
  }
}
