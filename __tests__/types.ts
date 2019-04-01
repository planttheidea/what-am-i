/* globals describe,it,expect */

import * as types from '../src/types';

function getArguments() {
  return arguments;
}

type Import = { [key: string]: (...args: any[]) => boolean };

const imports: Import = { ...types };

const TYPES: { [key: string]: any } = {
  // @ts-ignore
  Arguments: getArguments(1, 2, 3) as IArguments,
  Array: [] as any[],
  ArrayBuffer: new ArrayBuffer(10),
  Boolean: true,
  Date: new Date(),
  Error: new Error(),
  Float32Array: new Float32Array(),
  Float64Array: new Float64Array(),
  Function() {},
  Int8Array: new Int8Array(),
  Int16Array: new Int16Array(),
  Int32Array: new Int32Array(),
  Map: new Map(),
  Null: null as null,
  Number: 1,
  Object: {
    foo: 'bar',
  },
  Promise: new Promise(resolve => resolve),
  RegExp: /regex/,
  Set: new Set(),
  String: 'Word',
  Symbol: Symbol('hello'),
  Uint8Array: new Uint8Array(),
  Uint8ClampedArray: new Uint8ClampedArray(),
  Uint16Array: new Uint16Array(),
  Uint32Array: new Uint32Array(),
  Undefined: undefined as undefined,
  WeakMap: new WeakMap(),
  WeakSet: new WeakSet(),
};

describe('native types', () => {
  const { Object: ObjectType, ...restOfTypes } = TYPES;

  Object.keys(restOfTypes).forEach((name) => {
    const methodName = `is${name}`;

    describe(methodName, () => {
      Object.keys(restOfTypes).forEach((_name) => {
        const testName =          name === _name
            ? `should match if ${_name}`
            : `should not match if ${_name}`;

        it(testName, () => {
          const value = restOfTypes[_name];

          const tester = imports[methodName];

          expect(tester(value)).toEqual(name === _name);
        });
      });
    });
  });

  const objectTypes: { true: Import; false: Import } = Object.keys(
    TYPES,
  ).reduce(
    (_types: { true: Import; false: Import }, type) => {
      if (typeof TYPES[type] === 'object') {
        _types.true[type] = TYPES[type];
      }

      return _types;
    },
    {
      true: {},
      false: {},
    },
  );

  it('should match Object if any object type', () => {
    Object.keys(objectTypes.true).forEach((_name) => {
      const value = objectTypes.true[_name];

      expect(types.isObject(value)).toEqual(true);
    });
  });

  it('should not match Object if not an object type', () => {
    Object.keys(objectTypes.false).forEach((_name) => {
      const value = objectTypes.false[_name];

      expect(types.isObject(value)).toEqual(false);
    });
  });
});

describe('array extensions', () => {
  describe('isArrayLike', () => {
    it('should match array-like objects', () => {
      const matches = [['foo'], { 0: 'foo', length: 1 }];

      matches.forEach((match) => {
        expect(imports.isArrayLike(match)).toEqual(true);
      });
    });

    it('should not match non-array-like objects', () => {
      const nonMatches = [{ foo: 'bar' }, null, 123];

      nonMatches.forEach((nonMatch) => {
        expect(imports.isArrayLike(nonMatch)).toEqual(false);
      });
    });
  });

  describe('isTypedArray', () => {
    it('should match all typed arrays', () => {
      const matches = [
        new Float32Array(),
        new Float64Array(),
        new Int8Array(),
        new Int16Array(),
        new Int32Array(),
        new Uint8Array(),
        new Uint8ClampedArray(),
        new Uint16Array(),
        new Uint32Array(),
      ];

      matches.forEach((match) => {
        expect(imports.isTypedArray(match)).toEqual(true);
      });
    });

    it('should not match other object types', () => {
      const nonMatches = [[], {}, null, 123];

      nonMatches.forEach((nonMatch) => {
        expect(imports.isTypedArray(nonMatch)).toEqual(false);
      });
    });
  });
});

