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
 */
function scope() { return window.game; }

/**
 * Start a sound. If another sound is being played, it will play it after.
 * @param {string} sound The sound name to play.
 */
GameSoundManager.playSound = function (sound) { };
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
GameSoundManager.playMusic = function (music, loop = true) { };
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