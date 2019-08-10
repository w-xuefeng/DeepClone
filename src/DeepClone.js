"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var DeepClone = /** @class */ (function () {
    function DeepClone(obj) {
        this.src = obj || {};
        // 要拷贝的对象
        this.hasClonedObj = [];
        // 缓存 已经拷贝过的 object
        this._Circular_reference_tag = '$ref';
        // 循环引用占位符
    }
    DeepClone.prototype.reset = function () {
        // 清空已经拷贝过的 object
        this.hasClonedObj = [];
        return this;
    };
    DeepClone.prototype.finishedCloneObj = function (obj) {
        // 暂存已经拷贝过的 object， 用于判断是否循环引用
        if (this.hasClonedObj.every(function (e) { return e !== obj; })) {
            this.hasClonedObj.push(obj);
        }
    };
    DeepClone.prototype.hasObjClone = function (obj) {
        // 判断 obj 是否已经拷贝过，即判断是否有循环引用
        var rs = { hasClone: false, index: null };
        this.hasClonedObj.forEach(function (e, i) {
            if (obj === e) {
                rs = { hasClone: true, index: i };
            }
        });
        return rs;
    };
    DeepClone.prototype.deepClone = function (src) {
        this.reset();
        // 清空缓存    
        return this.deepCloneCore(src || this.src);
        // 深度拷贝
    };
    DeepClone.prototype.cloneAndParseCR = function (src) {
        this.reset();
        // 清空缓存    
        return this.parseCircularReference(this.deepCloneCore(src || this.src));
        // “深”度拷贝 还原循环引用
    };
    DeepClone.prototype.parseCircularReference = function (rsObj) {
        var _this = this;
        // 解析循环引用，还原占位符
        if (typeof rsObj === 'object') {
            if (Array.isArray(rsObj)) {
                rsObj.forEach(function (e) { return _this.parseCircularReference(e); });
                // 递归深解析循环引用
            }
            else {
                if (rsObj === null)
                    return null;
                // 如果时 null，直接返回 null
                Object.keys(rsObj).forEach(function (key) {
                    if (rsObj.hasOwnProperty(key)) {
                        rsObj[key] = _this.parseCircularReference(rsObj[key]);
                    }
                });
            }
        }
        else if (typeof rsObj === 'string') {
            if (rsObj.includes(this._Circular_reference_tag)) {
                var crObj = this.hasClonedObj[Number(rsObj.match(/[0-9]+/)[0])];
                rsObj = Array.isArray(crObj) ? crObj.slice() : __assign({}, crObj);
                // 还原占位符， 此处为深度为一的"深"拷贝，本质为浅拷贝
            }
        }
        return rsObj;
    };
    DeepClone.prototype.deepCloneCore = function (src) {
        var _this = this;
        var target;
        if (typeof src === 'object') {
            var _a = this.hasObjClone(src), hasClone = _a.hasClone, index = _a.index;
            if (hasClone) {
                // 如果循环引用
                return this._Circular_reference_tag + "_" + index;
                // 返回占位符与下标组成的字符串
            }
            else if (src) {
                this.finishedCloneObj(src);
                // 缓存已经拷贝过的对象
            }
            if (Array.isArray(src)) {
                target = [];
                src.forEach(function (e, i) { return target[i] = _this.deepCloneCore(e); });
                // 递归深度拷贝数组
            }
            else {
                if (src === null)
                    return null;
                // 如果时 null，直接返回 null
                target = {};
                Object.keys(src).forEach(function (key) {
                    if (src.hasOwnProperty(key)) {
                        target[key] = _this.deepCloneCore(src[key]);
                    }
                });
                // 循环递归深度拷贝对象
            }
        }
        else {
            target = src;
            // 非 object 类型直接赋值拷贝
        }
        return target;
        // 返回拷贝结果
    };
    return DeepClone;
}());
exports["default"] = DeepClone;
