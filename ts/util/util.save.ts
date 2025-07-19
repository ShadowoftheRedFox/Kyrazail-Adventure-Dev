import { CONFIG_CONSTANTS } from "../config/game.config";

export function GameEncryptData(data: object) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CONFIG_CONSTANTS.KEY).toString();
}

export function GameDecrytpData(data: string) {
    return CryptoJS.AES.decrypt(data, CONFIG_CONSTANTS.KEY).toString(CryptoJS.enc.Utf8);
}

export function GameTestCryptInsecure() {
    var text = 'US0378331005-USD-US-en';
    var key = CONFIG_CONSTANTS.KEY;

    console.log('text:', text);

    // Fix: Use the Utf8 encoder
    var _text = CryptoJS.enc.Utf8.parse(text);
    // Fix: Use the Utf8 encoder (or apply in combination with the hex encoder a 32 hex digit key for AES-128)
    var _key = CryptoJS.enc.Utf8.parse(key);

    // Fix: Apply padding (e.g. Zero padding). Note that PKCS#7 padding is more reliable and that ECB is insecure
    var encrypted = CryptoJS.AES.encrypt(text, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });
    var _encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    console.log('encrypted', encrypted);

    // Fix: Pass a CipherParams object (or the Base64 encoded ciphertext)
    var decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Hex.parse(_encrypted).toString(), key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });

    // Fix: Utf8 decode the decrypted data
    console.log('decrypted', decrypted.toString(CryptoJS.enc.Utf8));
}