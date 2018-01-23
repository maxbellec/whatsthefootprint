import {DATABASE, DEFAULTS, food_defaults, foods, ONE_MILLION} from "./data";

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