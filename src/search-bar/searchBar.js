import React, {Component} from 'react';

export class SearchBar extends Component{

  render(){
    return <div className={'search-bar'} style={{margin: 'auto', width: '40%', maxWidth: '500px', marginTop: '20px', marginBottom: '10px',}}>
      <input type="text" style={{fontSize: '16px', width: '100%'}} value={this.props.searchValue}
             placeholder="e.g. 20 kg of Tomatoes" onChange={this.props.handleChange}
             onKeyUp={this.props.handleEnterPress}/>
    </div>
  }
}
