import React, {Component} from 'react';
import './searchBar.css';

export class SearchBar extends Component{
  constructor(){
    super();
    this.state = {
      focus: false,
    }
  }

  render(){
    console.log('search bar results', this.props.results);

    let proposals = '';

    if (this.state.focus){
      let results = this.props.results.slice(0, 5).map((result, ix) => {
        return <li onClick={() => this.props.handleResult(ix)}>
          {result.words.map(word => <span style={{color: word.input ? 'black': 'grey'}}>{word.text}</span>)}
        </li>
      });
      console.log('rendered', results);

      proposals = <div style={{position: 'absolute', backgroundColor: 'white', top: '38px', left: '3px', right: '3px', paddingLeft: '0.8rem', zIndex: '999999'}}>
        <ul className={'searchBarList'}>
          {results}
        </ul>
      </div>;

    }

    let borderRadius = this.state.focus ? 0 : '4px';

    return <div className={'search-bar'} style={{margin: 'auto', width: '40%', maxWidth: '500px', marginTop: '20px', marginBottom: '10px', position: 'relative'}}>
      <input type="text" style={{fontSize: '1.5rem', width: '100%', borderBottomRightRadius: borderRadius, borderBottomLeftRadius: borderRadius}}
             value={this.props.searchValue} id={'searchInput'}
             placeholder="e.g. 20 kg of Tomato" onChange={this.props.handleChange}
             onKeyUp={event => {if (event.key === 'Enter') return this.props.handleResult(0);}}
             onFocus={() => this.setState({focus: true})}
             onBlur={() => this.setState({focus: false})}/>
      {proposals}
    </div>
  }
}
