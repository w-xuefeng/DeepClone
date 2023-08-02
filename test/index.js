"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var deepClone_1 = require("../src/deepClone");
var testObj = (_a = {
        num: 123,
        str: 'string',
        obj: {
            array: [void 0, null, 0, false],
        },
        bool: true,
        func: function () { return 'function'; },
        map: new Map([['key', 'value']]),
        set: new Set([1, 2, 3, 4]),
        regExp: /^\w+\d{0,4}\w?$/
    },
    _a[Symbol('symbol')] = 'symbolKey',
    _a.symbol = Symbol('value'),
    _a.date = new Date('2001-01-01'),
    _a.cr = null,
    _a.crArr = [],
    _a);
var value = (0, deepClone_1.default)(testObj);
console.log(value);
console.log(value === testObj, value.map === testObj.map, value.set === testObj.set, value.regExp === testObj.regExp, value.func === testObj.func, value.date === testObj.date);
testObj.cr = testObj;
testObj.crArr.push(testObj);
var deepcr = (0, deepClone_1.default)(testObj);
console.log(deepcr);
console.log(deepcr === testObj);
