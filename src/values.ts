import {
  AFFIRMATIVE,
  ALPHA_NUMERIC,
  CA_POSTAL_CODE,
  CREDIT_CARD,
  DATE_STRING,
  EMAIL,
  EPP_PHONE,
  HEX_COLOR,
  HEXADECIMAL,
  IP_ADDRESS,
  IPV4_ADDRESS,
  IPV6_ADDRESS,
  ISO_DATE_STRING,
  NANP_PHONE,
  SOCIAL_SECURITY_NUMBER,
  TIME_STRING,
  UK_POSTAL_CODE,
  URL,
  US_ZIP_CODE,
} from './_internal/regexps';

export function isAffirmative(object: any): boolean {
  return AFFIRMATIVE.test(`${object}`);
}

export function isAlphaNumeric(object: any): boolean {
  return ALPHA_NUMERIC.test(`${object}`);
}

export function isCaPostalCode(object: any): boolean {
  return CA_POSTAL_CODE.test(`${object}`);
}

export function isCreditCard(object: any): boolean {
  return CREDIT_CARD.test(`${object}`);
}

export function isDateString(object: any): boolean {
  return DATE_STRING.test(`${object}`);
}

export function isEmail(object: any): boolean {
  return EMAIL.test(`${object}`);
}

export function isEppPhone(object: any): boolean {
  return EPP_PHONE.test(`${object}`);
}

export function isHexColor(object: any): boolean {
  return HEX_COLOR.test(`${object}`);
}

export function isHexadecimal(object: any): boolean {
  return HEXADECIMAL.test(`${object}`);
}

export function isIpAddress(object: any): boolean {
  return IP_ADDRESS.test(`${object}`);
}

export function isIpv4Address(object: any): boolean {
  return IPV4_ADDRESS.test(`${object}`);
}

export function isIpv6Address(object: any): boolean {
  return IPV6_ADDRESS.test(`${object}`);
}

export function isIsoDateString(object: any): boolean {
  return ISO_DATE_STRING.test(`${object}`);
}

export function isNanpPhone(object: any): boolean {
  return NANP_PHONE.test(`${object}`);
}

export function isSocialSecurityNumber(object: any): boolean {
  return SOCIAL_SECURITY_NUMBER.test(`${object}`);
}

export function isTimeString(object: any): boolean {
  return TIME_STRING.test(`${object}`);
}

export function isUkPostalCode(object: any): boolean {
  return UK_POSTAL_CODE.test(`${object}`);
}

export function isUrl(object: any): boolean {
  return URL.test(`${object}`);
}

export function isUsZipCode(object: any): boolean {
  return US_ZIP_CODE.test(`${object}`);
}
