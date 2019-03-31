import { getOwnProperties } from './_internal/utils';

import { isWhitespace } from './string';
import {
  isArguments,
  isArray,
  isNil,
  isObject,
  isRegExp,
  isString,
} from './types';

export function isFalsy(object: any): boolean {
  return !object;
}

export function isExisty(object: any): boolean {
  return !isNil(object);
}

export function isEmpty(object: any): boolean {
  if (!isExisty(object) || isWhitespace(object)) {
    return true;
  }

  if (isArray(object) || isString(object) || isArguments(object)) {
    return object.length === 0;
  }

  if (isRegExp(object)) {
    const objectString = object.toString();

    return objectString === '/(?:)/' || objectString === '//';
  }

  if (isObject(object)) {
    return getOwnProperties(object).length === 0;
  }

  return false;
}

export function isTruthy(object: any): boolean {
  return !!object;
}
