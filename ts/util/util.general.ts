import { CONFIG_CONSTANTS } from "../config/game.config";

declare global {
    interface Array<T> {
        random(): T;
        equals(array: any[]): boolean;
        reverseIndex(startIndex: number): number;
        last(reverseIndex: number): T;
    }

    interface String {
        CapitalizeFirstLetterWord(): string;
        CapitalizeFirstLetterSentence(): string;
        format(): string;
        contains(value: string): boolean;
    }

    interface Number {
        clamp(min: number, max: number): number;
    }

    interface Math {
        randomSign(): -1 | 1;
    }
}

/**
 * Return a random element of the array.
 * Return null if array is empty.
 * @method Array.prototype.random
 * @returns {any} An element of the array.
 */
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}

/**
 * Checks whether the two arrays are same.
 *
 * @method Array.prototype.equals
 * @param {Array} array The array to compare to
 * @return {Boolean} True if the two arrays are same
 */
Array.prototype.equals = function (array) {
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
};

Array.prototype.reverseIndex = function (n = 0) {
    return this.length - 1 - n;
};

Array.prototype.last = function (n = 0) {
    if (isNaN(n)) throw new TypeError(`${n} must be a number`);
    return this[this.reverseIndex(n)];
};

String.prototype.CapitalizeFirstLetterWord = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.CapitalizeFirstLetterSentence = function () {
    const a = this.split(" ");
    for (var i = 0; i < a.length; i++) {
        a[i] = a[i].CapitalizeFirstLetterWord();
    }
    return a.join(" ");
};

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
 * @param {number} min The lower boundary
 * @param {number} max The upper boundary
 * @return {number} A number in the range (min, max)
 */
Number.prototype.clamp = function (min, max) {
    if (isNaN(min) || isNaN(max)) return this.valueOf();
    return Math.min(Math.max(this.valueOf(), min), max);
};


Math.randomSign = function () {
    return (Math.random() < 0.5) ? -1 : 1;
};

export function isNwJs() {
    return (typeof require === 'function' && typeof process === 'object');
}
export function isMobileDevice() {
    var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return !!navigator.userAgent.match(r);
}
export function isMobileSafari() {
    var agent = navigator.userAgent;
    return !!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) &&
        !agent.match('CriOS'));
}
export function isAndroidChrome() {
    var agent = navigator.userAgent;
    return !!(agent.match(/Android/) && agent.match(/Chrome/));
}
export function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //januar = 0
    let yyyy = today.getFullYear();

    switch (CONFIG_CONSTANTS.LANGUAGE) {
        case "fr":
            return dd + '/' + mm + '/' + yyyy;
        default:
            return mm + '/' + dd + '/' + yyyy;
    }
}
export function getExactDate() {
    var date = new Date();

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    switch (CONFIG_CONSTANTS.LANGUAGE) {
        case "fr":
            return ([padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear(),].join('/') + ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds()),].join(':'));
        default:
            return ([padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear(),].join('/') + ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds()),].join(':'));
    }
}
export function convertDate(mls: number) {
    if (!mls || isNaN(mls) || mls <= 1000) return "now";
    var ms = mls % (1000),
        s = Math.floor(mls / 1000) % (60),
        min = Math.floor(mls / (60 * 1000)) % (60),
        hour = Math.floor(mls / (60 * 60 * 1000)) % (24),
        day = Math.floor(mls / (24 * 60 * 60 * 1000)) % (31),
        month = Math.floor(mls / (31 * 24 * 60 * 60 * 1000)) % (12),
        year = Math.floor(mls / (12 * 31 * 24 * 60 * 60 * 1000));

    if (year == 1) return "last year";
    else if (year > 1) return `${year} years ago`;

    if (month == 1) return "last month";
    else if (month > 1) return `${month} months ago`;

    if (day == 1) return "yesterday";
    if (day >= 7 && day < 14) return "last week";
    else if (day >= 14) return `${Math.floor(day / 7)} weeks ago`;

    if (hour == 1) return "last hour";
    else if (hour > 1) return `${hour} hours ago`;

    if (min == 1) return "last minute";
    else if (min > 1) return `${min} minutes${s > 0 ? ` and ${s} seconds ago` : ""}`;
    else { return `${s} seconds ago`; }
}
export function RemoveDuplicate(a: any[]) { return Array.from(new Set(a)); }

export class Point2D {
    private X: number;
    private Y: number;
    constructor(pX = 0, pY = 0) {
        if (isNaN(pX)) pX = 0;
        if (isNaN(pY)) pY = 0;
        this.setX(pX);
        this.setY(pY);
    }
    getX() {
        return this.X;
    }
    setX(pX = 0) {
        this.X = pX;
    }
    getY() {
        return this.Y;
    }
    setY(pY = 0) {
        this.Y = pY;
    }
    from(pt) {
        let p = new Point2D();
        if (!pt) return p;
        if (pt.x) p.setX(pt.x);
        else p.setX(0);
        if (pt.y) p.setY(pt.y);
        else p.setX(0);
        return p;
    }
}

export class Vector2D {
    private X: number;
    private Y: number;
    constructor(pX = 0, pY = 0) {
        this.setX(pX);
        this.setY(pY);
    }
    getX() {
        return this.X;
    }
    setX(pX = 0) {
        this.X = pX;
    }
    getY() {
        return this.Y;
    }
    setY(pY = 0) {
        this.Y = pY;
    }
    add(v) {
        return new Vector2D(this.getX() + v.getX(), this.getY() + v.getY());
    }
    subtract(v) {
        return new Vector2D(this.getX() - v.getX(), this.getY() - v.getY());
    }
    multiply(scalar = 1) {
        return new Vector2D(this.getX() * scalar, this.getY() * scalar);
    }
    divide(scalar = 1) {
        if (scalar === 0 || isNaN(scalar)) return this;
        return new Vector2D(this.getX() / scalar, this.getY() / scalar);
    }
    length() {
        return Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY());
    }
    normalize() {
        return this.divide(this.length());
    }
    from(ptA = new Point2D(), ptB = new Point2D()) {
        return new Vector2D(ptB.getX() - ptA.getX(), ptB.getY() - ptA.getY());
    }
}