/**
 * For every method, if the audio is not found, it is not played or it is skipped.
 */
function GameSoundManager() {
    throw new Error("This is a static class.");
}

GameSoundManager.busy = false;
/**
 * Return the game scope from the dom object.
 * Local function because when this script file is loaded, the window.game object is still undefined.
 * @returns {GameScope}
 */
function getScope() { return window.game; }

/**
 * Start a sound. If another sound is being played, it will play it after.
 * @param {string} sound The sound name to play.
 */
GameSoundManager.playSound = function (sound) {
    const s = getScope();
    if (!s.cache.audio[sound]) return;
    const a = s.cache.audio[sound];
    a.volume = s.soundsSettings.volumeEFX;
    GameSoundManager.tryToPlay(a);
    switch (sound.split("/")[0]) {
        case "ME":
            s.soundsSettings.playingME = a;
            a.onended = function () { s.soundsSettings.playingME = null; };
            break;
        case "SE":
            s.soundsSettings.playingSE = a;
            a.onended = function () { s.soundsSettings.playingSE = null; };
            break;
    }
};
/**
 * Start a sound. Stop any other sound, sequence or repeatition too.
 * @param {string} sound The sound name to play.
 */
GameSoundManager.forcePlaySound = function (sound) { };
/**
 * Stop the sound and unload it from the object.
 */
GameSoundManager.stopSound = function () { };

/**
 * Start a music, if another one is playing, it is stopped.
 * Music is looped by default.
 * @param {string} music The music name to play.
 * @param {boolean | true} loop If the music is looped or not.
 */
GameSoundManager.playMusic = function (music, loop = true) {
    const s = getScope();
    if (!s.cache.audio[music]) return;
    if (s.soundsSettings.playingBGM) return;
    const a = s.cache.audio[music];
    a.volume = s.soundsSettings.volumeBG;
    a.loop = loop;
    GameSoundManager.tryToPlay(a);
    switch (music.split("/")[0]) {
        case "BGM":
            s.soundsSettings.playingBGM = a;
            a.onended = function () { s.soundsSettings.playingBGM = null; console.log("end"); };
            break;
        case "BGS":
            s.soundsSettings.playingBGS = a;
            a.onended = function () { s.soundsSettings.playingBGS = null; console.log("end"); };
            break;
        case "MAIN":
            s.soundsSettings.playingMAIN = a;
            a.onended = function () { s.soundsSettings.playingMAIN = null; };
            break;
    };
}
/**
 * Stop a music and unload it from the object.
 */
GameSoundManager.stopMusic = function () { };
/**
 * Pause the current playing music.
 */
GameSoundManager.pauseMusic = function () { };
/**
 * Resume the current playing music.
 */
GameSoundManager.resumeMusic = function () { };

/**
 * Start a music, increasing the sound slowly. If a music is playing, transitionMusicEnd is run before starting.
 * @param {string} music The music name.
 */
GameSoundManager.transitionMusicStart = function (music, speed = 3) { };
/**
 * End a music, decreasing the sound slowly.
 * @param {string} music The music name.
 */
GameSoundManager.transitionMusicEnd = function (music, speed = 3) { };
/**
 * Repeat a defined number of times the given sound.
 * @param {string} sound The sound to repeat.
 * @param {number | 1} times The amount of repeatition.
 */
GameSoundManager.repeatSound = function (sound, times = 1) { };
/**
 * Play a sequence of sounds. Skip sound if not found. Play it one time if times isn't defined.
 * @param {{sound:string, times: number | 1}[]} array 
 */
GameSoundManager.soundSequence = function (array) { };

/**
 * Update the volume of the current audio being played.
 */
GameSoundManager.changeVolume = function () {
    const s = getScope();
    if (s.soundsSettings.playingBGM) s.soundsSettings.playingBGM.volume = s.soundsSettings.volumeBG;
    if (s.soundsSettings.playingBGS) s.soundsSettings.playingBGS.volume = s.soundsSettings.volumeBG;
    if (s.soundsSettings.playingMAIN) s.soundsSettings.playingMAIN.volume = s.soundsSettings.volumeBG;
    if (s.soundsSettings.playingME) s.soundsSettings.playingME.volume = s.soundsSettings.volumeEFX;
    if (s.soundsSettings.playingSE) s.soundsSettings.playingSE.volume = s.soundsSettings.volumeEFX;
}

/**
 * Try to play the sound until it can.
 * @param {HTMLAudioElement} sound 
 */
GameSoundManager.tryToPlay = function (sound) {
    if (navigator?.userActivation?.hasBeenActive) {
        sound.play();
        return;
    }
    const tryToPlay = setInterval(() => {
        sound.play()
            .then(() => {
                clearInterval(tryToPlay);
            })
            .catch(error => {
                console.info('User has not interacted with document yet.');
            });
    }, 5000);
}