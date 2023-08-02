export default function deepClone<T extends object>(value?: T) {
  const cached = new WeakMap();
  function _clone<V extends object>(value?: V): V {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    if (cached.has(value)) {
      return cached.get(value);
    }
    const _constructor = value.constructor;
    // @ts-ignore
    const res = new _constructor(_constructor === Object ? void 0 : value);
    cached.set(value, res);
    const keys = [...Object.getOwnPropertySymbols(value), ...Object.getOwnPropertyNames(value)];
    for (const key of keys) {
      res[key] = _clone(value[key]);
    }
    return res;
  }
  return _clone(value);
}
