/// <reference path="../ts/type.d.ts"/>
console.time("Started game in");

console.log("%cKyrazail Adventure", `font-family: serif; font-size: 32px; color: black; text-align: center;font-weight: 700; background: linear-gradient(0.40turn, #F3C126, #6FE0E1, #3C1EEE);padding: 40px;border-radius: 40px;text-shadow: 10px 5px 5px rgba(0, 0, 0, 0.344);border: 2px ivory solid;`);
document.ondrag = document.ondragstart = document.onselectstart = document.oncontextmenu = function () { return false; };

// declare all needed global variables here
var GameAudiosToLoad = [];
var GameImagesToLoad = [];
var GameGlobalEvent;
// load all script
window.onload = ScriptLoaderManager.setup(StackLoadPlugin, 0, () => {
    ScriptLoaderManager.setup([].concat(
        StackLoadClass, StackLoadConfig,
        StackLoadCore, StackLoadEntity,
        StackLoadEvent, StackLoadFunction,
        StackLoadGlobal, StackLoadInterface,
        StackLoadManager, StackLoadUtil,
        StackLoadLanguage, StackLoadBuild
    ), 0, () => {
        // load all sounds
        DataLoaderManager.setup(StackLoadData, 0, () => {
            WindowManager.init();
            try {
                // launch manager
                GameGlobalEvent = new EventEmitter();
                LoadingScreenManager.init();
                KeyboardTrackerManager.init();
                MouseTrackerManager.init();
                // set a random title
                document.getElementById("title").innerText += `: ${ConfigConst.TITLE.random()}`;
                // start the game
                window.game = new Game();
            } catch (e) {
                WindowManager.fatal(e);
            }
        });
    });
});