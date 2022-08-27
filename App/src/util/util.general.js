/// <reference path="../../ts/type.d.ts"/>

/**
 * Return a random element of the array.
 * Return null if array is empty.
 * @method Array.prototype.random
 * @returns {any} An element of the array.
 */
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Object.defineProperties(Array.prototype, {
    /**
     * Checks whether the two arrays are same.
     *
     * @method Array.prototype.equals
     * @param {Array} array The array to compare to
     * @return {Boolean} True if the two arrays are same
     */
    equals: {
        enumerable: false,
        value: function (array) {
            if (!array || this.length !== array.length) {
                return false;
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].equals(array[i])) {
                        return false;
                    }
                } else if (this[i] !== array[i]) {
                    return false;
                }
            }
            return true;
        }
    },
    /**
     * Checks whether the array contains a given element.
     *
     * @method Array.prototype.contains
     * @param {Any} element The element to search for
     * @return {Boolean} True if the array contains a given element
     */
    contains: {
        enumerable: false,
        value: function (element) {
            return this.indexOf(element) >= 0;
        }
    }
});

/**
 * Replaces %1, %2 and so on in the string to the arguments.
 *
 * @method String.prototype.format
 * @param {Any} ...args The objects to format
 * @return {String} A formatted string
 * @example
 * "%1 %2 and %3".format("0", "8", "7") => "0 8 and 7"
 */
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/%([0-9]+)/g, function (s, n) {
        return args[Number(n) - 1];
    });
};

/**
 * Checks whether the string contains a given string.
 *
 * @method String.prototype.contains
 * @param {String} string The string to search for
 * @return {Boolean} True if the string contains a given string
 */
String.prototype.contains = function (string) {
    return this.indexOf(string) >= 0;
};


/**
 * Returns a number whose value is limited to the given range.
 *
 * @method Number.prototype.clamp
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @return {Number} A number in the range (min, max)
 */
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

/**
 * The static class that defines utility methods.
 *
 * @class Utils
 */
function Utils() {
    throw new Error('This is a static class');
}

/**
 * Checks whether the platform is NW.js.
 *
 * @static
 * @method isNwjs
 * @return {Boolean} True if the platform is NW.js
 */
Utils.isNwjs = function () {
    return typeof require === 'function' && typeof process === 'object';
};

/**
 * Checks whether the platform is a mobile device.
 *
 * @static
 * @method isMobileDevice
 * @return {Boolean} True if the platform is a mobile device
 */
Utils.isMobileDevice = function () {
    var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return !!navigator.userAgent.match(r);
};

/**
 * Checks whether the browser is Mobile Safari.
 *
 * @static
 * @method isMobileSafari
 * @return {Boolean} True if the browser is Mobile Safari
 */
Utils.isMobileSafari = function () {
    var agent = navigator.userAgent;
    return !!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) &&
        !agent.match('CriOS'));
};

/**
 * Checks whether the browser is Android Chrome.
 *
 * @static
 * @method isAndroidChrome
 * @return {Boolean} True if the browser is Android Chrome
 */
Utils.isAndroidChrome = function () {
    var agent = navigator.userAgent;
    return !!(agent.match(/Android/) && agent.match(/Chrome/));
};

/**
 * Return current date in dd/mm/yyyy format.
 * 
 * @static
 * @method getDate
 * @returns {string}
 * @example "19/05/2022"
 */
Utils.getDate = function () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //januar = 0
    let yyyy = today.getFullYear();

    switch (ConfigConst.LANGUAGE) {
        case "fr":
            return dd + '/' + mm + '/' + yyyy;
        default:
            return mm + '/' + dd + '/' + yyyy;
    }
};

/**
 * Return the exact date in dd/mm/yyyy hh:mm:ss format
 * 
 * @static 
 * @method getExactDate
 * @returns {string} exact date
 * @example '05/17/2012 10:52:21'
 */
Utils.getExactDate = function () {
    var date = new Date();

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    switch (ConfigConst.LANGUAGE) {
        case "fr":
            return ([padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear(),].join('/') + ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds()),].join(':'));
        default:
            return ([padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear(),].join('/') + ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds()),].join(':'));
    }
};

/**
 * Remove any duplicate from the array, so it has every item once.
 * 
 * @method RemoveDuplicate
 * @param {any[]} a The array we want to remove duplicates.
 * @return {any[]} The array without the duplicates.
 */
Utils.RemoveDuplicate = function (a) {
    return [...new Set(a)];
};