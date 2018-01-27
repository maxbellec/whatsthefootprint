const ONE_MILLION = 1000000;
const YEARLY_PER_CAPITA_CARBON_ALLOWANCE = 2000;
const CITY_SIZE = ONE_MILLION / 10;
const COUNTRY_SIZE = 70 * ONE_MILLION;
const WORLD_SIZE = 7550 * ONE_MILLION;

export const QUOTA = {
  'personal': {
    'daily': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 365,
    'monthly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 12,
    'yearly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE,
  },
  'city': {
    'daily': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 365 * CITY_SIZE,
    'montly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 12 * CITY_SIZE,
    'yearly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE * CITY_SIZE,
  },
  'country': {
    'daily': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 365 * COUNTRY_SIZE,
    'montly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 12 * COUNTRY_SIZE,
    'yearly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE * COUNTRY_SIZE,
  },
  'world': {
    'daily': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 365 * WORLD_SIZE,
    'montly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 12 * WORLD_SIZE,
    'yearly': YEARLY_PER_CAPITA_CARBON_ALLOWANCE * WORLD_SIZE,
  },
};

export const QUOTA_PER_CATEGORY = {
  'food': 0.3,
};

export const QUOTA_TEXT = {
  'personal': {
    'daily': 'of your daily %TYPE% carbon allowance',
    'monthly': 'of your monthly %TYPE% carbon allowance',
    'yearly': 'of your yearly %TYPE% carbon allowance',
  },
  'city': {
    'daily': 'of a city\'s daily %TYPE% carbon allowance',
    'montly': 'of city\'s monthly %TYPE% carbon allowance',
    'yearly': 'of city\'s yearly %TYPE% carbon allowance',
  },
  'country': {
    'daily': 'of France\'s daily %TYPE% carbon allowance',
    'montly': 'of France\'s monthly %TYPE% carbon allowance',
    'yearly': 'of France\'s yearly %TYPE% carbon allowance',
  },
  'world': {
    'daily': 'of the world\'s daily %TYPE% carbon allowance',
    'montly': 'of the world\'s monthly %TYPE% carbon allowance',
    'yearly': 'of the world\'s yearly %TYPE% carbon allowance',
  },
};

