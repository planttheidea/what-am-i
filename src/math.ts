import { isNumber } from './types';

export function isAbove(value: number, min: number): boolean {
  if (!isNumber(value) || !isNumber(min)) {
    return false;
  }

  return value > min;
}

export function isBelow(value: number, min: number): boolean {
  if (!isNumber(value) || !isNumber(min)) {
    return false;
  }

  return value < min;
}

export function isBetween(value: number, min: number, max: number): boolean {
  return (
    isNumber(value)
    && isNumber(min)
    && isNumber(max)
    && value > min
    && value < max
  );
}

export function isEven(value: number): boolean {
  return isNumber(value) && value % 2 === 0;
}

export function isNegative(value: number): boolean {
  return isNumber(value) && value < 0;
}

export function isOdd(value: number): boolean {
  return isNumber(value) && value % 2 === 1;
}

export function isPositive(value: number): boolean {
  return isNumber(value) && value > 0;
}

export function isWithin(value: number, min: number, max: number): boolean {
  return (
    isNumber(value)
    && isNumber(min)
    && isNumber(max)
    && value >= min
    && value <= max
  );
}

export function isZero(value: number): boolean {
  return isNumber(value) && value === 0;
}
