/** @jsx createElement */
import {createElement, compile} from 'elliptical'

const transportUnitValues = [
  {text:'km', value: 'km'},
  {text:'kms', value: 'km'},
  {text:'kilometer', value: 'km'},
  {text:'kilometers', value: 'km'},
  {text:'m', value: 'm'},
  {text:'meter', value: 'm'},
  {text:'meters', value: 'm'},
];

const TransportUnit = {
  describe(){
    return <list items={transportUnitValues} />;
  }
};

const transportMeansItems = [
  {text: 'car', value: 'car'},
  {text: 'bus', value: 'bus'},
  {text: 'bike', value: 'bicycle'},
  {text: 'plane', value: 'plane'},
  {text: 'bicycle', value: 'bicycle'},
  {text: 'motorbike', value: 'motorbike'},
];

const TransportMeans = {
  describe(){
    return <list items={transportMeansItems} />;
  }
};

const FoodItems = {
  describe(){
    return <list id={'foodItem'} items={[
      {text: 'tomato', value: 'Tomato', qualifiers: ['tomato']},
      {text: 'banana', value: 'Banana', qualifiers: ['banana']},
      {text: 'onion', value: 'Onion', qualifiers: ['onion']},
    ]} />;
  }
};


const FoodUnit = {
  describe(){
    return <list items={['kg', 'kilograms', 'kilogram', 'l', 'liter', 'liters', 'gram', 'grams']} />;
  }
};

const Numbers = {
  describe(){
    return (
      <repeat separator={<literal text=''/>} max={9}>
        <list items={NUMBERS}/>
      </repeat>
    )
  }
};

const TransportQualifier = {
  describe(){
    return <list items={['by', 'with a', 'with', 'using a']}/>;
  }
};

const FoodQualifier = {
  describe(){
    return <list items={['of']}/>;
  }
};


const NUMBERS = [
  {text: '0', value:0},
  {text: '1', value:1},
  {text: '2', value:2},
  {text: '3', value:3},
  {text: '4', value:4},
  {text: '5', value:5},
  {text: '6', value:6},
  {text: '7', value:7},
  {text: '8', value:8},
  {text: '9', value:9},
];

const Space = {
  describe(){
    return (
      <repeat separator={<literal text="" />} max={3} min={1}>
        <literal text=" " />
      </repeat>
    );
  }
};

const OptionalSpace = {
  describe(){
    return (
      <repeat separator={<literal text="" />} max={3} min={0}>
        <literal text=" " />
      </repeat>
    );
  }
};

// Build our grammar out of Elements
const grammar = (
  <sequence limit={5}>
    <OptionalSpace />
    <choice id="whichSequence" limit={1}>
      <sequence id='withQuantity' argument='withQuantity'>
        {/*<map name="numbersMap" outbound={option => {console.log('numbersmap option', option); return option;}}>*/}
          {/*<Numbers id='number' />*/}
        {/*</map>*/}
        <Numbers id='number' />
        {/*<Space />*/}
        <Space />
        <choice limit={5} id="category">
          {/*transport */}
          <sequence argument="transport">
            <TransportUnit id='unit'/>
            <Space />
            <TransportQualifier />
            <Space />
            <TransportMeans id='item'/>
          </sequence>

          {/*food*/}
          <sequence argument='food'>
            <FoodUnit id='unit'/>
            <Space />
            <FoodQualifier />
            <Space />
            <FoodItems id='item' />
          </sequence>
        </choice>

      </sequence>
      <FoodItems id='item' argument='direct'/>
      <TransportMeans id='item' argument='direct'/>
    </choice>
  </sequence>
);

// Obtain a parse function from our grammar
export const parse = compile(grammar);
