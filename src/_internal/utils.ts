/* eslint-disable prefer-rest-params */

import { COMPLEX_WORD, HAS_COMPLEX_WORD, SIMPLE_WORD } from './regexps';

export function createAll(fn: Function) {
  return function all(): boolean {
    const { length } = arguments;

    for (let index = 0; index < length; ++index) {
      if (!fn(arguments[index])) {
        return false;
      }
    }

    return true;
  };
}

export function createAny(fn: Function) {
  return function any(): boolean {
    const { length } = arguments;

    for (let index = 0; index < length; ++index) {
      if (fn(arguments[index])) {
        return true;
      }
    }

    return false;
  };
}

export function createNot(fn: Function) {
  return function not(): boolean {
    return !fn.apply(this, arguments);
  };
}

export function getArrayOfWords(string: string): string[] {
  const pattern = HAS_COMPLEX_WORD.test(string) ? COMPLEX_WORD : SIMPLE_WORD;

  return string.match(pattern) || [];
}

/**
 * Converts string passed to PascalCase spelling
 *
 * @param {any} string
 * @returns {string}
 */
export const toPascalCase = (string: string): string => {
  const arrayOfWords = getArrayOfWords(string);

  let pascalCaseString = '';

  arrayOfWords.forEach((word) => {
    pascalCaseString += word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  return pascalCaseString;
};

/**
 * Converts string passed to camelCase spelling
 *
 * @param {any} string
 * @returns {string}
 */
export const toCamelCase = (string: string): string => {
  const pascalCaseString = toPascalCase(string);

  return `${pascalCaseString[0].toLowerCase()}${pascalCaseString.slice(1)}`;
};

/**
 * Converts string passed to kebab-case spelling
 *
 * @param {any} string
 * @returns {string}
 */
export const toKebabCase = (string: string): string => {
  const arrayOfWords = getArrayOfWords(string);

  let kebabCaseString = '';

  arrayOfWords.forEach((word, index) => {
    if (index !== 0) {
      kebabCaseString += '-';
    }

    kebabCaseString += word.toLowerCase();
  });

  return kebabCaseString;
};

/**
 * Converts string passed to snake_case spelling
 *
 * @param {any} string
 * @returns {string}
 */
export const toSnakeCase = (string: string): string => {
  const arrayOfWords = getArrayOfWords(string);

  let snakeCaseString = '';

  arrayOfWords.forEach((word, index) => {
    if (index !== 0) {
      snakeCaseString += '_';
    }

    snakeCaseString += word.toLowerCase();
  });

  return snakeCaseString;
};

/**
 * Converts string passed to Start Case spelling
 *
 * @param {any} string
 * @returns {string}
 */
export const toStartCase = (string: string): string => {
  const arrayOfWords = getArrayOfWords(string);

  let startCaseString = '';

  arrayOfWords.forEach((word, index) => {
    if (index !== 0) {
      startCaseString += ' ';
    }

    startCaseString
      += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return startCaseString;
};

const { propertyIsEnumerable, toString } = Object.prototype;

export function getClassName(object: any) {
  return toString.call(object);
}

export function isInstanceOf(object: any, className: string): boolean {
  return getClassName(object) === `[object ${className}]`;
}

const LOWERCASE_ONLY: { [key: string]: boolean } = {
  JSON: true,
};

export function getDefaultExportName(type: string): string {
  const name = type.slice(2);

  if (LOWERCASE_ONLY[name]) {
    return name.toLowerCase();
  }

  return toCamelCase(name);
}

export function getOwnProperties(object: any): (string | symbol)[] {
  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return Object.keys(object);
  }

  const keys = Object.keys(object);
  // eslint-disable-next-line max-len,comma-dangle
  const symbols = Object.getOwnPropertySymbols(object).filter(symbol => propertyIsEnumerable.call(object, symbol),);

  return [...keys, ...symbols];
}
