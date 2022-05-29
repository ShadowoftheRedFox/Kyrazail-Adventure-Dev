/**
 * Play a sound on the game from sound folder, looping the sound by default.
 * @param {"BGM" | "BGS" | "MAIN" | "ME" | "SE"} folder Name of the folder.
 * @param {String | "random"} sound Name of the song in folder.
 * @param {scope} scope The position of the sound folder from the file that call this function.
 * @returns {HTMLAudioElement}
 * @throws {HTMLAudioElement} If no audio found, throw the first one or an error
 * @example playSound("Adeste", scope)
 * @link https://www.chosic.com/free-music/calm/
 */
const playSound = function(folder, sound, scope) {
    const audio = scope.cache.audio[folder];
    const audioKeys = Object.keys(audio);

    if (sound == "random") {
        return audio[audioKeys[Math.floor(Math.random() * audioKeys.length)]].audio;
    } else {
        const index = audioKeys.indexOf(sound);
        if (index < 0) return audio[0].audio;
        else return audio[index].audio;
    }
};