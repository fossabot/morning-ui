(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["morning"] = factory();
	else
		root["morning"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(14)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone)
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset()
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(18);
var isBuffer = __webpack_require__(304);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// there's 3 implementations written in increasing order of efficiency

// 1 - no Set type is defined
function uniqNoSet(arr) {
	var ret = [];

	for (var i = 0; i < arr.length; i++) {
		if (ret.indexOf(arr[i]) === -1) {
			ret.push(arr[i]);
		}
	}

	return ret;
}

// 2 - a simple Set type is defined
function uniqSet(arr) {
	var seen = new Set();
	return arr.filter(function (el) {
		if (!seen.has(el)) {
			seen.add(el);
			return true;
		}

		return false;
	});
}

// 3 - a standard Set type is defined and it has a forEach method
function uniqSetWithForEach(arr) {
	var ret = [];

	(new Set(arr)).forEach(function (el) {
		ret.push(el);
	});

	return ret;
}

// V8 currently has a broken implementation
// https://github.com/joyent/node/issues/8449
function doesForEachActuallyWork() {
	var ret = false;

	(new Set([true])).forEach(function (el) {
		ret = el;
	});

	return ret === true;
}

if ('Set' in global) {
	if (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {
		module.exports = uniqSetWithForEach;
	} else {
		module.exports = uniqSet;
	}
} else {
	module.exports = uniqNoSet;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _arrayUniq = __webpack_require__(4);

var _arrayUniq2 = _interopRequireDefault(_arrayUniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalHandler = function globalHandler() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

        for (var _iterator = this.vms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var vm = _step.value;


            vm[this.method].apply(vm, arguments);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

var GlobalEvent = {
    data: function data() {

        return {};
    },
    methods: {
        _globalEventAdd: function _globalEventAdd(evtName, methodName) {

            var morning = this.morning;

            if (morning._globalEventListener[evtName] === undefined) {

                morning._globalEventListener[evtName] = {};
            }

            if (morning._globalEventListener[evtName][this.$options.name + '.' + methodName] === undefined) {

                morning._globalEventListener[evtName][this.$options.name + '.' + methodName] = {
                    vms: [],
                    method: methodName,
                    handler: null
                };
            }

            var evtNamespace = morning._globalEventListener[evtName][this.$options.name + '.' + methodName];

            evtNamespace.vms.push(this);
            evtNamespace.vms = (0, _arrayUniq2.default)(evtNamespace.vms);

            if (evtNamespace.handler === null) {

                evtNamespace.handler = globalHandler.bind(evtNamespace);
                document.addEventListener(evtName, evtNamespace.handler);
            }

            return this;
        },
        _globalEventRemove: function _globalEventRemove(evtName, methodName) {

            var morning = this.morning;

            if (!morning._globalEventListener[evtName] || !morning._globalEventListener[evtName][this.$options.name + '.' + methodName]) {

                return this;
            }

            var evtNamespace = morning._globalEventListener[evtName][this.$options.name + '.' + methodName];
            var index = evtNamespace.vms.indexOf(this);

            if (index !== -1) {

                evtNamespace.vms.splice(index, 1);
            }

            if (evtNamespace.vms.length === 0) {

                document.removeEventListener(evtName, evtNamespace.handler);
                delete morning._globalEventListener[evtName];
            }
        }
    }
};

exports.default = GlobalEvent;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var IndexManager = {
    methods: {
        _indexReg: function _indexReg(namespace) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;


            var key = this.$options.name + "." + namespace;

            if (this.morning._indexMap.regIndex[key] === undefined) {

                this.morning._indexMap.regIndex[key] = index;
            }

            return this;
        },
        _indexFetch: function _indexFetch(namespace, step) {

            var vmMap = this.morning._indexMap.vmMap;
            var useIndex = this.morning._indexMap.useIndex;
            var regIndex = this.morning._indexMap.regIndex;
            var key = this.$options.name + "." + namespace;

            if (useIndex[key] === undefined) {

                useIndex[key] = regIndex[key];
            }

            if (vmMap[this.uiid + "," + namespace] === undefined) {

                vmMap[this.uiid + "," + namespace] = useIndex[key];
            }

            if (step !== 0 && step !== undefined) {

                useIndex[key] += step;
            }

            return vmMap[this.uiid + "," + namespace];
        },
        _indexInc: function _indexInc(namespace) {

            return this._indexFetch(namespace, 1);
        },
        _indexGet: function _indexGet(namespace) {

            return this._indexFetch(namespace, 0);
        },
        _indexDim: function _indexDim(namespace) {

            return this._indexFetch(namespace, -1);
        }
        // _indexNew : function (namespace) {

        //     let section = this.morning._indexSection[namespace];

        //     if (section === undefined) {

        //         let sectionId = this.morning._indexSectionId++;

        //         this.morning._indexSection[namespace] = {
        //             id : sectionId,
        //             prepend : (sectionLen / 2) - 1,
        //             append : (sectionLen / 2)
        //         };

        //         section = this.morning._indexSection[namespace];

        //     } 

        //     return ((section.id * sectionLen) + section.append++);

        // },
        // _indexSectionAppend : function (namespace) {

        //     if (this.morning._indexSection[sectionId] === undefined) {

        //         return 1;

        //     }

        //     let section = this.morning._indexSection[sectionId];
        //     let index = section.append++;

        //     return ((section * sectionLen) + index);

        // },
        // _indexSectionPrepend : function (sectionId) {

        //     if (this.morning._indexSection[sectionId] === undefined) {

        //         return 1;

        //     }

        //     let section = this.morning._indexSection[sectionId];
        //     let index = section.prepend++;

        //     return ((section * sectionLen) + index);

        // }
    }
};

exports.default = IndexManager;
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IndexManager = __webpack_require__(6);

var _IndexManager2 = _interopRequireDefault(_IndexManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopupManager = {
    mixins: [_IndexManager2.default],
    data: function data() {

        return {
            Popup: {
                keepDiv: null,
                oldIndex: undefined
            }
        };
    },
    methods: {
        _popupShow: function _popupShow() {

            if (this.Popup.keepDiv) {

                return;
            }

            var id = this.morning._popupId++;
            var keepDiv = document.createElement('div');

            keepDiv.setAttribute('popup-id', id);
            keepDiv.style.display = 'none';
            this.$el.before(keepDiv);
            this.Popup.oldIndex = this.$el.style.zIndex;
            this.$el.style.zIndex = this._indexGet('Popup') + id;
            document.body.append(this.$el);
            this.Popup.keepDiv = keepDiv;
        },
        _popupHide: function _popupHide() {

            if (!this.Popup.keepDiv) {

                return;
            }

            this.$el.style.zIndex = this.Popup.oldIndex;
            this.Popup.keepDiv.before(this.$el);
            this.Popup.keepDiv.remove();
            this.Popup.keepDiv = null;
        }
    },
    created: function created() {

        var popupIndex = 1000;

        this._indexReg('Popup', popupIndex);
    }
};

exports.default = PopupManager;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfDay


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var startOfWeek = __webpack_require__(237)

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return startOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = startOfISOWeek


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GlobalEvent = __webpack_require__(5);

var _GlobalEvent2 = _interopRequireDefault(_GlobalEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveDelayTime = 200;

var Move = {
    mixins: [_GlobalEvent2.default],
    data: function data() {

        return {
            Move: {
                can: false,
                type: 'fixed',
                // 延迟多久触发拖拽，为了和click兼容
                $root: null,
                delay: moveDelayTime,
                target: null,
                scrollContainer: null,
                container: null,
                lastMousedownIndex: -1,
                movedIndex: -1,
                delayTimeout: null,
                $moveDragItem: null,
                moving: false,
                moveMouseFrom: {
                    x: 0,
                    y: 0
                },
                moveItemXy: {
                    x: 0,
                    y: 0
                },
                moveItemWh: {
                    w: 0,
                    h: 0
                },
                moveOffset: {
                    x: 0,
                    y: 0
                },
                current: {
                    x: 0,
                    y: 0
                },
                scrollFrom: {
                    x: 0,
                    y: 0
                },
                scrollOffset: {
                    x: 0,
                    y: 0
                },
                // windowCalibrate : {
                //     x : 0,
                //     y : 0
                // },
                range: [false, false, false, false],
                overRange: [0, 0, 0, 0]
            }
        };
    },
    computed: {
        moveClass: function moveClass() {

            return {
                'can-move': this.Move.can
            };
        }
    },
    methods: {
        _moveItemRecord: function _moveItemRecord(index) {

            this.Move.lastMousedownIndex = index;
        },
        _moveMousedown: function _moveMousedown(evt) {
            var _this = this;

            if (evt.button !== 0) {

                return;
            }

            this.Move.delayTimeout = setTimeout(function () {

                _this._moveStart(evt);
            }, this.Move.delay);
        },
        _moveStart: function _moveStart(evt) {

            var $targets = this.Move.$root.querySelectorAll(this.Move.target);
            var found = false;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = evt.path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var $node = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {

                        for (var _iterator2 = $targets.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var $value = _step2.value;


                            if ($value === $node) {

                                found = true;

                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (found) {

                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (found) {

                var $target = this.Move.$root.querySelectorAll(this.Move.container + ' ' + this.Move.target)[this.Move.lastMousedownIndex];
                var $container = this.Move.$root.querySelector(this.Move.container);

                var _moveElementXy = this._moveElementXy($target),
                    x = _moveElementXy.x,
                    y = _moveElementXy.y;

                var $moveDragItem = $target.cloneNode(true);

                $moveDragItem.classList.add('move-drag-item');

                if (this.Move.type === 'fixed') {

                    $moveDragItem.classList.add('fixed');
                } else {

                    $moveDragItem.classList.add('absolute');
                }

                if (this.Move.type === 'absolute' && this.Move.scrollContainer) {

                    var $scrollContainer = this.Move.$root.querySelector(this.Move.scrollContainer);

                    if ($scrollContainer) {

                        $scrollContainer.addEventListener('scroll', this._moveScroll);
                        this.Move.scrollFrom.x = $scrollContainer.scrollLeft;
                        this.Move.scrollFrom.y = $scrollContainer.scrollTop;
                    }
                }

                $moveDragItem.style.top = y + 'px';
                $moveDragItem.style.left = x + 'px';
                $container.append($moveDragItem);

                this.Move.overRange = [0, 0, 0, 0];
                this.Move.$moveDragItem = $moveDragItem;
                this.Move.movedIndex = this.Move.lastMousedownIndex;
                this.Move.moveMouseFrom.x = evt.clientX;
                this.Move.moveMouseFrom.y = evt.clientY;
                this.Move.moveOffset.x = evt.clientX;
                this.Move.moveOffset.y = evt.clientY;
                this.Move.scrollOffset.x = 0;
                this.Move.scrollOffset.y = 0;
                this.Move.moveItemXy.x = x;
                this.Move.moveItemXy.y = y;
                this.Move.current.x = x;
                this.Move.current.y = y;
                this.Move.moveItemWh.w = $moveDragItem.offsetWidth;
                this.Move.moveItemWh.h = $moveDragItem.offsetHeight;
                this.Move.moving = true;

                $target.classList.add('move-moving');
                this.$emit('_moveStarted');
            }
        },
        _moveCore: function _moveCore() {

            var x = this.Move.moveOffset.x - this.Move.moveMouseFrom.x + this.Move.moveItemXy.x + this.Move.scrollOffset.x;
            var y = this.Move.moveOffset.y - this.Move.moveMouseFrom.y + this.Move.moveItemXy.y + this.Move.scrollOffset.y;
            var limit = this._moveRangeLimit(x, y);

            x = limit.x;
            y = limit.y;

            this.Move.$moveDragItem.style.top = y + 'px';
            this.Move.$moveDragItem.style.left = x + 'px';
            this.Move.current.x = x;
            this.Move.current.y = y;

            this.$emit('_moveChange');
        },
        _moveMousemove: function _moveMousemove(evt) {

            if (this.Move.moving === false) {

                return;
            }

            if (evt.buttons !== 1) {

                this._moveMouseup();

                return;
            }

            this.Move.moveOffset.x = evt.clientX;
            this.Move.moveOffset.y = evt.clientY;

            this._moveCore();
        },
        _moveScroll: function _moveScroll() {

            if (this.Move.type === 'absolute' && this.Move.scrollContainer) {

                var $scrollContainer = this.Move.$root.querySelector(this.Move.scrollContainer);

                if ($scrollContainer) {

                    this.Move.scrollOffset.x = $scrollContainer.scrollLeft - this.Move.scrollFrom.x;
                    this.Move.scrollOffset.y = $scrollContainer.scrollTop - this.Move.scrollFrom.y;
                }
            }

            this._moveCore();
        },
        _moveMouseup: function _moveMouseup(evt) {

            // if has evt, must left button up
            if (evt && evt.button !== 0) {

                return;
            }

            clearTimeout(this.Move.delayTimeout);

            if (!this.Move.moving) {

                return;
            }

            var $target = this.Move.$root.querySelector('.move-moving');

            if ($target) {

                $target.classList.remove('move-moving');
            }

            if (this.Move.type === 'absolute' && this.Move.scrollContainer) {

                var $scrollContainer = this.Move.$root.querySelector(this.Move.scrollContainer);

                if ($scrollContainer) {

                    $scrollContainer.removeEventListener('scroll', this._moveScroll);
                }
            }

            this.Move.movedIndex = -1;
            // this.Move.lastMousedownIndex = -1;
            this.Move.$moveDragItem.remove();
            this.Move.$moveDragItem = null;
            this.Move.moving = false;

            this.$emit('_moveEnded');
        },
        _moveRangeLimit: function _moveRangeLimit(x, y) {

            // x min
            if (this.Move.range[0] !== false && x < this.Move.range[0]) {

                x = this.Move.range[0];
                this.Move.overRange[0] = 1;
                this.$emit('_moveOnXMin');
            } else if (this.Move.overRange[0]) {

                this.Move.overRange[0] = 0;
                this.$emit('_moveOffXMin');
            }

            // x max
            if (this.Move.range[2] !== false && x + this.Move.moveItemWh.w > this.Move.range[2]) {

                x = this.Move.range[2] - this.Move.moveItemWh.w;
                this.Move.overRange[2] = 1;
                this.$emit('_moveOnXMax');
            } else if (this.Move.overRange[2]) {

                this.Move.overRange[2] = 0;
                this.$emit('_moveOffXMax');
            }

            // y min
            if (this.Move.range[1] !== false && y < this.Move.range[1]) {

                y = this.Move.range[1];
                this.Move.overRange[1] = 1;
                this.$emit('_moveOnYMin');
            } else if (this.Move.overRange[1]) {

                this.Move.overRange[1] = 0;
                this.$emit('_moveOffXMin');
            }

            // y max
            if (this.Move.range[3] !== false && y + this.Move.moveItemWh.h > this.Move.range[3]) {

                y = this.Move.range[3] - this.Move.moveItemWh.h;
                this.Move.overRange[3] = 1;
                this.$emit('_moveOnYMax');
            } else if (this.Move.overRange[3]) {

                this.Move.overRange[3] = 0;
                this.$emit('_moveOffYMax');
            }

            return {
                x: x,
                y: y
            };
        },
        _moveElementXy: function _moveElementXy($target) {

            var client = $target.getBoundingClientRect();
            var marginLeft = $target.ownerDocument.defaultView.getComputedStyle($target).marginLeft;
            var marginTop = $target.ownerDocument.defaultView.getComputedStyle($target).marginTop;
            var left = $target.ownerDocument.defaultView.getComputedStyle($target).left;
            var top = $target.ownerDocument.defaultView.getComputedStyle($target).top;
            var x = void 0;
            var y = void 0;

            marginLeft = +marginLeft.split('px')[0];
            marginTop = +marginTop.split('px')[0];
            left = +left.split('px')[0];
            top = +top.split('px')[0];

            //  + this.Move.windowCalibrate.x; + this.Move.windowCalibrate.y

            if (this.Move.type === 'fixed') {

                x = client.left - marginLeft;
                y = client.top - marginTop;
            } else {

                x = left;
                y = top;
            }

            return {
                x: x,
                y: y
            };
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        // default $root is $el
        this.Move.$root = this.$el;

        this.$watch('Move.can', function (newVal) {

            var $container = _this2.Move.$root.querySelector(_this2.Move.container);

            if (newVal) {

                $container.addEventListener('mousedown', _this2._moveMousedown);
                _this2._globalEventAdd('mousemove', '_moveMousemove');
                _this2._globalEventAdd('mouseup', '_moveMouseup');
                // this._moveAddGlobalListener();
            } else {

                if ($container) {

                    $container.removeEventListener('mousedown', _this2._moveMousedown);
                }

                if (_this2.Move.type === 'absolute' && _this2.Move.scrollContainer) {

                    var $scrollContainer = _this2.Move.$root.querySelector(_this2.Move.scrollContainer);

                    if ($scrollContainer) {

                        $scrollContainer.removeEventListener('scroll', _this2._moveScroll);
                    }
                }

                _this2._globalEventRemove('mousemove', '_moveMousemove');
                _this2._globalEventRemove('mouseup', '_moveMouseup');

                if (_this2.Move.moving) {

                    _this2._moveMouseup();
                }
            }
        }, {
            immediate: true
        });
    },
    updated: function updated() {

        var $oldTarget = this.Move.$root.querySelector(this.Move.target + '.move-moving');
        var $newTarget = this.Move.$root.querySelectorAll(this.Move.target + ':not(.move-drag-item)')[this.Move.movedIndex];

        if ($oldTarget) {

            $oldTarget.classList.remove('move-moving');
        }

        if ($newTarget) {

            $newTarget.classList.add('move-moving');
        }
    },
    beforeDestroy: function beforeDestroy() {

        this._globalEventRemove('mousemove', '_moveMousemove');
        this._globalEventRemove('mouseup', '_moveMouseup');
    }
};

exports.default = Move;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(307);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(19);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(19);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(306)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, function(o) { return o.user; });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 *
 * _.sortBy(users, 'user', function(o) {
 *   return Math.floor(o.age / 10);
 * });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = sortBy;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(199)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)
var getDaysInMonth = __webpack_require__(16)

/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  var desiredMonth = date.getMonth() + amount
  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
  return date
}

module.exports = addMonths


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  var monthIndex = date.getMonth()
  var lastDayOfMonth = new Date(0)
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
  lastDayOfMonth.setHours(0, 0, 0, 0)
  return lastDayOfMonth.getDate()
}

module.exports = getDaysInMonth


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)
var startOfISOWeek = __webpack_require__(9)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()

  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)

  var fourthOfJanuaryOfThisYear = new Date(0)
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

module.exports = getISOYear


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var settle = __webpack_require__(308);
var buildURL = __webpack_require__(310);
var parseHeaders = __webpack_require__(311);
var isURLSameOrigin = __webpack_require__(312);
var createError = __webpack_require__(20);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(313);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (undefined !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(314);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(309);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _ui = __webpack_require__(24);

var _ui2 = _interopRequireDefault(_ui);

var _form = __webpack_require__(25);

var _form2 = _interopRequireDefault(_form);

var _components = __webpack_require__(26);

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var morning = {
    _origin: {},
    _components: {},
    _ignoreElements: [],
    _uiid: 1,
    _popupId: 0,
    _indexMap: {
        regIndex: {},
        vmMap: {},
        useIndex: {}
    },
    _moveListener: [],
    _globalEventListener: {},
    _groupData: {},
    _groupVmMap: {},
    _options: {},
    isMorning: true,
    version: '0.10.11',
    map: {}
};

morning.findVM = function (ref) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

        for (var _iterator = Object.values(this.map)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var vm = _step.value;


            if (vm.$vnode && vm.$vnode.data && vm.$vnode.data.ref === ref) {

                return vm;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return undefined;
};

morning.findAllVM = function (ref) {

    var result = [];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.values(this.map)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var vm = _step2.value;


            if (vm.$vnode && vm.$vnode.data && vm.$vnode.data.ref === ref) {

                result.push(vm);
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return result;
};

morning.getGroup = function (groupName) {

    return (0, _extend2.default)(true, {}, this._groupData[groupName]);
};

morning.getGroupJson = function (groupName) {

    return JSON.stringify(this.getGroup(groupName));
};

morning.cleanGroup = function (groupName) {

    var uiids = this._groupVmMap[groupName];
    var vm = void 0;

    if (uiids) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {

            for (var _iterator3 = uiids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var uiid = _step3.value;


                vm = this.map[uiid];

                if (vm) {

                    this.map[uiid].set(undefined);
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }

    return this;
};

morning.setGroup = function (groupName, data) {

    var uiids = this._groupVmMap[groupName];
    var setKeys = Object.keys(data);
    var key = void 0,
        vm = void 0;

    if (uiids) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {

            for (var _iterator4 = uiids[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var uiid = _step4.value;


                vm = this.map[uiid];

                if (vm) {

                    key = vm.conf.formKey;

                    if (setKeys.indexOf(key) !== -1) {

                        this.map[uiid].set(data[key]);
                    }
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    }

    return this;
};

morning.setGroupJson = function (groupName, data) {

    return this.setGroup(groupName, JSON.parse(data));
};

morning.install = function (Vue, options) {

    if (typeof Vue === 'undefined') {

        throw new Error('can\'t find Vue.js, import Vue.js first please.');
    }

    if (options && options.prefix === 'mor') {

        throw new Error('prefix can\'t be \'mor\'.');
    }

    options = (0, _extend2.default)(true, {
        prefix: 'ui',
        uploader: null
    }, options);

    morning._options = options;

    Vue.config.ignoredElements = [];

    this._origin.UI = (0, _ui2.default)(Vue, this);
    this._origin.Form = (0, _form2.default)(this._origin.UI);

    // register component
    for (var name in _components2.default) {

        var creater = _components2.default[name];
        var component = void 0;

        if (creater.origin === 'UI') {

            component = this._origin.UI.extend(creater);
        } else if (creater.origin === 'Form') {

            component = this._origin.Form.extend(creater);
        } else {

            return;
        }

        Vue.component(options.prefix + '-' + component.options.name, component);
        Vue.component('morning-' + component.options.name, component);
        this._components[name] = component;
        this._ignoreElements.push('mor-' + component.options.name);
        this._ignoreElements.push('morning-' + component.options.name);
    }

    Vue.config.ignoredElements = this._ignoreElements;

    var vueRender = function vueRender(el, binding) {

        var tagName = el.tagName;
        var $vue = new Vue({
            template: '<' + tagName + '>' + binding.value.template + '</' + tagName + '>'
        });

        $vue.$mount();

        var $childs = $vue.$el.childNodes;
        var $child = void 0;

        el.innerHTML = '';

        while ($child = $childs[0]) {

            el.appendChild($child);
        }
    };

    Vue.directive('render', {
        inserted: vueRender,
        update: vueRender
    });

    return this;
};

exports.default = morning;
module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Vue, morning) {
    return Vue.extend({
        props: {
            size: {
                type: String,
                default: undefined,
                validator: function validator(value) {
                    return ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'].indexOf(value) !== -1;
                }
            },
            color: {
                type: String,
                default: undefined,
                validator: function validator(value) {
                    return ['theme', 'light-theme', 'dark-theme', 'success', 'warning', 'danger', 'primary', 'minor', 'info', 'black', 'light-black', 'extra-light-black', 'blue', 'light-blue', 'extra-light-blue', 'silver', 'light-silver', 'extra-light-silver', 'gray', 'light-gray', 'white'].indexOf(value) !== -1;
                }
            },
            state: {
                type: String,
                default: undefined,
                validator: function validator(value) {
                    return ['normal', 'hover', 'active', 'disabled', 'apparent'].indexOf(value) !== -1;
                }

            }
        },
        computed: {
            _conf: function _conf() {

                return {};
            }
        },
        data: function data() {

            var data = {};

            data.isUI = true;
            data.uiid = this.morning._uiid++;
            data.data = {};
            data.conf = {};

            data.sizeClass = '';
            data.colorClass = '';
            data.stateClass = '';

            return data;
        },
        methods: {
            getConf: function getConf(name) {

                var conf = (0, _extend2.default)(true, {}, this.conf);

                if (typeof name === 'string') {

                    return conf[name];
                }

                return conf;
            }
        },
        beforeCreate: function beforeCreate() {

            this.Vue = Vue;
            this.morning = morning;
        },
        created: function created() {
            var _this = this;

            this.$watch('size', function (val) {

                _this.conf.size = val;

                if (val === undefined) {

                    _this.sizeClass = '';
                } else {

                    _this.sizeClass = 'si-' + val;
                }
            }, {
                immediate: true
            });

            this.$watch('color', function (val) {

                _this.conf.color = val;

                if (val === undefined) {

                    _this.colorClass = '';
                } else {

                    _this.colorClass = 'co-' + val;
                }
            }, {
                immediate: true
            });

            this.$watch('state', function (val) {

                _this.conf.state = val;

                if (val === undefined) {

                    _this.stateClass = '';
                } else {

                    _this.stateClass = 'st-' + val;
                }
            }, {
                immediate: true
            });

            this.$watch('_conf', function (val) {

                _this.conf = Object.assign({}, _this.conf, val);
            }, {
                immediate: true,
                deep: true
            });

            this.$emit('created');
        },
        mounted: function mounted() {

            this.morning.map[this.uiid] = this;
            this.$el._vm = this;

            this.$emit('mounted');
        },
        beforeUpdate: function beforeUpdate() {

            this.$emit('before-update');
        },
        updated: function updated() {

            this.$el._vm = this;
            this.$emit('updated');
        },
        beforeDestroy: function beforeDestroy() {

            this.$emit('before-destroy');
        },
        destroyed: function destroyed() {

            this.$el.remove();
            delete this.morning.map[this.uiid];
        }
    });
};

module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (UI) {
    return UI.extend({
        model: {
            prop: 'modelValue',
            event: 'value-change'
        },
        props: {
            formName: {
                type: String,
                default: undefined
            },
            formKey: {
                type: String,
                default: undefined
            },
            group: {
                type: [Array, String],
                default: function _default() {
                    return [];
                }
            },
            defaultValue: {
                default: undefined
            },
            hideName: {
                type: Boolean,
                default: false
            },
            modelValue: {
                default: undefined
            }
        },
        computed: {
            _formConf: function _formConf() {

                return {
                    formName: this.formName,
                    formKey: this.formKey,
                    group: this.group,
                    defaultValue: this.defaultValue,
                    hideName: this.hideName
                };
            }
        },
        data: function data() {

            var groups = [];

            if (typeof this.group === 'string') {

                groups.push(this.group);
            } else if (_typeof(this.group) === 'object') {

                groups = groups.concat(this.group);
            }

            return {
                isForm: true,
                data: {
                    value: undefined
                }
            };
        },
        methods: {
            _syncGroup: function _syncGroup() {
                var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var changeKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var changeGroup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


                var morning = this.morning;

                if (changeGroup) {

                    changeGroup = [].concat(changeGroup);

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = changeGroup[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var gname = _step.value;


                            if (morning._groupData[gname] && morning._groupData[gname][this.conf.formKey]) {

                                delete morning._groupData[gname][this.conf.formKey];
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                if (this.conf.group && this.conf.group.length > 0) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {

                        for (var _iterator2 = this.conf.group[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _gname = _step2.value;


                            if (morning._groupData[_gname] && morning._groupData[_gname][this.conf.formKey] !== undefined && remove === true) {

                                delete morning._groupData[_gname][this.conf.formKey];

                                return;
                            }

                            if (changeKey && morning._groupData[_gname] && morning._groupData[_gname][changeKey]) {

                                delete morning._groupData[_gname][changeKey];
                            }

                            if (morning._groupData[_gname] === undefined) {

                                morning._groupData[_gname] = {};
                            }

                            if (this.conf.formKey !== undefined) {

                                morning._groupData[_gname][this.conf.formKey] = this.get();
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            },
            _syncGroupVm: function _syncGroupVm(newGroup, oldGroup) {

                if (oldGroup) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {

                        for (var _iterator3 = oldGroup[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var name = _step3.value;


                            if (this.morning._groupVmMap[name] === undefined) {

                                break;
                            }

                            var index = this.morning._groupVmMap[name].indexOf(this.uiid);

                            if (index !== -1) {

                                this.morning._groupVmMap[name].splice(index, 1);
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }

                if (newGroup) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {

                        for (var _iterator4 = newGroup[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _name = _step4.value;


                            if (this.morning._groupVmMap[_name] === undefined) {

                                this.morning._groupVmMap[_name] = [];
                            }

                            if (this.morning._groupVmMap[_name].indexOf(this.uiid) === -1) {

                                this.morning._groupVmMap[_name].push(this.uiid);
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
            },
            _set: function _set(value) {
                var ignoreDisable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


                if (this.conf.state === 'disabled' && !ignoreDisable) {

                    return this;
                }

                var val = void 0;

                try {

                    val = JSON.parse(value);
                } catch (e) {

                    val = value;
                }

                if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {

                    if (JSON.stringify(val) !== JSON.stringify(this.data.value)) {

                        this.data.value = val;
                    }
                } else {

                    this.data.value = value;
                }

                return this;
            },
            _valueFilter: function _valueFilter(value) {

                return value;
            },
            set: function set(value) {

                return this._set(value);
            },
            get: function get() {

                var result = void 0;

                if (_typeof(this.data.value) === 'object') {

                    if (this.data.value instanceof Array) {

                        result = (0, _extend2.default)(true, [], this.data.value);
                    } else if (this.data.value === null) {

                        result = null;
                    } else {

                        result = (0, _extend2.default)(true, {}, this.data.value);
                    }
                } else {

                    result = this.data.value;
                }

                return result;
            },
            getJson: function getJson() {

                return JSON.stringify(this.get());
            },
            setName: function setName() {
                var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


                return this.formName = name;
            },
            getName: function getName() {

                return this.conf.formName;
            },
            setKey: function setKey(key) {

                return this.formKey = key;
            },
            getKey: function getKey() {

                return this.conf.formKey;
            },
            setGroup: function setGroup() {
                var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


                var groups = [];

                if (typeof group === 'string') {

                    groups.push(group);
                } else if ((typeof group === 'undefined' ? 'undefined' : _typeof(group)) === 'object') {

                    groups = groups.concat(group);
                }

                return this.group = groups;
            },
            getGroup: function getGroup() {

                return (0, _extend2.default)(true, [], this.conf.group);
            },
            addGroup: function addGroup(group) {

                var groups = this.getGroup();

                if (typeof group === 'string') {

                    var uniqGroups = {};

                    groups.push(group);

                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = groups[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var key = _step5.value;


                            uniqGroups[key] = 0;
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    uniqGroups = Object.keys(uniqGroups);

                    return this.group = uniqGroups;
                }

                return this;
            },
            removeGroup: function removeGroup(group) {

                var groups = this.getGroup();

                for (var index in groups) {

                    if (group === groups[index]) {

                        groups.splice(index, 1);

                        this.group = groups;

                        break;
                    }
                }

                return this;
            }
        },
        created: function created() {
            var _this = this;

            this.$watch('_formConf', function (val) {

                if (typeof val.group === 'string') {

                    val.group = [val.group];
                }

                _this.conf = Object.assign({}, _this.conf, val);
            }, {
                immediate: true,
                deep: true
            });

            this.data.value = this.conf.defaultValue;
            this._syncGroup();

            this.$watch('modelValue', function (newValue) {

                _this._set(newValue);
            });

            this.$watch('data.value', function (newValue) {

                var filteredValue = _this._valueFilter(newValue);

                if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && (typeof filteredValue === 'undefined' ? 'undefined' : _typeof(filteredValue)) === 'object' && JSON.stringify(newValue) !== JSON.stringify(filteredValue) || newValue !== filteredValue) {

                    _this.data.value = filteredValue;

                    return;
                }

                _this._syncGroup();
                _this.$emit('value-change', newValue);
            }, {
                deep: true,
                immediate: true
            });

            this.$watch('conf.formKey', function (newVal, oldVal) {

                _this._syncGroup(false, oldVal);
            });

            this.$watch('conf.group', function (newVal, oldVal) {

                _this._syncGroup(false, false, oldVal);
                _this._syncGroupVm(newVal, oldVal);
            }, {
                immediate: true,
                deep: true
            });
        },
        beforeDestroy: function beforeDestroy() {

            this._syncGroup(true);
            this._syncGroupVm([], this.conf.group);
        }
    });
};

module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(27);

var _index = __webpack_require__(28);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(32);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(36);

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(40);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(44);

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(48);

var _index12 = _interopRequireDefault(_index11);

var _index13 = __webpack_require__(52);

var _index14 = _interopRequireDefault(_index13);

var _index15 = __webpack_require__(56);

var _index16 = _interopRequireDefault(_index15);

var _index17 = __webpack_require__(60);

var _index18 = _interopRequireDefault(_index17);

var _index19 = __webpack_require__(64);

var _index20 = _interopRequireDefault(_index19);

var _index21 = __webpack_require__(68);

var _index22 = _interopRequireDefault(_index21);

var _index23 = __webpack_require__(72);

var _index24 = _interopRequireDefault(_index23);

var _index25 = __webpack_require__(76);

var _index26 = _interopRequireDefault(_index25);

var _index27 = __webpack_require__(80);

var _index28 = _interopRequireDefault(_index27);

var _index29 = __webpack_require__(84);

var _index30 = _interopRequireDefault(_index29);

var _index31 = __webpack_require__(88);

var _index32 = _interopRequireDefault(_index31);

var _index33 = __webpack_require__(92);

var _index34 = _interopRequireDefault(_index33);

var _index35 = __webpack_require__(96);

var _index36 = _interopRequireDefault(_index35);

var _index37 = __webpack_require__(100);

var _index38 = _interopRequireDefault(_index37);

var _index39 = __webpack_require__(104);

var _index40 = _interopRequireDefault(_index39);

var _index41 = __webpack_require__(108);

var _index42 = _interopRequireDefault(_index41);

var _index43 = __webpack_require__(112);

var _index44 = _interopRequireDefault(_index43);

var _index45 = __webpack_require__(116);

var _index46 = _interopRequireDefault(_index45);

var _index47 = __webpack_require__(120);

var _index48 = _interopRequireDefault(_index47);

var _index49 = __webpack_require__(124);

var _index50 = _interopRequireDefault(_index49);

var _index51 = __webpack_require__(128);

var _index52 = _interopRequireDefault(_index51);

var _index53 = __webpack_require__(132);

var _index54 = _interopRequireDefault(_index53);

var _index55 = __webpack_require__(136);

var _index56 = _interopRequireDefault(_index55);

var _index57 = __webpack_require__(140);

var _index58 = _interopRequireDefault(_index57);

var _index59 = __webpack_require__(144);

var _index60 = _interopRequireDefault(_index59);

var _index61 = __webpack_require__(148);

var _index62 = _interopRequireDefault(_index61);

var _index63 = __webpack_require__(152);

var _index64 = _interopRequireDefault(_index63);

var _index65 = __webpack_require__(156);

var _index66 = _interopRequireDefault(_index65);

var _index67 = __webpack_require__(160);

var _index68 = _interopRequireDefault(_index67);

var _index69 = __webpack_require__(164);

var _index70 = _interopRequireDefault(_index69);

var _index71 = __webpack_require__(168);

var _index72 = _interopRequireDefault(_index71);

var _index73 = __webpack_require__(172);

var _index74 = _interopRequireDefault(_index73);

var _index75 = __webpack_require__(176);

var _index76 = _interopRequireDefault(_index75);

var _index77 = __webpack_require__(180);

var _index78 = _interopRequireDefault(_index77);

var _index79 = __webpack_require__(184);

var _index80 = _interopRequireDefault(_index79);

var _index81 = __webpack_require__(188);

var _index82 = _interopRequireDefault(_index81);

var _index83 = __webpack_require__(192);

var _index84 = _interopRequireDefault(_index83);

var _index85 = __webpack_require__(196);

var _index86 = _interopRequireDefault(_index85);

var _index87 = __webpack_require__(207);

var _index88 = _interopRequireDefault(_index87);

var _index89 = __webpack_require__(211);

var _index90 = _interopRequireDefault(_index89);

var _index91 = __webpack_require__(215);

var _index92 = _interopRequireDefault(_index91);

var _index93 = __webpack_require__(245);

var _index94 = _interopRequireDefault(_index93);

var _index95 = __webpack_require__(249);

var _index96 = _interopRequireDefault(_index95);

var _index97 = __webpack_require__(253);

var _index98 = _interopRequireDefault(_index97);

var _index99 = __webpack_require__(258);

var _index100 = _interopRequireDefault(_index99);

var _index101 = __webpack_require__(262);

var _index102 = _interopRequireDefault(_index101);

var _index103 = __webpack_require__(266);

var _index104 = _interopRequireDefault(_index103);

var _index105 = __webpack_require__(270);

var _index106 = _interopRequireDefault(_index105);

var _index107 = __webpack_require__(274);

var _index108 = _interopRequireDefault(_index107);

var _index109 = __webpack_require__(279);

var _index110 = _interopRequireDefault(_index109);

var _index111 = __webpack_require__(283);

var _index112 = _interopRequireDefault(_index111);

var _index113 = __webpack_require__(287);

var _index114 = _interopRequireDefault(_index113);

var _index115 = __webpack_require__(291);

var _index116 = _interopRequireDefault(_index115);

var _index117 = __webpack_require__(295);

var _index118 = _interopRequireDefault(_index117);

var _index119 = __webpack_require__(299);

var _index120 = _interopRequireDefault(_index119);

var _index121 = __webpack_require__(323);

var _index122 = _interopRequireDefault(_index121);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    h: _index2.default,
    lead: _index4.default,
    mark: _index6.default,
    del: _index8.default,
    u: _index10.default,
    small: _index12.default,
    strong: _index14.default,
    em: _index16.default,
    textcenter: _index18.default,
    textleft: _index20.default,
    textright: _index22.default,
    lowercase: _index24.default,
    uppercase: _index26.default,
    capitalize: _index28.default,
    quote: _index30.default,
    ol: _index32.default,
    ul: _index34.default,
    il: _index36.default,
    dl: _index38.default,
    itemlist: _index40.default,
    textcolor: _index42.default,
    apparent: _index44.default,
    grid: _index46.default,
    card: _index48.default,
    box: _index50.default,
    block: _index52.default,
    divider: _index54.default,
    center: _index56.default,
    header: _index58.default,
    badge: _index60.default,
    label: _index62.default,
    statistic: _index64.default,
    action: _index66.default,
    formgroup: _index68.default,
    btngroup: _index70.default,
    jumbotron: _index72.default,
    article: _index74.default,
    img: _index76.default,
    btn: _index78.default,
    link: _index80.default,
    dropdown: _index82.default,
    tab: _index84.default,
    table: _index86.default,
    pagination: _index88.default,
    dialog: _index90.default,
    calendar: _index92.default,
    load: _index94.default,
    breadcrumbs: _index96.default,
    tip: _index98.default,
    message: _index100.default,
    textinput: _index102.default,
    textarea: _index104.default,
    switch: _index106.default,
    select: _index108.default,
    checkbox: _index110.default,
    radio: _index112.default,
    multiinput: _index114.default,
    multiform: _index116.default,
    timepicker: _index118.default,
    upload: _index120.default,
    imagemap: _index122.default
};
module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e5fd8c8a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(31);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e5fd8c8a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/h/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e5fd8c8a", Component.options)
  } else {
    hotAPI.reload("data-v-e5fd8c8a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'h'
};
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-h', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e5fd8c8a", esExports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64ee443f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(35);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(33)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64ee443f_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/lead/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64ee443f", Component.options)
  } else {
    hotAPI.reload("data-v-64ee443f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'lead'
};
module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-lead', {
    class: [_vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-64ee443f", esExports)
  }
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21ccd270_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(39);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(37)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21ccd270_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/mark/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-21ccd270", Component.options)
  } else {
    hotAPI.reload("data-v-21ccd270", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'mark'
};
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-mark', {
    class: [_vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-21ccd270", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c086c0c4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(43);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c086c0c4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/del/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c086c0c4", Component.options)
  } else {
    hotAPI.reload("data-v-c086c0c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'del'
};
module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-del', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c086c0c4", esExports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c9e4d88_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c9e4d88_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/u/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c9e4d88", Component.options)
  } else {
    hotAPI.reload("data-v-1c9e4d88", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'u'
};
module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-u', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1c9e4d88", esExports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_177410cc_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(51);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(49)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_177410cc_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/small/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-177410cc", Component.options)
  } else {
    hotAPI.reload("data-v-177410cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'small'
};
module.exports = exports['default'];

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-small', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-177410cc", esExports)
  }
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14cf088c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(55);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14cf088c_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/strong/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14cf088c", Component.options)
  } else {
    hotAPI.reload("data-v-14cf088c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'strong'
};
module.exports = exports['default'];

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-strong', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14cf088c", esExports)
  }
}

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ea33d6ea_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(59);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(57)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ea33d6ea_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/em/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ea33d6ea", Component.options)
  } else {
    hotAPI.reload("data-v-ea33d6ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'em'
};
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-em', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ea33d6ea", esExports)
  }
}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ff2039b6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(63);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(61)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ff2039b6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/textcenter/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff2039b6", Component.options)
  } else {
    hotAPI.reload("data-v-ff2039b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 61 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'textcenter'
};
module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-textcenter', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ff2039b6", esExports)
  }
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1cff3997_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(67);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(65)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1cff3997_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/textleft/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cff3997", Component.options)
  } else {
    hotAPI.reload("data-v-1cff3997", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'textleft'
};
module.exports = exports['default'];

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-textleft', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1cff3997", esExports)
  }
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_58c8cda2_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(71);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(69)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_58c8cda2_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/textright/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58c8cda2", Component.options)
  } else {
    hotAPI.reload("data-v-58c8cda2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'textright'
};
module.exports = exports['default'];

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-textright', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-58c8cda2", esExports)
  }
}

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6c2d1078_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(75);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(73)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6c2d1078_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/lowercase/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c2d1078", Component.options)
  } else {
    hotAPI.reload("data-v-6c2d1078", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'lowercase'
};
module.exports = exports['default'];

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-lowercase', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c2d1078", esExports)
  }
}

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d65890b6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(79);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(77)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d65890b6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/uppercase/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d65890b6", Component.options)
  } else {
    hotAPI.reload("data-v-d65890b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'uppercase'
};
module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-uppercase', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d65890b6", esExports)
  }
}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23f38c62_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(83);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(81)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23f38c62_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/capitalize/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23f38c62", Component.options)
  } else {
    hotAPI.reload("data-v-23f38c62", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'capitalize'
};
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-capitalize', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-23f38c62", esExports)
  }
}

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f417da62_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(87);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(85)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f417da62_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/quote/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f417da62", Component.options)
  } else {
    hotAPI.reload("data-v-f417da62", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 85 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'quote'
};
module.exports = exports['default'];

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-quote', {
    class: [_vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f417da62", esExports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42f1d780_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(91);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(89)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42f1d780_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/ol/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42f1d780", Component.options)
  } else {
    hotAPI.reload("data-v-42f1d780", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 89 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'ol'
};
module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-ol', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-42f1d780", esExports)
  }
}

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_711bb7ba_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(95);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(93)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_711bb7ba_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/ul/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-711bb7ba", Component.options)
  } else {
    hotAPI.reload("data-v-711bb7ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 93 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'ul'
};
module.exports = exports['default'];

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-ul', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-711bb7ba", esExports)
  }
}

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14c7f746_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(99);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14c7f746_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/il/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14c7f746", Component.options)
  } else {
    hotAPI.reload("data-v-14c7f746", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 97 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'il'
};
module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-il', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14c7f746", esExports)
  }
}

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2360872a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(103);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2360872a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/dl/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2360872a", Component.options)
  } else {
    hotAPI.reload("data-v-2360872a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 101 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'dl'
};
module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-dl', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2360872a", esExports)
  }
}

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4feca4d4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(107);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4feca4d4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/itemlist/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4feca4d4", Component.options)
  } else {
    hotAPI.reload("data-v-4feca4d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'itemlist'
};
module.exports = exports['default'];

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-itemlist', {
    class: [_vm.sizeClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4feca4d4", esExports)
  }
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14c18e29_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(111);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(109)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14c18e29_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/textcolor/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14c18e29", Component.options)
  } else {
    hotAPI.reload("data-v-14c18e29", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'textcolor'
};
module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-textcolor', {
    class: [_vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14c18e29", esExports)
  }
}

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_633fe388_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(115);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_633fe388_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/apparent/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-633fe388", Component.options)
  } else {
    hotAPI.reload("data-v-633fe388", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'apparent'
};
module.exports = exports['default'];

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-apparent', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-633fe388", esExports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_55cdd3a9_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(119);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(117)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_55cdd3a9_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/grid/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55cdd3a9", Component.options)
  } else {
    hotAPI.reload("data-v-55cdd3a9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'grid'
};
module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-grid', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-55cdd3a9", esExports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ce20ef3_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(123);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(121)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ce20ef3_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/card/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ce20ef3", Component.options)
  } else {
    hotAPI.reload("data-v-3ce20ef3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'card'
};
module.exports = exports['default'];

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-card', {
    class: [_vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3ce20ef3", esExports)
  }
}

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a5f695e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(127);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a5f695e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/box/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a5f695e", Component.options)
  } else {
    hotAPI.reload("data-v-0a5f695e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'box'
};
module.exports = exports['default'];

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-box', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0a5f695e", esExports)
  }
}

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4bdcf7a0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(131);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4bdcf7a0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/block/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4bdcf7a0", Component.options)
  } else {
    hotAPI.reload("data-v-4bdcf7a0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'block'
};
module.exports = exports['default'];

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-block', {
    class: [_vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4bdcf7a0", esExports)
  }
}

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f5774da8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(135);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f5774da8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/divider/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f5774da8", Component.options)
  } else {
    hotAPI.reload("data-v-f5774da8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'divider'
};
module.exports = exports['default'];

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-divider', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f5774da8", esExports)
  }
}

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b678810_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(139);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(137)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b678810_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/center/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b678810", Component.options)
  } else {
    hotAPI.reload("data-v-4b678810", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'center'
};
module.exports = exports['default'];

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-center', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b678810", esExports)
  }
}

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c9c27a0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(143);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(141)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c9c27a0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/header/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c9c27a0", Component.options)
  } else {
    hotAPI.reload("data-v-3c9c27a0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 141 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'header'
};
module.exports = exports['default'];

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-header', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c9c27a0", esExports)
  }
}

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0dc32994_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(147);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0dc32994_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/badge/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dc32994", Component.options)
  } else {
    hotAPI.reload("data-v-0dc32994", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 145 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'badge'
};
module.exports = exports['default'];

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-badge', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0dc32994", esExports)
  }
}

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bcefc572_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(151);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(149)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bcefc572_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/label/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bcefc572", Component.options)
  } else {
    hotAPI.reload("data-v-bcefc572", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 149 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'label'
};
module.exports = exports['default'];

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-label', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bcefc572", esExports)
  }
}

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_88f80eba_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(155);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_88f80eba_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/statistic/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-88f80eba", Component.options)
  } else {
    hotAPI.reload("data-v-88f80eba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 153 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'statistic'
};
module.exports = exports['default'];

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-statistic', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-88f80eba", esExports)
  }
}

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6860c899_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(159);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(157)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6860c899_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/action/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6860c899", Component.options)
  } else {
    hotAPI.reload("data-v-6860c899", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 157 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'action'
};
module.exports = exports['default'];

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-action', {
    class: [_vm.sizeClass, _vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6860c899", esExports)
  }
}

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_511b59ce_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(163);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_511b59ce_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/formgroup/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-511b59ce", Component.options)
  } else {
    hotAPI.reload("data-v-511b59ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 161 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'formgroup'
};
module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-formgroup', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-511b59ce", esExports)
  }
}

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_610125c6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(167);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_610125c6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/btngroup/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-610125c6", Component.options)
  } else {
    hotAPI.reload("data-v-610125c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 165 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'btngroup'
};
module.exports = exports['default'];

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-btngroup', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-610125c6", esExports)
  }
}

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3671fc02_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(171);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3671fc02_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/jumbotron/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3671fc02", Component.options)
  } else {
    hotAPI.reload("data-v-3671fc02", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 169 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'jumbotron'
};
module.exports = exports['default'];

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-jumbotron', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3671fc02", esExports)
  }
}

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f527ba6e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(175);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f527ba6e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/article/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f527ba6e", Component.options)
  } else {
    hotAPI.reload("data-v-f527ba6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 173 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'article'
};
module.exports = exports['default'];

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-article', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f527ba6e", esExports)
  }
}

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c53d2554_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(179);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c53d2554_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/img/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c53d2554", Component.options)
  } else {
    hotAPI.reload("data-v-c53d2554", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 177 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'img',
    props: {
        src: String,
        width: String,
        height: String,
        alt: String,
        title: String
    }
};
module.exports = exports['default'];

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-img', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.src,
      "width": _vm.width,
      "height": _vm.height,
      "alt": _vm.alt,
      "title": _vm.title
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "note"
  }, [_vm._t("default")], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c53d2554", esExports)
  }
}

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5fe8a8af_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(183);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5fe8a8af_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/btn/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fe8a8af", Component.options)
  } else {
    hotAPI.reload("data-v-5fe8a8af", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 181 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'btn',
    props: {
        link: {
            type: String,
            default: ''
        },
        js: {
            type: String,
            default: ''
        },
        locked: {
            type: [Boolean, Number],
            default: false
        },
        newTab: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                link: this.link,
                js: this.js,
                locked: this.locked,
                newTab: this.newTab
            };
        },
        moreClass: function moreClass() {

            return {
                loading: this.data.lock
            };
        }
    },
    data: function data() {

        return {
            data: {
                lock: false
            }
        };
    },
    methods: {
        _onClick: function _onClick() {

            if (this.conf.state !== 'disabled' && !this.data.lock) {

                this.$emit('emit');
            }
        },
        _emitLock: function _emitLock() {

            if (typeof this.conf.locked === 'number') {

                this.lock(+this.conf.locked);
            } else if (this.conf.locked === true) {

                this.lock();
            }
        },
        unlock: function unlock() {

            this.data.lock = false;

            return this;
        },
        lock: function lock(time) {
            var _this = this;

            this.data.lock = true;

            if (time) {

                setTimeout(function () {

                    if (_this.data.lock) {

                        _this.unlock();
                    }
                }, +time);
            }

            return this;
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        this._emitLock();

        this.$on('emit', function () {

            _this2._emitLock();

            if (_this2.conf.js) {

                eval(_this2.conf.js);
            }

            if (_this2.conf.link) {

                if (_this2.conf.newTab) {

                    window.open(_this2.conf.link);
                } else {

                    window.location.href = _this2.conf.link;
                }
            }
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-btn', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "link": _vm.link,
      "js": _vm.js,
      "locked": _vm.locked,
      "new-tab": _vm.newTab
    },
    on: {
      "click": _vm._onClick
    }
  }, [(_vm.data.lock) ? [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._t("default")], 2)] : [_vm._t("default")]], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5fe8a8af", esExports)
  }
}

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d57eb146_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(187);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(185)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d57eb146_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/link/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d57eb146", Component.options)
  } else {
    hotAPI.reload("data-v-d57eb146", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 185 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'link',
    props: {
        link: {
            type: String,
            default: ''
        },
        js: {
            type: String,
            default: ''
        },
        locked: {
            type: [Boolean, Number],
            default: false
        },
        newTab: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                link: this.link,
                js: this.js,
                locked: this.locked,
                newTab: this.newTab
            };
        },
        moreClass: function moreClass() {

            return {
                loading: this.data.lock
            };
        }
    },
    data: function data() {

        return {
            data: {
                lock: false
            }
        };
    },
    methods: {
        _onClick: function _onClick() {

            if (this.conf.state !== 'disabled' && !this.data.lock) {

                this.$emit('emit');
            }
        },
        _emitLock: function _emitLock() {

            if (typeof this.conf.locked === 'number') {

                this.lock(+this.locked);
            } else if (this.conf.locked === true) {

                this.lock();
            }
        },
        unlock: function unlock() {

            this.data.lock = false;

            return this;
        },
        lock: function lock(time) {
            var _this = this;

            this.data.lock = true;

            if (time) {

                setTimeout(function () {

                    if (_this.data.lock) {

                        _this.unlock();
                    }
                }, +time);
            }

            return this;
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        this._emitLock();

        this.$on('emit', function () {

            _this2._emitLock();

            if (_this2.conf.js) {

                eval(_this2.conf.js);
            }

            if (_this2.conf.link) {

                if (_this2.conf.newTab) {

                    window.open(_this2.conf.link);
                } else {

                    window.location.href = _this2.conf.link;
                }
            }
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-link', {
    class: [_vm.sizeClass, _vm.colorClass, _vm.stateClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "link": _vm.link,
      "js": _vm.js,
      "locked": _vm.locked,
      "new-tab": _vm.newTab
    },
    on: {
      "click": _vm._onClick
    }
  }, [(_vm.data.lock) ? [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._t("default")], 2)] : [_vm._t("default")]], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d57eb146", esExports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42dab298_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(191);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(189)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42dab298_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/dropdown/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42dab298", Component.options)
  } else {
    hotAPI.reload("data-v-42dab298", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 189 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GlobalEvent = __webpack_require__(5);

var _GlobalEvent2 = _interopRequireDefault(_GlobalEvent);

var _IndexManager = __webpack_require__(6);

var _IndexManager2 = _interopRequireDefault(_IndexManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'dropdown',
    mixins: [_GlobalEvent2.default, _IndexManager2.default],
    props: {
        autoClose: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                autoClose: this.autoClose
            };
        },
        showClass: function showClass() {

            return {
                show: this.data.show,
                hide: !this.data.show && !this.data.first
            };
        }
    },
    data: function data() {

        return {
            data: {
                show: false,
                first: true
            }
        };
    },
    methods: {
        _checkArea: function _checkArea(evt) {

            var notFound = -1;

            var $emitbtn = this.$el.querySelector('[emitbtn]');

            if (this.conf.autoClose && evt.path.indexOf($emitbtn) === notFound || !this.conf.autoClose && evt.path.indexOf(this.$el) === notFound) {

                this.toggle();
            }
        },
        _toggle: function _toggle() {

            this.toggle();
        },
        toggle: function toggle(show) {

            if (show === undefined) {

                show = !this.data.show;
            }

            show = !!show;

            if (show === this.data.show) {

                return this;
            }

            this.data.show = show;

            if (this.data.show) {

                this.$emit('show');
            } else {

                this.$emit('hide');
            }

            return this;
        }

    },
    created: function created() {

        this._indexReg('list.show', 2);
        this._indexReg('list.hide', 1);
    },
    mounted: function mounted() {
        var _this = this;

        var timeout = 200;

        var $emitbtn = this.$el.querySelector('[emitbtn]');

        if ($emitbtn) {

            $emitbtn.addEventListener('click', this._toggle);
        }

        this.$on('show', function () {

            _this.data.first = false;
            _this.data.show = true;
            _this.$el.style.zIndex = _this._indexGet('list.show');

            setTimeout(function () {

                _this._globalEventAdd('click', '_checkArea');
            });

            _this.$emit('emit');
        });

        this.$on('hide', function () {

            _this.data.first = false;
            _this.data.show = false;
            _this._globalEventRemove('click', '_checkArea');
            _this.$emit('emit');

            setTimeout(function () {

                _this.$el.style.zIndex = _this._indexGet('list.hide');
            }, timeout);
        });
    },
    beforeDestroy: function beforeDestroy() {

        this._globalEventRemove('click', '_checkArea');
    }
};
module.exports = exports['default'];

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-dropdown', {
    class: [_vm.showClass],
    attrs: {
      "_uiid": _vm.uiid,
      "auto-close": _vm.autoClose
    }
  }, [_vm._t("showbtn"), _vm._v(" "), _c('div', {
    staticClass: "btnlist"
  }, [_vm._t("default")], 2)], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-42dab298", esExports)
  }
}

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cf9112b0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(195);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(193)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cf9112b0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/tab/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf9112b0", Component.options)
  } else {
    hotAPI.reload("data-v-cf9112b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 193 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'tab',
    props: {
        tab: {
            type: String,
            default: undefined
        },
        prepend: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        append: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                tab: this.tab,
                prepend: this.prepend,
                append: this.append
            };
        }
    },
    data: function data() {

        return {
            data: {
                tabs: [],
                selectTab: null,
                namelist: []
            }
        };
    },
    methods: {
        _onClick: function _onClick(name) {

            this.switch(name);
        },
        _getNamelist: function _getNamelist() {

            var names = Object.keys(this.$slots);
            var list = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var name = _step.value;


                    var prepend = this.conf.prepend[name];
                    var append = this.conf.append[name];

                    list.push({
                        name: name,
                        html: '' + (prepend || '') + name + (append || '')
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.data.namelist = list;
        },
        switch: function _switch(name) {

            if (name === this.data.selectTab) {

                return this;
            }

            var old = this.data.tabs.indexOf(this.data.selectTab);

            if (old !== -1) {

                var conEl = this.$el.children[1].children[old];
                var tabEl = this.$el.children[0].children[old];
                var conClassList = conEl.className.split(' ');
                var tabClassList = conEl.className.split(' ');
                var conClassIndex = conClassList.indexOf('current');
                var tabClassIndex = tabClassList.indexOf('current');

                if (conClassIndex !== -1) {

                    conClassList.splice(conClassIndex, 1);
                }

                if (tabClassIndex !== -1) {

                    tabClassList.splice(tabClassIndex, 1);
                }

                conEl.className = conClassList.join(' ');
                tabEl.className = tabClassList.join(' ');
            }

            var current = this.data.tabs.indexOf(name);

            if (current !== -1) {

                var _conEl = this.$el.children[1].children[current];
                var _tabEl = this.$el.children[0].children[current];

                _conEl.className += ' current';
                _tabEl.className += ' current';
            }

            this.data.selectTab = name;

            this.$emit('switch');

            return this;
        },
        next: function next() {

            var index = this.data.tabs.indexOf(this.data.selectTab);

            index++;

            if (index < this.data.tabs.length) {

                this.switch(this.data.tabs[index]);
            } else {

                this.switch(this.data.tabs[0]);
            }

            return this;
        },
        prev: function prev() {

            var index = this.data.tabs.indexOf(this.data.selectTab);

            index--;

            if (index >= 0) {

                this.switch(this.data.tabs[index]);
            } else {

                this.switch(this.data.tabs[this.data.tabs.length - 1]);
            }

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this = this;

        this.$watch(function () {
            return JSON.stringify(_this.conf.prepend) + JSON.stringify(_this.conf.append);
        }, this._getNamelist, {
            deep: true,
            immediate: true
        });

        this.$watch('$slots', function () {

            _this._getNamelist();
            _this.data.tabs = Object.keys(_this.$slots);
        }, {
            immediate: true
        });

        this.Vue.nextTick(function () {

            _this.$watch('conf.tab', function () {

                if (_this.conf.tab) {

                    _this.switch(_this.conf.tab);
                } else {

                    _this.switch(_this.data.tabs[0]);
                }
            }, {
                immediate: true
            });
        });
    }

};
module.exports = exports['default'];

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-tab', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid
    }
  }, [_c('ul', _vm._l((_vm.data.namelist), function(item) {
    return _c('li', {
      key: item.name,
      attrs: {
        "name": item.name
      },
      domProps: {
        "innerHTML": _vm._s(item.html)
      },
      on: {
        "click": function($event) {
          _vm._onClick(item.name)
        }
      }
    })
  })), _vm._v(" "), _c('div', {
    staticClass: "contents"
  }, [_vm._l((_vm.$slots), function(item, name) {
    return [_c('div', {
      key: name,
      staticClass: "item",
      attrs: {
        "name": name
      }
    }, [_vm._t(name)], 2)]
  })], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cf9112b0", esExports)
  }
}

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d803dcbe_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(206);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(197)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d803dcbe_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/table/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d803dcbe", Component.options)
  } else {
    hotAPI.reload("data-v-d803dcbe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 197 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _arrayUniq = __webpack_require__(4);

var _arrayUniq2 = _interopRequireDefault(_arrayUniq);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _lodash = __webpack_require__(13);

var _lodash2 = _interopRequireDefault(_lodash);

var _titleTable = __webpack_require__(200);

var _titleTable2 = _interopRequireDefault(_titleTable);

var _normalTable = __webpack_require__(203);

var _normalTable2 = _interopRequireDefault(_normalTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    origin: 'UI',
    name: 'table',
    components: {
        'title-table': _titleTable2.default,
        'normal-table': _normalTable2.default
    },
    props: {
        list: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        emptyCellValue: {
            type: String,
            default: '-'
        },
        title: {
            type: String,
            default: undefined
        },
        zebraPattern: {
            type: Boolean,
            default: true
        },
        verticalBorder: {
            type: Boolean,
            default: true
        },
        horizontalBorder: {
            type: Boolean,
            default: true
        },
        align: {
            type: String,
            default: 'center',
            validator: function validator(value) {
                return ['left', 'center', 'right'].indexOf(value) !== -1;
            }
        },
        showColName: {
            type: Boolean,
            default: false
        },
        fixedTitleCol: {
            type: String,
            default: 'left',
            validator: function validator(value) {
                return ['left', 'right', 'left-fixed', 'right-fixed'].indexOf(value) !== -1;
            }
        },
        colSet: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        rowSet: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        cellSet: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        exportCsv: {
            type: Boolean,
            default: false
        },
        csvName: {
            type: String,
            default: undefined
        },
        multiSort: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                list: this.list,
                emptyCellValue: this.emptyCellValue,
                title: this.title,
                zebraPattern: this.zebraPattern,
                verticalBorder: this.verticalBorder,
                horizontalBorder: this.horizontalBorder,
                align: this.align,
                showColName: this.showColName,
                fixedTitleCol: this.fixedTitleCol,
                colSet: this.colSet,
                rowSet: this.rowSet,
                cellSet: this.cellSet,
                exportCsv: this.exportCsv,
                csvName: this.csvName,
                multiSort: this.multiSort
            };
        },
        colSetMap: function colSetMap() {

            var map = {};

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.conf.colSet[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var col = _step.value;


                    map[col.col] = col;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return map;
        },
        moreClass: function moreClass() {

            var classes = {};

            classes['align-' + this.conf.align] = true;
            classes['title-col-' + this.conf.fixedTitleCol] = true;

            return Object.assign({
                'zebra-pattern': this.conf.zebraPattern,
                'vertical-border': this.conf.verticalBorder,
                'horizontal-border': this.conf.horizontalBorder,
                'has-title-col': this.data.titleKeys.length > 0
            }, classes);
        }
    },
    data: function data() {

        return {
            data: {
                normalKeys: [],
                normalRows: [],
                titleKeys: [],
                titleRows: [],
                listDataJson: '[]',
                sort: {},
                sortCol: []
            }
        };
    },
    methods: {
        _refreshTable: function _refreshTable() {

            this._cleanupCell();
            this._fixedTitleCol();
            this._setCol();
            this._setRow();
            this._setCell();
        },
        _sortCol: function _sortCol(col) {

            var type = 'desc';
            var sortColIndex = void 0;

            if (this.data.sort[col] === undefined) {

                if (this.conf.multiSort === false) {

                    this.data.sort = {};
                }

                this.data.sort[col] = {
                    type: 'no',
                    origin: {}
                };
            }

            if (this.data.sort[col].type === 'desc') {

                type = 'asc';
            } else if (this.data.sort[col].type === 'asc') {

                type = 'no';
            } else {

                type = 'desc';
                this.data.sort[col].origin = {
                    title: (0, _extend2.default)([], this.data.titleRows),
                    normal: (0, _extend2.default)([], this.data.normalRows)
                };
            }

            if (this.conf.multiSort) {

                sortColIndex = this.data.sortCol.indexOf(col);

                if (sortColIndex !== -1) {

                    this.data.sortCol.splice(sortColIndex, 1);
                }

                this.data.sortCol.push(col);
            } else {

                this.data.sortCol = [col];
            }

            this.data.sort[col].type = type;

            this._sort();
        },
        _sort: function _sort() {
            var _this = this;

            var _loop = function _loop(col) {

                var sort = _this.data.sort[col];
                var mainType = 'normal';
                var subType = 'title';
                var colIndex = void 0;
                var mainRows = void 0;
                var newMainRows = [];
                var newSubRows = [];

                if (sort.type === 'asc' || sort.type === 'desc') {

                    if (_this.data.titleKeys.indexOf(col) !== -1) {

                        mainType = 'title';
                        subType = 'normal';
                    }

                    mainRows = (0, _extend2.default)([], _this.data[mainType + 'Rows']);
                    colIndex = _this.data[mainType + 'Keys'].indexOf(col);

                    for (var index in mainRows) {

                        mainRows[index]._sub = _this.data[subType + 'Rows'][index];
                    }

                    newMainRows = (0, _lodash2.default)(mainRows, function (item) {
                        return item[colIndex];
                    });

                    if (sort.type === 'desc') {

                        newMainRows.reverse();
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = newMainRows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var row = _step3.value;


                            newSubRows.push(row._sub);
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    _this.data[mainType + 'Rows'] = newMainRows;
                    _this.data[subType + 'Rows'] = newSubRows;
                } else if (_this.data.sortCol.length === 1) {

                    // cause if sortCol length > 1, this sort item not need to calculate
                    _this.data.titleRows = sort.origin.title;
                    _this.data.normalRows = sort.origin.normal;
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {

                for (var _iterator2 = this.data.sortCol[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var col = _step2.value;

                    _loop(col);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        },
        _cleanupCell: function _cleanupCell() {

            var $cells = this.$el.querySelectorAll('td:not(.no-data), th');

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = $cells[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var $cell = _step4.value;


                    if ($cell) {

                        $cell.style.width = '';
                        $cell.style.minWidth = '';
                        $cell.style.maxWidth = '';

                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = $cell.classList.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var className = _step5.value;


                                $cell.classList.remove(className);
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        },
        _setCol: function _setCol() {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {

                for (var _iterator6 = this.conf.colSet[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var set = _step6.value;


                    var colType = 'normal';
                    var _colIndex = this.data.normalKeys.indexOf(set.col);

                    if (_colIndex === -1) {

                        colType = 'title';
                        _colIndex = this.data.titleKeys.indexOf(set.col);
                    }

                    var $rows = this.$el.querySelector('.' + colType + '-table');

                    if ($rows) {

                        $rows = $rows.querySelectorAll('tbody tr, thead tr');

                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = $rows[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var $row = _step7.value;


                                var $cell = $row.querySelectorAll('td, th')[_colIndex];

                                if ($cell && set.width) {

                                    $cell.style.width = set.width;
                                }

                                if ($cell && set.minwidth) {

                                    $cell.style.minWidth = set.minwidth;
                                }

                                if ($cell && set.maxwidth) {

                                    $cell.style.maxWidth = set.maxwidth;
                                }

                                if ($cell && set.align) {

                                    $cell.classList.add('cell-align-' + set.align);
                                }

                                if ($cell && set.style) {

                                    $cell.classList.add('cell-co-' + set.style);
                                }

                                if ($cell && set.disabled) {

                                    $cell.classList.add('cell-disabled');
                                }
                            }
                        } catch (err) {
                            _didIteratorError7 = true;
                            _iteratorError7 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                    _iterator7.return();
                                }
                            } finally {
                                if (_didIteratorError7) {
                                    throw _iteratorError7;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        },
        _fillColSet: function _fillColSet(colset) {

            var result = [];

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = colset[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var item = _step8.value;


                    result.push((0, _extend2.default)({
                        col: undefined,
                        name: undefined,
                        width: undefined,
                        minwidth: undefined,
                        maxwidth: undefined,
                        style: undefined,
                        disabled: false,
                        align: undefined,
                        title: false,
                        hide: false,
                        export: true,
                        sort: false
                    }, item));
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return result;
        },
        _setRow: function _setRow() {
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {

                for (var _iterator9 = this.conf.rowSet[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var set = _step9.value;


                    var rowIndex = +set.row;
                    var $titleRow = this.$el.querySelectorAll('.title-table tr');
                    var $normalRow = this.$el.querySelectorAll('.normal-table tr');

                    $titleRow = $titleRow[rowIndex];
                    $normalRow = $normalRow[rowIndex];

                    if ($titleRow && $normalRow) {

                        var $titleCell = $titleRow.querySelectorAll('th, td');
                        var $normalCell = $normalRow.querySelectorAll('th, td');
                        var $cells = [];

                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = $titleCell[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var $cell = _step10.value;


                                $cells.push($cell);
                            }
                        } catch (err) {
                            _didIteratorError10 = true;
                            _iteratorError10 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }
                            } finally {
                                if (_didIteratorError10) {
                                    throw _iteratorError10;
                                }
                            }
                        }

                        var _iteratorNormalCompletion11 = true;
                        var _didIteratorError11 = false;
                        var _iteratorError11 = undefined;

                        try {
                            for (var _iterator11 = $normalCell[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                var _$cell = _step11.value;


                                $cells.push(_$cell);
                            }
                        } catch (err) {
                            _didIteratorError11 = true;
                            _iteratorError11 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                    _iterator11.return();
                                }
                            } finally {
                                if (_didIteratorError11) {
                                    throw _iteratorError11;
                                }
                            }
                        }

                        var _iteratorNormalCompletion12 = true;
                        var _didIteratorError12 = false;
                        var _iteratorError12 = undefined;

                        try {
                            for (var _iterator12 = $cells[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                var _$cell2 = _step12.value;


                                if (set.style) {

                                    _$cell2.classList.add('cell-co-' + set.style);
                                }

                                if (set.disabled) {

                                    _$cell2.classList.add('cell-disabled');
                                }

                                if (set.align) {

                                    _$cell2.classList.add('cell-align-' + set.align);
                                }
                            }
                        } catch (err) {
                            _didIteratorError12 = true;
                            _iteratorError12 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                    _iterator12.return();
                                }
                            } finally {
                                if (_didIteratorError12) {
                                    throw _iteratorError12;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }
        },
        _fillRowSet: function _fillRowSet(colset) {

            var result = [];

            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = colset[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var item = _step13.value;


                    result.push((0, _extend2.default)({
                        row: undefined,
                        style: undefined,
                        disabled: undefined,
                        align: undefined
                    }, item));
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return result;
        },
        _setCell: function _setCell() {
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {

                for (var _iterator14 = this.conf.cellSet[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var set = _step14.value;


                    var colType = 'normal';
                    var _colIndex2 = this.data.normalKeys.indexOf(set.col);
                    var rowIndex = +set.row;

                    if (_colIndex2 === -1) {

                        colType = 'title';
                        _colIndex2 = this.data.titleKeys.indexOf(set.col);
                    }

                    if (_colIndex2 !== -1) {

                        var $cell = this.$el.querySelector('.' + colType + '-table');

                        if (rowIndex === 0) {

                            $cell = $cell.querySelectorAll('thead th');
                        } else {

                            $cell = $cell.querySelectorAll('tbody tr')[rowIndex];
                            $cell = $cell.querySelectorAll('td');
                        }

                        if ($cell.length !== 0 && $cell[_colIndex2] !== 0) {

                            $cell = $cell[_colIndex2];

                            if (set.style) {

                                $cell.classList.add('cell-co-' + set.style);
                            }

                            if (set.disabled) {

                                $cell.classList.add('cell-disabled');
                            }

                            if (set.align) {

                                $cell.classList.add('cell-align-' + set.align);
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                        _iterator14.return();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }
        },
        _fillCellSet: function _fillCellSet(colset) {

            var result = [];

            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = colset[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var item = _step15.value;


                    result.push((0, _extend2.default)({
                        row: undefined,
                        col: undefined,
                        style: undefined,
                        disabled: undefined,
                        align: undefined
                    }, item));
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return result;
        },
        _toggleTitleCol: function _toggleTitleCol() {

            var $titleTd = this.$el.querySelector('.title-table').parentElement;

            if (this.data.titleKeys.length > 0) {

                $titleTd.style.display = 'table-cell';
            } else {

                $titleTd.style.display = 'none';
            }
        },
        _syncRowHeight: function _syncRowHeight() {

            var $normalRows = this.$el.querySelectorAll('.normal-table tbody > tr');
            var $titleRows = this.$el.querySelectorAll('.title-table tbody > tr');

            for (var index in $normalRows) {

                if (_typeof($titleRows[index]) === 'object' && _typeof($normalRows[index]) === 'object') {

                    var normalHeight = $normalRows[index].clientHeight;
                    var titleHeight = $titleRows[index].clientHeight;
                    var syncHeight = void 0;

                    if (titleHeight > normalHeight) {

                        syncHeight = titleHeight;
                    } else {

                        syncHeight = normalHeight;
                    }

                    $normalRows[index].style.height = syncHeight + 'px';
                    $titleRows[index].style.height = syncHeight + 'px';
                }
            }
        },
        _fixedTitleCol: function _fixedTitleCol() {

            var $titleTable = this.$el.querySelector('.title-table');
            var $normalTable = this.$el.querySelector('.normal-table');

            $normalTable.parentElement.style.maxWidth = '';
            $titleTable.parentElement.style.maxWidth = '';
            $normalTable.parentElement.style.overflowX = '';
            $titleTable.parentElement.style.overflowX = '';
            $normalTable.parentElement.style.width = '';
            $titleTable.parentElement.style.width = '';
            $normalTable.parentElement.style.position = '';
            $titleTable.parentElement.style.position = '';
            $normalTable.parentElement.style.left = '';
            $titleTable.parentElement.style.left = '';
            $normalTable.parentElement.style.right = '';
            $titleTable.parentElement.style.right = '';
            $normalTable.style.borderLeft = '';
            $titleTable.style.borderLeft = '';
            $normalTable.style.borderRight = '';
            $titleTable.style.borderRight = '';

            if (!/fixed/.test(this.conf.fixedTitleCol)) {

                return;
            }
            var titleColWidth = $titleTable.clientWidth;
            var elWidth = this.$el.clientWidth;

            $normalTable.parentElement.style.maxWidth = elWidth - titleColWidth + 'px';
            $normalTable.parentElement.style.overflowX = 'auto';

            $titleTable.parentElement.style.width = titleColWidth + 'px';
            $titleTable.parentElement.style.position = 'absolute';

            if (this.conf.fixedTitleCol === 'left-fixed') {

                $normalTable.style.borderLeft = titleColWidth + 'px rgba(0,0,0,0) solid';
                $titleTable.parentElement.style.left = 0;
            } else {

                $normalTable.style.borderRight = titleColWidth + 'px rgba(0,0,0,0) solid';
                $titleTable.parentElement.style.right = 0;
            }
        },
        _rowOver: function _rowOver(line) {

            var $titleTr = this.$el.querySelectorAll('.title-table tbody tr')[line];
            var $normalTr = this.$el.querySelectorAll('.normal-table tbody tr')[line];

            $titleTr.classList.add('hover');
            $normalTr.classList.add('hover');
        },
        _rowOut: function _rowOut(line) {

            var $titleTr = this.$el.querySelectorAll('.title-table tbody tr')[line];
            var $normalTr = this.$el.querySelectorAll('.normal-table tbody tr')[line];

            $titleTr.classList.remove('hover');
            $normalTr.classList.remove('hover');
        },
        _exportRows: function _exportRows(csv, type) {

            var ignoreColIndex = [];

            if (csv[0] === undefined) {

                csv[0] = [];
            }

            if (this.conf.showColName) {
                var _iteratorNormalCompletion16 = true;
                var _didIteratorError16 = false;
                var _iteratorError16 = undefined;

                try {

                    for (var _iterator16 = this.data[type + 'Keys'][Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                        var key = _step16.value;


                        var set = this.colSetMap[key];

                        if (set.export !== false) {

                            if (set && set.name) {

                                csv[0].push(set.name);
                            } else {

                                csv[0].push('');
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError16 = true;
                    _iteratorError16 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion16 && _iterator16.return) {
                            _iterator16.return();
                        }
                    } finally {
                        if (_didIteratorError16) {
                            throw _iteratorError16;
                        }
                    }
                }
            }

            for (var index in this.data[type + 'Keys']) {

                var _key = this.data[type + 'Keys'][index];
                var _set = this.colSetMap[_key];

                if (_set && _set.export === false) {

                    ignoreColIndex.push(index);
                }
            }

            for (var _index in this.data[type + 'Rows']) {

                var csvIndex = Number(_index) + 1;
                var originRow = (0, _extend2.default)([], this.data[type + 'Rows'][_index]);
                var row = [];

                for (var col in originRow) {

                    if (ignoreColIndex.indexOf(col) === -1) {

                        row.push(originRow[col]);
                    }
                }

                if (csv[csvIndex] === undefined) {

                    csv[csvIndex] = [];
                }

                csv[csvIndex] = csv[csvIndex].concat(row);
            }

            return csv;
        },
        _exportCsv: function _exportCsv() {

            var csv = [];
            var downloadLink = document.createElement('a');
            var blob = void 0;

            if (this.conf.fixedTitleCol[0] === 'r') {

                this._exportRows(csv, 'normal');
                this._exportRows(csv, 'title');
            } else {

                this._exportRows(csv, 'title');
                this._exportRows(csv, 'normal');
            }

            if (csv[0].length === 0) {

                csv.shift();
            }

            for (var index in csv) {

                csv[index] = csv[index].join(',');
            }

            csv = csv.join('\n');

            blob = new Blob([csv]);

            downloadLink.style.display = 'none';
            downloadLink.href = URL.createObjectURL(blob);

            if (this.conf.csvName !== undefined) {

                downloadLink.download = this.conf.csvName + '.csv';
            } else {

                downloadLink.download = +new Date() + '.csv';
            }

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        },
        _importList: function _importList(list) {

            var titleRows = [];
            var normalRows = [];
            var titleKeys = [];
            var normalKeys = [];

            list = (0, _extend2.default)(true, [], list);

            // if list is empty, and has conf.colSet, use colSet generate keys.
            if (list.length === 0) {

                for (var key in this.colSetMap) {

                    var set = this.colSetMap[key];

                    if (set.title === true) {

                        titleKeys.push(key);
                    } else {

                        normalKeys.push(key);
                    }
                }
            } else {
                var _iteratorNormalCompletion17 = true;
                var _didIteratorError17 = false;
                var _iteratorError17 = undefined;

                try {

                    for (var _iterator17 = list[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                        var item = _step17.value;
                        var _iteratorNormalCompletion18 = true;
                        var _didIteratorError18 = false;
                        var _iteratorError18 = undefined;

                        try {

                            for (var _iterator18 = Object.keys(item)[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                var _key2 = _step18.value;


                                var _set2 = this.colSetMap[_key2];

                                if (_set2 && _set2.title === true) {

                                    titleKeys.push(_key2);
                                } else {

                                    normalKeys.push(_key2);
                                }
                            }
                        } catch (err) {
                            _didIteratorError18 = true;
                            _iteratorError18 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                                    _iterator18.return();
                                }
                            } finally {
                                if (_didIteratorError18) {
                                    throw _iteratorError18;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError17 = true;
                    _iteratorError17 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion17 && _iterator17.return) {
                            _iterator17.return();
                        }
                    } finally {
                        if (_didIteratorError17) {
                            throw _iteratorError17;
                        }
                    }
                }
            }

            titleKeys = (0, _arrayUniq2.default)(titleKeys);
            normalKeys = (0, _arrayUniq2.default)(normalKeys);

            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
                for (var _iterator19 = list[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                    var _item = _step19.value;


                    var titleCol = [];
                    var normalCol = [];

                    var _iteratorNormalCompletion20 = true;
                    var _didIteratorError20 = false;
                    var _iteratorError20 = undefined;

                    try {
                        for (var _iterator20 = titleKeys[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                            var _key3 = _step20.value;


                            titleCol.push(_item[_key3] || this.conf.emptyCellValue);
                        }
                    } catch (err) {
                        _didIteratorError20 = true;
                        _iteratorError20 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion20 && _iterator20.return) {
                                _iterator20.return();
                            }
                        } finally {
                            if (_didIteratorError20) {
                                throw _iteratorError20;
                            }
                        }
                    }

                    var _iteratorNormalCompletion21 = true;
                    var _didIteratorError21 = false;
                    var _iteratorError21 = undefined;

                    try {
                        for (var _iterator21 = normalKeys[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                            var _key4 = _step21.value;


                            normalCol.push(_item[_key4] || this.conf.emptyCellValue);
                        }
                    } catch (err) {
                        _didIteratorError21 = true;
                        _iteratorError21 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                _iterator21.return();
                            }
                        } finally {
                            if (_didIteratorError21) {
                                throw _iteratorError21;
                            }
                        }
                    }

                    titleRows.push(titleCol);
                    normalRows.push(normalCol);
                }
            } catch (err) {
                _didIteratorError19 = true;
                _iteratorError19 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
                        _iterator19.return();
                    }
                } finally {
                    if (_didIteratorError19) {
                        throw _iteratorError19;
                    }
                }
            }

            this.data.titleKeys = titleKeys;
            this.data.normalKeys = normalKeys;
            this.data.titleRows = titleRows;
            this.data.normalRows = normalRows;
            this.data.listDataJson = JSON.stringify(list);
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        this.$watch('conf.list', function () {

            _this2._importList(_this2.conf.list);
        }, {
            immediate: true,
            deep: true
        });

        this.$watch('conf.emptyCellValue', function () {

            _this2._importList(_this2.conf.list);
        });

        this.Vue.nextTick(function () {

            _this2.$watch('data.normalRows', function () {

                _this2.Vue.nextTick(function () {

                    _this2._syncRowHeight();
                });
            }, {
                immediate: true,
                deep: true
            });

            _this2.$watch('data.titleRows', function () {

                _this2.Vue.nextTick(function () {

                    _this2._syncRowHeight();
                });
            }, {
                immediate: true,
                deep: true
            });

            _this2.$watch('data.titleKeys', _this2._toggleTitleCol, {
                immediate: true,
                deep: true
            });

            _this2.$watch(function () {
                return JSON.stringify(_this2.conf.colSet) + '||' + JSON.stringify(_this2.conf.rowSet) + '||' + JSON.stringify(_this2.conf.cellSet);
            }, function () {

                var fillColSet = _this2._fillColSet(_this2.conf.colSet);

                if (JSON.stringify(_this2.conf.colSet) !== JSON.stringify(fillColSet)) {

                    _this2.conf.colSet = fillColSet;

                    return;
                }

                var fillRowSet = _this2._fillRowSet(_this2.conf.rowSet);

                if (JSON.stringify(_this2.conf.rowSet) !== JSON.stringify(fillRowSet)) {

                    _this2.conf.rowSet = fillRowSet;

                    return;
                }

                var fillCellSet = _this2._fillCellSet(_this2.conf.cellSet);

                if (JSON.stringify(_this2.conf.cellSet) !== JSON.stringify(fillCellSet)) {

                    _this2.conf.cellSet = fillCellSet;

                    return;
                }

                _this2._importList(_this2.conf.list);

                _this2.Vue.nextTick(function () {

                    _this2._refreshTable();
                });
            }, {
                deep: true,
                immediate: true
            });

            _this2.$watch('data.listDataJson', function () {

                _this2.$emit('list-change');
            });
        });
    },
    updated: function updated() {
        var _this3 = this;

        this.Vue.nextTick(function () {

            _this3._refreshTable();
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_title_table_vue__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_title_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_title_table_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1538b828_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_title_table_vue__ = __webpack_require__(202);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_title_table_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1538b828_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_title_table_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/table/title-table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] title-table.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1538b828", Component.options)
  } else {
    hotAPI.reload("data-v-1538b828", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: ['conf', 'data', 'colSetMap', 'sortCol']
};
module.exports = exports['default'];

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('table', {
    staticClass: "title-table"
  }, [(_vm.conf.showColName) ? _c('thead', [_c('tr', [_vm._l((_vm.data.titleKeys), function(key) {
    return [(_vm.colSetMap[key] && _vm.colSetMap[key].name) ? _c('th', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!_vm.colSetMap[key] || !_vm.colSetMap[key].hide),
        expression: "!colSetMap[key] || !colSetMap[key].hide"
      }],
      key: key
    }, [_vm._v("\n                    " + _vm._s(_vm.colSetMap[key].name) + "\n                    "), (_vm.colSetMap[key].sort) ? _c('span', {
      staticClass: "sort"
    }, [(!_vm.data.sort[key] || (_vm.data.sort[key].type !== 'asc' && _vm.data.sort[key].type !== 'desc')) ? _c('i', {
      staticClass: "morningicon no",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'asc') ? _c('i', {
      staticClass: "morningicon asc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'desc') ? _c('i', {
      staticClass: "morningicon desc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e()]) : _vm._e()]) : _c('th', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!_vm.colSetMap[key] || !_vm.colSetMap[key].hide),
        expression: "!colSetMap[key] || !colSetMap[key].hide"
      }],
      key: key
    }, [(_vm.colSetMap[key] && _vm.colSetMap[key].sort) ? _c('span', {
      staticClass: "sort"
    }, [(!_vm.data.sort[key] || (_vm.data.sort[key].type !== 'asc' && _vm.data.sort[key].type !== 'desc')) ? _c('i', {
      staticClass: "morningicon no",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'asc') ? _c('i', {
      staticClass: "morningicon asc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'desc') ? _c('i', {
      staticClass: "morningicon desc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e()]) : _vm._e()])]
  })], 2)]) : _vm._e(), _vm._v(" "), _c('tbody', _vm._l((_vm.data.titleRows), function(row, line) {
    return _c('tr', {
      key: line,
      on: {
        "mouseover": function($event) {
          _vm.$emit('row-mouseover', line)
        },
        "mouseout": function($event) {
          _vm.$emit('row-mouseout', line)
        }
      }
    }, [_vm._l((row), function(col, index) {
      return [_c('td', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (!_vm.colSetMap[_vm.data.titleKeys[index]] || !_vm.colSetMap[_vm.data.titleKeys[index]].hide),
          expression: "!colSetMap[data.titleKeys[index]] || !colSetMap[data.titleKeys[index]].hide"
        }, {
          name: "render",
          rawName: "v-render",
          value: ({
            template: col
          }),
          expression: "{template : col}"
        }],
        key: index
      })]
    })], 2)
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1538b828", esExports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_normal_table_vue__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_normal_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_normal_table_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2ae1d22e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_normal_table_vue__ = __webpack_require__(205);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_normal_table_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2ae1d22e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_normal_table_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/table/normal-table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] normal-table.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ae1d22e", Component.options)
  } else {
    hotAPI.reload("data-v-2ae1d22e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: ['conf', 'data', 'colSetMap', 'sortCol']
};
module.exports = exports['default'];

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('table', {
    staticClass: "normal-table"
  }, [(_vm.conf.showColName) ? _c('thead', [_c('tr', [_vm._l((_vm.data.normalKeys), function(key) {
    return [(_vm.colSetMap[key] && _vm.colSetMap[key].name) ? _c('th', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!_vm.colSetMap[key] || !_vm.colSetMap[key].hide),
        expression: "!colSetMap[key] || !colSetMap[key].hide"
      }],
      key: key
    }, [_vm._v("\n                    " + _vm._s(_vm.colSetMap[key].name) + "\n                    "), (_vm.colSetMap[key].sort) ? _c('span', {
      staticClass: "sort"
    }, [(!_vm.data.sort[key] || (_vm.data.sort[key].type !== 'asc' && _vm.data.sort[key].type !== 'desc')) ? _c('i', {
      staticClass: "morningicon no",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'asc') ? _c('i', {
      staticClass: "morningicon asc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'desc') ? _c('i', {
      staticClass: "morningicon desc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e()]) : _vm._e()]) : _c('th', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!_vm.colSetMap[key] || !_vm.colSetMap[key].hide),
        expression: "!colSetMap[key] || !colSetMap[key].hide"
      }],
      key: key
    }, [(_vm.colSetMap[key] && _vm.colSetMap[key].sort) ? _c('span', {
      staticClass: "sort"
    }, [(!_vm.data.sort[key] || (_vm.data.sort[key].type !== 'asc' && _vm.data.sort[key].type !== 'desc')) ? _c('i', {
      staticClass: "morningicon no",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'asc') ? _c('i', {
      staticClass: "morningicon asc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e(), _vm._v(" "), (_vm.data.sort[key] && _vm.data.sort[key].type === 'desc') ? _c('i', {
      staticClass: "morningicon desc",
      on: {
        "click": function($event) {
          _vm.sortCol(key)
        }
      }
    }, [_vm._v("")]) : _vm._e()]) : _vm._e()])]
  })], 2)]) : _vm._e(), _vm._v(" "), _c('tbody', _vm._l((_vm.data.normalRows), function(row, line) {
    return _c('tr', {
      key: line,
      on: {
        "mouseover": function($event) {
          _vm.$emit('row-mouseover', line)
        },
        "mouseout": function($event) {
          _vm.$emit('row-mouseout', line)
        }
      }
    }, [_vm._l((row), function(col, index) {
      return [_c('td', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (!_vm.colSetMap[_vm.data.normalKeys[index]] || !_vm.colSetMap[_vm.data.normalKeys[index]].hide),
          expression: "!colSetMap[data.normalKeys[index]] || !colSetMap[data.normalKeys[index]].hide"
        }, {
          name: "render",
          rawName: "v-render",
          value: ({
            template: col
          }),
          expression: "{template : col}"
        }],
        key: index
      })]
    })], 2)
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ae1d22e", esExports)
  }
}

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-table', {
    class: [_vm.colorClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "list": _vm.list,
      "empty-cell-value": _vm.emptyCellValue,
      "title": _vm.title,
      "zebra-pattern": _vm.zebraPattern,
      "vertical-border": _vm.verticalBorder,
      "horizontal-border": _vm.horizontalBorder,
      "align": _vm.align,
      "show-col-name": _vm.showColName,
      "fixed-title-col": _vm.fixedTitleCol,
      "col-set": _vm.colSet,
      "row-set": _vm.rowSet,
      "cell-set": _vm.cellSet,
      "export-csv": _vm.exportCsv,
      "csv-name": _vm.csvName,
      "multi-sort": _vm.multiSort
    }
  }, [(_vm.conf.title || _vm.conf.exportCsv) ? [_c('header', [(_vm.conf.title) ? _c('h1', [_vm._v(_vm._s(_vm.conf.title))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "action"
  }, [(_vm.conf.exportCsv) ? _c('morning-btn', {
    attrs: {
      "color": "success",
      "size": "xs"
    },
    on: {
      "emit": _vm._exportCsv
    }
  }, [_vm._v("导出")]) : _vm._e()], 1)])] : _vm._e(), _vm._v(" "), _c('table', {
    staticClass: "wrap"
  }, [_c('tbody', [(_vm.conf.fixedTitleCol[0] === 'r') ? _c('tr', [_c('td', [_c('normal-table', {
    attrs: {
      "conf": _vm.conf,
      "data": _vm.data,
      "col-set-map": _vm.colSetMap,
      "sort-col": _vm._sortCol
    },
    on: {
      "row-mouseover": _vm._rowOver,
      "row-mouseout": _vm._rowOut
    }
  })], 1), _vm._v(" "), _c('td', [_c('title-table', {
    attrs: {
      "conf": _vm.conf,
      "data": _vm.data,
      "col-set-map": _vm.colSetMap,
      "sort-col": _vm._sortCol
    },
    on: {
      "row-mouseover": _vm._rowOver,
      "row-mouseout": _vm._rowOut
    }
  })], 1)]) : _c('tr', [_c('td', [_c('title-table', {
    attrs: {
      "conf": _vm.conf,
      "data": _vm.data,
      "col-set-map": _vm.colSetMap,
      "sort-col": _vm._sortCol
    },
    on: {
      "row-mouseover": _vm._rowOver,
      "row-mouseout": _vm._rowOut
    }
  })], 1), _vm._v(" "), _c('td', [_c('normal-table', {
    attrs: {
      "conf": _vm.conf,
      "data": _vm.data,
      "col-set-map": _vm.colSetMap,
      "sort-col": _vm._sortCol
    },
    on: {
      "row-mouseover": _vm._rowOver,
      "row-mouseout": _vm._rowOut
    }
  })], 1)]), _vm._v(" "), (_vm.data.normalRows.length === 0 && _vm.data.titleRows.length === 0) ? _c('tr', [_c('td', {
    staticClass: "no-data"
  }, [_vm._v("无数据")])]) : _vm._e()])])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d803dcbe", esExports)
  }
}

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_750870fd_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(210);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(208)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_750870fd_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/pagination/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-750870fd", Component.options)
  } else {
    hotAPI.reload("data-v-750870fd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 208 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var PAGE_SIZE_DEFAULT = 10;

exports.default = {
    origin: 'UI',
    name: 'pagination',
    props: {
        total: {
            type: Number,
            default: 1
        },
        list: {
            type: [Object, Array],
            default: undefined
        },
        pageSize: {
            type: Number,
            default: PAGE_SIZE_DEFAULT
        },
        page: {
            type: Number,
            default: 1
        },
        maxShow: {
            type: Number,
            default: 9
        },
        jumpPage: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                total: this.total,
                list: this.list,
                pageSize: this.pageSize,
                page: this.page,
                maxShow: this.maxShow,
                jumpPage: this.jumpPage
            };
        }
    },
    data: function data() {

        return {
            data: {
                currentPage: 0,
                currentItems: [],
                hideEnd: 0,
                hideStart: Infinity,
                total: 0
            }
        };
    },
    methods: {
        _setTotal: function _setTotal() {

            var total = this.data.total;

            if (this.conf.list) {

                if (this.conf.list instanceof Array) {

                    total = Math.ceil(this.conf.list.length / this.conf.pageSize);
                } else {

                    total = Math.ceil(Object.keys(this.conf.list).length / this.conf.pageSize);
                }
            } else {

                total = this.conf.total;
            }

            this.data.total = total;
        },
        _refreshCurrentItems: function _refreshCurrentItems() {

            if (this.conf.list) {

                this.data.currentItems = this.conf.list.slice((this.data.currentPage - 1) * this.conf.pageSize, this.data.currentPage * this.conf.pageSize);
            }
        },
        _jump: function _jump() {

            var inputVm = this.morning.findVM('ui-select-input-' + this.uiid);
            var jumpPage = +inputVm.get();

            inputVm.set();

            if (typeof jumpPage === 'number' && !isNaN(jumpPage)) {

                this.to(Math.floor(jumpPage));
            }
        },
        _setMaxshow: function _setMaxshow() {

            var end = this.data.currentPage - Math.floor(this.conf.maxShow / 2),
                start = this.data.currentPage + Math.floor(this.conf.maxShow / 2);

            this.data.hideEnd = end - (start > this.data.total ? start - this.data.total - 1 : 0);
            this.data.hideStart = start + (end < 1 ? -end + 1 : 0);
        },
        getPage: function getPage() {

            return this.data.currentPage;
        },
        to: function to(index) {

            index = +index;

            if (isNaN(index)) {

                return this;
            }

            // index = (+index === 1) ? 1 : +index || this.data.currentPage;

            if (index < 0) {

                index = this.data.total + index + 1;
            }

            if (index > this.data.total) {

                index = this.data.total;
            }

            if (index < 1) {

                index = 1;
            }

            this.data.currentPage = index;

            return this;
        },
        next: function next() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;


            this.to(this.data.currentPage + offset);

            return this;
        },
        prev: function prev() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;


            offset = this.data.currentPage - offset;

            if (offset < 1) {

                this.to(1);
            } else {

                this.to(offset);
            }

            return this;
        },
        setTotal: function setTotal(num) {

            if (this.conf.list) {

                return this;
            }

            num = +num || this.data.total;

            this.data.total = num;

            return this;
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$watch('conf.total', function () {

            _this._setTotal();
        });

        this.$watch('conf.list', function () {

            _this._setTotal();
            _this._refreshCurrentItems();
        }, {
            deep: true
        });

        this.$watch('conf.pageSize', function () {

            _this._setTotal();
            _this._refreshCurrentItems();
        });

        this.$watch('conf.maxShow', function () {

            _this._setMaxshow();
        });

        this.$watch('data.currentPage', function () {

            _this._refreshCurrentItems();
            _this._setMaxshow();
            _this.$emit('emit');
        });

        this.$watch('data.total', function () {

            if (_this.data.total < 1) {

                _this.data.total = 1;

                return;
            }

            if (_this.data.currentPage > _this.data.total) {

                _this.to(_this.data.total);
            }

            _this._setMaxshow();
        });

        this._setTotal();
        this._refreshCurrentItems();

        this.$watch('conf.page', function () {

            _this.to(_this.conf.page);
        }, {
            immediate: true
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-pagination', {
    class: [_vm.sizeClass, _vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid,
      "total": _vm.total,
      "list": _vm.list,
      "page-size": _vm.pageSize,
      "page": _vm.page,
      "max-show": _vm.maxShow,
      "jump-page": _vm.jumpPage
    }
  }, [_c('div', {
    staticClass: "page-content"
  }, [_vm._t("default", null, {
    page: _vm.data.currentPage,
    items: _vm.data.currentItems
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "pagination"
  }, [_vm._l((_vm.data.total), function(index) {
    return [((_vm.data.hideEnd - 1) === index && _vm.data.hideEnd !== 1) ? [_c('a', {
      staticClass: "prev",
      attrs: {
        "href": "javascript:;"
      },
      on: {
        "click": function($event) {
          _vm.to(_vm.data.currentPage - 1)
        }
      }
    }, [_c('i', {
      staticClass: "morningicon"
    }, [_vm._v("")])]), _vm._v(" "), _c('a', {
      staticClass: "ignore",
      attrs: {
        "href": "javascript:;"
      }
    }, [_vm._v("...")])] : _vm._e(), _vm._v(" "), (index >= _vm.data.hideEnd && index <= _vm.data.hideStart) ? [(_vm.data.currentPage === index) ? _c('a', {
      staticClass: "current",
      attrs: {
        "href": "javascript:;"
      }
    }, [_vm._v("\n                    " + _vm._s(index) + "\n                ")]) : _c('a', {
      attrs: {
        "href": "javascript:;"
      },
      on: {
        "click": function($event) {
          _vm.to(index)
        }
      }
    }, [_vm._v("\n                    " + _vm._s(index) + "\n                ")])] : _vm._e(), _vm._v(" "), ((_vm.data.hideStart + 1) === index && _vm.data.hideStart !== _vm.data.total) ? [_c('a', {
      staticClass: "ignore",
      attrs: {
        "href": "javascript:;"
      }
    }, [_vm._v("...")]), _vm._v(" "), _c('a', {
      staticClass: "next",
      attrs: {
        "href": "javascript:;"
      },
      on: {
        "click": function($event) {
          _vm.to(_vm.data.currentPage + 1)
        }
      }
    }, [_c('i', {
      staticClass: "morningicon"
    }, [_vm._v("")])])] : _vm._e()]
  }), _vm._v(" "), (_vm.conf.jumpPage && _vm.data.total > _vm.conf.maxShow) ? _c('div', {
    staticClass: "page-jump"
  }, [_c('morning-textinput', {
    ref: 'ui-select-input-' + _vm.uiid,
    staticClass: "page-num",
    attrs: {
      "form-name": "页码"
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "morningicon",
    on: {
      "click": function($event) {
        _vm._jump()
      }
    }
  }, [_vm._v("")])], 1) : _vm._e()], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-750870fd", esExports)
  }
}

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e0d192b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(214);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(212)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e0d192b_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/dialog/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e0d192b", Component.options)
  } else {
    hotAPI.reload("data-v-1e0d192b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 212 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PopupManager = __webpack_require__(7);

var _PopupManager2 = _interopRequireDefault(_PopupManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rmIndexTimeout = 120; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'dialog',
    mixins: [_PopupManager2.default],
    props: {
        width: {
            type: String,
            default: '50%'
        },
        height: {
            type: String,
            default: '50%'
        },
        autoClose: {
            type: Boolean,
            default: true
        },
        showType: {
            type: String,
            default: 'top',
            validator: function validator(value) {
                return ['top', 'center', 'no'].indexOf(value) !== -1;
            }
        },
        showMask: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                width: this.width,
                height: this.height,
                autoClose: this.autoClose,
                showType: this.showType,
                showMask: this.showMask
            };
        },
        moreClass: function moreClass() {

            return {
                'has-header': this.data.hasHeader,
                'has-footer': this.data.hasFooter,
                'show-top': this.conf.showType === 'top',
                'show-center': this.conf.showType === 'center',
                'show-no-animate': this.conf.showType === 'no',
                show: this.data.show
            };
        }
    },
    data: function data() {

        return {
            data: {
                show: false,
                hasHeader: false,
                hasFooter: false
            }
        };
    },
    methods: {
        _onClick: function _onClick(evt) {

            var $content = this.$el.querySelector('.content');

            if (this.conf.autoClose && evt.path.indexOf($content) === -1) {

                this.toggle();
            }
        },
        _isShown: function _isShown() {

            return this.$el.classList.value.split(' ').indexOf('show') !== -1;
        },
        toggle: function toggle(show) {
            var _this = this;

            var isShown = this._isShown();

            if (show === undefined) {

                show = !this.data.show;
            }

            show = !!show;

            if (show) {

                if (!isShown) {

                    this._popupShow();

                    setTimeout(function () {

                        _this.data.show = show;
                    });
                }

                this.$emit('show');
                this.$emit('emit');
            } else {

                if (isShown) {

                    this.data.show = show;

                    setTimeout(function () {

                        _this._popupHide();
                    }, rmIndexTimeout);
                }

                this.$emit('hide');
                this.$emit('emit');
            }

            return this;
        }

    },
    mounted: function mounted() {

        if (this.$slots.header) {

            this.data.hasHeader = true;
        }

        if (this.$slots.footer) {

            this.data.hasFooter = true;
        }
    }
};
module.exports = exports['default'];

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-dialog', {
    class: [_vm.colorClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "width": _vm.width,
      "height": _vm.height,
      "auto-close": _vm.autoClose,
      "show-type": _vm.showType,
      "show-mask": _vm.showMask
    },
    on: {
      "click": _vm._onClick
    }
  }, [(_vm.conf.showMask) ? _c('div', {
    staticClass: "mask"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "content",
    style: ({
      width: _vm.conf.width,
      height: _vm.conf.height
    })
  }, [_vm._t("header"), _vm._v(" "), _c('div', {
    staticClass: "body"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("footer")], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1e0d192b", esExports)
  }
}

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7aed09a1_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(244);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(216)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7aed09a1_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/calendar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7aed09a1", Component.options)
  } else {
    hotAPI.reload("data-v-7aed09a1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 216 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _arrayUniq = __webpack_require__(4);

var _arrayUniq2 = _interopRequireDefault(_arrayUniq);

var _lodash = __webpack_require__(13);

var _lodash2 = _interopRequireDefault(_lodash);

var _get_year = __webpack_require__(218);

var _get_year2 = _interopRequireDefault(_get_year);

var _get_month = __webpack_require__(219);

var _get_month2 = _interopRequireDefault(_get_month);

var _get_date = __webpack_require__(220);

var _get_date2 = _interopRequireDefault(_get_date);

var _get_day = __webpack_require__(221);

var _get_day2 = _interopRequireDefault(_get_day);

var _start_of_day = __webpack_require__(8);

var _start_of_day2 = _interopRequireDefault(_start_of_day);

var _end_of_day = __webpack_require__(222);

var _end_of_day2 = _interopRequireDefault(_end_of_day);

var _start_of_month = __webpack_require__(223);

var _start_of_month2 = _interopRequireDefault(_start_of_month);

var _last_day_of_month = __webpack_require__(224);

var _last_day_of_month2 = _interopRequireDefault(_last_day_of_month);

var _each_day = __webpack_require__(225);

var _each_day2 = _interopRequireDefault(_each_day);

var _is_same_day = __webpack_require__(226);

var _is_same_day2 = _interopRequireDefault(_is_same_day);

var _is_within_range = __webpack_require__(227);

var _is_within_range2 = _interopRequireDefault(_is_within_range);

var _add_days = __webpack_require__(228);

var _add_days2 = _interopRequireDefault(_add_days);

var _add_months = __webpack_require__(15);

var _add_months2 = _interopRequireDefault(_add_months);

var _add_years = __webpack_require__(229);

var _add_years2 = _interopRequireDefault(_add_years);

var _set_month = __webpack_require__(230);

var _set_month2 = _interopRequireDefault(_set_month);

var _set_year = __webpack_require__(231);

var _set_year2 = _interopRequireDefault(_set_year);

var _format = __webpack_require__(232);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yearRange = 12; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'calendar',
    props: {
        date: {
            type: Number,
            default: +new Date()
        },
        highlightNow: {
            type: Boolean,
            default: true
        },
        highlightDay: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        pickYearMonth: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                date: this.date,
                highlightNow: this.highlightNow,
                highlightDay: this.highlightDay,
                pickYearMonth: this.pickYearMonth
            };
        },
        current: function current() {

            return {
                time: +this.data.current,
                year: (0, _get_year2.default)(this.data.current),
                month: (0, _get_month2.default)(this.data.current),
                date: (0, _get_date2.default)(this.data.current)
            };
        },
        prependDay: function prependDay() {

            var monthStart = (0, _start_of_month2.default)(this.data.current);
            var weekday = (0, _get_day2.default)(monthStart);
            var prependDay = weekday;
            var prepend = [];

            while (prependDay--) {

                prepend.push({
                    notCurrentMonth: true,
                    date: (0, _add_days2.default)(monthStart, -(prependDay + 1))
                });
            }

            return prepend;
        },
        monthDay: function monthDay() {

            var monthStart = (0, _start_of_month2.default)(this.data.current);
            var monthEnd = (0, _last_day_of_month2.default)(this.data.current);
            var month = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _each_day2.default)(monthStart, monthEnd)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var date = _step.value;


                    month.push({
                        notCurrentMonth: false,
                        date: date
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return month;
        },
        appendDay: function appendDay() {

            var monthEnd = (0, _last_day_of_month2.default)(this.data.current);
            var weekday = (0, _get_day2.default)(monthEnd);
            var appendDay = 6 - weekday;
            var append = [];

            var totalDay = 42;

            if (this.monthDay.length + this.prependDay.length <= totalDay - 7) {

                appendDay += 7;
            }

            while (appendDay--) {

                append.unshift({
                    notCurrentMonth: true,
                    date: (0, _add_days2.default)(monthEnd, appendDay + 1)
                });
            }

            return append;
        },
        calendarDay: function calendarDay() {

            var days = [].concat(this.prependDay, this.monthDay, this.appendDay);

            for (var index in days) {

                if (index > 0) {

                    days[index].prev = days[index - 1];
                }

                if (index < days.length - 1) {

                    days[index].next = days[+index + 1];
                }
            }

            return days;
        },
        pickyears: function pickyears() {

            var year = (0, _get_year2.default)(this.data.current) + this.data.yearPickOffset;
            var start = year - yearRange;
            var end = year + yearRange;
            var years = [];
            var i = start;

            while (i++ <= end) {

                years.push(i - 1);
            }

            return {
                years: years,
                start: start,
                end: end
            };
        }
    },
    data: function data() {

        return {
            data: {
                current: new Date(),
                now: new Date(),
                monthPick: false,
                yearPick: false,
                yearPickOffset: 0,
                highlightDay: [],
                lastMonth: null,
                lastYear: null,
                lastHighlight: ''
            }
        };
    },
    methods: {
        _checkHighlightChange: function _checkHighlightChange() {

            var days = this.getHighlight(true);
            var list = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = days[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var day = _step2.value;


                    list.push(+day);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            list = list.join(',');

            if (this.data.lastHighlight !== list) {

                this.$emit('highlight');
                this.data.lastHighlight = list;
            }
        },
        _isHighlight: function _isHighlight(date) {

            var result = false;

            if (this.conf.highlightNow && (0, _is_same_day2.default)(date, this.data.now)) {

                result = true;
            }

            if (result === false) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {

                    for (var _iterator3 = this.data.highlightDay[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var item = _step3.value;


                        if (item instanceof Array && (0, _is_within_range2.default)(date, (0, _start_of_day2.default)(item[0]), (0, _end_of_day2.default)(item[1]))) {

                            result = true;
                        } else if ((0, _is_same_day2.default)(date, item)) {

                            result = true;
                        }

                        if (result) {

                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }

            return result;
        },
        _highlightClass: function _highlightClass(item) {

            if (item.notCurrentMonth) {

                return {};
            }

            var currentDate = item.date;
            var nextDate = void 0;
            var prevDate = void 0;
            var currentHighlight = false;
            var nextHighlight = false;
            var prevHighlight = false;
            var result = {};

            currentHighlight = this._isHighlight(currentDate);

            if (item.next) {

                nextDate = item.next.date;
                nextHighlight = this._isHighlight(nextDate);
            } else {

                nextHighlight = this._isHighlight((0, _add_days2.default)(currentDate, 1));
            }

            if (item.prev) {

                prevDate = item.prev.date;
                prevHighlight = this._isHighlight(prevDate);
            } else {

                prevHighlight = this._isHighlight((0, _add_days2.default)(currentDate, -1));
            }

            if (currentHighlight && prevHighlight && nextHighlight) {

                result.middle = true;
            } else if (currentHighlight && !prevHighlight && !nextHighlight) {

                result.highlight = true;
            } else if (currentHighlight && !prevHighlight && nextHighlight) {

                result.start = true;
            } else if (currentHighlight && prevHighlight && !nextHighlight) {

                result.end = true;
            }

            return result;
        },
        _prev: function _prev() {

            if (this.data.yearPick) {

                this.data.yearPickOffset -= yearRange * 2 + 1;
            } else {

                this.sub();
            }
        },
        _next: function _next() {

            if (this.data.yearPick) {

                this.data.yearPickOffset += yearRange * 2 + 1;
            } else {

                this.add();
            }
        },
        toggleYearPick: function toggleYearPick(show) {

            if (show === this.data.yearPick) {

                return;
            }

            this.toggleMonthPick(false);

            if (show === undefined) {

                show = !this.data.yearPick;
            }

            this.data.yearPick = !!show;
            this.data.yearPickOffset = 0;

            if (this.conf.pickYearMonth && !!show === false) {

                this.toggleMonthPick(true);
            }
        },
        toggleMonthPick: function toggleMonthPick(show) {

            if (show === this.data.monthPick) {

                return;
            }

            this.toggleYearPick(false);

            if (show === undefined) {

                show = !this.data.monthPick;
            }

            this.data.monthPick = !!show;
        },
        getDate: function getDate(format) {

            return (0, _format2.default)(this.data.current, format);
        },
        getTime: function getTime() {

            return +this.data.current;
        },
        setTime: function setTime(timestrap) {

            this.data.current = +timestrap;

            return this;
        },
        set: function set(value) {
            var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'month';


            if (['month', 'year'].indexOf(unit) === -1) {

                unit = 'month';
            }

            switch (unit) {

                case 'month':
                    this.data.current = (0, _set_month2.default)(this.data.current, value);

                    break;

                case 'year':
                    this.data.current = (0, _set_year2.default)(this.data.current, value);

                    break;

            }

            return this;
        },
        add: function add() {
            var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'month';


            if (['day', 'month', 'year'].indexOf(unit) === -1) {

                unit = 'month';
            }

            switch (unit) {

                case 'day':
                    this.data.current = (0, _add_days2.default)(this.data.current, amount);

                    break;

                case 'month':
                    this.data.current = (0, _add_months2.default)(this.data.current, amount);

                    break;

                case 'year':
                    this.data.current = (0, _add_years2.default)(this.data.current, amount);

                    break;

            }

            return this;
        },
        sub: function sub() {
            var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'month';


            this.add(-amount, unit);

            return this;
        },
        getHighlight: function getHighlight() {
            var includeNow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            var result = [];

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.data.highlightDay[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;


                    if (typeof item === 'number' || item instanceof Date) {

                        result.push(+item);
                    } else if (item instanceof Array) {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {

                            for (var _iterator5 = (0, _each_day2.default)(item[0], item[1])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var day = _step5.value;


                                result.push(+day);
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (includeNow) {

                result.push(+this.data.now);
            }

            result = (0, _arrayUniq2.default)(result);
            result = (0, _lodash2.default)(result, function (v) {
                return v;
            });

            for (var index in result) {

                result[index] = (0, _start_of_day2.default)(result[index]);
            }

            return result;
        },
        setHighlight: function setHighlight() {
            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


            this.data.highlightDay = list;

            return this;
        }
    },
    filters: {
        getDate: function getDate(val) {

            return (0, _get_date2.default)(val);
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$watch('conf.date', function () {

            _this.data.current = _this.conf.date;
        }, {
            immediate: true
        });

        this.$watch('conf.highlightDay', function () {

            _this.setHighlight(_this.conf.highlightDay);
        }, {
            immediate: true,
            deep: true
        });

        this.$watch('data.current', function () {

            var lastMonth = (0, _format2.default)(_this.data.current, 'YYYY-MM');
            var lastYear = (0, _format2.default)(_this.data.current, 'YYYY');

            _this.$emit('change');

            if (_this.data.lastMonth !== lastMonth) {

                _this.$emit('month-change');
                _this.data.lastMonth = lastMonth;
            }

            if (_this.data.lastYear !== lastYear) {

                _this.$emit('year-change');
                _this.data.lastYear = lastYear;
            }
        });

        this.$watch('data.highlightDay', function () {

            _this._checkHighlightChange();
        }, {
            deep: true
        });

        this.$watch('conf.highlightNow', function () {

            _this._checkHighlightChange();
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the year
 *
 * @example
 * // Which year is 2 July 2014?
 * var result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  return year
}

module.exports = getYear


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the month
 *
 * @example
 * // Which month is 29 February 2012?
 * var result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  return month
}

module.exports = getMonth


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * var result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate (dirtyDate) {
  var date = parse(dirtyDate)
  var dayOfMonth = date.getDate()
  return dayOfMonth
}

module.exports = getDate


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of week
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * var result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay (dirtyDate) {
  var date = parse(dirtyDate)
  var day = date.getDay()
  return day
}

module.exports = getDay


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfDay


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfMonth


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * var result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = lastDayOfMonth


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Return the array of dates within the specified range.
 *
 * @description
 * Return the array of dates within the specified range.
 *
 * @param {Date|String|Number} startDate - the first date
 * @param {Date|String|Number} endDate - the last date
 * @param {Number} [step=1] - the step between each day
 * @returns {Date[]} the array with starts of days from the day of startDate to the day of endDate
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * var result = eachDay(
 *   new Date(2014, 9, 6),
 *   new Date(2014, 9, 10)
 * )
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDay (dirtyStartDate, dirtyEndDate, dirtyStep) {
  var startDate = parse(dirtyStartDate)
  var endDate = parse(dirtyEndDate)
  var step = dirtyStep !== undefined ? dirtyStep : 1

  var endTime = endDate.getTime()

  if (startDate.getTime() > endTime) {
    throw new Error('The first date cannot be after the second date')
  }

  var dates = []

  var currentDate = startDate
  currentDate.setHours(0, 0, 0, 0)

  while (currentDate.getTime() <= endTime) {
    dates.push(parse(currentDate))
    currentDate.setDate(currentDate.getDate() + step)
  }

  return dates
}

module.exports = eachDay


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(8)

/**
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft)
  var dateRightStartOfDay = startOfDay(dirtyDateRight)

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

module.exports = isSameDay


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Range Helpers
 * @summary Is the given date within the range?
 *
 * @description
 * Is the given date within the range?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Date|String|Number} startDate - the start of range
 * @param {Date|String|Number} endDate - the end of range
 * @returns {Boolean} the date is within the range
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // For the date within the range:
 * isWithinRange(
 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the range:
 * isWithinRange(
 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> false
 */
function isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse(dirtyDate).getTime()
  var startTime = parse(dirtyStartDate).getTime()
  var endTime = parse(dirtyEndDate).getTime()

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

module.exports = isWithinRange


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  date.setDate(date.getDate() + amount)
  return date
}

module.exports = addDays


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(15)

/**
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMonths(dirtyDate, amount * 12)
}

module.exports = addYears


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)
var getDaysInMonth = __webpack_require__(16)

/**
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month setted
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth (dirtyDate, dirtyMonth) {
  var date = parse(dirtyDate)
  var month = Number(dirtyMonth)
  var year = date.getFullYear()
  var day = date.getDate()

  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(year, month, 15)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth))
  return date
}

module.exports = setMonth


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year setted
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear (dirtyDate, dirtyYear) {
  var date = parse(dirtyDate)
  var year = Number(dirtyYear)
  date.setFullYear(year)
  return date
}

module.exports = setYear


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var getDayOfYear = __webpack_require__(233)
var getISOWeek = __webpack_require__(236)
var getISOYear = __webpack_require__(17)
var parse = __webpack_require__(1)
var isValid = __webpack_require__(239)
var enLocale = __webpack_require__(240)

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  var options = dirtyOptions || {}

  var locale = options.locale
  var localeFormatters = enLocale.format.formatters
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp
    }
  }

  var date = parse(dirtyDate)

  if (!isValid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return getISOWeek(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(getISOWeek(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(getISOYear(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return getISOYear(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours()
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
}

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp)
  var length = array.length

  var i
  var formatter
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]]
    if (formatter) {
      array[i] = formatter
    } else {
      array[i] = removeFormattingTokens(array[i])
    }
  }

  return function (date) {
    var output = ''
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters)
      } else {
        output += array[i]
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || ''
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Math.floor(absOffset / 60)
  var minutes = absOffset % 60
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

module.exports = format


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)
var startOfYear = __webpack_require__(234)
var differenceInCalendarDays = __webpack_require__(235)

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = differenceInCalendarDays(date, startOfYear(date))
  var dayOfYear = diff + 1
  return dayOfYear
}

module.exports = getDayOfYear


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse(dirtyDate)
  var date = new Date(0)
  date.setFullYear(cleanDate.getFullYear(), 0, 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfYear


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(8)

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_DAY = 86400000

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft)
  var startOfDayRight = startOfDay(dirtyDateRight)

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

module.exports = differenceInCalendarDays


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)
var startOfISOWeek = __webpack_require__(9)
var startOfISOYear = __webpack_require__(238)

var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

module.exports = getISOWeek


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(1)

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfWeek


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(17)
var startOfISOWeek = __webpack_require__(9)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(year, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuary)
  return date
}

module.exports = startOfISOYear


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(14)

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate) {
  if (isDate(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

module.exports = isValid


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var buildDistanceInWordsLocale = __webpack_require__(241)
var buildFormatLocale = __webpack_require__(242)

/**
 * @category Locales
 * @summary English locale.
 */
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
}


/***/ }),
/* 241 */
/***/ (function(module, exports) {

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  }

  function localize (token, count, options) {
    options = options || {}

    var result
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token]
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count)
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

module.exports = buildDistanceInWordsLocale


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var buildFormattingTokensRegExp = __webpack_require__(243)

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var meridiemUppercase = ['AM', 'PM']
  var meridiemLowercase = ['am', 'pm']
  var meridiemFull = ['a.m.', 'p.m.']

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  }

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    }
  })

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

module.exports = buildFormatLocale


/***/ }),
/* 243 */
/***/ (function(module, exports) {

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
]

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = []
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key)
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse()
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  )

  return formattingTokensRegExp
}

module.exports = buildFormattingTokensRegExp


/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-calendar', {
    class: [],
    attrs: {
      "_uiid": _vm.uiid,
      "date": _vm.date,
      "highlight-now": _vm.highlightNow,
      "highlight-day": _vm.highlightDay,
      "pick-year-month": _vm.pickYearMonth
    }
  }, [_c('header', [_c('div', {
    staticClass: "topbar"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.data.monthPick),
      expression: "!data.monthPick"
    }],
    staticClass: "morningicon prev",
    on: {
      "click": function($event) {
        _vm._prev()
      }
    }
  }, [_vm._v("")]), _vm._v(" "), _c('div', {
    staticClass: "yearmonth"
  }, [_c('span', {
    staticClass: "year",
    on: {
      "click": function($event) {
        _vm.toggleYearPick()
      }
    }
  }, [_vm._v(_vm._s(_vm.current.year) + "年")]), _vm._v(" "), _c('span', {
    staticClass: "month",
    on: {
      "click": function($event) {
        _vm.toggleMonthPick()
      }
    }
  }, [_vm._v(_vm._s(_vm.current.month + 1) + "月")])]), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.data.monthPick),
      expression: "!data.monthPick"
    }],
    staticClass: "morningicon next",
    on: {
      "click": function($event) {
        _vm._next()
      }
    }
  }, [_vm._v("")])]), _vm._v(" "), _c('div', {
    staticClass: "titlebar"
  }, [_c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.data.monthPick && !_vm.data.yearPick),
      expression: "!data.monthPick && !data.yearPick"
    }],
    staticClass: "weekday"
  }, [_c('li', [_vm._v("日")]), _vm._v(" "), _c('li', [_vm._v("一")]), _vm._v(" "), _c('li', [_vm._v("二")]), _vm._v(" "), _c('li', [_vm._v("三")]), _vm._v(" "), _c('li', [_vm._v("四")]), _vm._v(" "), _c('li', [_vm._v("五")]), _vm._v(" "), _c('li', [_vm._v("六")])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.monthPick),
      expression: "data.monthPick"
    }],
    staticClass: "title"
  }, [_vm._v("\n            选择月份\n        ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.yearPick),
      expression: "data.yearPick"
    }],
    staticClass: "title"
  }, [_vm._v("\n            选择年份 "), _c('morning-small', [_vm._v("(" + _vm._s(_vm.pickyears.start) + " - " + _vm._s(_vm.pickyears.end) + ")")])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "calendar"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.yearPick),
      expression: "data.yearPick"
    }],
    staticClass: "pick-year"
  }, [_vm._l((_vm.pickyears.years), function(i) {
    return [_c('div', {
      staticClass: "year",
      on: {
        "click": function($event) {
          _vm.set(i, 'year');
          _vm.toggleYearPick(false);
        }
      }
    }, [_vm._v("\n                " + _vm._s(i) + "\n            ")])]
  })], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.monthPick),
      expression: "data.monthPick"
    }],
    staticClass: "pick-month"
  }, [_vm._l((12), function(i) {
    return [_c('div', {
      staticClass: "month",
      on: {
        "click": function($event) {
          _vm.set(i - 1, 'month');
          _vm.toggleMonthPick(false);
        }
      }
    }, [_vm._v("\n                " + _vm._s(i) + "月\n            ")])]
  })], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.data.monthPick && !_vm.data.yearPick),
      expression: "!data.monthPick && !data.yearPick"
    }],
    staticClass: "pick-day"
  }, [_vm._l((_vm.calendarDay), function(item) {
    return [_c('div', {
      staticClass: "day",
      class: [{
          'not-current-month': item.notCurrentMonth
        },
        _vm._highlightClass(item)
      ]
    }, [_c('div', {
      staticClass: "select-layer"
    }, [_c('div', {
      staticClass: "inner-layer"
    }, [_vm._v("\n                        " + _vm._s(_vm._f("getDate")(item.date)) + "\n                    ")])])])]
  })], 2)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7aed09a1", esExports)
  }
}

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_93e6f56e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(248);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(246)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_93e6f56e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/load/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93e6f56e", Component.options)
  } else {
    hotAPI.reload("data-v-93e6f56e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 246 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var defaultTime = 200;

exports.default = {
    origin: 'UI',
    name: 'load',
    props: {
        time: {
            type: [Boolean, Number],
            default: defaultTime
        },
        note: {
            type: String,
            default: ''
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                time: this.time,
                note: this.note
            };
        }
    },
    data: function data() {

        return {
            data: {
                loading: false,
                loaded: false,
                fail: false,
                loadPromise: null,
                loadResolve: null,
                loadReject: null
            }
        };
    },
    methods: {
        resolve: function resolve() {

            this.loadResolve();

            return this;
        },
        reject: function reject() {

            this.loadReject();

            return this;
        },
        reload: function reload() {
            var _this = this;

            if (this.data.loading) {

                return this;
            }

            this.data.loading = true;
            this.data.loaded = false;
            this.data.fail = false;

            this.loadPromise = new Promise(function (resolve, reject) {

                _this.loadResolve = resolve;
                _this.loadReject = reject;
            });

            this.loadPromise.then(function () {

                _this.data.loading = false;
                _this.data.loaded = true;
            }, function () {

                _this.data.loading = false;
                _this.data.fail = true;
                _this.data.loaded = true;
            });

            if (this.conf.time) {

                setTimeout(function () {

                    _this.data.loading = false;
                    _this.data.loaded = true;
                }, this.conf.time);
            }

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this2 = this;

        this.$watch('data.loaded', function () {

            _this2.$emit('emit');

            if (_this2.data.fail) {

                _this2.$emit('fail');
            } else {

                _this2.$emit('done');
            }
        });

        this.reload();
    }
};
module.exports = exports['default'];

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-load', {
    class: [_vm.sizeClass],
    attrs: {
      "_uiid": _vm.uiid,
      "time": _vm.time,
      "note": _vm.note
    }
  }, [(_vm.data.loaded) ? [(_vm.data.fail) ? [_c('morning-center', {
    staticClass: "fill loadfail"
  }, [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v(" ")]), _vm._v(" 加载失败")])] : [_vm._t("default")]] : [_c('morning-center', {
    staticClass: "fill"
  }, [_c('p', {
    staticClass: "loading"
  }, [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _c('br'), _vm._v(_vm._s(_vm.conf.note))])])]], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-93e6f56e", esExports)
  }
}

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f8ac223_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(252);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(250)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f8ac223_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/breadcrumbs/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f8ac223", Component.options)
  } else {
    hotAPI.reload("data-v-6f8ac223", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 250 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maxHistoryNum = 20; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'breadcrumbs',
    props: {
        rootName: {
            type: [String, Boolean],
            default: false
        },
        chooseRoot: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        maxHistory: {
            type: Number,
            default: maxHistoryNum
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                rootName: this.rootName,
                chooseRoot: this.chooseRoot,
                list: this.list,
                maxHistory: this.maxHistory
            };
        }
    },
    data: function data() {

        return {
            data: {
                historys: [],
                lvlist: [],
                currentLevel: {}
            }
        };
    },
    methods: {
        _recordHistory: function _recordHistory() {

            if (JSON.stringify(this.data.historys[this.data.historys.length - 1]) !== JSON.stringify(this.data.lvlist)) {

                if (this.conf.maxHistory <= this.data.historys.length) {

                    this.data.historys.shift();
                }

                this.data.historys.push((0, _extend2.default)(true, [], this.data.lvlist));
            }
        },
        _chooseRoot: function _chooseRoot() {

            if (this.conf.chooseRoot) {

                this.setLevel([]);
            }
        },
        toLevel: function toLevel(index) {

            if (typeof index === 'number' && index < this.data.lvlist.length - 1 && index > -1) {

                this.data.lvlist.splice(index + 1);
                this._recordHistory();
            } else if (typeof index === 'string' && this.data.currentLevel.keyList.indexOf(index) !== -1) {

                index = this.data.currentLevel.keyList.indexOf(index);
                this.data.lvlist.splice(index + 1);
                this._recordHistory();
            }

            return this;
        },
        backLast: function backLast() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;


            var list = this.data.historys.splice(this.data.historys.length - num - 1)[0];

            this.setLevel(list);

            return this;
        },
        addLevel: function addLevel(level) {

            this.data.lvlist.push(level);
            this._recordHistory();

            return this;
        },
        setLevel: function setLevel(levelList) {

            if (levelList && levelList.length > 0) {

                this.data.lvlist.splice(0);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = levelList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var v = _step.value;


                        this.data.lvlist.push(v);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                this._recordHistory();
            } else if (levelList && levelList.length === 0) {

                this.data.lvlist.splice(0, this.data.lvlist.length);

                this._recordHistory();
            }

            return this;
        },
        getLevel: function getLevel() {

            return this.data.currentLevel;
        },
        getHistory: function getHistory() {

            return (0, _extend2.default)(true, [], this.data.historys);
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this = this;

        this.$watch('data.lvlist', function () {

            var last = {},
                keyList = [],
                nameList = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _this.data.lvlist[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;


                    var key = Object.keys(item)[0];

                    keyList.push(key);
                    nameList.push(item[key]);
                    last = {
                        key: key,
                        name: item[key]
                    };
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            _this.data.currentLevel = {
                keyList: keyList,
                nameList: nameList,
                currentKey: last.key,
                currentName: last.name,
                length: keyList.length
            };

            _this.$emit('emit');
        });

        this.$watch('conf.list', function () {

            _this.setLevel(_this.conf.list);
        }, {
            immediate: true,
            deep: true
        });

        this.$watch('conf.maxHistory', function () {

            var diff = _this.data.historys.length - _this.conf.maxHistory;

            if (diff > 0) {

                while (diff-- > 0) {

                    _this.data.historys.shift();
                }
            }
        });

        this._recordHistory();
    }
};
module.exports = exports['default'];

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-breadcrumbs', {
    class: [_vm.sizeClass],
    attrs: {
      "_uiid": _vm.uiid,
      "root-name": _vm.rootName,
      "choose-root": _vm.chooseRoot,
      "list": _vm.list,
      "max-history": _vm.maxHistory
    }
  }, [_c('ul', [(_vm.conf.rootName) ? [_c('li', {
    staticClass: "root",
    class: {
      choose: _vm.conf.chooseRoot
    },
    on: {
      "click": function($event) {
        _vm._chooseRoot([])
      }
    }
  }, [_vm._v(_vm._s(_vm.conf.rootName))]), _vm._v(" "), _c('li', {
    staticClass: "separator"
  }, [_vm._v(" / ")])] : _vm._e(), _vm._v(" "), _vm._l((_vm.data.lvlist), function(item, index) {
    return [_vm._l((item), function(name, key) {
      return [(index < (_vm.data.lvlist.length - 1)) ? _c('li', {
        key: index + key,
        attrs: {
          "value": key
        },
        on: {
          "click": function($event) {
            _vm.toLevel(index)
          }
        }
      }, [_vm._v(_vm._s(name))]) : _c('li', {
        staticClass: "last",
        attrs: {
          "value": key
        }
      }, [_vm._v(_vm._s(name))])]
    }), _vm._v(" "), (index < (_vm.data.lvlist.length - 1)) ? _c('li', {
      staticClass: "separator"
    }, [_vm._v(" / ")]) : _vm._e()]
  })], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f8ac223", esExports)
  }
}

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b732fa4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(257);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(254)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b732fa4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/tip/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b732fa4", Component.options)
  } else {
    hotAPI.reload("data-v-0b732fa4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 254 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tether = __webpack_require__(256);

var _tether2 = _interopRequireDefault(_tether);

var _PopupManager = __webpack_require__(7);

var _PopupManager2 = _interopRequireDefault(_PopupManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'tip',
    mixins: [_PopupManager2.default],
    props: {
        target: {
            type: String,
            default: null
        },
        placement: {
            type: String,
            default: 'top',
            validator: function validator(value) {
                return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
            }
        },
        offset: {
            type: String,
            default: '0 0'
        },
        trigger: {
            type: String,
            default: 'hover',
            validator: function validator(value) {
                return ['hover', 'click', 'focus'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                target: this.target,
                placement: this.placement,
                offset: this.offset,
                trigger: this.trigger
            };
        }
    },
    data: function data() {

        return {
            data: {
                show: false,
                title: null,
                $target: null,
                activeTrigger: {},
                hoverState: '',
                hoverStates: {
                    in: 'in',
                    out: 'out'
                },
                classNames: {
                    fade: 'fade',
                    in: 'in'
                },
                timeout: null,
                // isEnabled : true,
                classPrefix: 'morning-tether',
                attachmentMap: {
                    top: 'bottom center',
                    right: 'middle left',
                    bottom: 'top center',
                    left: 'middle right'
                },
                tether: null
            }
        };
    },
    methods: {
        _bindTarget: function _bindTarget() {

            var $target = void 0;

            if (this.data.$target) {

                this._unsetListeners(this.data.$target);
            }

            try {

                $target = document.querySelector(this.conf.target);
            } catch (e) {}

            if (!$target) {

                return;
            }

            if ($target.attributes.title) {

                this.data.title = $target.getAttribute('title');
            }

            this.data.$target = $target;

            this._setListeners(this.data.$target);
        },
        _setListeners: function _setListeners($target) {

            if (!$target) {

                return;
            }

            var triggers = this.conf.trigger.split(' ');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = triggers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var trigger = _step.value;


                    if (trigger === 'click') {

                        $target.addEventListener('click', this.toggle);
                    } else if (trigger === 'hover') {

                        $target.addEventListener('mouseenter', this._enter);
                        $target.addEventListener('mouseleave', this._leave);
                    } else if (trigger === 'foucs') {

                        $target.addEventListener('focusin', this._enter);
                        $target.addEventListener('focusout', this._leave);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        },
        _unsetListeners: function _unsetListeners($target) {

            if (!$target) {

                return;
            }

            $target.removeEventListener('click', this.toggle);
            $target.removeEventListener('mouseenter', this._enter);
            $target.removeEventListener('mouseleave', this._leave);
            $target.removeEventListener('focusin', this._enter);
            $target.removeEventListener('focusout', this._leave);
        },
        _enter: function _enter(evt) {
            var _this = this;

            if (this._isEventObj(evt)) {

                if (evt.type === 'focusin') {

                    this.data.activeTrigger.focus = true;
                } else if (evt.type === 'mouseenter') {

                    this.data.activeTrigger.hover = true;
                }
            }

            if (this.$el.classList.value.split(' ').indexOf(this.data.classNames.in) !== -1 || this.data.hoverState === this.data.hoverStates.in) {

                this.data.hoverState = this.data.hoverStates.in;

                return;
            }

            clearTimeout(this.data.timeout);

            this.data.hoverState = this.data.hoverStates.in;

            this.data.timeout = setTimeout(function () {

                if (_this.data.hoverState === _this.data.hoverStates.in) {

                    _this.show();
                }
            });
        },
        _leave: function _leave(evt) {
            var _this2 = this;

            if (this._isEventObj(evt)) {

                if (evt.type === 'focusout') {

                    this.data.activeTrigger.focus = false;
                } else if (evt.type === 'mouseleave') {

                    this.data.activeTrigger.hover = false;
                }
            }

            if (this._isWithActiveTrigger()) {

                return;
            }

            clearTimeout(this.data.timeout);

            this.data.hoverState = this.data.hoverStates.out;

            this.data.timeout = setTimeout(function () {

                if (_this2.data.hoverState === _this2.data.hoverStates.out) {

                    _this2.hide();
                }
            });
        },
        _isEventObj: function _isEventObj(evt) {

            return evt && /Event\]$/.test(evt.toString());
        },
        _hasContent: function _hasContent() {

            if (this.data.title) {

                return true;
            }

            if (!this.$slots || !this.$slots.default || !this.$slots.default[0]) {

                return false;
            }

            return !!this.$slots.default[0].text || this.$slots.default[0].children && !!this.$slots.default[0].children.length;
        },
        _showComplete: function _showComplete() {

            var prevHoverState = this.data.hoverState;

            this.data.hoverState = null;
            this.data.show = true;

            this.$emit('show');
            this.$emit('emit');

            if (prevHoverState === this.data.hoverStates.out) {

                this._leave();
            }
        },

        _hideComplete: function _hideComplete() {

            this.data.show = false;

            this.$emit('hide');
            this.$emit('emit');

            this.data.hoverState = '';
        },
        _cleanupTether: function _cleanupTether() {

            if (this.data.tether) {

                this.data.tether.destroy();
                this.data.tether = null;

                this.$el.removeAttribute('style');

                this._removeTetherClasses(this.$el);
                this._removeTetherClasses(this.data.$target);
            }
        },
        _removeTetherClasses: function _removeTetherClasses(ele) {

            var classes = ele.classList.value.split(' ');

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = classes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var cls = _step2.value;


                    var reg = new RegExp('^(' + this.data.classPrefix + '|tether)\\-', 'g');

                    if (reg.test(cls)) {

                        ele.classList.remove(cls);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        },
        _isWithActiveTrigger: function _isWithActiveTrigger() {

            return Object.values(this.data.activeTrigger).indexOf(true) !== -1;
        },
        _setTether: function _setTether() {

            if (!this.data.tether) {

                return;
            }

            var targetOffset = '0 0',
                options = {};

            if (this.conf.placement === 'left') {

                targetOffset = '0 -10px';
            }

            options = {
                attachment: this.data.attachmentMap[this.conf.placement],
                element: this.$el,
                target: this.data.$target,
                targetOffset: targetOffset,
                // classes : this.tetherClass,
                classPrefix: this.data.classPrefix,
                offset: this.conf.offset
            };

            this.data.tether.setOptions(options);
            this.data.tether.position();
        },
        show: function show() {

            if (!this._hasContent()) {

                return this;
            }

            this._popupShow();

            this.data.tether = new _tether2.default({
                attachment: this.data.attachmentMap[this.conf.placement],
                element: this.$el,
                target: this.data.$target
            });
            this._setTether();
            // this.data.tether.setOptions(_.extend({}, options, {targetOffset: '0 0'}));

            this.$el.classList.add(this.data.classNames.in);
            this._showComplete();

            return this;
        },
        hide: function hide() {

            if (!this._hasContent()) {

                return this;
            }

            this.$el.classList.remove(this.data.classNames.in);
            this._popupHide();
            this._cleanupTether();
            this._hideComplete();

            return this;
        },
        toggle: function toggle() {

            this.data.activeTrigger.click = !this.data.activeTrigger.click;

            if (this._isWithActiveTrigger()) {

                this._enter();
            } else {

                this._leave();
            }

            return this;
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        this.$watch('conf.target', function () {

            _this3._bindTarget();

            if (_this3.data.show) {

                _this3.hide();
                _this3.show();
            }
        });

        this.$watch('conf.placement', function () {

            _this3._setTether();
        });

        this.$watch('conf.offset', function () {

            _this3._setTether();
        });

        this.$watch('conf.trigger', function () {

            _this3.data.activeTrigger = {};
            _this3._unsetListeners(_this3.data.$target);
            _this3._setListeners(_this3.data.$target);
        });

        this.Vue.nextTick(function () {

            _this3._bindTarget();
        });
    },
    beforeDestroy: function beforeDestroy() {

        clearTimeout(this.data.timeout);

        this._cleanupTether();
        this._unsetListeners(this.data.$target);
    }
};
module.exports = exports['default'];

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node || !document.body.contains(node)) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

var _scrollBarSize = null;
function getScrollBarSize() {
  if (_scrollBarSize) {
    return _scrollBarSize;
  }
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  _scrollBarSize = { width: width, height: width };
  return _scrollBarSize;
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        if (this.options.bodyElement) {
          this.options.bodyElement.appendChild(this.element);
        } else {
          var offsetParentIsBody = true;
          var currentNode = this.element.parentNode;
          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
            if (getComputedStyle(currentNode).position !== 'static') {
              offsetParentIsBody = false;
              break;
            }

            currentNode = currentNode.parentNode;
          }

          if (!offsetParentIsBody) {
            this.element.parentNode.removeChild(this.element);
            this.element.ownerDocument.body.appendChild(this.element);
          }
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));


/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-tip', {
    class: [_vm.colorClass],
    attrs: {
      "_uiid": _vm.uiid,
      "target": _vm.target,
      "placement": _vm.placement,
      "offset": _vm.offset,
      "trigger": _vm.trigger
    }
  }, [_c('div', {
    staticClass: "tip-arrow"
  }), _vm._v(" "), _c('div', {
    staticClass: "tip-content"
  }, [(!_vm.$slots.default) ? [_vm._v("\n        " + _vm._s(_vm.data.title) + "\n    ")] : [_vm._t("default")]], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b732fa4", esExports)
  }
}

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4e4a749a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(261);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(259)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4e4a749a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/message/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e4a749a", Component.options)
  } else {
    hotAPI.reload("data-v-4e4a749a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 259 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PopupManager = __webpack_require__(7);

var _PopupManager2 = _interopRequireDefault(_PopupManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultCloseTime = 4000; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'UI',
    name: 'message',
    mixins: [_PopupManager2.default],
    props: {
        closeBtn: {
            type: Boolean,
            default: false
        },
        closeTime: {
            type: [Number, Boolean],
            default: defaultCloseTime
        },
        showType: {
            type: String,
            default: 'top',
            validator: function validator(value) {
                return ['top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'].indexOf(value) !== -1;
            }
        },
        maxShow: {
            type: [Number, Boolean],
            default: 2
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                closeBtn: this.closeBtn,
                closeTime: this.closeTime,
                showType: this.showType,
                maxShow: this.maxShow
            };
        },
        moreClass: function moreClass() {

            var classes = {};

            classes['pos-' + this.conf.showType] = true;

            return classes;
        }
    },
    data: function data() {

        return {
            data: {
                messageId: 0,
                list: []
            }
        };
    },
    methods: {
        _resizeList: function _resizeList() {

            if (this.conf.maxShow && this.data.list.length > +this.conf.maxShow) {

                var height = 0;
                var $messages = this.$el.querySelectorAll('.list .message');

                var messageMarginBottom = 3.2;
                var messageListOffset = 8;

                $messages = Object.values($messages).slice(0, +this.conf.maxShow);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = $messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var $message = _step.value;


                        height += $message.clientHeight + messageMarginBottom;
                    }

                    // 没有使用data绑定style因为会影响transition
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                this.$el.querySelector('.list').style.height = height + messageListOffset + 'px';
            }
        },
        push: function push(options) {
            var _this = this;

            var defaultOptions = {
                id: this.data.messageId++,
                title: undefined,
                message: '',
                color: 'theme'
            };
            var list = Object.assign([], this.data.list);

            if (typeof options === 'string') {

                options = Object.assign(defaultOptions, {
                    message: options
                });
            } else {

                options = Object.assign(defaultOptions, options);
            }

            if (this.conf.showType[0] === 'b') {

                list.push(options);
            } else {

                list.unshift(options);
            }

            this.data.list = list;

            if (this.conf.closeTime !== false) {

                setTimeout(function () {

                    _this.close(options.id);
                }, this.conf.closeTime);
            }

            this.$emit('push');

            return options.id;
        },
        close: function close(id) {

            for (var index in this.data.list) {

                if (id === this.data.list[index].id) {

                    this.data.list.splice(index, 1);

                    this.$emit('close');
                }
            }

            return this;
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        this._popupShow();

        this.$watch('data.list', function () {

            _this2._resizeList();
        }, {
            immediate: true,
            deep: true
        });

        this.$watch('conf.maxShow', function () {

            _this2._resizeList();
        });

        this.$watch('conf.showType', function (newValue, oldValue) {

            if (newValue[0] !== oldValue[0]) {

                _this2.data.list.reverse();
            }

            _this2._resizeList();
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-message', {
    class: [_vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "close-btn": _vm.closeBtn,
      "close-time": _vm.closeTime,
      "show-type": _vm.showType,
      "max-show": _vm.maxShow
    }
  }, [_c('div', {
    staticClass: "list"
  }, [_c('transition-group', {
    attrs: {
      "name": "message",
      "tag": "div"
    }
  }, _vm._l((_vm.data.list), function(msg) {
    return _c('div', {
      key: msg.id,
      staticClass: "message",
      class: 'message-co-' + msg.color
    }, [_c('h1', {
      staticClass: "title"
    }, [_vm._v(_vm._s(msg.title))]), _vm._v(" "), _c('div', {
      staticClass: "body",
      domProps: {
        "innerHTML": _vm._s(msg.message)
      }
    }), _vm._v(" "), (_vm.conf.closeBtn) ? _c('i', {
      staticClass: "morningicon close-btn",
      on: {
        "click": function($event) {
          _vm.close(msg.id)
        }
      }
    }, [_vm._v("")]) : _vm._e()])
  }))], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e4a749a", esExports)
  }
}

/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6007a1d0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(265);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(263)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6007a1d0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/textinput/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6007a1d0", Component.options)
  } else {
    hotAPI.reload("data-v-6007a1d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 263 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'Form',
    name: 'textinput',
    props: {
        hideValue: {
            type: Boolean,
            default: false
        },
        prepend: {
            type: String,
            default: undefined
        },
        append: {
            type: String,
            default: undefined
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                hideValue: this.hideValue,
                prepend: this.prepend,
                append: this.append
            };
        },
        inputType: function inputType() {

            if (this.conf.hideValue) {

                return 'password';
            }

            return 'text';
        },
        placeholder: function placeholder() {

            if (!this.conf.hideName) {

                return this.conf.formName;
            }

            return false;
        },
        moreClass: function moreClass() {

            return {
                'input-group': !!(this.conf.prepend || this.conf.append)
            };
        },
        inputClass: function inputClass() {

            return {
                'has-append': !!this.conf.append
            };
        }
    },
    data: function data() {

        return {
            data: {}
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if (value === undefined) {

                return '';
            }

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

                return JSON.stringify(value);
            }

            return String(value);
        },
        _focus: function _focus() {

            this.$emit('focus');
        },
        _blur: function _blur() {

            this.$emit('blur');
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this = this;

        this.$on('input', function (value) {

            _this.data.value = value;
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-textinput', {
    class: [_vm.stateClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "hide-value": _vm.hideValue,
      "prepend": _vm.prepend,
      "append": _vm.append
    }
  }, [(_vm.conf.prepend) ? [_c('div', {
    staticClass: "input-group-addon"
  }, [_vm._v(_vm._s(_vm.conf.prepend))])] : _vm._e(), _vm._v(" "), (_vm.inputType === 'text') ? [_c('input', {
    key: "is-text",
    class: _vm.inputClass,
    attrs: {
      "type": "text",
      "placeholder": _vm.placeholder,
      "disabled": _vm.conf.state === 'disabled'
    },
    domProps: {
      "value": _vm.data.value
    },
    on: {
      "focus": function($event) {
        _vm._focus()
      },
      "blur": function($event) {
        _vm._blur()
      },
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  })] : [_c('input', {
    key: "is-password",
    attrs: {
      "type": "password",
      "placeholder": _vm.placeholder,
      "disabled": _vm.conf.state === 'disabled'
    },
    domProps: {
      "value": _vm.data.value
    },
    on: {
      "focus": function($event) {
        _vm._focus()
      },
      "blur": function($event) {
        _vm._blur()
      },
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  })], _vm._v(" "), (_vm.conf.append) ? [_c('div', {
    staticClass: "input-group-addon"
  }, [_vm._v(_vm._s(_vm.conf.append))])] : _vm._e()], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6007a1d0", esExports)
  }
}

/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7073fa9d_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(269);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(267)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7073fa9d_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/textarea/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7073fa9d", Component.options)
  } else {
    hotAPI.reload("data-v-7073fa9d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 267 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'Form',
    name: 'textarea',
    props: {
        rows: {
            type: Number,
            default: 4
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                rows: this.rows
            };
        },
        placeholder: function placeholder() {

            if (!this.conf.hideName) {

                return this.conf.formName;
            }

            return false;
        }
    },
    data: function data() {

        return {
            data: {}
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if (value === undefined) {

                return '';
            }

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

                return JSON.stringify(value);
            }

            return String(value);
        },
        _focus: function _focus() {

            this.$emit('focus');
        },
        _blur: function _blur() {

            this.$emit('blur');
        },
        setRows: function setRows(num) {

            var row = this.conf.rows;

            if (typeof num === 'number') {

                row = num;
            } else if (typeof num === 'string') {

                if (/^\+/.test(num)) {

                    row += +num.replace(/^\+/, '');
                } else if (/^-/.test(num)) {

                    row -= +num.replace(/^-/, '');
                }
            }

            if (row) {

                if (row < 1) {

                    row = 1;
                }

                this.conf.rows = row;
            }

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this = this;

        this.$on('input', function (value) {

            _this.data.value = value;
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-textarea', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "rows": _vm.rows
    }
  }, [_c('textarea', {
    attrs: {
      "placeholder": _vm.placeholder,
      "disabled": _vm.conf.state === 'disabled',
      "rows": _vm.conf.rows
    },
    domProps: {
      "value": _vm.data.value
    },
    on: {
      "focus": function($event) {
        _vm._focus()
      },
      "blur": function($event) {
        _vm._blur()
      },
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  })])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7073fa9d", esExports)
  }
}

/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_099f47d2_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(273);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(271)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_099f47d2_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/switch/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-099f47d2", Component.options)
  } else {
    hotAPI.reload("data-v-099f47d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 271 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'Form',
    name: 'switch',
    props: {
        autoHideName: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                autoHideName: this.autoHideName
            };
        },
        moreClass: function moreClass() {

            return {
                'hide-name': !!this.conf.hideName || !!this.data.nameIsEmpty,
                open: !!this.data.value
            };
        }
    },
    data: function data() {

        return {
            data: {
                nameIsEmpty: false
            }
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            return !!value;
        },
        _setNameIsEmpty: function _setNameIsEmpty() {

            if (!this.conf.autoHideName) {

                this.data.nameIsEmpty = false;

                return;
            }

            if (this.conf.formName === '' || this.conf.formName === undefined) {

                this.data.nameIsEmpty = true;
            } else {

                this.data.nameIsEmpty = false;
            }
        },
        toggle: function toggle(open) {

            if (open === undefined) {

                open = !this.data.value;
            }

            this.set(!!open);

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this = this;

        this.$watch('conf.formName', function () {

            _this._setNameIsEmpty();
        }, {
            immediate: true
        });

        this.$watch('conf.autoHideName', function () {

            _this._setNameIsEmpty();
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-switch', {
    class: [_vm.colorClass, _vm.stateClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "auto-hide-name": _vm.autoHideName
    }
  }, [_c('div', {
    staticClass: "note"
  }, [_vm._v(_vm._s(_vm.conf.formName))]), _vm._v(" "), _c('div', {
    staticClass: "track",
    on: {
      "click": function($event) {
        _vm.toggle()
      }
    }
  }, [_c('div', {
    staticClass: "point"
  })])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-099f47d2", esExports)
  }
}

/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_50673fdf_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(278);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(275)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_50673fdf_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/select/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50673fdf", Component.options)
  } else {
    hotAPI.reload("data-v-50673fdf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 275 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _trim = __webpack_require__(277);

var _trim2 = _interopRequireDefault(_trim);

var _GlobalEvent = __webpack_require__(5);

var _GlobalEvent2 = _interopRequireDefault(_GlobalEvent);

var _IndexManager = __webpack_require__(6);

var _IndexManager2 = _interopRequireDefault(_IndexManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    origin: 'Form',
    name: 'select',
    mixins: [_GlobalEvent2.default, _IndexManager2.default],
    props: {
        maxShow: {
            type: Number,
            default: 5
        },
        autoClose: {
            type: Boolean,
            default: true
        },
        canSearch: {
            type: Boolean,
            default: false
        },
        multiSelect: {
            type: Boolean,
            default: false
        },
        canMove: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: Infinity
        },
        cleanBtn: {
            type: Boolean,
            default: false
        },
        inlineImgSize: {
            type: String,
            default: '2em'
        },
        itemTip: {
            type: Boolean,
            default: false
        },
        itemTipDirect: {
            type: String,
            default: 'top'
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                maxShow: this.maxShow,
                autoClose: this.autoClose,
                canSearch: this.canSearch,
                multiSelect: this.multiSelect,
                canMove: this.canMove,
                max: this.max,
                cleanBtn: this.cleanBtn,
                inlineImgSize: this.inlineImgSize,
                itemTip: this.itemTip,
                itemTipDirect: this.itemTipDirect
            };
        },
        moreClass: function moreClass() {

            var selectItem = false;

            if (this.data.value && this.data.value.length > 0) {

                selectItem = true;
            }

            return {
                showlist: !!this.data.showlist,
                searching: !!this.data.searching,
                'focus-search': !!this.data.focusSearch,
                'is-max': !!this.isMax,
                'has-clean-btn': !!this.conf.cleanBtn,
                'select-item': selectItem
            };
        },
        isMax: function isMax() {

            if (this.conf.multiSelect && this.data.value.length === this.conf.max) {

                return true;
            }

            return false;
        }
    },
    data: function data() {

        return {
            data: {
                showlist: false,
                selectedContent: null,
                searching: false,
                focusSearch: false,
                mounted: false,
                isMax: false,
                multiinputLastValue: [],
                selectInput: false,
                itemValueList: [],
                filterNotExist: false,
                lastItemHeight: 0,
                tipsContent: [],
                tips: []
            },
            listStyle: {}
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !(value instanceof Array)) {

                return [];
            }

            this._maxFilter(value);

            if (!this.conf.multiSelect && this.data.value.length > 1) {

                return value.slice(0, 1);
            }

            // filter not exist value.
            if (this.data.filterNotExist) {

                for (var index in value) {

                    var val = value[index];

                    if (this.data.itemValueList.indexOf(String(val)) === -1) {

                        value.splice(index, 1);
                    }
                }
            }

            return value;
        },
        _maxFilter: function _maxFilter(value) {

            if (this.conf.multiSelect && this.conf.max && value.length > this.conf.max) {

                return value.slice(0, this.conf.max);
            }

            return value;
        },
        _onValueChange: function _onValueChange() {

            var newVal = this.get();
            var $items = this.$el.querySelectorAll('.list>li:not(.noitem)');
            var $currentItems = this.$el.querySelectorAll('.list>li.current');
            var $noitem = this.$el.querySelector('.noitem');
            // let $selected = this.$el.querySelector('.selected');
            var searchTextinput = void 0;
            var searchMultiinput = void 0;
            var multiValue = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = $currentItems.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var $item = _step.value;


                    $item.classList.remove('current');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (this.conf.canSearch && !this.conf.multiSelect) {

                searchTextinput = this.$el.querySelector('#ui-select-ti-' + this.uiid);

                if (searchTextinput) {

                    searchTextinput = searchTextinput._vm;
                }
            } else if (this.conf.multiSelect) {

                searchMultiinput = this.$el.querySelector('#ui-select-mi-' + this.uiid);

                if (searchMultiinput) {

                    searchMultiinput = searchMultiinput._vm;
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = newVal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var val = _step2.value;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {

                        for (var _iterator3 = $items.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _$item = _step3.value;


                            if (_$item.getAttribute('value') === val) {

                                _$item.classList.add('current');

                                if (this.conf.canSearch) {

                                    if (searchTextinput) {

                                        searchTextinput._set(undefined, true);
                                    }
                                }

                                if (this.conf.multiSelect) {

                                    multiValue.push((0, _trim2.default)(_$item.textContent));
                                } else {

                                    this.data.selectedContent = _$item.innerHTML;
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (this.conf.multiSelect && this.data.value.length === $items.length) {

                $noitem.classList.add('show');
            } else {

                $noitem.classList.remove('show');
            }

            if (!this.conf.multiSelect && (this.data.value.length === 0 || this.data.value === undefined)) {

                this.data.selectedContent = this.conf.formName || '';
            }

            if (searchMultiinput && searchMultiinput.getJson() !== JSON.stringify(multiValue)) {

                var inputValue = searchMultiinput.getInput();

                this.data.selectInput = true;
                searchMultiinput._set(multiValue, true);

                this.Vue.nextTick(function () {

                    searchMultiinput.setInput(inputValue);
                });
            }

            this._refreshShowItems();
        },
        _updateItemValueList: function _updateItemValueList() {

            var $items = this.$el.querySelectorAll('.list>li:not(.noitem)');
            var list = [];

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = $items.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var $item = _step4.value;


                    list.push($item.getAttribute('value'));
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.data.itemValueList = list;

            if (this.data.filterNotExist === false) {

                this.data.filterNotExist = true;
                this.set(this._valueFilter(this.get()));
            }
        },
        _wrapClick: function _wrapClick(evt) {

            if (this.conf.state === 'disabled') {

                return;
            }

            if (this.conf.multiSelect && this.data.value.length === this.conf.max) {

                return;
            }

            var $searchTextinput = this.$el.querySelector('.wrap mor-textinput'),
                $searchMultiinput = this.$el.querySelector('.wrap mor-multiinput'),
                $cleanBtn = this.$el.querySelector('.wrap .clean'),
                hasTextinput = evt.path.indexOf($searchTextinput) !== -1,
                hasMultiinput = evt.path.indexOf($searchMultiinput) !== -1,
                hasCleanBtn = evt.path.indexOf($cleanBtn) !== -1;
            // searchTextinput = ($(ev.target).is($multiInput) || $multiInput.find($(ev.target)).length),
            // searchMultiinput = $(ev.target).is($searchInput) || $searchInput.has($(ev.target)).length;

            if (!hasTextinput && !hasMultiinput && !hasCleanBtn) {

                this.toggle();
            } else if ((hasTextinput || hasMultiinput) && this.data.showlist === false) {

                this.toggle();
            }

            // this.toggle();
        },
        _listClick: function _listClick(evt) {

            var $items = this.$el.querySelectorAll('.list>li:not(.noitem)');
            var $clickItem = false;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = $items.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var $item = _step5.value;


                    if (evt.path.indexOf($item) !== -1) {

                        $clickItem = $item;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if ($clickItem) {

                var value = [$clickItem.getAttribute('value')];

                if (this.conf.multiSelect && this.data.value !== undefined) {

                    value = this.get();
                    value.push($clickItem.getAttribute('value'));
                }

                this.set(value);

                if (!this.conf.multiSelect) {

                    this.toggle();
                } else if (value.length >= this.conf.max) {

                    // $(ev.currentTarget).hide();
                    this.toggle();
                }
            }
        },
        _textinputFocus: function _textinputFocus() {

            this.data.focusSearch = true;
        },
        _textinputBlur: function _textinputBlur() {

            this.data.focusSearch = false;
        },
        _searchKeyChange: function _searchKeyChange() {

            if (!this.data.mounted) {

                return;
            }

            var $items = this.$el.querySelectorAll('.list>li:not(.noitem):not(.selected)');
            var $noitem = this.$el.querySelector('.noitem');

            if (!this.conf.canSearch) {

                this.data.searching = false;

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = $items.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var $item = _step6.value;


                        $item.classList.remove('hide');
                        $noitem.classList.remove('show');
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                return;
            }

            var key = void 0;

            if (this.conf.multiSelect) {

                var searchMultiinput = this.$el.querySelector('#ui-select-mi-' + this.uiid);

                searchMultiinput = searchMultiinput._vm;
                key = searchMultiinput.getInput();
            } else {

                var searchTextinput = this.$el.querySelector('#ui-select-ti-' + this.uiid);

                searchTextinput = searchTextinput._vm;
                key = searchTextinput.get();
            }

            if (key !== '' && key !== undefined) {

                this.data.searching = true;
            } else {

                this.data.searching = false;
            }

            var foundNum = 0;

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = $items.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _$item2 = _step7.value;


                    if (!this.data.searching) {

                        _$item2.classList.remove('hide');
                    } else if (this.data.showlist && (0, _trim2.default)(_$item2.textContent).search(key) !== -1) {

                        foundNum++;
                        _$item2.classList.remove('hide');
                    } else if (this.data.showlist) {

                        _$item2.classList.add('hide');
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            if (this.data.searching && foundNum === 0) {

                $noitem.classList.add('show');
            } else {

                $noitem.classList.remove('show');
            }
        },
        _multiinputFocusNoSearch: function _multiinputFocusNoSearch() {

            var searchMultiinput = this.$el.querySelector('#ui-select-mi-' + this.uiid)._vm;

            searchMultiinput._blurInput();
            this._multiinputFocus();
        },
        _multiinputFocus: function _multiinputFocus() {

            this.toggle(true);
        },
        _refreshValue: function _refreshValue(values) {

            var setValue = [];
            var $items = this.$el.querySelectorAll('.list>li:not(.noitem)');

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = values[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var value = _step8.value;
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;

                    try {

                        for (var _iterator9 = $items.values()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var $item = _step9.value;


                            if ((0, _trim2.default)($item.textContent) === value) {

                                setValue.push($item.getAttribute('value'));

                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            this.set(setValue);
        },
        _multiinputValueChange: function _multiinputValueChange() {

            if (!this.data.mounted) {

                return;
            }

            var searchMultiinput = this.$el.querySelector('#ui-select-mi-' + this.uiid)._vm;
            var values = searchMultiinput.get();

            if (!searchMultiinput.Move.moving && !this.data.selectInput && this.data.multiinputLastValue.length <= values.length) {

                searchMultiinput._set(this.data.multiinputLastValue, true);

                return;
            }

            this.data.selectInput = false;
            this.data.multiinputLastValue = values;
            this._refreshValue(values);
        },
        _refreshShowItems: function _refreshShowItems() {

            if (!this.data.mounted) {

                return;
            }

            var values = this.get();
            var $items = this.$el.querySelectorAll('.list>li:not(.noitem)');

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = $items[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var $item = _step10.value;


                    var selected = false;

                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {
                        for (var _iterator11 = values[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var value = _step11.value;


                            if (value === (0, _trim2.default)($item.textContent)) {

                                selected = true;

                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
                        }
                    }

                    if (selected) {

                        $item.classList.add('selected');
                    } else {

                        $item.classList.remove('selected');
                    }
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }
        },
        _checkArea: function _checkArea(evt) {

            if (this.data.showlist && this.conf.autoClose && evt.path.indexOf(this.$el) === -1) {

                this.toggle(false);
            }
        },
        _resizeInlineImg: function _resizeInlineImg() {

            if (!this.conf.inlineImgSize) {

                return;
            }

            var $inlineImgs = this.$el.querySelectorAll('.list>li mor-img,.list>li img');

            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = $inlineImgs.values()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var $img = _step12.value;


                    $img.style.width = this.conf.inlineImgSize;
                    $img.style.height = this.conf.inlineImgSize;
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }
        },
        _refreshTips: function _refreshTips() {

            if (!this.conf.itemTip) {
                var _iteratorNormalCompletion13 = true;
                var _didIteratorError13 = false;
                var _iteratorError13 = undefined;

                try {

                    for (var _iterator13 = this.data.tips[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                        var tipVm = _step13.value;


                        tipVm.$destroy();
                    }
                } catch (err) {
                    _didIteratorError13 = true;
                    _iteratorError13 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
                            _iterator13.return();
                        }
                    } finally {
                        if (_didIteratorError13) {
                            throw _iteratorError13;
                        }
                    }
                }

                this.data.tips = [];

                return;
            }

            var $items = this.$el.querySelectorAll('.list>li:not(.noitem)');
            var $list = this.$el.querySelector('.list');

            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
                for (var _iterator14 = $items.keys()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var index = _step14.value;


                    var $item = $items[index];
                    var $tip = $item.nextElementSibling;

                    if (!this.data.tipsContent[index] && ($tip === null || $tip.classList.value.split(' ').indexOf('item-tip') === -1)) {

                        return;
                    }

                    if (!this.data.tipsContent[index]) {

                        this.data.tipsContent[index] = $tip.innerHTML;
                        $tip.remove();
                    }

                    var random = 1e8;

                    var tipId = 'select-tip-' + Math.floor(Math.random() * random);
                    var $newTip = document.createElement('morning-tip');

                    $newTip.setAttribute(':minor', true);
                    $newTip.setAttribute('target', '#' + tipId);
                    $newTip.setAttribute('placement', this.conf.itemTipDirect);
                    $newTip.innerHTML = this.data.tipsContent[index];

                    var _tipVm = new this.Vue({
                        el: $newTip
                    });

                    $item.setAttribute('id', tipId);
                    _tipVm.$mount();
                    $list.append(_tipVm.$el);
                    this.data.tips.push(_tipVm);
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                        _iterator14.return();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }
        },
        _setListHeight: function _setListHeight() {

            var $item = this.$el.querySelector('.list>li:not(.noitem):not(.current):not(.selected)');

            if (!$item) {

                return;
            }

            var itemHeight = $item.offsetHeight || this.data.lastItemHeight;
            var maxHeight = itemHeight * this.conf.maxShow;

            if (itemHeight) {

                this.data.lastItemHeight = itemHeight;
            }

            if (this.listStyle.maxHeight === maxHeight + 'px') {

                return;
            }

            this.listStyle = {
                maxHeight: maxHeight + 'px'
            };
        },
        toggle: function toggle(show) {

            if (show === undefined) {

                show = !this.data.showlist;
            }

            show = !!show;

            if (show) {

                // this.$items.hide().not('.noresult,.selected').show();

                var $items = this.$el.querySelectorAll('.list>li');
                var $currentItem = this.$el.querySelector('.list>li.current');
                var $list = this.$el.querySelector('.list');

                if (this.conf.multiSelect) {

                    this._refreshShowItems();
                } else if ($currentItem) {
                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;

                    try {

                        for (var _iterator15 = $items.keys()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var index = _step15.value;


                            if ($items[index] === $currentItem) {

                                $list.scrollTop = index * $currentItem.offsetHeight;

                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError15 = true;
                        _iteratorError15 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                _iterator15.return();
                            }
                        } finally {
                            if (_didIteratorError15) {
                                throw _iteratorError15;
                            }
                        }
                    }
                }

                // this._searchKeyChange();
                this.data.showlist = true;
                this.$emit('list-show');
            } else {

                this.data.showlist = false;
                this.$emit('list-hide');
            }

            return this;
        }
    },
    created: function created() {

        this._indexReg('list.show', 2);
        this._indexReg('list.hide', 1);
    },
    mounted: function mounted() {
        var _this = this;

        var timeout = 200;

        this.data.mounted = true;

        this._updateItemValueList();
        this._onValueChange();

        this.$on('value-change', this._onValueChange);

        setTimeout(function () {

            _this.$watch('conf.maxShow', _this._setListHeight, {
                immediate: true
            });
        });

        this.$watch('conf.canSearch', this._searchKeyChange);

        this.$watch('conf.multiSelect', function () {

            var value = _this.get();

            if (!_this.conf.multiSelect && value.length > 1) {

                value = value.slice(0, 1);
            }

            _this._set(value, true);
            _this._onValueChange();
        });

        this.$watch('conf.max', function () {

            _this._set(_this._maxFilter(_this.get()), true);
        });

        this.$watch('conf.inlineImgSize', function () {

            _this._resizeInlineImg();
        }, {
            immediate: true
        });

        this.$watch('conf.itemTip', function () {

            _this._refreshTips();
        }, {
            immediate: true
        });

        this.$watch('conf.itemTipDirect', function () {
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {

                for (var _iterator16 = _this.data.tips[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var tipVm = _step16.value;


                    tipVm.$el._vm.conf.placement = _this.conf.itemTipDirect;
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }
        }, {
            immediate: true
        });

        this.$on('list-show', function () {

            _this.$el.style.zIndex = _this._indexGet('list.show');

            setTimeout(function () {

                _this._globalEventAdd('click', '_checkArea');
            });
        });

        this.$on('list-hide', function () {

            _this._globalEventRemove('click', '_checkArea');

            setTimeout(function () {

                _this.$el.style.zIndex = _this._indexGet('list.hide');
            }, timeout);
        });
    },
    updated: function updated() {

        this._setListHeight();
        this._resizeInlineImg();
        this._updateItemValueList();
    },
    beforeDestroy: function beforeDestroy() {

        this._globalEventRemove('click', '_checkArea');
    }
};
module.exports = exports['default'];

/***/ }),
/* 277 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-select', {
    class: [_vm.stateClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "max-show": _vm.maxShow,
      "auto-close": _vm.autoClose,
      "can-search": _vm.canSearch,
      "multi-select": _vm.multiSelect,
      "can-move": _vm.canMove,
      "max": _vm.max,
      "clean-btn": _vm.cleanBtn,
      "inline-img-size": _vm.inlineImgSize,
      "item-tip": _vm.itemTip,
      "item-tip-direct": _vm.itemTipDirect
    }
  }, [_c('div', {
    staticClass: "wrap",
    on: {
      "click": _vm._wrapClick
    }
  }, [(_vm.conf.multiSelect) ? [(_vm.conf.canSearch) ? _c('morning-multiinput', {
    key: "multi-can-search",
    attrs: {
      "id": 'ui-select-mi-' + _vm.uiid,
      "can-move": _vm.conf.canMove,
      "max": _vm.conf.max,
      "form-name": _vm.conf.formName,
      "hide-name": _vm.conf.hideName,
      "disabled": _vm.conf.state === 'disabled'
    },
    on: {
      "input-focus": function($event) {
        _vm._multiinputFocus()
      },
      "value-change": function($event) {
        _vm._multiinputValueChange()
      },
      "input-value-change": function($event) {
        _vm._searchKeyChange()
      }
    }
  }) : _c('morning-multiinput', {
    key: "multi-no-search",
    attrs: {
      "id": 'ui-select-mi-' + _vm.uiid,
      "can-move": _vm.conf.canMove,
      "max": _vm.conf.max,
      "form-name": _vm.conf.formName,
      "hide-name": _vm.conf.hideName,
      "disabled": _vm.conf.state === 'disabled'
    },
    on: {
      "input-focus": function($event) {
        _vm._multiinputFocusNoSearch()
      },
      "value-change": function($event) {
        _vm._multiinputValueChange()
      }
    }
  })] : [(_vm.conf.canSearch) ? [_c('morning-textinput', {
    key: "single-can-search",
    attrs: {
      "id": 'ui-select-ti-' + _vm.uiid
    },
    on: {
      "value-change": function($event) {
        _vm._searchKeyChange()
      },
      "focus": function($event) {
        _vm._textinputFocus()
      },
      "blur": function($event) {
        _vm._textinputBlur()
      }
    }
  })] : _vm._e(), _vm._v(" "), (!_vm.conf.multiSelect && _vm.data.value && _vm.data.value.length === 1) ? _c('div', {
    staticClass: "selected",
    domProps: {
      "innerHTML": _vm._s(_vm.data.selectedContent)
    }
  }) : (!_vm.conf.hideName) ? _c('div', {
    staticClass: "selected"
  }, [_vm._v("\n            " + _vm._s(_vm.conf.formName) + "\n        ")]) : _c('div', {
    staticClass: "selected"
  }, [_vm._v("\n             \n        ")])], _vm._v(" "), _c('i', {
    staticClass: "morningicon drop"
  }, [_vm._v("")]), _vm._v(" "), (_vm.conf.cleanBtn) ? _c('i', {
    staticClass: "morningicon clean",
    on: {
      "click": function($event) {
        _vm._set(undefined, true)
      }
    }
  }, [_vm._v("")]) : _vm._e()], 2), _vm._v(" "), _c('ul', {
    staticClass: "list",
    style: (_vm.listStyle),
    on: {
      "click": _vm._listClick
    }
  }, [_vm._t("default"), _vm._v(" "), _c('li', {
    staticClass: "noitem"
  }, [_vm._v("无项目")])], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50673fdf", esExports)
  }
}

/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_375207e6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(282);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(280)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_375207e6_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/checkbox/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-375207e6", Component.options)
  } else {
    hotAPI.reload("data-v-375207e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 280 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _arrayUniq = __webpack_require__(4);

var _arrayUniq2 = _interopRequireDefault(_arrayUniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    origin: 'Form',
    name: 'checkbox',
    props: {
        acceptHtml: {
            type: Boolean,
            default: false
        },
        list: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                acceptHtml: this.acceptHtml,
                list: this.list
            };
        }
    },
    data: function data() {

        return {
            data: {}
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !(value instanceof Array)) {

                return [];
            }

            // filter not exist value.
            for (var index in value) {

                var val = value[index];

                if (Object.keys(this.conf.list).indexOf(String(val)) === -1) {

                    value.splice(index, 1);
                }
            }

            return value;
        },
        toggle: function toggle(key, checked) {

            var list = (0, _extend2.default)(true, [], this.data.value);

            if (checked === undefined) {

                if (list.indexOf(key) !== -1) {

                    checked = false;
                } else {

                    checked = true;
                }
            }

            checked = !!checked;

            if (checked) {

                list.push(key);
            } else if (list.indexOf(key) !== -1) {

                list.splice(list.indexOf(key), 1);
            }

            this.set((0, _arrayUniq2.default)(list));

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {}
};
module.exports = exports['default'];

/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-checkbox', {
    class: [_vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "accept-html": _vm.acceptHtml,
      "list": _vm.list
    }
  }, [(!_vm.conf.hideName) ? _c('div', {
    staticClass: "note"
  }, [_vm._v(_vm._s(_vm.conf.formName))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "itemlist"
  }, [_vm._l((_vm.conf.list), function(name, key) {
    return [(_vm.data.value.indexOf(key) !== -1) ? [_c('label', {
      key: key,
      staticClass: "checked",
      attrs: {
        "value": key
      },
      on: {
        "click": function($event) {
          _vm.toggle(key)
        }
      }
    }, [_c('p', {
      staticClass: "box"
    }, [_c('i', {
      staticClass: "morningicon"
    }, [_vm._v("")])]), _vm._v(" "), (_vm.conf.acceptHtml) ? [_c('span', {
      domProps: {
        "innerHTML": _vm._s(name)
      }
    })] : [_c('span', [_vm._v(_vm._s(name))])]], 2)] : [_c('label', {
      key: key,
      attrs: {
        "value": key
      },
      on: {
        "click": function($event) {
          _vm.toggle(key)
        }
      }
    }, [_c('p', {
      staticClass: "box"
    }, [_c('i', {
      staticClass: "morningicon"
    }, [_vm._v("")])]), _vm._v(" "), (_vm.conf.acceptHtml) ? [_c('span', {
      domProps: {
        "innerHTML": _vm._s(name)
      }
    })] : [_c('span', [_vm._v(_vm._s(name))])]], 2)]]
  })], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-375207e6", esExports)
  }
}

/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7727558e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(286);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(284)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7727558e_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/radio/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7727558e", Component.options)
  } else {
    hotAPI.reload("data-v-7727558e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 284 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'Form',
    name: 'radio',
    props: {
        acceptHtml: {
            type: Boolean,
            default: false
        },
        list: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                acceptHtml: this.acceptHtml,
                list: this.list
            };
        }
    },
    data: function data() {

        return {
            data: {}
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            // filter not exist value.
            if (Object.keys(this.conf.list).indexOf(String(value)) === -1) {

                return undefined;
            }

            return String(value);
        },
        toggle: function toggle(key) {

            var keys = Object.keys(this.conf.list);

            if (keys.indexOf(String(key)) === -1) {

                this.set();
            } else {

                this.set(String(key));
            }

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {}
};
module.exports = exports['default'];

/***/ }),
/* 286 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-radio', {
    class: [_vm.colorClass, _vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "accept-html": _vm.acceptHtml,
      "list": _vm.list
    }
  }, [(!_vm.conf.hideName) ? _c('div', {
    staticClass: "note"
  }, [_vm._v(_vm._s(_vm.conf.formName))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "itemlist"
  }, [_vm._l((_vm.conf.list), function(name, key) {
    return [(_vm.data.value === key) ? [_c('label', {
      key: key,
      staticClass: "checked",
      attrs: {
        "value": key
      },
      on: {
        "click": function($event) {
          _vm.toggle(key)
        }
      }
    }, [_c('p', {
      staticClass: "box"
    }, [_c('i', {
      staticClass: "morningicon"
    }, [_vm._v("")])]), _vm._v(" "), (_vm.conf.acceptHtml) ? [_c('span', {
      domProps: {
        "innerHTML": _vm._s(name)
      }
    })] : [_c('span', [_vm._v(_vm._s(name))])]], 2)] : [_c('label', {
      key: key,
      attrs: {
        "value": key
      },
      on: {
        "click": function($event) {
          _vm.toggle(key)
        }
      }
    }, [_c('p', {
      staticClass: "box"
    }, [_c('i', {
      staticClass: "morningicon"
    }, [_vm._v("")])]), _vm._v(" "), (_vm.conf.acceptHtml) ? [_c('span', {
      domProps: {
        "innerHTML": _vm._s(name)
      }
    })] : [_c('span', [_vm._v(_vm._s(name))])]], 2)]]
  })], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7727558e", esExports)
  }
}

/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a8306d4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(290);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(288)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a8306d4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/multiinput/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a8306d4", Component.options)
  } else {
    hotAPI.reload("data-v-6a8306d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 288 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _Move = __webpack_require__(10);

var _Move2 = _interopRequireDefault(_Move);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    origin: 'Form',
    name: 'multiinput',
    mixins: [_Move2.default],
    props: {
        canMove: {
            type: Boolean,
            default: false
        },
        max: {
            type: [Number, Boolean],
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                canMove: this.canMove,
                max: this.max
            };
        },
        moreClass: function moreClass() {

            return {
                focus: this.data.focus
            };
        }
    },
    data: function data() {

        return {
            data: {
                inputValue: '',
                inputWidth: '0em',
                focus: false
            }
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !(value instanceof Array)) {

                return [];
            }

            value = this._maxFilter(value);

            return value;
        },
        _maxFilter: function _maxFilter(value) {

            if (this.conf.max && value.length > this.conf.max) {

                return value.slice(0, this.conf.max);
            }

            return value;
        },
        _focusInput: function _focusInput() {

            // this.data.moving === false
            if (this.data.focus === false) {

                var $input = this.$el.querySelector('input');

                if ($input) {

                    this.data.focus = true;
                    $input.focus();
                    this.$emit('input-focus');
                }
            }
        },
        _blurInput: function _blurInput() {

            if (this.data.focus === true) {

                var $input = this.$el.querySelector('input');

                this.data.focus = false;
                $input.blur();
                this.$emit('input-blur');
            }
        },
        _enterInput: function _enterInput() {
            var _this = this;

            if (this.data.focus) {

                var $input = this.$el.querySelector('input');

                this.add($input.value);
                this._blurInput();

                setTimeout(function () {

                    _this._focusInput();
                });
            }
        },
        _resetInputWidth: function _resetInputWidth() {

            var valueWidth = 1.5;

            if (this.data.inputValue !== '') {

                this.data.inputWidth = this.data.inputValue.length * valueWidth + 'em';
            } else if (this.conf.formName) {

                this.data.inputWidth = this.conf.formName.length * valueWidth + 'em';
            }
        },
        _updateItem: function _updateItem(value, index) {

            var list = this.get();

            list.splice(index, 1, value || {});

            this.set(list);
        },
        _deleteItem: function _deleteItem(index) {

            var value = this.get();

            value.splice(index, 1);

            this.set(value);
        },
        _moveItem: function _moveItem(from, to) {

            if (from >= this.data.value.length || from < 0 || to >= this.data.value.length || to < 0) {

                return;
            }

            var value = this.get();

            if (this.Move.movedIndex !== -1) {

                this.Move.movedIndex = to;
            }

            value.splice(to, 0, value.splice(from, 1)[0]);
            this.set(value);
        },
        add: function add(item, index) {

            var value = this.get();

            if (this.conf.max && this.conf.max <= value.length) {

                return;
            }

            if (index >= 0) {

                value.splice(index, 0, item);
            } else if (index === undefined) {

                value.push(item);
            }

            this.set(value);
            this.data.inputValue = '';

            return this;
        },
        del: function del(index) {

            this._deleteItem(index);

            return this;
        },
        update: function update(item, index) {

            this._updateItem(item, index);

            return this;
        },
        move: function move(from, to) {

            this._moveItem(from, to);

            return this;
        },
        setInput: function setInput(value) {

            this.data.inputValue = String(value || '');

            return this;
        },
        getInput: function getInput() {

            return this.data.inputValue;
        }
    },
    created: function created() {
        var _this2 = this;

        this.$watch('data.inputValue', function () {

            _this2._resetInputWidth();
            _this2.$emit('input-value-change');
        }, {
            immediate: true
        });

        this.$on('value-change', function () {

            if (!_this2.Move.moving) {

                _this2.data.inputValue = '';
            }
        });
    },
    mounted: function mounted() {
        var _this3 = this;

        this.$on('input', function (value) {

            _this3.data.inputValue = value;
        });

        this.$watch('conf.canMove', function (newVal) {

            _this3.Move.target = '.item';
            _this3.Move.container = '.itemlist';
            _this3.Move.can = !!newVal;
        }, {
            immediate: true
        });

        this.$watch('conf.max', function () {

            _this3._set(_this3._maxFilter(_this3.get()), true);
        });

        this.$on('_moveStarted', function () {

            _this3._blurInput();
        });

        var movingReg = /(^| )move-moving($| )/g;

        this.$on('_moveChange', function () {

            var maxDistance = 20;

            var $items = _this3.$el.querySelectorAll('.item');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = $items.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;


                    var index = item[0];
                    var $item = item[1];

                    if (!movingReg.test($item.className)) {
                        var _moveElementXy = _this3._moveElementXy($item),
                            x = _moveElementXy.x,
                            y = _moveElementXy.y;

                        var distance = Math.sqrt(Math.pow(Math.abs(_this3.Move.current.x - x), 2) + Math.pow(Math.abs(_this3.Move.current.y - y), 2));

                        if (distance < maxDistance) {

                            _this3.move(_this3.Move.movedIndex, index);

                            break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-multiinput', {
    class: [_vm.stateClass, _vm.moreClass, _vm.moveClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "can-move": _vm.canMove,
      "max": _vm.max
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm._enterInput($event)
      },
      "click": _vm._focusInput
    }
  }, [_c('div', {
    staticClass: "itemlist"
  }, [_vm._l((_vm.data.value), function(value, index) {
    return _c('div', {
      key: index,
      staticClass: "item",
      on: {
        "mousedown": function($event) {
          _vm._moveItemRecord(index)
        }
      }
    }, [_c('span', {
      attrs: {
        "title": value
      }
    }, [_vm._v(_vm._s(value))]), _vm._v(" "), (_vm.conf.state !== 'disabled') ? _c('i', {
      staticClass: "morningicon",
      on: {
        "click": function($event) {
          _vm._deleteItem(index)
        }
      }
    }, [_vm._v("")]) : _vm._e()])
  }), _vm._v(" "), (_vm.conf.state !== 'disabled') ? [(_vm.conf.max) ? [(_vm.data.value.length < _vm.conf.max) ? [(!_vm.conf.hideName) ? _c('input', {
    key: "set-max-show-name",
    style: ({
      width: _vm.data.inputWidth
    }),
    attrs: {
      "type": "text",
      "placeholder": _vm.conf.formName
    },
    domProps: {
      "value": _vm.data.inputValue
    },
    on: {
      "focus": _vm._focusInput,
      "blur": _vm._blurInput,
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  }) : _c('input', {
    key: "set-max-hide-name",
    style: ({
      width: _vm.data.inputWidth
    }),
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.data.inputValue
    },
    on: {
      "focus": _vm._focusInput,
      "blur": _vm._blurInput,
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  })] : [_c('span', [_vm._v("最多只能输入" + _vm._s(_vm.conf.max) + "项")])]] : [(!_vm.conf.hideName) ? _c('input', {
    key: "unset-max-show-name",
    style: ({
      width: _vm.data.inputWidth
    }),
    attrs: {
      "type": "text",
      "placeholder": _vm.conf.formName
    },
    domProps: {
      "value": _vm.data.inputValue
    },
    on: {
      "focus": _vm._focusInput,
      "blur": _vm._blurInput,
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  }) : _c('input', {
    key: "unset-max-hide-name",
    style: ({
      width: _vm.data.inputWidth
    }),
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.data.inputValue
    },
    on: {
      "focus": _vm._focusInput,
      "blur": _vm._blurInput,
      "input": function($event) {
        _vm.$emit('input', $event.target.value)
      }
    }
  })]] : _vm._e()], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6a8306d4", esExports)
  }
}

/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1abf8890_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(294);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(292)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1abf8890_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/multiform/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1abf8890", Component.options)
  } else {
    hotAPI.reload("data-v-1abf8890", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 292 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _arrayUniq = __webpack_require__(4);

var _arrayUniq2 = _interopRequireDefault(_arrayUniq);

var _Move = __webpack_require__(10);

var _Move2 = _interopRequireDefault(_Move);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var returnValueFn = function returnValueFn(value) {
    return value;
};

var noopFn = function noopFn() {};

exports.default = {
    origin: 'Form',
    name: 'multiform',
    mixins: [_Move2.default],
    props: {
        itemName: {
            type: String,
            default: '项目'
        },
        itemFiller: {
            type: Function,
            default: noopFn
        },
        canMove: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: undefined
        },
        cleanBtn: {
            type: Boolean,
            default: false
        },
        inputType: {
            type: String,
            default: 'single',
            validator: function validator(value) {
                return ['single', 'batch-separate', 'batch-pluck'].indexOf(value) !== -1;
            }
        },
        batchReg: {
            type: String,
            default: ','
        },
        batchFiller: {
            type: Function,
            default: returnValueFn
        },
        batchUniq: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                itemName: this.itemName,
                itemFiller: this.itemFiller,
                canMove: this.canMove,
                max: this.max,
                cleanBtn: this.cleanBtn,
                inputType: this.inputType,
                batchReg: this.batchReg,
                batchFiller: this.batchFiller,
                batchUniq: this.batchUniq
            };
        },
        moreClass: function moreClass() {

            return {
                'has-cleanbtn': this.conf.cleanBtn
            };
        }
    },
    data: function data() {

        return {
            data: {
                modifyIndex: null
            }
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !(value instanceof Array)) {

                return [];
            }

            value = this._maxFilter(value);

            return value;
        },
        _maxFilter: function _maxFilter(value) {

            if (this.conf.max && value.length > this.conf.max) {

                return value.slice(0, this.conf.max);
            }

            return value;
        },
        _hideForm: function _hideForm() {

            this._resetForm();
            this.$emit('hide');
        },
        _showForm: function _showForm() {

            this.$emit('show');
        },
        _resetForm: function _resetForm() {

            var formVm = this._findDialogForm();

            this.data.modifyIndex = null;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = formVm[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var vm = _step.value;


                    vm.set(vm.conf.defaultValue || undefined);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        },
        _findDialogFormOnce: function _findDialogFormOnce(forms, vm) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {

                for (var _iterator2 = vm.$children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var child = _step2.value;


                    if (child._isVue) {

                        if (child.isForm) {

                            forms.push(child);
                        } else {

                            this._findDialogFormOnce(forms, child);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        },
        _findDialogForm: function _findDialogForm() {

            var dialogVm = this.$refs['ui-multiform-dialog-' + this.uiid];
            var forms = [];

            if (dialogVm) {

                this._findDialogFormOnce(forms, dialogVm);
            }

            return forms;
        },
        _addItemDialog: function _addItemDialog() {

            if (this.conf.inputType === 'single') {

                this._showDialog();
            } else {

                this._showBatchDialog();
            }
        },
        _showDialog: function _showDialog() {

            this.$refs['ui-multiform-dialog-' + this.uiid].toggle(true);
        },
        _hideDialog: function _hideDialog() {

            this.$refs['ui-multiform-dialog-' + this.uiid].toggle(false);
        },
        _showBatchDialog: function _showBatchDialog() {

            this.$refs['ui-multiform-batchdialog-' + this.uiid].toggle(true);
        },
        _hideBatchDialog: function _hideBatchDialog() {

            this.$refs['ui-multiform-batchdialog-' + this.uiid].toggle(false);
        },
        _saveItem: function _saveItem() {

            var value = {};
            var formVm = this._findDialogForm();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = formVm[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var vm = _step3.value;


                    value[vm.conf.formKey] = vm.get();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (this.data.modifyIndex === null) {

                this._addItem(value);
            } else {

                this._updateItem(value, this.data.modifyIndex);
            }

            this._hideDialog();
        },
        _addItem: function _addItem(value, index) {

            var list = this.get();

            if (this.conf.max && this.conf.max === list.length) {

                return;
            }

            if (index >= 0) {

                list.splice(index, 0, value);
            } else if (index === undefined) {

                list.push(value);
            }

            this.set(list);
        },
        _updateItem: function _updateItem(value, index) {

            var list = this.get();

            list.splice(index, 1, value || {});

            this.set(list);
        },
        _deleteItem: function _deleteItem(index) {

            var list = this.get();

            list.splice(index, 1);

            this.set(list);
        },
        _cleanAllItems: function _cleanAllItems() {

            this.set(undefined);
        },
        _fillItem: function _fillItem(index) {

            if (this.conf.state === 'disabled') {

                return;
            }

            var value = this.get();
            var formVm = this._findDialogForm();

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = formVm[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var vm = _step4.value;


                    vm.set(value[index][vm.conf.formKey]);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.data.modifyIndex = index;
            this._showDialog();
        },
        _moveItem: function _moveItem(from, to) {

            if (from >= this.data.value.length || from < 0 || to >= this.data.value.length || to < 0) {

                return;
            }

            var value = this.get();

            if (this.Move.movedIndex !== -1) {

                this.Move.movedIndex = to;
            }

            value.splice(to, 0, value.splice(from, 1)[0]);

            this.set(value);
        },
        _batchInput: function _batchInput() {
            var _this = this;

            var inputVm = this.$refs['ui-multiform-batchinput-' + this.uiid];
            var saveBtnVm = this.$refs['ui-multiform-batchsave-' + this.uiid];
            var inputStr = inputVm.get();
            var ids = [];

            saveBtnVm.lock();

            if (this.conf.inputType === 'batch-separate') {

                ids = inputStr.split(new RegExp(this.conf.batchReg, 'g'));
            } else if (this.conf.inputType === 'batch-pluck') {

                var pluckReg = new RegExp(this.conf.batchReg, 'g');
                var result = void 0;

                while ((result = pluckReg.exec(inputStr)) !== null) {

                    ids.push(result[0]);
                }
            }

            if (this.conf.batchUniq) {

                ids = (0, _arrayUniq2.default)(ids);
            }

            Promise.resolve(this.conf.batchFiller.call(this, ids)).then(function (items) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {

                    for (var _iterator5 = items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var item = _step5.value;


                        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {

                            _this._addItem(item);
                        }
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                inputVm.set(undefined);
                saveBtnVm.unlock();
                _this._hideBatchDialog();
            });
        },
        add: function add(value, index) {

            this._addItem(value, index);

            return this;
        },
        del: function del(index) {

            this._deleteItem(index);

            return this;
        },
        update: function update(value, index) {

            this._updateItem(value, index);

            return this;
        },
        move: function move(from, to) {

            this._moveItem(from, to);

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this2 = this;

        this.$watch('conf.canMove', function (newVal) {

            _this2.Move.target = '.item:not(.add)';
            _this2.Move.container = '.itemwrap';
            _this2.Move.can = !!newVal;
        }, {
            immediate: true
        });

        this.$watch('conf.max', function () {

            _this2._set(_this2._maxFilter(_this2.get()), true);
        });

        var movingReg = /(^| )move-moving($| )/g;

        this.$on('_moveChange', function () {

            var maxDistance = 20;

            var $items = _this2.$el.querySelectorAll('.item:not(.add)');

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = $items.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var item = _step6.value;


                    var index = item[0];
                    var $item = item[1];

                    if (!movingReg.test($item.className)) {
                        var _moveElementXy = _this2._moveElementXy($item),
                            x = _moveElementXy.x,
                            y = _moveElementXy.y;

                        var distance = Math.sqrt(Math.pow(Math.abs(_this2.Move.current.x - x), 2) + Math.pow(Math.abs(_this2.Move.current.y - y), 2));

                        if (distance < maxDistance) {

                            _this2.move(_this2.Move.movedIndex, index);

                            break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-multiform', {
    class: [_vm.stateClass, _vm.moreClass, _vm.moveClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "item-name": _vm.itemName,
      "item-filler": _vm.itemFiller,
      "can-move": _vm.canMove,
      "max": _vm.max,
      "clean-btn": _vm.cleanBtn,
      "input-type": _vm.inputType,
      "batch-reg": _vm.batchReg,
      "batch-filler": _vm.batchFiller,
      "batch-uniq": _vm.batchUniq
    }
  }, [_c('div', {
    staticClass: "itemlist"
  }, [(!_vm.conf.hideName) ? _c('p', {
    staticClass: "name"
  }, [_c('morning-center', {
    staticClass: "fill"
  }, [_vm._v(_vm._s(_vm.conf.formName))])], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "itemwrap",
    class: {
      hidename: _vm.conf.hideName
    }
  }, [_vm._l((_vm.data.value), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "item",
      class: {
        'has-img': (_vm.conf.itemFiller(item) && _vm.conf.itemFiller(item).thumb)
      },
      on: {
        "click": function($event) {
          _vm._fillItem(index)
        },
        "mousedown": function($event) {
          _vm._moveItemRecord(index)
        }
      }
    }, [(_vm.conf.itemFiller(item) && _vm.conf.itemFiller(item).thumb) ? _c('img', {
      staticClass: "thumb",
      attrs: {
        "src": _vm.conf.itemFiller(item).thumb
      }
    }) : _vm._e(), _vm._v(" "), (_vm.conf.itemFiller(item) && _vm.conf.itemFiller(item).title) ? _c('span', [_vm._v("\n                " + _vm._s(_vm.conf.itemName) + " : " + _vm._s(_vm.conf.itemFiller(item).title) + "\n            ")]) : _c('span', [_vm._v("\n                " + _vm._s(_vm.conf.itemName) + "\n            ")]), _vm._v(" "), (_vm.conf.state !== 'disabled') ? _c('i', {
      staticClass: "morningicon",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm._deleteItem(index)
        }
      }
    }, [_vm._v("")]) : _vm._e()])
  }), _vm._v(" "), (_vm.conf.state !== 'disabled') ? [(_vm.conf.max) ? [(_vm.data.value.length < _vm.conf.max) ? _c('a', {
    key: "set-max",
    staticClass: "add item",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm._addItemDialog
    }
  }, [_c('span', [_vm._v("添加" + _vm._s(_vm.conf.itemName))]), _vm._v(" "), _c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")])]) : _c('span', [_vm._v("最多只能输入" + _vm._s(_vm.conf.max) + "项")])] : [_c('a', {
    key: "unset-max",
    staticClass: "add item",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm._addItemDialog
    }
  }, [_c('span', [_vm._v("添加" + _vm._s(_vm.conf.itemName))]), _vm._v(" "), _c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")])])]] : _vm._e()], 2)]), _vm._v(" "), _c('morning-dialog', {
    ref: 'ui-multiform-dialog-' + _vm.uiid,
    staticClass: "multiform-dialog",
    attrs: {
      "width": "500px",
      "height": "75%",
      "color": "gray"
    },
    on: {
      "show": _vm._showForm,
      "hide": _vm._hideForm
    }
  }, [_c('header', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("请填写表单")]), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c('footer', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('div', [_c('morning-link', {
    staticClass: "margin",
    attrs: {
      "color": "minor"
    },
    on: {
      "emit": _vm._hideDialog
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('morning-btn', {
    attrs: {
      "color": "success"
    },
    on: {
      "emit": _vm._saveItem
    }
  }, [_vm._v("确认")])], 1)])], 2), _vm._v(" "), (_vm.conf.inputType !== 'single') ? _c('morning-dialog', {
    ref: 'ui-multiform-batchdialog-' + _vm.uiid,
    staticClass: "multiform-batch-dialog",
    attrs: {
      "width": "500px",
      "height": "240px",
      "color": "gray"
    }
  }, [_c('header', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("请输入需要添加的项目")]), _vm._v(" "), _c('morning-textarea', {
    ref: 'ui-multiform-batchinput-' + _vm.uiid
  }), _vm._v(" "), _c('footer', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('div', [_c('morning-link', {
    staticClass: "margin",
    attrs: {
      "color": "minor"
    },
    on: {
      "emit": _vm._hideBatchDialog
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('morning-btn', {
    ref: 'ui-multiform-batchsave-' + _vm.uiid,
    attrs: {
      "color": "success"
    },
    on: {
      "emit": _vm._batchInput
    }
  }, [_vm._v("确认")])], 1)])], 1) : _vm._e(), _vm._v(" "), (_vm.conf.cleanBtn) ? _c('morning-link', {
    staticClass: "cleanbtn",
    attrs: {
      "color": "minor"
    },
    on: {
      "emit": _vm._cleanAllItems
    }
  }, [_vm._v("清空全部")]) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1abf8890", esExports)
  }
}

/***/ }),
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f93b9be_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(298);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(296)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f93b9be_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/timepicker/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f93b9be", Component.options)
  } else {
    hotAPI.reload("data-v-4f93b9be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 296 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    origin: 'Form',
    name: 'timepicker',
    props: {},
    computed: {
        _conf: function _conf() {

            return {};
        }
    },
    data: function data() {

        return {
            data: {}
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            return value;
        }
    },
    created: function created() {},
    mounted: function mounted() {}
};
module.exports = exports['default'];

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-timepicker', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName
    }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4f93b9be", esExports)
  }
}

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_392f52b8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(322);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(300)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_392f52b8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/upload/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-392f52b8", Component.options)
  } else {
    hotAPI.reload("data-v-392f52b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 300 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _axios = __webpack_require__(302);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    origin: 'Form',
    name: 'upload',
    props: {
        itemName: {
            type: String,
            default: ''
        },
        acceptType: {
            type: String,
            default: ''
        },
        multi: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: Infinity
        },
        allowUrl: {
            type: Boolean,
            default: false
        },
        allowDrag: {
            type: Boolean,
            default: false
        },
        validate: {
            type: Function,
            default: function _default() {
                return {};
            }
        },
        uploader: {
            type: Function,
            default: undefined
        }
    },
    computed: {
        moreClass: function moreClass() {

            return {
                'allow-url': this.conf.allowUrl
            };
        },
        ismax: function ismax() {

            if (this.conf.max && this.data.files && this.data.files.length >= this.conf.max) {

                return true;
            }

            return false;
        }
    },
    data: function data() {

        return {
            conf: {
                itemName: this.itemName,
                acceptType: this.acceptType,
                multi: this.multi,
                max: this.max,
                allowUrl: this.allowUrl,
                allowDrag: this.allowDrag,
                validate: this.validate,
                uploader: this.uploader
            },
            data: {
                inputKey: 0,
                files: [],
                uploadQueue: [],
                uploading: false,
                fetchRemoteFile: false,
                dragover: false
            }
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !(value instanceof Array)) {

                return [];
            }

            value = this._maxFilter(value);

            return value;
        },
        _maxFilter: function _maxFilter(value) {

            if (this.conf.max && value.length > this.conf.max) {

                return value.slice(0, this.conf.max);
            }

            return value;
        },
        _dragover: function _dragover() {

            if (!this.conf.allowDrag) {

                return;
            }

            this.data.dragover = true;
        },
        _dragleave: function _dragleave() {

            if (!this.conf.allowDrag) {

                return;
            }

            this.data.dragover = false;
        },
        _drop: function _drop(evt) {

            if (!this.conf.allowDrag) {

                return;
            }

            this.data.dragover = false;

            var url = evt.dataTransfer.getData('URL');

            if (url) {

                if (this.conf.allowUrl) {

                    this._fetchRemoteFile(url);
                }
            } else {

                this._getFiles(evt);
            }
        },
        _uploadRemoteFile: function _uploadRemoteFile() {

            if (!this.conf.allowUrl) {

                return;
            }

            /* eslint-disable no-alert */
            var url = window.prompt('请输入文件链接：');
            /* eslint-enable no-alert */

            this._fetchRemoteFile(url);
        },
        _fetchRemoteFile: function _fetchRemoteFile(url) {
            var _this = this;

            if (url.search(/^(http|https):\/\//g) !== 0) {

                /* eslint-disable no-alert */
                window.alert('链接有误');
                /* eslint-enable no-alert */

                return;
            }

            this.data.fetchRemoteFile = true;

            var filename = url.split('?')[0].split('//')[1].split('/').pop();

            if (/#/.test(filename)) {

                filename = filename.split('#')[0];
            }

            (0, _axios2.default)({
                url: url,
                method: 'get',
                responseType: 'blob'
            }).then(function (resp) {

                var file = new File([resp.data], filename, {
                    type: resp.data.type
                });

                _this.data.fetchRemoteFile = false;
                _this._addFile(file);
            }).catch(function () {

                _this.data.fetchRemoteFile = false;

                /* eslint-disable no-alert */
                window.alert('网络文件获取失败');
                /* eslint-enable no-alert */
            });
        },
        _getName: function _getName(filepath) {

            return filepath.split('/').pop();
        },
        _fetchValueFromFiles: function _fetchValueFromFiles() {

            var value = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.data.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var file = _step.value;


                    if (file.path) {

                        value.push({
                            name: file.name || this._getName(file.path),
                            path: file.path
                        });
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return value;
        },
        _syncFilesFromValue: function _syncFilesFromValue() {

            var files = [];
            var values = this.get();

            this.data.files = [];

            if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object' || !(values instanceof Array)) {

                return;
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;


                    if (value.path) {

                        this._createNewFileObj({
                            path: value.path,
                            status: 'done'
                        });
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return files;
        },
        _createNewFileObj: function _createNewFileObj(options) {

            var fileObj = (0, _extend2.default)(true, {
                file: undefined,
                name: undefined,
                status: 'wait',
                uploadnow: false,
                size: 0,
                data: undefined,
                path: undefined,
                classList: {
                    fail: false,
                    uploading: false,
                    uploaded: false,
                    done: false,
                    wait: true,
                    verification: false,
                    failNote: ''
                }
            }, options);

            var index = this.data.files.push(fileObj) - 1;

            if (fileObj.file) {

                fileObj.size = fileObj.file.size;
                fileObj.name = fileObj.file.name;
            } else if (fileObj.path) {

                fileObj.name = this._getName(fileObj.path);
            }

            this._setStatus(index, fileObj.status);

            return {
                index: index,
                fileObj: fileObj
            };
        },
        _getFiles: function _getFiles(evt) {

            var files = evt.target.files || evt.dataTransfer.files;
            var len = files.length;

            if (!this.conf.multi && len > 1) {

                len = 1;
            }

            for (var i = 0; i < len; i++) {

                this._addFile(files.item(i));
            }

            this.data.inputKey++;
        },
        _addFile: function _addFile(file) {
            var _createNewFileObj2 = this._createNewFileObj({
                file: file,
                uploadnow: true
            }),
                index = _createNewFileObj2.index;

            if (!/^(http|https|\/\/)/.test(file.path)) {

                this._upload(index);
            }
        },
        _removeFile: function _removeFile(index) {

            this.data.files.splice(index, 1);
            this.data.failNote = '';
            this._set(this._fetchValueFromFiles(), true, true);
        },
        _upload: function _upload(index) {

            this.data.uploadQueue.push(index);
            this._execUploadQueue();
        },
        _execUploadOnce: function _execUploadOnce() {
            var _this2 = this;

            if (this.data.uploadQueue.length === 0) {

                this.data.uploading = false;

                return;
            }

            var index = this.data.uploadQueue.shift(),
                uploadObj = {};

            Promise.resolve().then(function () {

                _this2._setStatus(index, 'verification');

                // do not use this.ismax
                if (_this2.conf.max && _this2.data.value.length >= _this2.conf.max) {

                    return Promise.reject('upload file num is max.');
                }

                uploadObj.file = _this2.data.files[index].file;
                uploadObj.name = _this2.data.files[index].name;

                if (typeof _this2.conf.validate === 'function') {

                    return _this2.conf.validate(uploadObj.file);
                }

                return true;
            }).then(function (result) {

                if (typeof result === 'string') {

                    _this2.data.failNote = result;

                    return Promise.reject('file not pass validate.');
                }

                _this2._setStatus(index, 'uploading');

                if ((!_this2.conf.uploader || typeof _this2.conf.uploader !== 'function') && (_this2.morning._options.uploader === null || typeof _this2.morning._options.uploader !== 'function')) {

                    return Promise.reject('file uploader must be a function.');
                }
            }).then(function () {

                if (typeof _this2.conf.uploader === 'function') {

                    return _this2.conf.uploader(uploadObj);
                }

                return _this2.morning._options.uploader(uploadObj);
            }).then(function (result) {

                if (_this2.data.uploading === false) {

                    return;
                }

                if (result.status) {

                    _this2.data.files[index].path = result.path;
                    _this2.data.files[index].name = _this2._getName(result.path);
                    _this2.data.files[index].data = result.data;
                    _this2._set(_this2._fetchValueFromFiles(), true, true);
                    _this2._setStatus(index, 'uploaded');
                    _this2._setStatus(index, 'done');
                    _this2._execUploadOnce();
                } else {

                    _this2.data.failNote = result.message || '上传失败';
                    _this2._setStatus(index, 'fail');
                    _this2._execUploadOnce();
                }
            }).catch(function () {

                if (_this2.data.uploading === false) {

                    return;
                }

                _this2._setStatus(index, 'fail');
                _this2._execUploadOnce();
            });
        },
        _execUploadQueue: function _execUploadQueue() {

            if (this.data.uploading) {

                return;
            }

            this.data.failNote = '';
            this.data.uploading = true;
            this._execUploadOnce();
        },
        _setStatus: function _setStatus(index, status) {

            // status include: wait/uploading/done/fail/uploaded
            this.data.files[index].status = status;

            for (var key in this.data.files[index].classList) {

                if (key !== status) {

                    this.data.files[index].classList[key] = false;
                } else {

                    this.data.files[index].classList[key] = true;
                }
            }
        },
        _set: function _set(value) {
            var ignoreDisable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            if (this.conf.state === 'disabled' && !ignoreDisable) {

                this._syncFilesFromValue();

                return this;
            }

            var val = void 0;

            if (!origin) {

                this.data.uploading = false;
                this.data.uploadQueue = [];
            }

            try {

                val = JSON.parse(value);
            } catch (e) {

                val = value;
            }

            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {

                if (JSON.stringify(val) !== JSON.stringify(this.data.value)) {

                    this.data.value = val;
                }
            } else {

                this.data.value = value;
            }

            if (!origin) {

                this._syncFilesFromValue();
            }

            return this;
        },
        uploadUrl: function uploadUrl(url) {

            if (!this.conf.allowUrl) {

                return this;
            }

            this._fetchRemoteFile(url);

            return this;
        },
        isUploading: function isUploading() {

            return !!this.data.uploading;
        }
    },
    created: function created() {},
    mounted: function mounted() {

        this.set(this.data.value);
    }
};
module.exports = exports['default'];

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(303);

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(18);
var Axios = __webpack_require__(305);
var defaults = __webpack_require__(11);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(22);
axios.CancelToken = __webpack_require__(320);
axios.isCancel = __webpack_require__(21);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(321);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 304 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(11);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(315);
var dispatchRequest = __webpack_require__(316);
var isAbsoluteURL = __webpack_require__(318);
var combineURLs = __webpack_require__(319);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 306 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(20);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(317);
var isCancel = __webpack_require__(21);
var defaults = __webpack_require__(11);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(22);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-upload', {
    class: [_vm.stateClass, _vm.moreClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "item-name": _vm.itemName,
      "accept-type": _vm.acceptType,
      "multi": _vm.multi,
      "max": _vm.max,
      "allow-url": _vm.allowUrl,
      "allow-drag": _vm.allowDrag,
      "validate": _vm.validate,
      "uploader": _vm.uploader
    },
    on: {
      "dragover": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm._dragover($event)
      },
      "dragleave": _vm._dragleave,
      "drop": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm._drop($event)
      }
    }
  }, [_c('input', {
    key: _vm.data.inputKey,
    staticClass: "fileinput",
    attrs: {
      "type": "file",
      "id": 'ui-select-fileinput-' + _vm.uiid,
      "accept": _vm.conf.acceptType,
      "multiple": _vm.conf.multi
    },
    on: {
      "change": _vm._getFiles
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "filelist"
  }, [(!_vm.conf.hideName) ? _c('p', {
    staticClass: "name"
  }, [_c('morning-center', {
    staticClass: "fill"
  }, [_vm._v(_vm._s(_vm.conf.formName))])], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "filewrap",
    class: {
      hidename: _vm.conf.hideName
    }
  }, [_vm._l((_vm.data.files), function(item, index) {
    return (typeof item === 'object') ? [_c('a', {
      key: index,
      staticClass: "file",
      class: item.classList,
      attrs: {
        "target": "_blank;",
        "href": item.path || 'javascript:;',
        "index": index
      }
    }, [_c('i', {
      staticClass: "progress"
    }), _vm._v(" "), _c('span', [_vm._v("\n                    " + _vm._s(item.name) + "\n                ")]), _vm._v(" "), _c('i', {
      staticClass: "morningicon remove",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm._removeFile(index)
        }
      }
    }, [_vm._v("")]), _vm._v(" "), _c('i', {
      staticClass: "morningicon uploading",
      attrs: {
        "title": "上传中"
      }
    }, [_vm._v("")]), _vm._v(" "), _c('i', {
      staticClass: "morningicon reupload",
      attrs: {
        "title": "重新上传"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm._upload(index)
        }
      }
    }, [_vm._v("")])])] : _vm._e()
  }), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.conf.allowUrl) ? [(_vm.conf.state !== 'disabled' && !_vm.ismax) ? _c('label', {
    staticClass: "add file local",
    attrs: {
      "for": 'ui-select-fileinput-' + _vm.uiid
    }
  }, [_c('span', [_vm._v("本地上传" + _vm._s(_vm.conf.itemName))]), _vm._v(" "), _c('i', {
    staticClass: "morningicon local"
  }, [_vm._v("")])]) : _vm._e(), _vm._v(" "), (_vm.conf.state !== 'disabled' && !_vm.ismax) ? _c('label', {
    staticClass: "add file url",
    class: {
      loading: _vm.data.fetchRemoteFile
    },
    on: {
      "click": function($event) {
        _vm._uploadRemoteFile()
      }
    }
  }, [_c('span', [_vm._v("URL上传" + _vm._s(_vm.conf.itemName))]), _vm._v(" "), _c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    staticClass: "morningicon load"
  }, [_vm._v("")])]) : _vm._e()] : [(_vm.conf.state !== 'disabled' && !_vm.ismax) ? _c('label', {
    staticClass: "add file",
    attrs: {
      "for": 'ui-select-fileinput-' + _vm.uiid
    }
  }, [_c('span', [_vm._v("上传" + _vm._s(_vm.conf.itemName))]), _vm._v(" "), _c('i', {
    staticClass: "morningicon local"
  }, [_vm._v("")])]) : _vm._e()], _vm._v(" "), (_vm.data.failNote) ? _c('p', {
    staticClass: "status"
  }, [_vm._v(_vm._s(_vm.data.failNote))]) : _vm._e(), _vm._v(" "), (_vm.ismax) ? _c('span', {
    staticClass: "max"
  }, [_vm._v("最多只能上传" + _vm._s(_vm.conf.max) + "个文件")]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "drag-note",
    class: {
      show: _vm.data.dragover
    }
  }, [_c('p', [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _vm._v(" 松开鼠标上传")])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-392f52b8", esExports)
  }
}

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28c6c8c4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(326);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(324)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28c6c8c4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/lib/components/imagemap/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28c6c8c4", Component.options)
  } else {
    hotAPI.reload("data-v-28c6c8c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 324 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _Move = __webpack_require__(10);

var _Move2 = _interopRequireDefault(_Move);

var _GlobalEvent = __webpack_require__(5);

var _GlobalEvent2 = _interopRequireDefault(_GlobalEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zoneMinSize = 4;

exports.default = {
    origin: 'Form',
    name: 'imagemap',
    mixins: [_Move2.default, _GlobalEvent2.default],
    props: {
        allowUrl: {
            type: Boolean,
            default: false
        },
        allowDrag: {
            type: Boolean,
            default: false
        },
        multi: {
            type: Boolean,
            default: false
        },
        validate: {
            type: Function,
            default: function _default() {
                return {};
            }
        },
        uploader: {
            type: Function,
            default: undefined
        },
        cleanZone: {
            type: Boolean,
            default: true
        },
        max: {
            type: Number,
            default: 1
        },
        forbid: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    computed: {
        _conf: function _conf() {

            return {
                allowUrl: this.allowUrl,
                allowDrag: this.allowDrag,
                multi: this.multi,
                validate: this.validate,
                uploader: this.uploader,
                cleanZone: this.cleanZone,
                max: this.max,
                forbid: this.forbid
            };
        }
    },
    data: function data() {

        return {
            data: {
                inited: false,
                uploadValueSet: false,
                uploadValueChanging: false,
                syncing: false,
                zoneId: 0,
                images: [],
                imagesLoading: false,
                moveZoneId: null,
                // containerCalibrate : {
                //     x : 0,
                //     y : 0
                // },
                overRange: false,
                autoScrollCheck: null,
                // resizing : false,
                resizeZoneId: null,
                resizeZoneEl: null,
                resizeZoneType: null,
                resizeZoneLastXY: {
                    x: 0,
                    y: 0
                },
                zones: [],
                modifyZoneId: null,
                modifyZoneBasic: {},
                modifyZoneData: undefined
            }
        };
    },
    methods: {
        _valueFilter: function _valueFilter(value) {

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null || Object.prototype.toString.call(value) !== '[object Object]' || _typeof(value.images) !== 'object' || _typeof(value.zones) !== 'object' || !(value.images instanceof Array) || !(value.zones instanceof Array) || typeof value.w !== 'number' || typeof value.h !== 'number') {

                value = {
                    images: [],
                    zones: [],
                    w: 0,
                    h: 0
                };
            }

            return value;
        },
        _createZone: function _createZone(evt) {
            var _this = this;

            if (this.conf.state === 'disabled') {

                return;
            }

            if (evt.srcElement.classList.value.split(' ').indexOf('zonearea') === -1) {

                return;
            }

            var x = evt.x;
            var y = evt.y;
            var $zonearea = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('.zonearea');
            var areaX = $zonearea.getBoundingClientRect().x;
            var areaY = $zonearea.getBoundingClientRect().y;
            var id = void 0;

            id = this.addZone({
                x: x - areaX,
                y: y - areaY
            });

            this.Vue.nextTick(function () {

                _this._reizeZoneStart(evt, id, 'bottomright');
            });
        },
        _resizeZoneMove: function _resizeZoneMove(evt) {

            var zone = this.data.zones[this.data.resizeZoneId];
            var $zonearea = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('.zonearea');
            var $zone = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('[zone-id="' + this.data.resizeZoneId + '"]');
            var x = +zone.x;
            var y = +zone.y;
            var w = +zone.w;
            var h = +zone.h;
            var ox = void 0,
                oy = void 0,
                ow = void 0,
                oh = void 0;

            this._resizeClean();

            this.data.resizeZoneEl.classList.add('resize-' + this.data.resizeZoneType);
            this.data.resizeZoneEl.classList.add('resize');
            $zonearea.classList.add('resize-' + this.data.resizeZoneType);

            if (/right/.test(this.data.resizeZoneType)) {

                ow = w;
                w += evt.x - this.data.resizeZoneLastXY.x;

                if (w < zoneMinSize) {

                    this._resizeClean();

                    this.data.resizeZoneType = this.data.resizeZoneType.replace('right', 'left');
                    this.data.resizeZoneEl.classList.add('resize-' + this.data.resizeZoneType);
                    this.data.resizeZoneEl.classList.add('resize');
                    $zonearea.classList.add('resize-' + this.data.resizeZoneType);

                    if (w > -zoneMinSize) {

                        zone.w = zoneMinSize;
                        zone.x -= zone.w;
                        this.data.resizeZoneLastXY.x = $zone.getBoundingClientRect().x - zone.w;
                    } else {

                        zone.w = Math.abs(w);
                        zone.x -= zone.w;
                        this.data.resizeZoneLastXY.x = $zone.getBoundingClientRect().x - zone.w;
                    }

                    return;
                }

                if (w + x > $zonearea.clientWidth) {

                    w = $zonearea.clientWidth - x;
                    this.data.overRange = true;
                } else {

                    this.data.overRange = false;
                }
            }

            if (/left/.test(this.data.resizeZoneType)) {

                ox = x;
                ow = w;
                x += evt.x - this.data.resizeZoneLastXY.x;
                w -= evt.x - this.data.resizeZoneLastXY.x;

                if (w < zoneMinSize) {

                    this._resizeClean();

                    this.data.resizeZoneType = this.data.resizeZoneType.replace('left', 'right');
                    this.data.resizeZoneEl.classList.add('resize-' + this.data.resizeZoneType);
                    this.data.resizeZoneEl.classList.add('resize');
                    $zonearea.classList.add('resize-' + this.data.resizeZoneType);

                    if (w > -zoneMinSize) {

                        zone.w = zoneMinSize;
                        zone.x += ow;
                        this.data.resizeZoneLastXY.x = $zone.getBoundingClientRect().x + ow;
                    } else {

                        zone.w = Math.abs(w + ow);
                        zone.x += ow;
                        this.data.resizeZoneLastXY.x = $zone.getBoundingClientRect().x + ow;
                    }

                    return;
                }

                if (x < 0) {

                    x = 0;
                    w = ow - (x - ox);
                    this.data.overRange = true;
                } else {

                    this.data.overRange = false;
                }
            }

            if (/bottom/.test(this.data.resizeZoneType)) {

                oh = h;
                h += evt.y - this.data.resizeZoneLastXY.y;

                if (h < zoneMinSize) {

                    this._resizeClean();

                    this.data.resizeZoneType = this.data.resizeZoneType.replace('bottom', 'top');
                    this.data.resizeZoneEl.classList.add('resize-' + this.data.resizeZoneType);
                    this.data.resizeZoneEl.classList.add('resize');
                    $zonearea.classList.add('resize-' + this.data.resizeZoneType);

                    if (h > -zoneMinSize) {

                        zone.h = zoneMinSize;
                        zone.y -= zone.h;
                        this.data.resizeZoneLastXY.y = $zone.getBoundingClientRect().y - zone.h;
                    } else {

                        zone.h = Math.abs(h);
                        zone.y -= zone.h;
                        this.data.resizeZoneLastXY.y = $zone.getBoundingClientRect().y - zone.h;
                    }

                    return;
                }

                if (h + y > $zonearea.clientHeight) {

                    h = $zonearea.clientHeight - y;
                    this.data.overRange = true;
                } else {

                    this.data.overRange = false;
                }
            }

            if (/top/.test(this.data.resizeZoneType)) {

                oy = y;
                oh = h;
                y += evt.y - this.data.resizeZoneLastXY.y;
                h -= evt.y - this.data.resizeZoneLastXY.y;

                if (h < zoneMinSize) {

                    this._resizeClean();

                    this.data.resizeZoneType = this.data.resizeZoneType.replace('top', 'bottom');
                    this.data.resizeZoneEl.classList.add('resize-' + this.data.resizeZoneType);
                    this.data.resizeZoneEl.classList.add('resize');
                    $zonearea.classList.add('resize-' + this.data.resizeZoneType);

                    if (h > -zoneMinSize) {

                        zone.h = zoneMinSize;
                        zone.y += oh;
                        this.data.resizeZoneLastXY.y = $zone.getBoundingClientRect().y + oh;
                    } else {

                        zone.h = Math.abs(h + oh);
                        zone.y += oh;
                        this.data.resizeZoneLastXY.y = $zone.getBoundingClientRect().y + oh;
                    }

                    return;
                }

                if (y < 0) {

                    y = 0;
                    h = oh - (y - oy);
                    this.data.overRange = true;
                } else {

                    this.data.overRange = false;
                }
            }

            this.data.resizeZoneLastXY.x = evt.x;
            this.data.resizeZoneLastXY.y = evt.y;

            zone.x = x;
            zone.y = y;
            zone.h = h;
            zone.w = w;
        },
        _reizeZoneStart: function _reizeZoneStart(evt, id, type) {

            if (this.conf.state === 'disabled') {

                return;
            }

            var $zone = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('[zone-id="' + id + '"]');

            this.data.resizeZoneEl = $zone;
            this.data.resizeZoneId = id;
            this.data.resizeZoneType = type;
            this.data.resizeZoneLastXY.x = evt.x;
            this.data.resizeZoneLastXY.y = evt.y;

            this._globalEventAdd('mousemove', '_resizeZoneMove');
            this._globalEventAdd('mouseup', '_resizeZoneStop');
        },
        _resizeClean: function _resizeClean() {

            var $zonearea = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('.zonearea');

            this.data.resizeZoneEl.classList.remove('resize-top');
            this.data.resizeZoneEl.classList.remove('resize-bottom');
            this.data.resizeZoneEl.classList.remove('resize-left');
            this.data.resizeZoneEl.classList.remove('resize-right');
            this.data.resizeZoneEl.classList.remove('resize-topleft');
            this.data.resizeZoneEl.classList.remove('resize-topright');
            this.data.resizeZoneEl.classList.remove('resize-bottomleft');
            this.data.resizeZoneEl.classList.remove('resize-bottomright');
            this.data.resizeZoneEl.classList.remove('resize');

            $zonearea.classList.remove('resize-top');
            $zonearea.classList.remove('resize-bottom');
            $zonearea.classList.remove('resize-left');
            $zonearea.classList.remove('resize-right');
            $zonearea.classList.remove('resize-topleft');
            $zonearea.classList.remove('resize-topright');
            $zonearea.classList.remove('resize-bottomleft');
            $zonearea.classList.remove('resize-bottomright');
        },
        _resizeZoneStop: function _resizeZoneStop(evt) {

            evt.stopPropagation();

            this._resizeClean();

            this._globalEventRemove('mousemove', '_resizeZoneMove');
            this._globalEventRemove('mouseup', '_resizeZoneStop');

            this.data.overRange = false;
        },
        _zoneRangeFilter: function _zoneRangeFilter(zone) {

            var $zonearea = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('.zonearea');

            if (zone.x < 0) {

                zone.x = 0;
            }

            if (zone.x + zone.w > $zonearea.clientWidth) {

                if (zone.w < $zonearea.clientWidth) {

                    zone.x = $zonearea.clientWidth - zone.w;
                } else if (zone.x < $zonearea.clientWidth) {

                    zone.w = $zonearea.clientWidth - zone.x;
                } else {

                    zone.x = 0;
                    zone.w = $zonearea.clientWidth;
                }
            }

            if (zone.y < 0) {

                zone.y = 0;
            }

            if (zone.y + zone.h > $zonearea.clientHeight) {

                if (zone.h < $zonearea.clientHeight) {

                    zone.y = $zonearea.clientHeight - zone.h;
                } else if (zone.y < $zonearea.clientHeight) {

                    zone.h = $zonearea.clientHeight - zone.y;
                } else {

                    zone.y = 0;
                    zone.h = $zonearea.clientHeight;
                }
            }

            if (zone.w < zoneMinSize) {

                zone.w = zoneMinSize;
            }

            if (zone.h < zoneMinSize) {

                zone.h = zoneMinSize;
            }
        },
        _saveZoneModify: function _saveZoneModify() {

            var id = this.data.modifyZoneId;

            this.updateZone(id, {
                w: +this.data.modifyZoneBasic.w,
                h: +this.data.modifyZoneBasic.h,
                x: +this.data.modifyZoneBasic.x,
                y: +this.data.modifyZoneBasic.y,
                i: +this.data.modifyZoneBasic.i,
                data: this.morning.getGroup('ui-imagemap-data-' + this.uiid)
            });

            this.$refs['ui-imagemap-zonedialog-' + this.uiid].toggle(false);
        },
        _removeZone: function _removeZone() {

            this.removeZone(this.data.modifyZoneId);
            this.$refs['ui-imagemap-zonedialog-' + this.uiid].toggle(false);
        },
        _openZoneModify: function _openZoneModify(id) {

            var zone = this.data.zones[id];

            this.data.modifyZoneId = id;
            this.data.modifyZoneBasic = {
                w: zone.w,
                h: zone.h,
                x: zone.x,
                y: zone.y,
                i: zone.i
            };
            this.morning.cleanGroup('ui-imagemap-data-' + this.uiid);
            this.morning.setGroup('ui-imagemap-data-' + this.uiid, zone.data || {});
            this.$refs['ui-imagemap-zonedialog-' + this.uiid].toggle(true);
        },
        _openMap: function _openMap() {
            var _this2 = this;

            this.$refs['ui-imagemap-mapdialog-' + this.uiid].toggle(true);

            if (this.conf.state === 'disabled') {

                return;
            }

            setTimeout(function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {

                    for (var _iterator = _this2.data.zones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var zone = _step.value;


                        _this2._zoneRangeFilter(zone);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this2._updateMoveRange();
                _this2.Move.target = '.zone';
                _this2.Move.scrollContainer = '.body';
                _this2.Move.container = '.zonearea';
                _this2.Move.$root = _this2.$refs['ui-imagemap-mapdialog-' + _this2.uiid].$el;
                _this2.Move.delay = 0;
                _this2.Move.type = 'absolute';
                _this2.Move.can = true;
            });
        },
        _uploadValueChange: function _uploadValueChange() {
            var _this3 = this;

            var upload = this.$refs['ui-imagemap-upload-' + this.uiid];

            if (!this.data.inited) {

                return;
            }

            if (upload.isUploading()) {

                return;
            }

            var images = upload.get();
            var loadList = [];

            if (this.conf.cleanZone && !this.data.uploadValueSet) {

                this.cleanZones();
            }

            this.data.imagesLoading = true;

            var _loop = function _loop(image) {

                var imgEle = new Image();

                imgEle.src = image.path;

                loadList.push(new Promise(function (resolve) {

                    imgEle.addEventListener('load', resolve);
                }));
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = images[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var image = _step2.value;

                    _loop(image);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            Promise.all(loadList).then(function () {

                _this3.data.uploadValueChanging = true;
                _this3.data.imagesLoading = false;
                _this3.data.images = images;
            });
        },
        _updateMoveRange: function _updateMoveRange() {

            var $zonearea = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('.zonearea');

            this.Move.range = [0, 0, $zonearea.clientWidth, $zonearea.clientHeight];
        },
        _dropZone: function _dropZone() {},
        _moveZone: function _moveZone(id, x, y) {

            var zone = this.data.zones[id];

            if (zone) {

                zone.x = x;
                zone.y = y;
            }
        },
        _syncFromValue: function _syncFromValue() {
            var _this4 = this;

            var value = this.get();

            this.data.syncing = true;

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {

                this.data.images = value.images || [];
                this.data.zones = value.zones || [];
            } else {

                this.data.images = [];
                this.data.zones = [];
            }

            this.Vue.nextTick(function () {

                _this4.data.syncing = false;
            });
        },
        _syncFromZoneImage: function _syncFromZoneImage() {

            if (this.data.syncing) {

                return;
            }

            var result = {};
            var $zonearea = this.$refs['ui-imagemap-mapdialog-' + this.uiid].$el.querySelector('.zonearea');

            result.images = this.data.images;
            result.zones = this.data.zones;
            result.w = $zonearea.clientWidth;
            result.h = $zonearea.clientHeight;

            this._set(result, true);
        },
        set: function set(value) {

            var result = this._set(value);

            this._syncFromValue();

            return result;
        },
        addZone: function addZone(zone) {

            zone = (0, _extend2.default)({
                w: zoneMinSize,
                h: zoneMinSize,
                x: 0,
                y: 0,
                i: 0,
                data: undefined
            }, zone);

            this._zoneRangeFilter(zone);

            var index = this.data.zones.push(zone);

            return index - 1;
        },
        removeZone: function removeZone(index) {

            this.data.zones.splice(index, 1);

            return this;
        },
        updateZone: function updateZone(index, zone) {

            zone.w = +zone.w;
            zone.h = +zone.h;
            zone.x = +zone.x;
            zone.y = +zone.y;
            zone.i = +zone.i || 0;

            (0, _extend2.default)(true, this.data.zones[index], zone);

            this._zoneRangeFilter(this.data.zones[index]);

            if (this.data.zones[index].i < 1) {

                this.data.zones[index].i = 0;
            }

            if (this.data.zones[index].data === undefined) {

                delete this.data.zones[index].data;
            }

            return this;
        },
        cleanZones: function cleanZones() {

            this.data.zones = [];

            return this;
        }
    },
    created: function created() {},
    mounted: function mounted() {
        var _this5 = this;

        this.$watch('data.zones', function () {

            _this5._syncFromZoneImage();
        }, {
            deep: true
        });

        this.$watch('data.images', function () {

            if (_this5.data.uploadValueChanging) {

                _this5.data.uploadValueChanging = false;

                return;
            }

            _this5._syncFromZoneImage();
            _this5.data.uploadValueSet = true;
            _this5.$refs['ui-imagemap-upload-' + _this5.uiid]._set(_this5.data.images, true);
            _this5.Vue.nextTick(function () {

                _this5.data.uploadValueSet = false;
            });
        }, {
            deep: true
        });

        this.set(this.data.value);

        this.Vue.nextTick(function () {

            _this5.data.inited = true;
        });

        this.$on('_moveOnXMin', function () {
            return _this5.data.overRange = true;
        });
        this.$on('_moveOnYMin', function () {
            return _this5.data.overRange = true;
        });
        this.$on('_moveOnXMax', function () {
            return _this5.data.overRange = true;
        });
        this.$on('_moveOnYMax', function () {
            return _this5.data.overRange = true;
        });
        this.$on('_moveOffXMin', function () {
            return _this5.data.overRange = false;
        });
        this.$on('_moveOffYMin', function () {
            return _this5.data.overRange = false;
        });
        this.$on('_moveOffXMax', function () {
            return _this5.data.overRange = false;
        });
        this.$on('_moveOffYMax', function () {
            return _this5.data.overRange = false;
        });

        this.$on('_moveStarted', function () {

            _this5.data.moveZoneId = _this5.Move.$moveDragItem.getAttribute('zone-id');
        });

        this.$on('_moveEnded', function () {

            if (_this5.data.moveZoneId !== null) {

                _this5._moveZone(_this5.data.moveZoneId, _this5.Move.current.x, _this5.Move.current.y);
            }

            _this5.data.overRange = false;
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('mor-imagemap', {
    class: [_vm.stateClass],
    attrs: {
      "_uiid": _vm.uiid,
      "form-name": _vm.formName,
      "form-key": _vm.formKey,
      "group": _vm.group,
      "default-value": _vm.defaultValue,
      "hide-name": _vm.hideName,
      "allow-url": _vm.allowUrl,
      "allow-drag": _vm.allowDrag,
      "multi": _vm.multi,
      "validate": _vm.validate,
      "uploader": _vm.uploader,
      "clean-zone": _vm.cleanZone,
      "max": _vm.max,
      "forbid": _vm.forbid
    }
  }, [_c('morning-upload', {
    ref: 'ui-imagemap-upload-' + _vm.uiid,
    attrs: {
      "form-name": _vm.conf.formName,
      "max": _vm.conf.max,
      "multi": _vm.conf.multi,
      "allow-url": _vm.conf.allowUrl,
      "allow-drag": _vm.conf.allowDrag,
      "validate": _vm.conf.validate,
      "uploader": _vm.conf.uploader,
      "state": _vm.conf.state,
      "accept-type": "image/*"
    },
    on: {
      "value-change": _vm._uploadValueChange
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.imagesLoading || _vm.data.images.length > 0),
      expression: "data.imagesLoading || data.images.length > 0"
    }],
    staticClass: "operate",
    class: {
      loading: _vm.data.imagesLoading
    }
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.imagesLoading),
      expression: "data.imagesLoading"
    }]
  }, [_vm._v("获取图片中...")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.data.imagesLoading && _vm.data.images.length > 0),
      expression: "!data.imagesLoading && data.images.length > 0"
    }],
    staticClass: "modify-map",
    on: {
      "click": _vm._openMap
    }
  }, [(_vm.conf.state === 'disabled') ? [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _vm._v(" 查看热区\n        ")] : [_c('i', {
    staticClass: "morningicon"
  }, [_vm._v("")]), _vm._v(" 绘制热区\n        ")]], 2)]), _vm._v(" "), _c('morning-dialog', {
    ref: 'ui-imagemap-mapdialog-' + _vm.uiid,
    staticClass: "mor-imagemap-dialog-map show-no-animate",
    class: {
      'imagemap-disabled': _vm.conf.state === 'disabled'
    },
    attrs: {
      "color": "gray",
      "width": "60%",
      "height": "90%",
      "auto-close": false
    }
  }, [_c('header', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [(_vm.conf.state === 'disabled') ? [_vm._v("\n            查看热区\n        ")] : [_vm._v("\n            绘制热区\n        ")]], 2), _vm._v(" "), _c('div', {
    staticClass: "maparea"
  }, [_c('div', {
    staticClass: "zonearea",
    class: {
      'over-range': _vm.data.overRange
    },
    on: {
      "mousedown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
        if ('button' in $event && $event.button !== 0) { return null; }
        $event.stopPropagation();
        _vm._createZone($event)
      }
    }
  }, _vm._l((_vm.data.zones), function(zone, index) {
    return _c('div', {
      staticClass: "zone",
      style: ({
        width: zone.w + 'px',
        height: zone.h + 'px',
        top: zone.y + 'px',
        left: zone.x + 'px',
        'z-index': (zone.i || (index + 1))
      }),
      attrs: {
        "zone-id": index
      },
      on: {
        "mousedown": function($event) {
          _vm._moveItemRecord(index)
        },
        "drop": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm._dropZone($event)
        },
        "contextmenu": function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          _vm._openZoneModify(index)
        }
      }
    }, [_c('div', {
      staticClass: "topleft",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'topleft')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "top",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'top')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "topright",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'topright')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "right",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'right')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "bottomright",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'bottomright')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "bottom",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'bottom')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "bottomleft",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'bottomleft')
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "left",
      on: {
        "mousedown": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "left", 37, $event.key)) { return null; }
          if ('button' in $event && $event.button !== 0) { return null; }
          $event.stopPropagation();
          _vm._reizeZoneStart($event, index, 'left')
        }
      }
    })])
  })), _vm._v(" "), _vm._l((_vm.data.images), function(image) {
    return [_c('img', {
      attrs: {
        "src": image.path
      }
    })]
  })], 2), _vm._v(" "), _c('footer', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('span', [_vm._v("鼠标左键拖拽移动热区/调整尺寸，鼠标右键点击编辑数据")]), _vm._v(" "), _c('div', [_c('ui-btn', {
    attrs: {
      "color": "minor"
    },
    on: {
      "emit": function($event) {
        _vm.morning.findVM('ui-imagemap-mapdialog-' + _vm.uiid).toggle(false)
      }
    }
  }, [_vm._v("关闭")])], 1)])]), _vm._v(" "), _c('morning-dialog', {
    ref: 'ui-imagemap-zonedialog-' + _vm.uiid,
    staticClass: "mor-imagemap-dialog-zone",
    attrs: {
      "color": "gray",
      "width": "600px",
      "height": "90%"
    }
  }, [_c('header', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("\n        编辑热区\n    ")]), _vm._v(" "), _c('morning-tab', {
    staticClass: "block"
  }, [(_vm.$scopedSlots.default || _vm.$slots.default) ? _c('div', {
    attrs: {
      "slot": "数据"
    },
    slot: "数据"
  }, [_vm._t("default", null, {
    group: 'ui-imagemap-data-' + _vm.uiid
  })], 2) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "位置"
    },
    slot: "位置"
  }, [_c('ui-formgroup', [_c('div', {
    staticClass: "item"
  }, [_c('h5', {
    staticClass: "title"
  }, [_c('ui-center', {
    staticClass: "fill"
  }, [_vm._v("Width")])], 1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('p', [_vm._v("仅支持数字")]), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('ui-textinput', {
    attrs: {
      "group": 'ui-imagemap-basicset-' + _vm.uiid,
      "form-key": "w"
    },
    model: {
      value: (_vm.data.modifyZoneBasic.w),
      callback: function($$v) {
        _vm.$set(_vm.data.modifyZoneBasic, "w", $$v)
      },
      expression: "data.modifyZoneBasic.w"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('h5', {
    staticClass: "title"
  }, [_c('ui-center', {
    staticClass: "fill"
  }, [_vm._v("Height")])], 1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('p', [_vm._v("仅支持数字")]), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('ui-textinput', {
    attrs: {
      "group": 'ui-imagemap-basicset-' + _vm.uiid,
      "form-key": "h"
    },
    model: {
      value: (_vm.data.modifyZoneBasic.h),
      callback: function($$v) {
        _vm.$set(_vm.data.modifyZoneBasic, "h", $$v)
      },
      expression: "data.modifyZoneBasic.h"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('h5', {
    staticClass: "title"
  }, [_c('ui-center', {
    staticClass: "fill"
  }, [_vm._v("Left")])], 1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('p', [_vm._v("仅支持数字")]), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('ui-textinput', {
    attrs: {
      "group": 'ui-imagemap-basicset-' + _vm.uiid,
      "form-key": "x"
    },
    model: {
      value: (_vm.data.modifyZoneBasic.x),
      callback: function($$v) {
        _vm.$set(_vm.data.modifyZoneBasic, "x", $$v)
      },
      expression: "data.modifyZoneBasic.x"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('h5', {
    staticClass: "title"
  }, [_c('ui-center', {
    staticClass: "fill"
  }, [_vm._v("Top")])], 1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('p', [_vm._v("仅支持数字")]), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('ui-textinput', {
    attrs: {
      "group": 'ui-imagemap-basicset-' + _vm.uiid,
      "form-key": "y"
    },
    model: {
      value: (_vm.data.modifyZoneBasic.y),
      callback: function($$v) {
        _vm.$set(_vm.data.modifyZoneBasic, "y", $$v)
      },
      expression: "data.modifyZoneBasic.y"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('h5', {
    staticClass: "title"
  }, [_c('ui-center', {
    staticClass: "fill"
  }, [_vm._v("Index(层级)")])], 1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('p', [_vm._v("仅支持数字，0表示采用默认层级")]), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('ui-textinput', {
    attrs: {
      "group": 'ui-imagemap-basicset-' + _vm.uiid,
      "form-key": "i"
    },
    model: {
      value: (_vm.data.modifyZoneBasic.i),
      callback: function($$v) {
        _vm.$set(_vm.data.modifyZoneBasic, "i", $$v)
      },
      expression: "data.modifyZoneBasic.i"
    }
  })], 1)])])])], 1)]), _vm._v(" "), _c('footer', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('div', [_c('ui-link', {
    attrs: {
      "color": "minor"
    },
    on: {
      "emit": function($event) {
        _vm.morning.findVM('ui-imagemap-zonedialog-' + _vm.uiid).toggle(false)
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.conf.state !== 'disabled') ? _c('ui-btn', {
    attrs: {
      "color": "danger"
    },
    on: {
      "emit": _vm._removeZone
    }
  }, [_vm._v("删除")]) : _vm._e(), _vm._v(" "), (_vm.conf.state !== 'disabled') ? _c('ui-btn', {
    attrs: {
      "color": "success"
    },
    on: {
      "emit": _vm._saveZoneModify
    }
  }, [_vm._v("保存")]) : _vm._e()], 1)])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-28c6c8c4", esExports)
  }
}

/***/ })
/******/ ]);
});