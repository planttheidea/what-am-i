/* globals navigator,window,document */

import {
  ANDROID,
  APP_VERSION,
  APPLE_COMPUTER,
  APPLE_WEBKIT,
  BLACKBERRY,
  BB10,
  CHROME,
  CHROME_OR_CHROMIUM,
  EDGE,
  FIREFOX,
  GECKO,
  GOOGLE_INC,
  HAS_WINDOW,
  IPAD,
  IPHONE,
  IPOD,
  LINUX,
  MAC,
  MOBILE,
  MSIE,
  NAVIGATOR_IN_WINDOW,
  OPERA_LEGACY,
  OPERA_MODERN,
  PHONE,
  RV11,
  SAFARI,
  TOUCH,
  TRIDENT,
  USER_AGENT,
  WIN,
  WINDOWS_NT,
  VENDOR,
} from './_internal/regexps';

import { isString } from './types';

export function isAndroid(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && ANDROID.test(USER_AGENT);
}

export function isAndroidPhone(userAgent: string = USER_AGENT): boolean {
  return isAndroid(userAgent) && MOBILE.test(userAgent);
}

export function isAndroidTablet(userAgent: string = USER_AGENT): boolean {
  return isAndroid(userAgent) && !MOBILE.test(userAgent);
}

export function isBlackberry(userAgent: string = USER_AGENT): boolean {
  return (
    isString(userAgent) && (BLACKBERRY.test(userAgent) || BB10.test(userAgent))
  );
}

export function isBlink(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && CHROME.test(userAgent);
}

export function isBrowser(): boolean {
  return HAS_WINDOW;
}

export function isChrome(
  userAgent: string = USER_AGENT,
  vendor: string = VENDOR,
): boolean {
  return (
    isString(userAgent)
    && isString(vendor)
    && CHROME_OR_CHROMIUM.test(userAgent)
    && GOOGLE_INC.test(vendor)
  );
}

export function isIpad(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && IPAD.test(userAgent);
}

export function isIphone(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && IPHONE.test(userAgent) && !IPOD.test(userAgent);
}

export function isIpod(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && IPOD.test(userAgent);
}

export function isIos(userAgent: string = USER_AGENT): boolean {
  return isIphone(userAgent) || isIpad(userAgent) || isIpod(userAgent);
}

export function isWindows(appVersion: string = APP_VERSION): boolean {
  return isString(appVersion) && WIN.test(appVersion);
}

export function isWindowsPhone(
  userAgent: string = USER_AGENT,
  appVersion: string = APP_VERSION,
): boolean {
  return isString(userAgent) && isWindows(appVersion) && PHONE.test(userAgent);
}

export function isWindowsTablet(
  userAgent: string = USER_AGENT,
  appVersion: string = APP_VERSION,
): boolean {
  return (
    isString(userAgent)
    && isWindows(appVersion)
    && !isWindowsPhone(userAgent, appVersion)
    && TOUCH.test(userAgent)
  );
}

export function isMobile(
  userAgent: string = USER_AGENT,
  appVersion: string = APP_VERSION,
): boolean {
  return (
    isIphone(userAgent)
    || isIpad(userAgent)
    || isAndroidPhone(userAgent)
    || isWindowsPhone(userAgent, appVersion)
    || isIpod(userAgent)
    || isBlackberry(userAgent)
  );
}

export function isTablet(
  userAgent: string = USER_AGENT,
  appVersion: string = APP_VERSION,
): boolean {
  return (
    isIpad(userAgent)
    || isAndroidTablet(userAgent)
    || isWindowsTablet(userAgent, appVersion)
  );
}

export function isDesktop(
  userAgent: string = USER_AGENT,
  appVersion: string = APP_VERSION,
): boolean {
  return !isMobile(userAgent, appVersion) && !isTablet(userAgent, appVersion);
}

export function isEdge(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && EDGE.test(userAgent);
}

export function isFirefox(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && FIREFOX.test(userAgent);
}

export function isGecko(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && GECKO.test(userAgent);
}

export function isIe(version: number, userAgent: string = USER_AGENT): boolean {
  if (!isString(userAgent)) {
    return false;
  }

  if (!version) {
    return (
      MSIE.test(userAgent)
      || (WINDOWS_NT.test(userAgent) && RV11.test(userAgent))
    );
  }

  /**
   * the reason for the fallback is because IE11 is weird, in that
   * only certain versions contained MSIE in its user agent
   */
  return (
    new RegExp(`msie ${version}`, 'i').test(userAgent)
    || (WINDOWS_NT.test(userAgent) && RV11.test(userAgent))
  );
}

export function isLinux(appVersion: string = APP_VERSION) {
  return isString(appVersion) && LINUX.test(appVersion);
}

export function isMac(appVersion: string = APP_VERSION) {
  return isString(appVersion) && MAC.test(appVersion);
}

export function isNode(): boolean {
  return !isBrowser();
}

export function isOnline(): boolean {
  return NAVIGATOR_IN_WINDOW && navigator.onLine;
}

export function isOffline(): boolean {
  return !isOnline();
}

export function isOpera(userAgent: string = USER_AGENT) {
  return (
    isString(userAgent)
    // Opera 12 and older versions
    && (OPERA_LEGACY.test(userAgent)
      // Opera 15+
      || OPERA_MODERN.test(userAgent))
  );
}

export function isPresto(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && OPERA_LEGACY.test(userAgent);
}

export function isSafari(userAgent: string = USER_AGENT): boolean {
  return (
    isString(userAgent)
    && SAFARI.test(userAgent)
    && APPLE_COMPUTER.test(userAgent)
  );
}

export function isTrident(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && TRIDENT.test(userAgent);
}

export function isTouchDevice(): boolean {
  return (
    (HAS_WINDOW && 'ontouchstart' in window)
    // @ts-ignore
    || ('DocumentTouch' in window && document instanceof window.DocumentTouch)
  );
}

export function isWebkit(userAgent: string = USER_AGENT): boolean {
  return isString(userAgent) && APPLE_WEBKIT.test(userAgent);
}
