import React, { Component } from 'react';
import './css/App.css';
import {SvgChart} from './charts';
import {Slider} from './cards';
import {resultsForFood} from "./utils";
import {Header} from "./header";
import {FOOD_DATABASE} from "./data/database";
import {CirclePercentage, CirclePercentageWrapper} from "./widgets/circlePercentage";


class App extends Component {
    constructor(props){
        super();
        this.state = {
            detailText: '',
        }
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Slider />
                {/*<SvgChart />*/}
                {/*<Result itemName="tomato"/>*/}
                {/*<div style={{width: '800px', }}>*/}
                    {/*<Chart onMouseEnter={this.onMouseEnter}/>*/}
                    <Detail text={this.state.detailText}/>
                {/*</div>*/}

            </div>
        );
  }
}


function Detail(props) {
    if (props.text === '')
        { // noinspection JSConstructorReturnsPrimitive
            return null;
        }

    return <h4>{props.text}</h4>;
}


class Result extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.compute(this.props.tomato);
    }

    compute(){
        console.log('computing');
        this.setState(resultsForFood(this.props.itemName));
    }

    render(){
        return (
            <div id="result" >
                <h2>Result</h2>
                <p id='carbon_intensity_paragraph'>Carbon intensity: {this.state.carbon_intensity} g CO2 / kg</p>.
                <p>If you base your whole diet on it (we advise you not to...), you will emit {this.state.emit_yearly}
                tons of CO2 per year, the equivalent of {this.state.emit_yearly_percentage}% of the annual goal of 2 tons.</p>
                <pre></pre>
            </div>
        )
    }
}

export default App;
