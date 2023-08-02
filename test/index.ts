import deepClone from '../src/deepClone';

let testObj = {
  num: 123,
  str: 'string',
  obj: {
    array: [void 0, null, 0, false],
  },
  bool: true,
  func: () => 'function',
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3, 4]),
  regExp: /^\w+\d{0,4}\w?$/,
  [Symbol('symbol')]: 'symbolKey',
  symbol: Symbol('value'),
  date: new Date('2001-01-01'),
  cr: null,
  crArr: [],
};
const value = deepClone(testObj);
console.log(value);
console.log(
  value === testObj,
  value.map === testObj.map,
  value.set === testObj.set,
  value.regExp === testObj.regExp,
  value.func === testObj.func,
  value.date === testObj.date,
);

testObj.cr = testObj;
testObj.crArr.push(testObj);

const deepcr = deepClone(testObj);
console.log(deepcr);
console.log(deepcr === testObj);
