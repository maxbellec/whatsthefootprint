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
export const DATABASE = {
    'fertilizer': 10, // kg CO2 / kg
    'pesticide': 1, // kg CO2 / kg
};