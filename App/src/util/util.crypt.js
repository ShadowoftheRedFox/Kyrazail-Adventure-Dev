
function GameEncryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ConfigConst.KEY).toString();
}

function GameDecrytpData(data) {
    return CryptoJS.AES.decrypt(data, ConfigConst.KEY).toString(CryptoJS.enc.Utf8);
}

function GameTestCryptInsecure() {
    var text = 'US0378331005-USD-US-en';
    var key = ConfigConst.KEY;

    console.log('text:', text);

    // Fix: Use the Utf8 encoder
    text = CryptoJS.enc.Utf8.parse(text);
    // Fix: Use the Utf8 encoder (or apply in combination with the hex encoder a 32 hex digit key for AES-128)
    key = CryptoJS.enc.Utf8.parse(key);

    // Fix: Apply padding (e.g. Zero padding). Note that PKCS#7 padding is more reliable and that ECB is insecure
    var encrypted = CryptoJS.AES.encrypt(text, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    console.log('encrypted', encrypted);

    // Fix: Pass a CipherParams object (or the Base64 encoded ciphertext)
    var decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(encrypted) }, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });

    // Fix: Utf8 decode the decrypted data
    console.log('decrypted', decrypted.toString(CryptoJS.enc.Utf8));
}