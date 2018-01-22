import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import './data.js'
import {VictoryChart, VictoryTooltip, VictoryBar} from 'victory';
import {food_defaults, foods, DATABASE, transportations, food_stores, ONE_MILLION, DEFAULTS} from './data.js';


const resultsForFood = (food_name) => {
    let parameters = Object.assign({}, food_defaults, foods[food_name]);
    console.log(parameters);
    let carbon_intensity = (
        (parameters['fertilizer'] * DATABASE['fertilizer'] +
            parameters['pesticide'] * DATABASE['pesticide'])
        * (1 - parameters['organic']) +
        0 * 1 );// machines
    // (fertilizer + pesticides) * organic +
    // machines() * / surface_productivity * by_hand
    let kgs_for_full_diet = 1 / parameters['calories_per_kg'] * DEFAULTS['calories_per_day'] * 365;
    let co2_in_year = kgs_for_full_diet * carbon_intensity / ONE_MILLION;

    return {
        carbon_intensity: carbon_intensity,
        emit_yearly: co2_in_year,
        emit_yearly_percentage: co2_in_year / 2,
    };
};

const insideSvgCoordinates = (ev) => {
    let e = ev.target;
    let dim = e.getBoundingClientRect();
    let x = ev.clientX - dim.left;
    let y = ev.clientY - dim.top;
    return {x: x, y: y};
};


