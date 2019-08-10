import DeepClone from '../src/DeepClone';

const dep = new DeepClone();
let testObj = {
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
}
let deep1 = dep.deepClone(testObj);
console.log(deep1)
console.log(deep1 === testObj);

let testCrObjParent = { value: 100 , child: null };
let testCrObjChild = { value: 50, parent: null };
testCrObjParent.child = testCrObjChild;
testCrObjChild.parent = testCrObjParent;

let deepcr = dep.deepClone(testCrObjParent);
console.log(deepcr)
console.log(deepcr === testCrObjParent);

let deepcrparse = dep.cloneAndParseCR(testCrObjParent);
console.log(deepcrparse)
console.log(deepcrparse === testCrObjParent);