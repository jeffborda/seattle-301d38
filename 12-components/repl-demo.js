let nums = [1, 65, 90, 12, 9, 55, 14, 77, 5, 2, 22];

// nums.sort((a, b) => a - b);

let names = ['allie', 'Sam', 'Jennifer', 'Koko', 'Demi', 'Gary', 'Charlotte'];

names.sort();


let starWarsData = [{
  name: 'Luke Skywalker',
  height: 172,
  mass: 77,
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
},
{
  name: 'C-3PO',
  height: 167,
  mass: 75,
  hair_color: 'n/a',
  skin_color: 'gold',
  eye_color: 'yellow',
  birth_year: '112BBY',
  gender: 'n/a'
},
{
  name: 'R2-D2',
  height: 96,
  mass: 32,
  hair_color: 'n/a',
  skin_color: 'white, blue',
  eye_color: 'red',
  birth_year: '33BBY',
  gender: 'n/a'
},
{
  name: 'Darth Vader',
  height: 202,
  mass: 136,
  hair_color: 'none',
  skin_color: 'white',
  eye_color: 'yellow',
  birth_year: '41.9BBY',
  gender: 'male'
},
{
  name: 'Leia Organa',
  height: 150,
  mass: 49,
  hair_color: 'brown',
  skin_color: 'light',
  eye_color: 'brown',
  birth_year: '19BBY',
  gender: 'female'
}]

starWarsData.sort((a, b) => b.height - a.height).map(person => person.name)

