class DeepClone {

  src: {};
  hasClonedObj: Array<any>;
  _Circular_reference_tag: string;

  constructor(obj?: any) {
    this.src = obj || {};
    // 要拷贝的对象
    this.hasClonedObj = [];
    // 缓存 已经拷贝过的 object
    this._Circular_reference_tag = '$ref';
    // 循环引用占位符
  }
  reset() {
    // 清空已经拷贝过的 object
    this.hasClonedObj = [];
    return this;
  }
  finishedCloneObj(obj: any) {
    // 暂存已经拷贝过的 object， 用于判断是否循环引用
    if (this.hasClonedObj.every(e => e !== obj)) {
      this.hasClonedObj.push(obj);
    }
  }
  hasObjClone(obj: any) {
    // 判断 obj 是否已经拷贝过，即判断是否有循环引用
    let rs = { hasClone: false, index: null };
    this.hasClonedObj.forEach((e, i) => {
      if (obj === e) {
        rs = { hasClone: true, index: i };
      }
    });
    return rs;
  }
  deepClone(src: any) {
    this.reset();
    // 清空缓存    
    return this.deepCloneCore(src || this.src);
    // 深度拷贝
  }
  cloneAndParseCR(src: any){
    this.reset();
    // 清空缓存    
    return this.parseCircularReference(this.deepCloneCore(src || this.src));
    // “深”度拷贝 还原循环引用
  }
  parseCircularReference(rsObj: any) {
    // 解析循环引用，还原占位符
    if (typeof rsObj === 'object') {
      if (Array.isArray(rsObj)) {
        rsObj.forEach(e => this.parseCircularReference(e));
        // 递归深解析循环引用
      } else {
        if (rsObj === null) return null;
        // 如果是 null，直接返回 null
        Object.keys(rsObj).forEach(key => {
          if (rsObj.hasOwnProperty(key)) {
            rsObj[key] = this.parseCircularReference(rsObj[key]);
          }
        })
      }
    } else if (typeof rsObj === 'string') {
      if (rsObj.includes(this._Circular_reference_tag)){
        let crObj = this.hasClonedObj[Number(rsObj.match(/[0-9]+/)[0])];
        rsObj = Array.isArray(crObj) ? [...crObj] : {...crObj};
        // 还原占位符， 此处为深度为一的"深"拷贝，本质为浅拷贝
      }
    }
    return rsObj;
  }
  deepCloneCore(src: any) {
    let target: any;
    if (typeof src === 'object') {
      let { hasClone, index } = this.hasObjClone(src);
      if (hasClone) {
        // 如果循环引用
        return `${this._Circular_reference_tag}_${index}`;
        // 返回占位符与下标组成的字符串
      } else if (src) {
        this.finishedCloneObj(src);
        // 缓存已经拷贝过的对象
      }
      if (Array.isArray(src)) {
        target = [];
        src.forEach((e, i) => target[i] = this.deepCloneCore(e));
        // 递归深度拷贝数组
      } else {
        if (src === null) return null;
        // 如果时 null，直接返回 null
        target = {};
        Object.keys(src).forEach(key => {
          if (src.hasOwnProperty(key)) {
            target[key] = this.deepCloneCore(src[key]);
          }
        })
        // 循环递归深度拷贝对象
      } 
    } else {        
      target = src;
      // 非 object 类型直接赋值拷贝
    }
    return target;
    // 返回拷贝结果
  }
}

export default DeepClone;