describe('number extensions', () => {
  describe('isDecimal', () => {
    it('should match if a decimal', () => {
      const positive = 123.456;
      const negative = -654.321;

      expect(imports.isDecimal(positive)).toEqual(true);
      expect(imports.isDecimal(negative)).toEqual(true);
    });

    it('should not match if an integer', () => {
      const positive = 123;
      const negative = -654;

      expect(imports.isDecimal(positive)).toEqual(false);
      expect(imports.isDecimal(negative)).toEqual(false);
    });

    it('should not match if a NaN', () => {
      expect(imports.isDecimal(NaN)).toEqual(false);
    });

    it('should not match if not a number', () => {
      const nonMatches = [[], {}, 'foo', null];

      nonMatches.forEach((nonMatch) => {
        expect(imports.isDecimal(nonMatch)).toEqual(false);
      });
    });
  });

  describe('isInteger', () => {
    it('should match if an integer', () => {
      const positive = 123;
      const negative = -654;

      expect(imports.isInteger(positive)).toEqual(true);
      expect(imports.isInteger(negative)).toEqual(true);
    });

    it('should not match if a decimal', () => {
      const positive = 123.456;
      const negative = -654.321;

      expect(imports.isInteger(positive)).toEqual(false);
      expect(imports.isInteger(negative)).toEqual(false);
    });

    it('should not match if a NaN', () => {
      expect(imports.isInteger(NaN)).toEqual(false);
    });

    it('should not match if not a number', () => {
      const nonMatches = [[], {}, 'foo', null];

      nonMatches.forEach((nonMatch) => {
        expect(imports.isInteger(nonMatch)).toEqual(false);
      });
    });
  });

  describe('isNaN', () => {
    it('should match if a NaN', () => {
      expect(imports.isNaN(NaN)).toEqual(true);
    });

    it('should not match if an integer', () => {
      const positive = 123;
      const negative = -654;

      expect(imports.isNaN(positive)).toEqual(false);
      expect(imports.isNaN(negative)).toEqual(false);
    });

    it('should not not match if a decimal', () => {
      const positive = 123.456;
      const negative = -654.321;

      expect(imports.isNaN(positive)).toEqual(false);
      expect(imports.isNaN(negative)).toEqual(false);
    });

    it('should not match if not a number', () => {
      const nonMatches = [[], {}, 'foo', null];

      nonMatches.forEach((nonMatch) => {
        expect(imports.isNaN(nonMatch)).toEqual(false);
      });
    });
  });

  describe('isFinite', () => {
    it('should match if an integer', () => {
      const positive = 123;
      const negative = -654;

      expect(imports.isFinite(positive)).toEqual(true);
      expect(imports.isFinite(negative)).toEqual(true);
    });

    it('should match if a decimal', () => {
      const positive = 123.456;
      const negative = -654.321;

      expect(imports.isFinite(positive)).toEqual(true);
      expect(imports.isFinite(negative)).toEqual(true);
    });

    it('should not match if infinity', () => {
      const positive = Infinity;
      const negative = -Infinity;

      expect(imports.isFinite(positive)).toEqual(false);
      expect(imports.isFinite(negative)).toEqual(false);
    });

    it('should not match if not a number', () => {
      const nonMatches = [[], {}, 'foo', null];

      nonMatches.forEach((nonMatch) => {
        expect(imports.isNaN(nonMatch)).toEqual(false);
      });
    });
  });
});

describe('object extensions', () => {
  describe('isJSON', () => {
    it('should match if a valid JSON string', () => {
      const match = JSON.stringify({ foo: 'bar' });

      expect(imports.isJSON(match)).toEqual(true);
    });

    it('should not match if an invalid JSON string', () => {
      const match = JSON.stringify({ foo: 'bar' }).slice(1);

      expect(imports.isJSON(match)).toEqual(false);
    });

    it('should not match if a string', () => {
      const match = { foo: 'bar' };

      expect(imports.isJSON(match)).toEqual(false);
    });
  });

  describe('isNil', () => {
    Object.keys(TYPES).forEach((name) => {
      const isNil = name === 'Null' || name === 'Undefined';
      const testName = isNil
        ? `should match when ${name}`
        : `should not match when ${name}`;

      it(testName, () => {
        expect(imports.isNil(TYPES[name])).toEqual(isNil);
      });
    });
  });

  describe('isPlainObject', () => {
    Object.keys(TYPES).forEach((name) => {
      const isPlainObject = name === 'Object' || name === 'Arguments';
      const testName = isPlainObject
        ? `should match when ${name}`
        : `should not match when ${name}`;

      it(testName, () => {
        expect(imports.isPlainObject(TYPES[name])).toEqual(isPlainObject);
      });
    });
  });
});

describe('promise extensions', () => {
  describe('isPromiseLike', () => {
    it('should match actual promises', () => {
      expect(imports.isPromiseLike(new Promise(resolve => resolve))).toEqual(
        true,
      );
    });

    it('should match thenable objects', () => {
      expect(imports.isPromiseLike({ then() {} })).toEqual(true);
    });

    Object.keys(TYPES).forEach((name) => {
      if (name !== 'Promise') {
        it(`should not match when ${name}`, () => {
          expect(imports.isPromiseLike(TYPES[name])).toEqual(false);
        });
      }
    });
  });
});

describe('string extensions', () => {
  describe('isCharacter', () => {
    it('should match a single character', () => {
      expect(imports.isCharacter('s')).toEqual(true);
    });

    it('should not match a string longer than 1', () => {
      expect(imports.isCharacter('ss')).toEqual(false);
    });

    it('should not match an empty string', () => {
      expect(imports.isCharacter('')).toEqual(false);
    });

    Object.keys(TYPES).forEach((name) => {
      if (name !== 'String') {
        it(`should not match when ${name}`, () => {
          expect(imports.isCharacter(TYPES[name])).toEqual(false);
        });
      }
    });
  });
});
