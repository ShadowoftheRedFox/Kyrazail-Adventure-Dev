/// <reference path="../../ts/type.d.ts"/>
/**
 * Generate a save token.
 * @param {any} data data the game, that will be encrypted.
 * @returns {string} the token;
 */
function tokenGeneration(data) {
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data, data, 5), key);
    //4d657373616765
    return encrypted;
}

/**
 * Decrypt a token, and verify its integrity
 * @param {string} token a token to decript 
 * @returns {object | boolean} object if the token is healthy, false if the token is unhealthy
 */
function tokenDecrypt(token) {
    var decrypted = CryptoJS.AES.decrypt(token, key).toString(CryptoJS.enc.Utf8);
    try {
        decrypted = JSON.parse(decrypted);
    } catch (e) { return false; }
    if (typeof (decrypted) !== "object") {
        return false;
    }
    return decrypted;
}

/**
 * Check if the given string is a json format.
 * @param {string} str 
 * @returns 
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Check if the given string is a game state
 * @param {string} str The string to test.
 * @returns {boolean}
 */
function isGameState(str) {
    console.log("Starting the verification of the game state...");
    if (IsJsonString(str) == false) return false;
    /**
     * @type {import("../../game").globalGame}
     */
    const obj = JSON.parse(str);
    console.log(obj);
    if (obj instanceof globalGame) return false;
    return true;
}