export const DATABASE = {
  'transport': [
    {
      name: 'Car',
      icon: 'car.svg',
      carbonIntensity: 0.150, // per km
      possibleValues: [
        {
          name: 'Super small ride',
          value: 0.2,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'A small ride in town',
          value: 5,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'An hour drive, carpooling with 3 other people',
          value: 25,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'An hour drive',
          value: 100,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'A car lifetime carbon emissions',
          value: 150000,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'How much a car is used annualy',
          value: 10000,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'Yearly carbon emissions in France for all cars',
          value: 270000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country'
        }
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'City Bus',
      icon: 'bus.svg',
      carbonIntensity: 0.05, // per km
      possibleValues: [
        {
          name: 'A small drive',
          value: 0.500,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Going to the other side of the city',
          value: 20,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'National Coach',
      icon: 'bus.svg',
      carbonIntensity: 0.04, // per km
      possibleValues: [
        {
          name: 'An hour drive',
          value: 100,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Driving to the other side of the country',
          value: 1000,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
        },
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'Plane',
      icon: 'plane.svg',
      carbonIntensity: 0.300, // per km
      possibleValues: [
        {
          name: 'Small distance return',
          value: 500,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
          special_factor: 1.4,
        },
        {
          name: '10 seconds in a plane',
          value: 10 / 300 * 1200,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Mid distance',
          value: 1500,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
          special_factor: 1.2
        },
        {
          name: 'Long distance flight',
          value: 10000,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'Long distance return flight, business class',
          value: 20000,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
          special_factor: 2.3,
        },
        {
          name: 'Emissions for all passangers, long distance flight',
          value: 5000 * 300,
          comparisonTime: 'daily',
          comparisonSize: 'city',
        },
        {
          name: 'How much a car is used annualy',
          value: 10000,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'Yearly world plane carbon emissions',
          value: 270000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world'
        }
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'Bicyle',
      icon: 'bicycle.svg',
      carbonIntensity: 0.001, // per km
      possibleValues: [
        {
          name: 'A small ride in town',
          value: 5,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Cycling to the other side of the country',
          value: 1000,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'A bike life expectancy',
          value: 10000,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
        },
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'Walk',
      icon: 'walk.svg',
      carbonIntensity: 0.00001, // per km
      possibleValues: [
        {
          name: 'Hiking for a day',
          value: 25,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'What you\'ll walk in your entire life',
          value: 25 * 365 *10,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
        },
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
  ],
  'food': [
    {
      name: 'Tomato',
      icon: 'tomato.svg',
      carbonIntensity: 0.8,
      possibleValues: [
        {
          name: 'Ingredient in a pizza',
          value: 0.1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 50,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 100000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 1000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world'
        }
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'Aubergine',
      icon: 'aubergine.svg',
      carbonIntensity: 1.4,
      possibleValues: [
        {
          name: 'In an eggplant caviar as a start',
          value: 0.15,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 8,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 10000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 100000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.6,
        'transport': 0.3,
        'other': 0.1
      }
    },
    {
      name: 'Bread',
      icon: 'bread.png',
      carbonIntensity: 3,
      possibleValues: [
        {
          name: 'Side serving',
          value: 0.15,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 35,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 350000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 3500000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.8,
        'transport': 0.15,
        'other': 0.05
      }
    },
    {
      name: 'Potatoes',
      icon: 'potato.png',
      carbonIntensity: 0.1,
      possibleValues: [
        {
          name: 'In a meal-based dish',
          value: 0.4,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 15,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 150000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 1500000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.8,
        'transport': 0.15,
        'other': 0.05
      }
    },
    {
      name: 'Season fruit and vegetables',
      icon: 'apple.svg',
      carbonIntensity: 0.15,
      possibleValues: [
        {
          name: 'Your five a day fruit and vegetables',
          value: 1.8,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 500,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 5000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 50000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.8,
        'transport': 0.15,
        'other': 0.05
      }
    },
    {
      name: 'Imported season fruit and vegetables',
      icon: 'apple.svg',
      carbonIntensity: 0.4,
      possibleValues: [
        {
          name: 'In a meal-based dish',
          value: 0.4,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 15,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 150000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 1500000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.8,
        'transport': 0.15,
        'other': 0.05
      }
    },
    {
      name: 'Sunflower oil',
      icon: 'sunflower.svg',
      carbonIntensity: 1,
      possibleValues: [
        {
          name: 'As part of a sauce',
          value: 0.05,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 3,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 30000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 300000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.8,
        'transport': 0.15,
        'other': 0.05
      }
    },
    {
      name: 'Milk',
      icon: 'milk.png',
      carbonIntensity: 1.2,
      possibleValues: [
        {
          name: 'A glass',
          value: 0.2,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'A liter',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 70,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 700000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 7000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.4,
        'transport': 0.1,
        'other': 0.05,
        'methane': 0.45
      }
    },
    {
      name: 'Yoghurt',
      icon: 'yoghurt.jpeg',
      carbonIntensity: 2,
      possibleValues: [
        {
          name: 'One yogurt',
          value: 0.2,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 70,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 700000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 7000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.4,
        'transport': 0.1,
        'other': 0.05,
        'methane': 0.45
      }
    },
    {
      name: 'Tropical fish',
      icon: 'tropical_fish.svg',
      carbonIntensity: 4.2,
      possibleValues: [
        {
          name: 'Main course',
          value: 0.3,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 1.5,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 1500000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 15000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.2,
        'transport': 0.8,
      }
    },
    {
      name: 'Free range chicken',
      icon: 'chicken.svg',
      carbonIntensity: 5,
      possibleValues: [
        {
          name: 'Main course',
          value: 0.3,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 20,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 200000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 2000000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'production': 0.3,
        'transport': 0.1,
        'methane': 0.6
      }
    },
    {
      name: 'Butter',
      icon: 'butter.jpeg',
      carbonIntensity: 8.5,
      possibleValues: [
        {
          name: 'On a toast',
          value: 0.002,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 4,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 40000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 400000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'methane': 0.6,
        'transport': 0.2,
        'production': 0.2
      }
    },
    {
      name: 'Lamb',
      icon: 'sheep.svg',
      carbonIntensity: 20.5,
      possibleValues: [
        {
          name: 'Main course',
          value: 0.250,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 3,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 3000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 30000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'methane': 0.6,
        'transport': 0.2,
        'production': 0.2
      }
    },
    {
      name: 'Veal',
      icon: 'veal.png',
      carbonIntensity: 42,
      possibleValues: [
        {
          name: 'Main course',
          value: 0.250,
          comparisonTime: 'daily',
          comparisonSize: 'personal',
        },
        {
          name: '',
          value: 1,
          comparisonTime: 'monthly',
          comparisonSize: 'personal',
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 3,
          comparisonTime: 'yearly',
          comparisonSize: 'personal',
        },
        {
          name: 'France yearly consumption',
          value: 3000000,
          comparisonTime: 'yearly',
          comparisonSize: 'country',
        },
        {
          name: 'World yearly consumption',
          value: 30000000,
          comparisonTime: 'yearly',
          comparisonSize: 'world',
        }
      ],
      carbonBreakdown:{
        'methane': 0.6,
        'transport': 0.2,
        'production': 0.2
      }
    },
  ],
};
