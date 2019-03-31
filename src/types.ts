import { isInstanceOf } from './_internal/utils';

/* ------------- NATIVE TYPES ------------- */

export function isArguments(object: any): object is IArguments {
  return isInstanceOf(object, 'Arguments');
}

export const { isArray } = Array;

export function isArrayBuffer(object: any): object is ArrayBuffer {
  return isInstanceOf(object, 'ArrayBuffer');
}

export function isBoolean(object: any): object is boolean {
  return object === true || object === false;
}

export function isDataView(object: any): object is DataView {
  return isInstanceOf(object, 'DataView');
}

export function isDate(object: any): object is Date {
  return isInstanceOf(object, 'Date');
}

export function isError(object: any): object is Error {
  return isInstanceOf(object, 'Error');
}

export function isFloat32Array(object: any): object is Float32Array {
  return isInstanceOf(object, 'Float32Array');
}

export function isFloat64Array(object: any): object is Float64Array {
  return isInstanceOf(object, 'Float64Array');
}

export function isFunction(object: any): object is Function {
  return typeof object === 'function';
}

export function isInt8Array(object: any): object is Int8Array {
  return isInstanceOf(object, 'Int8Array');
}

export function isInt16Array(object: any): object is Int16Array {
  return isInstanceOf(object, 'Int16Array');
}

export function isInt32Array(object: any): object is Int32Array {
  return isInstanceOf(object, 'Int32Array');
}

export function isMap(object: any): object is Map<any, any> {
  return isInstanceOf(object, 'Map');
}

export function isNull(object: any): object is null {
  return object === null;
}

export function isNumber(object: any): object is number {
  return typeof object === 'number';
}

export function isObject(object: any): object is Object {
  return typeof object === 'object';
}

export function isPromise(object: any): object is Promise<any> {
  return isInstanceOf(object, 'Promise');
}

export function isRegExp(object: any): object is RegExp {
  return isInstanceOf(object, 'RegExp');
}

export function isSet(object: any): object is Set<any> {
  return isInstanceOf(object, 'Set');
}

export function isString(object: any): object is string {
  return typeof object === 'string';
}

export function isSymbol(object: any): object is symbol {
  return typeof object === 'symbol';
}

export function isUint8Array(object: any): object is Uint8Array {
  return isInstanceOf(object, 'Uint8Array');
}

export function isUint8ClampedArray(object: any): object is Uint8ClampedArray {
  return isInstanceOf(object, 'Uint8ClampedArray');
}

export function isUint16Array(object: any): object is Uint16Array {
  return isInstanceOf(object, 'Uint16Array');
}

export function isUint32Array(object: any): object is Uint32Array {
  return isInstanceOf(object, 'Uint32Array');
}

export function isUndefined(object: any): object is undefined {
  return object === undefined;
}

export function isWeakMap(object: any): object is WeakMap<any, any> {
  return isInstanceOf(object, 'WeakMap');
}

export function isWeakSet(object: any): object is WeakSet<any> {
  return isInstanceOf(object, 'WeakSet');
}

/* ------------- ARRAY EXTENSIONS ------------- */

export function isArrayLike(object: any): boolean {
  return isObject(object) && typeof object.length === 'number';
}

export function isTypedArray(object: any): boolean {
  return (
    isFloat32Array(object)
    || isFloat64Array(object)
    || isInt8Array(object)
    || isInt16Array(object)
    || isInt32Array(object)
    || isUint8Array(object)
    || isUint8ClampedArray(object)
    || isUint16Array(object)
    || isUint32Array(object)
  );
}

/* ------------- NUMBER EXTENSIONS ------------- */

export function isDecimal(object: any): boolean {
  // eslint-disable-next-line no-bitwise,no-self-compare
  return isNumber(object) && object !== ~~object && object === object;
}

export function isInteger(object: any): boolean {
  // eslint-disable-next-line no-bitwise,no-self-compare
  return isNumber(object) && object === ~~object && object === object;
}

export function isNaN(object: any): boolean {
  // eslint-disable-next-line no-self-compare
  return isNumber(object) && object !== object;
}

export function isFinite(object: any): boolean {
  return (
    isNumber(object)
    // eslint-disable-next-line no-self-compare
    && object === object
    && object !== Infinity
    && object !== -Infinity
  );
}

/* ------------- OBJECT EXTENSIONS ------------- */

export function isJSON(object: any): boolean {
  try {
    JSON.parse(object);

    return true;
  } catch {
    return false;
  }
}

export function isNil(object: any): object is void {
  return object == null;
}

export function isPlainObject(object: any): boolean {
  return (
    isObject(object)
    && object !== null
    // eslint-disable-next-line no-proto
    && (object.constructor === Object || object.__proto__ === null)
  );
}

/* ------------- PROMISE EXTENSIONS ------------- */

export function isPromiseLike(object: any): boolean {
  return (
    isObject(object) && object !== null && typeof object.then === 'function'
  );
}

/* ------------- STRING EXTENSIONS ------------- */

export function isCharacter(object: any): boolean {
  return isString(object) && object.length === 1;
}
