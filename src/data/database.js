export const FOOD_DATABASE = [
    {
        name: 'Tomato',
        icon: 'tomato.svg',
        carbon_instensity: 0.8,
        possible_values: [
            {
                name: 'Ingredient in a pizza',
                value: 0.1
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 50,
            },
            {
                name: 'France yearly consumption',
                value: 100000,
            },
            {
                name: 'World yearly consumption',
                value: 1000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.6,
            'transport': 0.3,
            'other': 0.1
        }
    },
    {
        name: 'Aubergine',
        icon: 'aubergine.svg',
        carbon_instensity: 1.4,
        possible_values: [
            {
                name: 'In an eggplant caviar as a start',
                value: 0.15
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 8,
            },
            {
                name: 'France yearly consumption',
                value: 10000,
            },
            {
                name: 'World yearly consumption',
                value: 100000,
            }
        ],
        carbon_breakdown:{
            'production': 0.6,
            'transport': 0.3,
            'other': 0.1
        }
    },
    {
        name: 'Bread',
        icon: 'bread.png',
        carbon_instensity: 3,
        possible_values: [
            {
                name: 'Side serving',
                value: 0.15
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 35,
            },
            {
                name: 'France yearly consumption',
                value: 350000000,
            },
            {
                name: 'World yearly consumption',
                value: 3500000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.8,
            'transport': 0.15,
            'other': 0.05
        }
    },
    {
        name: 'Potatoes',
        icon: 'potato.png',
        carbon_instensity: 0.1,
        possible_values: [
            {
                name: 'In a meal-based dish',
                value: 0.4
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 15,
            },
            {
                name: 'France yearly consumption',
                value: 150000000,
            },
            {
                name: 'World yearly consumption',
                value: 1500000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.8,
            'transport': 0.15,
            'other': 0.05
        }
    },
    {
        name: 'Season fruit and vegetables',
        icon: 'apple.svg',
        carbon_instensity: 0.15,
        possible_values: [
            {
                name: 'Your five a day fruit and vegetables',
                value: 1.8
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 500,
            },
            {
                name: 'France yearly consumption',
                value: 5000000000,
            },
            {
                name: 'World yearly consumption',
                value: 50000000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.8,
            'transport': 0.15,
            'other': 0.05
        }
    },
    {
        name: 'Imported season fruit and vegetables',
        icon: 'apple.svg',
        carbon_instensity: 0.4,
        possible_values: [
            {
                name: 'In a meal-based dish',
                value: 0.4
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 15,
            },
            {
                name: 'France yearly consumption',
                value: 150000000,
            },
            {
                name: 'World yearly consumption',
                value: 1500000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.8,
            'transport': 0.15,
            'other': 0.05
        }
    },
    {
        name: 'Sunflower oil',
        icon: 'sunflower.png',
        carbon_instensity: 1,
        possible_values: [
            {
                name: 'As part of a sauce',
                value: 0.05
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 3,
            },
            {
                name: 'France yearly consumption',
                value: 30000000,
            },
            {
                name: 'World yearly consumption',
                value: 300000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.8,
            'transport': 0.15,
            'other': 0.05
        }
    },
    {
        name: 'Milk',
        icon: 'milk.png',
        carbon_instensity: 1.2,
        possible_values: [
            {
                name: 'A glass',
                value: 0.2
            },
            {
                name: 'A liter',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 70,
            },
            {
                name: 'France yearly consumption',
                value: 700000000,
            },
            {
                name: 'World yearly consumption',
                value: 7000000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.4,
            'transport': 0.1,
            'other': 0.05,
            'methane': 0.45
        }
    },
    {
        name: 'Yoghurt',
        icon: 'yoghurt.jpeg',
        carbon_instensity: 2,
        possible_values: [
            {
                name: 'One yogurt',
                value: 0.2
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 70,
            },
            {
                name: 'France yearly consumption',
                value: 700000000,
            },
            {
                name: 'World yearly consumption',
                value: 7000000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.4,
            'transport': 0.1,
            'other': 0.05,
            'methane': 0.45
        }
    },
    {
        name: 'Tropical fish',
        icon: 'tropical_fish.svg',
        carbon_instensity: 4.2,
        possible_values: [
            {
                name: 'Main course',
                value: 0.3
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 1.5,
            },
            {
                name: 'France yearly consumption',
                value: 1500000,
            },
            {
                name: 'World yearly consumption',
                value: 15000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.2,
            'transport': 0.8,
        }
    },
    {
        name: 'Free range chicken',
        icon: 'chicken.svg',
        carbon_instensity: 5,
        possible_values: [
            {
                name: 'Main course',
                value: 0.3
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 20,
            },
            {
                name: 'France yearly consumption',
                value: 200000000,
            },
            {
                name: 'World yearly consumption',
                value: 2000000000,
            }
        ],
        carbon_breakdown:{
            'production': 0.3,
            'transport': 0.1,
            'methane': 0.6
        }
    },
    {
        name: 'Butter',
        icon: 'butter.jpeg',
        carbon_instensity: 8.5,
        possible_values: [
            {
                name: 'On a toast',
                value: 0.002
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 4,
            },
            {
                name: 'France yearly consumption',
                value: 40000000,
            },
            {
                name: 'World yearly consumption',
                value: 400000000,
            }
        ],
        carbon_breakdown:{
            'methane': 0.6,
            'transport': 0.2,
            'production': 0.2
        }
    },
    {
        name: 'Lamb',
        icon: 'sheep.svg',
        carbon_instensity: 20.5,
        possible_values: [
            {
                name: 'Main course',
                value: 0.250
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 3,
            },
            {
                name: 'France yearly consumption',
                value: 3000000,
            },
            {
                name: 'World yearly consumption',
                value: 30000000,
            }
        ],
        carbon_breakdown:{
            'methane': 0.6,
            'transport': 0.2,
            'production': 0.2
        }
    },
    {
        name: 'Veal',
        icon: 'veal.png',
        carbon_instensity: 42,
        possible_values: [
            {
                name: 'Main course',
                value: 0.250
            },
            {
                name: '',
                value: 1
            },
            {
                name: 'Typical annual consumption per capita (France)',
                value: 3,
            },
            {
                name: 'France yearly consumption',
                value: 3000000,
            },
            {
                name: 'World yearly consumption',
                value: 30000000,
            }
        ],
        carbon_breakdown:{
            'methane': 0.6,
            'transport': 0.2,
            'production': 0.2
        }
    },
];