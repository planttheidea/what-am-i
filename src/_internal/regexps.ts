/* globals window,navigator */

/* eslint-disable no-control-regex,no-multi-spaces,no-useless-escape */

/* ---------------- STRINGS ---------------- */

export const WHITESPACE = /^\s\s*/;

export const DATA_URL = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i; // eslint-disable-line
export const DOUBLE_BYTE = /[^\u0000-\u00ff]/;
export const HTML = /<("[^"]*"|'[^']*'|[^'">])*>/;

/**
 * All necessary values for computation of getArrayOfWords is taken from lodash,
 * found at https://raw.githubusercontent.com/lodash/lodash/master/lodash.js
 */
export const RS_ASTRAL_RANGE = '\\ud800-\\udfff';
export const RS_COMBO_MARKS_RANGE = '\\u0300-\\u036f\\ufe20-\\ufe23';
export const RS_COMBO_SYMBOLS_RANGE = '\\u20d0-\\u20f0';
export const RS_DINGBAT_RANGE = '\\u2700-\\u27bf';
export const RS_LOWER_RANGE = 'a-z\\xdf-\\xf6\\xf8-\\xff';
export const RS_MATH_OP_RANGE = '\\xac\\xb1\\xd7\\xf7';
export const RS_NON_CHAR_RANGE = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
export const RS_QUOTE_RANGE = '\\u2018\\u2019\\u201c\\u201d';
export const RS_SPACE_RANGE =  ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
export const RS_UPPER_RANGE = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
export const RS_VAR_RANGE = '\\ufe0e\\ufe0f';
// eslint-disable-next-line max-len
export const RS_BREAK_RANGE =  RS_MATH_OP_RANGE + RS_NON_CHAR_RANGE + RS_QUOTE_RANGE + RS_SPACE_RANGE;

export const RS_BREAK = `[${RS_BREAK_RANGE}]`;
export const RS_COMBO = `[${RS_COMBO_MARKS_RANGE + RS_COMBO_SYMBOLS_RANGE}]`;
export const RS_DIGITS = '\\d+';
export const RS_DINGBAT = `[${RS_DINGBAT_RANGE}]`;
export const RS_LOWER = `[${RS_LOWER_RANGE}]`;
export const RS_MISC = `[^${RS_ASTRAL_RANGE
  + RS_BREAK_RANGE
  + RS_DIGITS
  + RS_DINGBAT_RANGE
  + RS_LOWER_RANGE
  + RS_UPPER_RANGE}]`;
export const RS_FITZ = '\\ud83c[\\udffb-\\udfff]';
export const RS_MODIFIER = `(?:${RS_COMBO}|${RS_FITZ})`;
export const RS_NON_ASTRAL = `[^${RS_ASTRAL_RANGE}]`;
export const RS_REGIONAL = '(?:\\ud83c[\\udde6-\\uddff]){2}';
export const RS_SURR_PAIR = '[\\ud800-\\udbff][\\udc00-\\udfff]';
export const RS_UPPER = `[${RS_UPPER_RANGE}]`;
export const RS_ZWJ = '\\u200d';

export const RS_LOWER_MISC = `(?:${RS_LOWER}|${RS_MISC})`;
export const RS_UPPER_MISC = `(?:${RS_UPPER}|${RS_MISC})`;
export const RE_OPT_MOD = `${RS_MODIFIER}?`;
export const RS_OPT_VAR = `[${RS_VAR_RANGE}]?`;
export const RS_OPT_JOIN = `(?:${RS_ZWJ}(?:${[
  RS_NON_ASTRAL,
  RS_REGIONAL,
  RS_SURR_PAIR,
].join('|')})${RS_OPT_VAR + RE_OPT_MOD})*`;
export const RS_SEQ = RS_OPT_VAR + RE_OPT_MOD + RS_OPT_JOIN;
export const RS_EMOJI = `(?:${[RS_DINGBAT, RS_REGIONAL, RS_SURR_PAIR].join(
  '|',
)})${RS_SEQ}`;

