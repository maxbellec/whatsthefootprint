const ONE_MILLION = 1000000;
export const YEARLY_PER_CAPITA_CARBON_ALLOWANCE = 2000;
export const MONTHLY_PER_CAPITA_CARBON_ALLOWANCE = YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 12;
export const DAILY_PER_CAPITA_CARBON_ALLOWANCE = YEARLY_PER_CAPITA_CARBON_ALLOWANCE / 365;
const CITY_SIZE = ONE_MILLION / 10;
const COUNTRY_SIZE = 70 * ONE_MILLION;
const WORLD_SIZE = 7550 * ONE_MILLION;

export const QUOTA_PER_CATEGORY = {
  'food': 0.3,
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
        },
        {
          name: 'A small ride in town',
          value: 5,
        },
        {
          name: 'An hour drive, carpooling with 3 other people',
          value: 25,
        },
        {
          name: 'An hour drive',
          value: 100,
        },
        {
          name: 'A car lifetime carbon emissions',
          value: 150000,
        },
        {
          name: 'How much a car is used annualy',
          value: 10000,
        },
        {
          name: 'If you drive a lot during a year',
          value: 80000,
        },
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
        },
        {
          name: 'Going to the other side of the city',
          value: 20,
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
        },
        {
          name: 'Driving to the other side of the country',
          value: 1000,
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
          special_factor: 1.4,
        },
        {
          name: '10 seconds in a plane',
          value: 10 / 300 * 1200,
        },
        {
          name: 'Mid distance',
          value: 1500,
          special_factor: 1.2
        },
        {
          name: 'Long distance flight',
          value: 10000,
        },
        {
          name: 'Long distance return flight, business class',
          value: 20000,
          special_factor: 2.3,
        },
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
      carbonIntensity: 0.004, // per km
      possibleValues: [
        {
          name: 'A small ride in town',
          value: 5,
        },
        {
          name: 'Cycling to the other side of the country',
          value: 1000,
        },
        {
          name: 'A bike life expectancy',
          value: 10000,
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
      carbonIntensity: 0.0001, // per km
      possibleValues: [
        {
          name: 'Hiking for a day',
          value: 25,
        },
        {
          name: 'What you\'ll walk in your entire life',
          value: 25 * 365 *10,
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 50,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 8,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 35,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 15,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 500,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 15,
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
        },
        {
          name: '',
          value: 1,
        },
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
        },
        {
          name: 'A liter',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 70,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 70,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 1.5,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 20,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 4,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 3,
        },
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
        },
        {
          name: '',
          value: 1,
        },
        {
          name: 'Typical annual consumption per capita (France)',
          value: 3,
        },
      ],
      carbonBreakdown:{
        'methane': 0.6,
        'transport': 0.2,
        'production': 0.2
      }
    },
  ],
  'items': [
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 1,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'Jeans',
      icon: 'jeans.svg',
      carbonIntensity: 1,
      possibleValues: [
        {
          name: 'Wearing a pair of jeans for a day',
          value: 1,
        },
        {
          name: 'Jeans life cycle',
          value: 300,
        },
      ]
    },
    {
      name: 'T-Shirt',
      icon: 'tshirt.svg',
      carbonIntensity: 0.3,
      possibleValues: [
        {
          name: 'Wearing a t-shirt for a day',
          value: 1,
        },
        {
          name: 'T-shirt life cycle',
          value: 50,
        }
      ]
    },
    {
      name: 'Shoes',
      icon: 'shoes.svg',
      carbonIntensity: 0.05,
      possibleValues: [
        {
          name: 'Wearing your pair of shoes for a day',
          value: 1,
        },
        {
          name: 'A pair of shoes life cycle',
          value: 300,
        },
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 100,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 500,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 1000,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 2000,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 5000,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 10000,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 0.1,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
    {
      name: 'phone',
      icon: 'phone.svg',
      carbonIntensity: 0.01,
      possibleValues: [
        {
          name: '',
          value: 1,
        }
      ]
    },
  ]
};

let verticalOrder = [];
for (let e in DATABASE)
  verticalOrder.push(e);

export const VERTICAL_ORDER = verticalOrder;

// items
let items = {};
VERTICAL_ORDER.forEach((itemType) => {
  items[itemType] = [];
  let typeItems = [];
  for (let item in DATABASE[itemType]){
    if (DATABASE[itemType].hasOwnProperty(item))
      items[itemType].push(DATABASE[itemType][item].name);
  }
});
export const ITEMS = items;