const getData = () => {
    return [{'label': '1km by car', 'x': 2, 'y': 1.3937960258504656},
        {'label': '100km by car', 'x': 4, 'y': 1.6033299822251088},
        {'label': '1 ice cream', 'x': 6, 'y': 1.6625894376038757},
        {'label': '1 year of eating tomatoes', 'x': 8, 'y': 2.6994302362045834},
        {'label': '10 years lighting a house', 'x': 10, 'y': 2.8095579675134426},
        {'label': '1km by car', 'x': 12, 'y': 3.4748514983368164},
        {'label': '1km by car', 'x': 14, 'y': 4.7970105334035615},
        {'label': '100km by car', 'x': 16, 'y': 5.549900644796941},
        {'label': '1 ice cream', 'x': 18, 'y': 5.643487653478825},
        {'label': '1 year of eating tomatoes', 'x': 20, 'y': 5.811806076104756},
        {'label': '10 years lighting a house', 'x': 22, 'y': 8.150415975772685},
        {'label': '1km by car', 'x': 24, 'y': 9.466891325894492},
        {'label': '1km by car', 'x': 26, 'y': 9.531939120102182},
        {'label': '100km by car', 'x': 28, 'y': 9.994791127999356},
        {'label': '1 ice cream', 'x': 30, 'y': 12.463037891258178},
        {'label': '1 year of eating tomatoes', 'x': 32, 'y': 13.636767502493697},
        {'label': '10 years lighting a house', 'x': 34, 'y': 13.755044538966992},
        {'label': '1km by car', 'x': 36, 'y': 14.814293060984209},
        {'label': '1km by car', 'x': 38, 'y': 16.230154740373614},
        {'label': '100km by car', 'x': 40, 'y': 17.61333001613964},
        {'label': '1 ice cream', 'x': 42, 'y': 18.75480162816342},
        {'label': '1 year of eating tomatoes', 'x': 44, 'y': 20.428818959926193},
        {'label': '10 years lighting a house', 'x': 46, 'y': 20.434683999899534},
        {'label': '1km by car', 'x': 48, 'y': 20.566542924905463},
        {'label': '1km by car', 'x': 50, 'y': 20.578347345432448},
        {'label': '100km by car', 'x': 52, 'y': 21.732576979466664},
        {'label': '1 ice cream', 'x': 54, 'y': 22.594603457984082},
        {'label': '1 year of eating tomatoes', 'x': 56, 'y': 22.823841804608453},
        {'label': '10 years lighting a house', 'x': 58, 'y': 23.912204786099075},
        {'label': '1km by car', 'x': 60, 'y': 24.272402323537825},
        {'label': '1km by car', 'x': 62, 'y': 25.09555286958849},
        {'label': '100km by car', 'x': 64, 'y': 26.29839213632943},
        {'label': '1 ice cream', 'x': 66, 'y': 26.441900841470538},
        {'label': '1 year of eating tomatoes', 'x': 68, 'y': 28.20870820545329},
        {'label': '10 years lighting a house', 'x': 70, 'y': 30.067147492885695},
        {'label': '1km by car', 'x': 72, 'y': 31.20641056408488},
        {'label': '1km by car', 'x': 74, 'y': 32.36471743920966},
        {'label': '100km by car', 'x': 76, 'y': 32.97143641193778},
        {'label': '1 ice cream', 'x': 78, 'y': 33.34239112020552},
        {'label': '1 year of eating tomatoes', 'x': 80, 'y': 35.07360358116402},
        {'label': '10 years lighting a house', 'x': 82, 'y': 35.81736572698605},
        {'label': '1km by car', 'x': 84, 'y': 39.032520651401654},
        {'label': '1km by car', 'x': 86, 'y': 39.25790219285161},
        {'label': '100km by car', 'x': 88, 'y': 39.50704168507629},
        {'label': '1 ice cream', 'x': 90, 'y': 40.631291620056786},
        {'label': '1 year of eating tomatoes', 'x': 92, 'y': 40.861920011143226},
        {'label': '10 years lighting a house', 'x': 94, 'y': 41.23585929496499},
        {'label': '1km by car', 'x': 96, 'y': 41.38475474336075},
        {'label': '1km by car', 'x': 98, 'y': 42.76257650079405},
        {'label': '100km by car', 'x': 100, 'y': 43.323821224803496},
        {'label': '1 ice cream', 'x': 102, 'y': 43.73946389328973},
        {'label': '1 year of eating tomatoes', 'x': 104, 'y': 43.84470724067163},
        {'label': '10 years lighting a house', 'x': 106, 'y': 44.38140324393086},
        {'label': '1km by car', 'x': 108, 'y': 45.17847008799333},
        {'label': '1km by car', 'x': 110, 'y': 45.67546833122085},
        {'label': '100km by car', 'x': 112, 'y': 46.36918354788059},
        {'label': '1 ice cream', 'x': 114, 'y': 48.382322366867726},
        {'label': '1 year of eating tomatoes', 'x': 116, 'y': 50.35730242217652},
        {'label': '10 years lighting a house', 'x': 118, 'y': 50.89670118169237},
        {'label': '1km by car', 'x': 120, 'y': 51.04553539785212},
        {'label': '1km by car', 'x': 122, 'y': 51.47135658633097},
        {'label': '100km by car', 'x': 124, 'y': 51.61344173479562},
        {'label': '1 ice cream', 'x': 126, 'y': 52.255737977448504},
        {'label': '1 year of eating tomatoes', 'x': 128, 'y': 52.853145987271404},
        {'label': '10 years lighting a house', 'x': 130, 'y': 55.90308972020536},
        {'label': '1km by car', 'x': 132, 'y': 57.71033820511111},
        {'label': '1km by car', 'x': 134, 'y': 58.38829147271667},
        {'label': '100km by car', 'x': 136, 'y': 59.310391455960215},
        {'label': '1 ice cream', 'x': 138, 'y': 60.79530899358987},
        {'label': '1 year of eating tomatoes', 'x': 140, 'y': 61.395589873326735},
        {'label': '10 years lighting a house', 'x': 142, 'y': 62.589092331082846},
        {'label': '1km by car', 'x': 144, 'y': 63.995168032896416},
        {'label': '1km by car', 'x': 146, 'y': 64.48479484384693},
        {'label': '100km by car', 'x': 148, 'y': 65.37254063132634},
        {'label': '1 ice cream', 'x': 150, 'y': 66.86664607231894},
        {'label': '1 year of eating tomatoes', 'x': 152, 'y': 67.34478946200008},
        {'label': '10 years lighting a house', 'x': 154, 'y': 67.72572344090527},
        {'label': '1km by car', 'x': 156, 'y': 68.80679711315935},
        {'label': '1km by car', 'x': 158, 'y': 69.50815764623503},
        {'label': '100km by car', 'x': 160, 'y': 70.18823236002301},
        {'label': '1 ice cream', 'x': 162, 'y': 70.38465828468789},
        {'label': '1 year of eating tomatoes', 'x': 164, 'y': 71.44827576037011},
        {'label': '10 years lighting a house', 'x': 166, 'y': 72.37927519531402},
        {'label': '1km by car', 'x': 168, 'y': 72.6078580570894},
        {'label': '1km by car', 'x': 170, 'y': 73.0464424192034},
        {'label': '100km by car', 'x': 172, 'y': 73.0671045536365},
        {'label': '1 ice cream', 'x': 174, 'y': 74.28082170532348},
        {'label': '1 year of eating tomatoes', 'x': 176, 'y': 75.88538926040161},
        {'label': '10 years lighting a house', 'x': 178, 'y': 75.94070064927563},
        {'label': '1km by car', 'x': 180, 'y': 76.80907616446112},
        {'label': '1km by car', 'x': 182, 'y': 77.93164901158013},
        {'label': '100km by car', 'x': 184, 'y': 79.17964766819873},
        {'label': '1 ice cream', 'x': 186, 'y': 79.33955357412125},
        {'label': '1 year of eating tomatoes', 'x': 188, 'y': 79.39998326855635},
        {'label': '10 years lighting a house', 'x': 190, 'y': 79.72120948055495},
        {'label': '1km by car', 'x': 192, 'y': 79.79574770378213},
        {'label': '1km by car', 'x': 194, 'y': 80.55959994043842},
        {'label': '100km by car', 'x': 196, 'y': 82.0638891082511},
        {'label': '1 ice cream', 'x': 198, 'y': 82.44656894969224},
        {'label': '1 year of eating tomatoes', 'x': 200, 'y': 83.4870381183908}]
};