export const HAS_COMPLEX_WORD = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
export const COMPLEX_WORD = RegExp(
  [
    `${RS_UPPER}?${RS_LOWER}+(?=${[RS_BREAK, RS_UPPER, '$'].join('|')})`,
    `${RS_UPPER_MISC}+(?=${[RS_BREAK, RS_UPPER + RS_LOWER_MISC, '$'].join(
      '|',
    )})`,
    `${RS_UPPER}?${RS_LOWER_MISC}+`,
    `${RS_UPPER}+`,
    RS_DIGITS,
    RS_EMOJI,
  ].join('|'),
  'g',
);
export const SIMPLE_WORD = /[a-zA-Z0-9]+/g;

/* ---------------- ENVIRONMENT ---------------- */

/**
 * Make sure window and navigator exists, else all will blow up
 */
export const HAS_WINDOW = typeof window !== 'undefined';
export const NAVIGATOR_IN_WINDOW = HAS_WINDOW && 'navigator' in window;

type NavigatorAccess = Navigator & {
  [key: string]: any;
};

/**
 * Returns property from navigator object exists, else returns false
 *
 * @param {string} property
 * @returns {boolean|string}
 */
export const hasNavigatorProperty = (property: string) => NAVIGATOR_IN_WINDOW
  && property in navigator
  && (navigator as NavigatorAccess)[property].toLowerCase();

/**
 * Used in pretty much all the checkers
 */
export const USER_AGENT = hasNavigatorProperty('userAgent');
export const VENDOR = hasNavigatorProperty('vendor');
export const APP_VERSION = hasNavigatorProperty('appVersion');

/**
 * RegExps used for testing
 */
export const ANDROID = /android/i;
export const APPLE_COMPUTER = /apple computer/i;
export const APPLE_WEBKIT = /applewebkit/i;
export const BB10 = /BB10/i;
export const BLACKBERRY = /blackberry/i;
export const CHROME = /chrome/i;
export const CHROME_OR_CHROMIUM = /chrome|chromium/i;
export const EDGE = /edge/i;
export const FIREFOX = /firefox/i;
export const GECKO = /gecko/i;
export const GOOGLE_INC = /google inc/i;
export const IPAD = /ipad/i;
export const IPHONE = /iphone/i;
export const IPOD = /ipod/i;
export const LIKE_GECKO = /like gecko/i;
export const LINUX = /linux/i;
export const MAC = /mac/i;
export const MOBILE = /mobile/i;
export const MSIE = /msie/i;
export const OPERA_LEGACY = /^Opera\//;
export const OPERA_MODERN = /\x20OPR\//;
export const PHONE = /phone/i;
export const RV11 = /rv:11/;
export const SAFARI = /safari/i;
export const TOUCH = /touch/i;
export const TRIDENT = /trident/i;
export const UNIX = /X11/;
export const WIN = /win/i;
export const WINDOWS_NT = /windows nt/i;

/* ---------------- OBJECT ---------------- */

export const NODE_LIST = /^\[object (HTMLCollection|NodeList)\]$/;

/* ---------------- VALUES ---------------- */

export const AFFIRMATIVE = /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/;
export const ALPHA_NUMERIC = /^[A-Za-z0-9]+$/;
export const CA_POSTAL_CODE = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/;
export const CREDIT_CARD = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
export const DATE_STRING = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/;
export const EMAIL = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
export const EPP_PHONE = /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/;
export const HEX_COLOR = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/;
export const HEXADECIMAL = /^[0-9a-fA-F]+$/;
export const IP_ADDRESS = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
export const IPV4_ADDRESS = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
export const IPV6_ADDRESS = /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
export const ISO_DATE_STRING = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])-?[1-7]|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s](([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)?(\15([0-5]\d))?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
export const NANP_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const SOCIAL_SECURITY_NUMBER = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
export const TIME_STRING = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
export const UK_POSTAL_CODE = /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
export const URL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
export const US_ZIP_CODE = /^[0-9]{5}(?:-[0-9]{4})?$/;
