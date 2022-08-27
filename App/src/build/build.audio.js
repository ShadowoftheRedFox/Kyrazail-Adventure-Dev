/// <reference path="../../ts/type.d.ts"/>

/**
 * @param {GameScope} scope
 * @param {string[]} AudioArray 
 * @param {()=>{}} callback 
 */
function GameLoadAudio(scope, AudioArray, callback) {
    if (!AudioArray) throw new ReferenceError("You must pass an array.");
    if (!Array.isArray(AudioArray)) throw new TypeError("The AudioArray must be a string array.");
    if (callback && typeof callback != "function") throw new TypeError("Callback must be a function");

    LoadingScreenManager.message = "Loading audios";
    if (AudioArray.length == 0) return callback();
    LoadingScreenManager.setMaxProgress(AudioArray.length);
    let c = AudioArray.length;

    AudioArray.forEach(audio => {
        if (scope.cache.audio[audio]) console.log(`${audio} is already loaded`);
        else {
            let src = scope.constants.href + "resources/Audio/" + audio + ".ogg";
            if (audio.split("/")[0] === "MAIN") src = scope.constants.href + "resources/Audio/" + audio + ".mp3";
            const a = new Audio(src);
            a.onabort = a.onerror = function () {
                console.warn(`${a.src} failed`);
                LoadingScreenManager.addProgress(1);
                c--;
            };
            a.addEventListener("canplaythrough", () => {
                scope.cache.audio[audio] = a;
                LoadingScreenManager.addProgress(1);
                c--;
            }, false);
        }
    });

    const r = setInterval(() => { if (c == 0) { callback(); clearInterval(r); } }, 100);
}