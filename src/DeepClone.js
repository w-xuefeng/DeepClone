"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function deepClone(value) {
    var cached = new WeakMap();
    function _clone(value) {
        if (value === null || typeof value !== 'object') {
            return value;
        }
        if (cached.has(value)) {
            return cached.get(value);
        }
        var _constructor = value.constructor;
        // @ts-ignore
        var res = new _constructor(_constructor === Object ? void 0 : value);
        cached.set(value, res);
        var keys = __spreadArray(__spreadArray([], Object.getOwnPropertySymbols(value), true), Object.getOwnPropertyNames(value), true);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            res[key] = _clone(value[key]);
        }
        return res;
    }
    return _clone(value);
}
exports.default = deepClone;
