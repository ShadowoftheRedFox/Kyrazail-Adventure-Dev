/**
 * Built in translate switcher.
 * @param {string} str the default string to translate 
 * @param {array} [param=[]] 
 */
function translate(str, param) {
    switch (str) {
        case "a":
            return "a";
        default:
            return "undefined";
    }
}