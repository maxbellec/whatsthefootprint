import React, {Component} from 'react';
import {SearchBar} from "./search-bar/searchBar";
import {parse} from "./search-bar/elliptical";

export class Header extends Component{
  render(){
    return <div style={{textAlign: 'center', marginTop: '10px', marginBottom: '20px'}}>
      <img src="/logo.png" alt="logo tomato" style={{'width': '22%'}}/>
      <SearchBar searchValue={this.props.searchValue} handleChange={this.props.handleSearchChange}
                 handleResult={this.props.handleSearchResult} results={this.props.searchResults}/>
    </div>
  }
}
