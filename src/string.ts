import { DATA_URL, DOUBLE_BYTE, HTML, WHITESPACE } from './_internal/regexps';
import {
  getArrayOfWords,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './_internal/utils';

import { isEqual } from './object';
import { isString } from './types';

export function isCamelCase(string: string): boolean {
  return isString(string) && string === toCamelCase(string);
}

export function isCapitalized(string: string): boolean {
  if (!isString(string)) {
    return false;
  }

  const words = getArrayOfWords(string);
  const capitalized = words.map(
    word => `${word[0].toUpperCase()}${word.slice(1)}`,
  );

  return isEqual(words, capitalized);
}

export function isDataUrl(string: string): boolean {
  return isString(string) && DATA_URL.test(string);
}

export function isDoubleByte(string: string): boolean {
  return isString(string) && DOUBLE_BYTE.test(string);
}

export function isEndingWith(string: string, ending: string): boolean {
  if (!isString(string) || !isString(ending)) {
    return false;
  }

  const index = string.indexOf(ending);

  return index !== -1 && index === string.length - ending.length;
}

export function isHtml(string: string): boolean {
  return isString(string) && HTML.test(string);
}

export function isKebabCase(string: string): boolean {
  return isString(string) && string === toKebabCase(string);
}

export function isLowerCase(string: string): boolean {
  return isString(string) && string === string.toLowerCase();
}

export function isPalindrome(string: string): boolean {
  if (!isString(string)) {
    return false;
  }

  const cleanString = string.replace(/\s/g, '');
  const reversedCleanString = cleanString
    .split('')
    .reverse()
    .join('');

  return cleanString === reversedCleanString;
}

export function isPascalCase(string: string): boolean {
  return isString(string) && string === toPascalCase(string);
}

export function isSnakeCase(string: string): boolean {
  return isString(string) && string === toSnakeCase(string);
}

export function isScreamingSnakeCase(string: string): boolean {
  return isSnakeCase(string) && string === string.toUpperCase();
}

export function isStartingWith(string: string, starting: string): boolean {
  return (
    isString(string) && isString(starting) && string.indexOf(starting) === 0
  );
}

export function isSpace(string: string): boolean {
  return isString(string) && string === ' ';
}

export function isUpperCase(string: string): boolean {
  return isString(string) && string === string.toUpperCase();
}

export function isWhitespace(string: string): boolean {
  return isString(string) && WHITESPACE.test(string);
}
