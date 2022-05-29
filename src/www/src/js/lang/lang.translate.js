/**
 * Built in translate switcher.
 * @param {"fr" | "en"} lang language to translate
 * @param {string} str the default string to translate 
 * @param {array} [param=[]] the paramters of the string to translate, if there is.
 */
function translate(lang, str, ...param) {
    if (lang === "fr") {
        switch (str) {
            case "a":
                return "a";
            default:
                return "undefined";
        }
    } else {
        //if lang is unknown, translate in english
    }
}