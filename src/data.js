// still missing:
// - take into account

export const ONE_MILLION = 1000000;
export const DEFAULTS = {
    'organic_productivity': 0.8,
    'calories_per_day': 2500,
};

export const food_stores = {
    'supermarket': {
        'transportation_producer_store':{
            'means': {
                'name': 'truck',
            },
            'distance': 200, // km
        },
        'transportation_consumer_store':{
            'distance': 20,
            'means': 'car',
        }
    }
};

export const transportations = {
    'truck': {
        'ditance_intensity': 300, // g CO2 / km
    },
    'car': {

    }
};

export const food_defaults = {
    'surface_productivity': 50, // kg / year / hectare
    'organic': false,
    'store': 'supermarket',
    'fertilizer': 0.1, // kg / kg
    'pesticide': 0.01, // kg / kg
    'machines': [
        // the differents machine and how many hours / times per year ??
    ],
    'energy_to_cook': 0, // kwh / kg
};

export const foods = {
    'tomato':{
        'calories_per_kg': 210, // kcal / kg

    },
    'potato':{
        'calories_per_kg': 800, // kcal / kg
    }
};

export const getData = () => {
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