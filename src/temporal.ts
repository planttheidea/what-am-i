import { isWithin } from './math';
import { isDate, isNaN, isNumber, isString } from './types';

/**
 * String values for the days of the week
 */
const DAY_STRINGS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

/**
 * String values for the months of the year
 */
const MONTH_STRINGS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export function isDay(
  date: Date,
  dayString: string = DAY_STRINGS[new Date().getDay()],
): boolean {
  return (
    isDate(date)
    && isString(dayString)
    && dayString.toLowerCase() === DAY_STRINGS[date.getDay()]
  );
}

export function isDaylightSavingsTime(date: Date): boolean {
  if (!isDate(date)) {
    return false;
  }

  const year = date.getFullYear();
  const january = new Date(year, 0, 1);
  const july = new Date(year, 6, 1);

  return (
    date.getTimezoneOffset()
    < Math.max(january.getTimezoneOffset(), july.getTimezoneOffset())
  );
}

export function isInDateRange(
  date: Date,
  minDate: Date,
  maxDate: Date,
): boolean {
  if (!isDate(date) || !isDate(minDate) || !isDate(maxDate)) {
    return false;
  }

  const time = +date;

  return time >= +minDate && time <= +maxDate;
}

export function isInLastMonth(date: Date): boolean {
  const today = new Date();
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));

  return isInDateRange(date, oneMonthAgo, today);
}

export function isInLastWeek(date: Date): boolean {
  const today = new Date();
  const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));

  return isInDateRange(date, oneWeekAgo, today);
}

export function isInLastYear(date: Date): boolean {
  const today = new Date();
  const oneYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1),
  );

  return isInDateRange(date, oneYearAgo, today);
}

export function isInNextMonth(date: Date): boolean {
  const today = new Date();
  const oneMonthFromNow = new Date(
    new Date().setMonth(new Date().getMonth() + 1),
  );

  return isInDateRange(date, today, oneMonthFromNow);
}

export function isInNextWeek(date: Date): boolean {
  const today = new Date();
  const oneWeekFromNow = new Date(new Date().setDate(new Date().getDate() + 7));

  return isInDateRange(date, today, oneWeekFromNow);
}

export function isInNextYear(date: Date): boolean {
  const today = new Date();
  const oneYearFromNow = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  );

  return isInDateRange(date, today, oneYearFromNow);
}

export function isLeapYear(date: Date | number): boolean {
  const epoch: number = isDate(date) ? +date : date;

  return (
    isNumber(epoch)
    && ((epoch % 4 === 0 && epoch % 100 !== 0) || epoch % 400 === 0)
  );
}

export function isMonth(
  date: Date,
  monthString: string = MONTH_STRINGS[new Date().getMonth()],
): boolean {
  return (
    isDate(date)
    && isString(monthString)
    && monthString.toLowerCase() === MONTH_STRINGS[date.getMonth()]
  );
}

export function isPast(date: Date): boolean {
  return isDate(date) && +date < Date.now();
}

export function isQuarterOfYear(date: Date, quarter: number): boolean {
  return (
    isDate(date)
    && isWithin(quarter, 1, 4)
    && quarter === Math.floor((date.getMonth() + 3) / 3)
  );
}

export function isToday(date: Date, today = new Date()): boolean {
  return (
    isDate(date)
    && isDate(today)
    && date.toDateString() === today.toDateString()
  );
}

export function isTomorrow(
  date: Date,
  tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1)),
): boolean {
  return isToday(date, tomorrow);
}

export function isWeekday(date: Date): boolean {
  return isDate(date) && isWithin(date.getDay(), 1, 5);
}

export function isWeekend(date: Date): boolean {
  if (!isDate(date)) {
    return false;
  }

  const day = date.getDay();

  return day === 0 || day === 6;
}

export function isYear(
  date: Date,
  year: number = new Date().getFullYear(),
): boolean {
  return (
    isDate(date)
    && isNumber(year)
    && !isNaN(year)
    && year === date.getFullYear()
  );
}

export function isYesterday(
  date: Date,
  yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1)),
): boolean {
  return isToday(date, yesterday);
}