const colorFromIntensity = (intensity) => {
    let min = 0;
    let max = 90;
    // return 'tomato';
    let hue = (1 - (intensity - min) / (max - min)) * 100;
    let toReturn = 'hsl( ' + hue + ', 100%, 50%)';
    return toReturn;
};

const updateParams = (widthProportion, scale, width, height) => {
    console.log('new params', widthProportion, scale, width, height);
    return {
        curveY: (1 - widthProportion**3) * height,
        curveX: widthProportion * width,
        currentCarbonValue: widthProportion**3 * scale,
        curveScale: scale,
    }
};

const afterZoomParams = (prevState, coeff) => {
    // the scale gets bigger, so the x index is lower. The currentCarbonValue,
    // widthPropotion**3 * scale is unchanged
    // so newWidthProp**3 = 2 * oldWidthProp**3
    // newWidthProp = 2**(1/3)
    const newWidthProportion = prevState.curveX / prevState.width * (1 / coeff)**(1/3);
    return {
        curveX: newWidthProportion * prevState.width,
        curveY: (1 - newWidthProportion**3) * prevState.height,
        curveScale: coeff * prevState.curveScale,
    }
};


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
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <SvgChart />
                {/*<Result itemName="tomato"/>*/}
                {/*<div style={{width: '800px', }}>*/}
                    {/*<Chart onMouseEnter={this.onMouseEnter}/>*/}
                    {/*<Detail text={this.state.detailText}/>*/}
                {/*</div>*/}

            </div>
        );
  }
}

class SvgChart extends Component{
    constructor(props){
        super();
        this.state = {
            curveX: 0,
            curveY: 400,
            width: 800,
            height: 400,
            curveScale: 10, // max value
            currentCarbonValue: 0,
        }
    }
    handleMouseOver = (ev) => {
        const realCoordinates = insideSvgCoordinates(ev);
        console.log(realCoordinates);
        let widthProportion = realCoordinates.x / this.state.width;
        this.setState(updateParams(widthProportion, this.state.curveScale, this.state.width, this.state.height));
    };

