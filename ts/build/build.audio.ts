import { CONFIG_CONSTANTS } from "../config/game.config";
import { Game } from "../game";

export function GameLoadAudio(scope: Game, AudioArray: string[], callback: Function) {
    if (!AudioArray) throw new ReferenceError("You must pass an array.");
    if (!Array.isArray(AudioArray)) throw new TypeError("The AudioArray must be a string array.");
    if (callback && typeof callback != "function") throw new TypeError("Callback must be a function");

    LoadingScreenManagerInstance.message = "Loading audios";
    if (AudioArray.length == 0) return callback();
    LoadingScreenManagerInstance.setMaxProgress(AudioArray.length);
    let c = AudioArray.length;

    AudioArray.forEach(audio => {
        if (CONFIG_CONSTANTS.DEBUG && scope.cache.audio[audio]) { console.log(`${audio} is already loaded`); c--; }
        else {
            let src = scope.constants.href + "resources/Audio/" + audio + ".ogg";
            if (audio.split("/")[0] === "MAIN") src = scope.constants.href + "resources/Audio/" + audio + ".mp3";
            const a = new Audio();
            a.onabort = a.onerror = function () {
                console.warn(`${a.src} failed`);
                LoadingScreenManagerInstance.addProgress(1);
                c--;
            };
            a.addEventListener("canplaythrough", () => {
                scope.cache.audio[audio] = a;
                LoadingScreenManagerInstance.addProgress(1);
                c--;
            }, false);
            a.src = src;
        }
    });

    const r = setInterval(() => { if (c == 0) { callback(); GameAudiosToLoad = []; clearInterval(r); } }, 100);
}