// Cookie
// -------------
// Thanks to:
//  - http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
//  - http://developer.yahoo.com/yui/3/cookie/
interface Cookies {
  [cookieName: string]: any;
}

interface CookiesOptions {
  [propName: string]: any;
}


class Cookie {


  private decode = decodeURIComponent;
  private encode = encodeURIComponent;

  /**
   * Returns the cookie value for the given name.
   *
   * @param {String} name The name of the cookie to retrieve.
   *
   * @param {Function|Object} options (Optional) An object containing one or
   *     more cookie options: raw (true/false) and converter (a function).
   *     The converter function is run on the value before returning it. The
   *     function is not used if the cookie doesn't exist. The function can be
   *     passed instead of the options object for conveniently. When raw is
   *     set to true, the cookie value is not URI decoded.
   *
   * @return {*} If no converter is specified, returns a string or undefined
   *     if the cookie doesn't exist. If the converter is specified, returns
   *     the value returned from the converter.
   */
  public get(name: string, options: CookiesOptions = {}) {
    this.validateCookieName(name);

    if (typeof options === 'function') {
      options = { converter: options };
    } else {
      options = options || {};
    }

    const cookies = this.parseCookieString(document.cookie, !options.raw);
    return (options.converter || this.same)(cookies[name]);
  }

  /**
   * Removes a cookie from the machine by setting its expiration date to
   * sometime in the past.
   *
   * @param {string} name The name of the cookie to remove.
   *
   * @param {Object} options (Optional) An object containing one or more
   *     cookie options: path (a string), domain (a string),
   *     and secure (true/false). The expires option will be overwritten
   *     by the method.
   *
   * @return {string} The created cookie string.
   */
  public remove(name: string, options: CookiesOptions = {}) {
    options.expires = new Date(0);
    return this.set(name, '', options);
  }
  /**
   * Sets a cookie with a given name and value.
   *
   * @param {string} name The name of the cookie to set.
   *
   * @param {*} value The value to set for the cookie.
   *
   * @param {Object} options (Optional) An object containing one or more
   *     cookie options: path (a string), domain (a string),
   *     expires (number or a Date object), secure (true/false),
   *     and raw (true/false). Setting raw to true indicates that the cookie
   *     should not be URI encoded before being set.
   *
   * @return {string} The created cookie string.
   */
  public set(name: string, value: string, options: CookiesOptions = {}) {
    this.validateCookieName(name);

    const expires = options.expires;
    const domain = options.domain;
    const path = options.path;

    if (!options.raw) {
      value = this.encode(String(value));
    }

    let text = name + '=' + value;

    // expires
    let date = expires;
    if (typeof date === 'number') {
      date = new Date();
      date.setDate(date.getDate() + expires);
    }
    if (date instanceof Date) {
      text += '; expires=' + date.toUTCString();
    }

    // domain
    if (this.isNonEmptyString(domain)) {
      text += '; domain=' + domain;
    }

    // path
    if (this.isNonEmptyString(path)) {
      text += '; path=' + path;
    }

    // secure
    if (options.secure) {
      text += '; secure';
    }

    document.cookie = text;
    return text;
  }
  private same(s: string): string {
    return s;
  }

  private isString(o: any): boolean {
    return typeof o === 'string';
  }

  private isNonEmptyString(s: string): boolean {
    return this.isString(s) && s !== '';
  }

  private validateCookieName(name: string): void {
    if (!this.isNonEmptyString(name)) {
      throw new TypeError('Cookie name must be a non-empty string');
    }
  }

  private parseCookieString(text: string, shouldDecode: boolean) {
    const cookies: Cookies = {};

    if (this.isString(text) && text.length > 0) {

      const decodeValue = shouldDecode ? this.decode : this.same;
      const cookieParts = text.split(/;\s/g);
      let cookieName;
      let cookieValue;
      let cookieNameValue;

      for (let i = 0, len = cookieParts.length; i < len; i++) {

        // Check for normally-formatted cookie (name-value)
        cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
        if (cookieNameValue instanceof Array) {
          try {
            cookieName = this.decode(cookieNameValue[1]);
            cookieValue = decodeValue(cookieParts[i]
              .substring(cookieNameValue[1].length + 1));
          } catch (ex) {
            // Intentionally ignore the cookie -
            // the encoding is wrong
          }
        } else {
          // Means the cookie does not have an "=", so treat it as
          // a boolean flag
          cookieName = this.decode(cookieParts[i]);
          cookieValue = '';
        }

        if (cookieName) {
          cookies[cookieName] = cookieValue;
        }
      }

    }

    return cookies;
  }
}

export const cookie = new Cookie();