    handleZoom = (more) => {
        console.log('zoom, ', more);
        const coeff = more ? 2 : 1/2;
        this.setState((prevState, props) => {
            console.log('prevstate', prevState);
            return afterZoomParams(prevState, coeff);
        });
    };

    handleZoomLess = () => {this.handleZoom(false)};
    handleZoomMore = () => {this.handleZoom(true)};


    render(){
        return <div className="container" style={{width: this.state.width + 'px', height: this.state.height + 'px', margin: 'auto'}}>
            <svg width={'100%'} height={'100%'} onMouseMove={this.handleMouseOver}>
                <rect width={'100%'} height={'100%'} fill={'rgba(0,0,0,0.03)'}></rect>
                {/*<polygon points={'0,400 800,400, 800,0'} fill={'grey'} stroke={'black'} onMouseOver={this.onMouseOver()} />*/}
                <path d="M0,400 c266,0 533,0 800,-400" fill="none" strokeWidth="2" stroke="black"/>
                <path d="M0,400 c266,0 533,0 800,-400 L800,400 z" fill="rgba(0,0,0,0.2)" stroke="none" />
                {/* TODO transformation: transition works on the circle (but not line) in Chrome, none of them works in Firefox*/}
                {/*tranform: translate works but is only relative, so this is annoying. Could be enough for when doing zoom though*/}
                <line x1={this.state.curveX} y1={this.state.height} x2={this.state.curveX} y2={this.state.curveY}
                      stroke={'black'} strokeWidth={4} pointerEvents={'none'}
                      style={{transition: 'x1 0.5s, x2 0.5s, y1 0.5s, y2 0.5s'}}/>
                <circle r={10} cx={this.state.curveX} cy={this.state.curveY} fill={'black'} pointerEvents={'none'}
                        style={{transition: 'cx 0.1s, cy 0.1s'}}/>



            </svg>
            <p style={{textAlign: 'center'}}>{this.state.currentCarbonValue}</p>
            <div>
                <button className={'button'} onClick={this.handleZoomLess}>Less</button>
                <button className={'button'} onClick={this.handleZoomMore}>More</button>
            </div>
        </div>
    }
}


function Detail(props) {
    if (props.text === '')
        { // noinspection JSConstructorReturnsPrimitive
            return null;
        }

    return <h4>{props.text}</h4>;
}


class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {data: []};
    }

    componentDidMount(){
        let data = getData();
        // for (let i = 0; i < data.length; i++){
        //     setTimeout(() => {this.setState({data: data.slice(0, i + 1)})}, i * 10);
        // }
        this.setState({data: data});
        console.log('change data');
    }

    render(){
        return <VictoryChart
            domain={{ x: [0, 200], y: [0, 90] }}
            // animate={{duration: 3}}
        >
            <VictoryBar
                labelComponent={
                    <VictoryTooltip
                        cornerRadius={(d) => 10}
                        pointerLength={(d) => 20}
                        flyoutStyle={{stroke: (d) => 'black'}}
                    />
                }
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            onMouseEnter: () => {
                                return [{
                                    target: "labels",
                                    mutation: (props) => {
                                        console.log('label props', props);
                                        this.props.onMouseEnter(props.text);
                                        return props.text === "clicked" ?
                                            null : { text: "clicked" }
                                    }
                                },
                                    {
                                        target: 'data',
                                        mutation: (props) => {
                                            console.log('data props', props);

                                            return {'style': Object.assign(props.style, {'filter': 'grayscale(0%)'})}
                                        }
                                    }];
                            },
                            onMouseLeave: () => {
                                return [{
                                    target: 'data',
                                    mutation: (props) => {
                                        return {'style': Object.assign(props.style, {'filter': 'grayscale(100%)'})}
                                    }
                                }]
                            }
                        }
                    },

                ]}
                data={this.state.data}
                style={{
                    data: {fill: d => colorFromIntensity(d.y), width: 10, filter: 'grayscale(100%)'}
                }}
            />
        </VictoryChart>
    }
}


class Result extends Component{
    constructor(props){
        console.log('constructing');
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
