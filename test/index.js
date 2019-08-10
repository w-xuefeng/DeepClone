"use strict";
exports.__esModule = true;
var DeepClone_1 = require("../src/DeepClone");
var dep = new DeepClone_1["default"]();
var testObj = {
    num: 123,
    str: "string",
    obj: {
        array: [
            undefined,
            null,
            0,
            false
        ]
    }
};
var deep1 = dep.deepClone(testObj);
console.log(deep1);
console.log(deep1 === testObj);
var testCrObjParent = { value: 100, child: null };
var testCrObjChild = { value: 50, parent: null };
testCrObjParent.child = testCrObjChild;
testCrObjChild.parent = testCrObjParent;
var deepcr = dep.deepClone(testCrObjParent);
console.log(deepcr);
console.log(deepcr === testCrObjParent);
var deepcrparse = dep.cloneAndParseCR(testCrObjParent);
console.log(deepcrparse);
console.log(deepcrparse === testCrObjParent);
