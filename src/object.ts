import { NODE_LIST } from './_internal/regexps';
import { getClassName, getOwnProperties } from './_internal/utils';

import { isArray, isNaN, isNull, isNumber, isObject, isRegExp } from './types';

export function isPrimitive(object: any): boolean {
  return !isObject(object) || isNull(object);
}

export function isDomNode(object: any): boolean {
  return !isPrimitive(object) && object.nodeType > 0;
}

export function isDomNodeList(object: any): boolean {
  return !isPrimitive(object) && NODE_LIST.test(getClassName(object));
}

export function isPropertyDefined(
  object: any,
  property: string | symbol,
): boolean {
  if (isPrimitive(object)) {
    return false;
  }

  return getOwnProperties(object).indexOf(property) !== -1;
}

export function isSameType(a: any, b: any): boolean {
  if (typeof a !== typeof b) {
    return false;
  }

  if (isPrimitive(a)) {
    return isPrimitive(b);
  }

  // eslint-disable-next-line no-proto
  return a.__proto__ === b.__proto__ && getClassName(a) === getClassName(b);
}

const EPSILON = Number.EPSILON || 2.220446049250313e-16;

export function isEqual(a: any, b: any): boolean {
  if (!isSameType(a, b)) {
    return false;
  }

  if (isNumber(a)) {
    if (isNaN(a)) {
      return isNaN(b);
    }

    return Math.abs(a - b) < EPSILON && 1 / a === 1 / b;
  }

  if (isPrimitive(a)) {
    return a === b;
  }

  if (isRegExp(a)) {
    return a.toString() === b.toString();
  }

  if (isArray(a)) {
    if (!isArray(b)) {
      return false;
    }

    const { length } = a;

    if (b.length !== length) {
      return false;
    }

    for (let index = 0; index < length; ++index) {
      if (!isEqual(a[index], b[index])) {
        return false;
      }
    }

    return true;
  }

  const properties = getOwnProperties(a);

  const { length } = properties;

  if (getOwnProperties(b).length !== length) {
    return false;
  }

  let property;

  for (let index = 0; index < length; ++index) {
    property = properties[index];

    if (!isEqual(a[property], b[property])) {
      return false;
    }
  }

  return true;
}
