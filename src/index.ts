import {
  createAll,
  createAny,
  createNot,
  getDefaultExportName,
} from './_internal/utils';

import * as array from './array';
import * as environment from './environment';
import * as math from './math';
import * as object from './object';
import * as presence from './presence';
import * as string from './string';
import * as temporal from './temporal';
import * as types from './types';
import * as values from './values';

export * from './array';
export * from './environment';
export * from './math';
export * from './object';
export * from './presence';
export * from './string';
export * from './temporal';
export * from './types';
export * from './values';

type PlainObject = { [key: string]: any };

type ExportedNamespace = {
  [key: string]: Function;
};

const IMPORTS: PlainObject = {
  ...array,
  ...environment,
  ...math,
  ...object,
  ...presence,
  ...string,
  ...temporal,
  ...types,
  ...values,
};

export const all = Object.keys(IMPORTS).reduce(
  (_imports: PlainObject, importName: string) => {
    const fn = IMPORTS[importName];

    if (fn.length === 1) {
      const name = getDefaultExportName(importName);

      // eslint-disable-next-line no-param-reassign
      _imports[name] = createAll(IMPORTS[importName]);
    }

    return _imports;
  },
  {} as ExportedNamespace,
);

export const any = Object.keys(IMPORTS).reduce(
  (_imports: PlainObject, importName: string) => {
    const fn = IMPORTS[importName];

    if (fn.length === 1) {
      const name = getDefaultExportName(importName);

      // eslint-disable-next-line no-param-reassign
      _imports[name] = createAny(IMPORTS[importName]);
    }

    return _imports;
  },
  {} as ExportedNamespace,
);

export const not = Object.keys(IMPORTS).reduce(
  (_imports: PlainObject, importName: string) => {
    const name = getDefaultExportName(importName);

    // eslint-disable-next-line no-param-reassign
    _imports[name] = createNot(IMPORTS[importName]);

    return _imports;
  },
  {} as ExportedNamespace,
);

const DEFAULT_EXPORT = Object.keys(IMPORTS).reduce(
  (_imports: PlainObject, importName: string) => {
    const name = getDefaultExportName(importName);

    // eslint-disable-next-line no-param-reassign
    _imports[name] = IMPORTS[importName];

    return _imports;
  },
  {} as ExportedNamespace,
);

DEFAULT_EXPORT.all = all;
DEFAULT_EXPORT.any = any;
DEFAULT_EXPORT.not = not;

export default DEFAULT_EXPORT;
