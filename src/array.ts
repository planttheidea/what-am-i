import { isArray } from './types';

function checkSortedAscending(array: any[]): boolean {
  const { length } = array;

  for (let index = 0; index < length; ++index) {
    if (index + 1 < length && array[index] > array[index + 1]) {
      return false;
    }
  }

  return true;
}

function checkSortedDescending(array: any[]): boolean {
  for (let index = array.length - 1; index > 0; --index) {
    if (array[index] > array[index - 1]) {
      return false;
    }
  }

  return true;
}

export function isArraySorted(object: any[]): boolean {
  return (
    isArray(object)
    && (checkSortedAscending(object) || checkSortedDescending(object))
  );
}

export function isArraySortedAsc(object: any[]): boolean {
  return isArray(object) && checkSortedAscending(object);
}

export function isArraySortedDesc(object: any[]): boolean {
  return isArray(object) && checkSortedDescending(object);
}

export function isInArray(object: any[], item: any): boolean {
  return isArray(object) && object.indexOf(item) !== -1;
}
