import {DEFAULTS, food_defaults, foods, ONE_MILLION} from "./data";
import {VERTICAL_ORDER} from "./data/database";
import {DATABASE} from "./data/database";

export const insideSvgCoordinates = (ev) => {
  let e = ev.target;
  let dim = e.getBoundingClientRect();
  let x = ev.clientX - dim.left;
  let y = ev.clientY - dim.top;
  return {x: x, y: y};
};

export const colorFromIntensity = (intensity) => {
  let min = 0;
  let max = 90;
  // return 'tomato';
  let hue = (1 - (intensity - min) / (max - min)) * 100;
  return 'hsl( ' + hue + ', 100%, 50%)';
};

export const resultsForFood = (food_name) => {
  let parameters = Object.assign({}, food_defaults, foods[food_name]);
  console.log(parameters);
  let carbonIntensity = (
    (parameters['fertilizer'] * DATABASE['fertilizer'] +
      parameters['pesticide'] * DATABASE['pesticide'])
    * (1 - parameters['organic']) +
    0 * 1 );// machines
  // (fertilizer + pesticides) * organic +
  // machines() * / surface_productivity * by_hand
  let kgs_for_full_diet = 1 / parameters['calories_per_kg'] * DEFAULTS['calories_per_day'] * 365;
  let co2_in_year = kgs_for_full_diet * carbonIntensity / ONE_MILLION;

  return {
    carbon_intensity: carbonIntensity,
    emit_yearly: co2_in_year,
    emit_yearly_percentage: co2_in_year / 2,
  };
};


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

const roundNumber = (number, rounding) => {
  return decimalAdjust('round', number, rounding);
};

const exponentOfNumber = (number) => Math.floor(Math.log10(number));

export const formatNumber = (number) => {
  let exponent = exponentOfNumber(number);
  if (exponent < 0){
    return decimalAdjust('round', number, exponent);
  }
  if (exponent === 0){
    return decimalAdjust('round', number, -1);
  }
  let toReturnString = decimalAdjust('round', number, 0) + '';

  if (toReturnString.length > 3){
    toReturnString = (toReturnString.slice(0, toReturnString.length - 3) + ' ' +
      toReturnString.slice(toReturnString.length - 3));
  }
  return toReturnString;
};

export const findClosestCarbonValue = (value, otherCards) => {
  // note: if there are a lot of cards, this should be optimized by using a
  // binary search since cards are sorted
  let toReturn = {};
  let closestDistance = Infinity;
  otherCards.forEach((card, ix) => {
    let newDistance = Math.abs(card.carbonValue - value);
    if (newDistance < closestDistance){
      closestDistance = newDistance;
      toReturn['text'] = card.nameWithValue;
      toReturn['ixInType'] = ix;
    }
  });

  return toReturn;
};

const buildCards = dataType => {
  let unit = '';
  if (dataType === 'food'){
    unit = 'kg';
  }
  else if (dataType === 'transport'){
    unit = 'km';
  }
  else if (dataType === 'items'){
    unit = '';
  }
  else{
    throw "expected dataType to be one of (food, transport, ...), was " + dataType;
  }
  console.log('buildAllcards, datatype', dataType);
  let data = DATABASE[dataType];

  let cards = [];
  data.forEach(foodData => {
    foodData.possibleValues.forEach(value => {
      cards.push({
        name: foodData.name,
        icon: foodData.icon,
        value: value,
        carbonValue: value.value * foodData.carbonIntensity,
        carbonBreakdown: foodData.carbonBreakdown,
        nameWithValue: foodData.name + ' (' + formatNumber(value.value) + ' ' + unit + ')',
      })
    })
  });

  // sort cards by carbonValue
  cards.sort((card, card_other) => card.carbonValue - card_other.carbonValue);

  return cards;
};

export const buildAllCards = () => {
  let toReturn = {};
  VERTICAL_ORDER.forEach(dataType => {
    toReturn[dataType] = buildCards(dataType)
  });

  return toReturn
};
