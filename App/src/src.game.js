// / <reference path="../ts/type.d.ts"/>
/**
 * Main function, it create every instances and object needed to start the game.
 * @param {number} w Width of the starting canvas .
 * @param {number} h Heigth of the starting canavs.
 * @param {number} targetFps Refresh speed of the canvas.
 */
class Game {
    constructor() {
        console.time("Started game in");
        const $ = ConfigConst.MAINCONTAINER,
            $c = ConfigConst.CONTAINER;

        // Instantiate an empty state object
        this.state = {};

        // get the current language from const
        this.language = ConfigConst.LANGUAGE;

        // declare session relativ constants
        this.constants = {
            /**Checks whether the platform is Nw.js. */
            isNwjs: Utils.isNwjs(),
            /**Checks whether the platform is Android Chrome. */
            isAndroidChrome: Utils.isAndroidChrome(),
            /**Checks whether the platform is Mobile Safari. */
            isMobileSafari: Utils.isMobileSafari(),
            /**Checks whether the platform is a mobile device. */
            isMobileDevice: Utils.isMobileDevice(),
            platform: "Cloud",
            href: window.location.href,
            // for introduction information 
            package: DataLoaderManager._dataLoaded.package
        };

        // will be used to update the game if needed
        // may be removed in the future, and subject to change
        this.checkGameUpdate = {
            lastCheck: DataLoaderManager._dataLoaded.Update
        };

        // add an easy access to width and height property
        this.w = ConfigConst.MAINCONTAINER.offsetWidth;
        this.h = ConfigConst.MAINCONTAINER.offsetHeight;

        // check if the game is running online or in the app, to correctly get ressources.
        this.getGameMainPath();

        // add an property for all sounds
        this.soundsSettings = {
            volumeBG: 0.5,
            volumeEFX: 0.5,
            playingBGM: null,
            playingBGS: null,
            playingMAIN: null,
            playingME: null,
            playingSE: null
        };

        //create a cache element where all data can be stored/erased
        this.cache = {
            image: {},
            audio: {},
            map: DataLoaderManager._dataLoaded.map,
            // we preloaded his data at the load of the dom
            data: DataLoaderManager._dataLoaded.Data,
            // store the interfaces contexts
            context: {}
        };

        try {

            // TODO add a share method so that every rendering object in their creating function share the same canavs
            //add every rendering object to their current object
            this.state.entities = this.state.entities || {};
            this.state.entities.player = new GameEntityPlayer(0, 0, "east", "Characters/Spiritual", 0, 2, "Faces/Spiritual", 0, 2);
            // add a mob/NPC manager so it can be added anytime

            this.state.menu = this.state.menu || {};
            this.state.menu.transition = new GameTransitionInterface(this);
            this.state.menu.intro = new GameIntroductionInterface(this);
            this.state.menu.main = new GameMainInterface(this);
            // this.state.menu.pause = new Pause(this);
            // this.state.menu.gameOver = new GameOver(this);
            // TODO will be added later, because use a lot of data trafic and must manage the github API
            // this.state.menu.checkUpdate = new updateMenu(this);

            // Instantiate core modules with the current scope
            this.GameCrashHandler = GameCrashHandler(this);
            this.GameStateUpdate = GameStateUpdate(this);
            this.GameRender = GameRender(this);
            this.GameLoop = new GameLoop(this);

            var that = this;

            GameImagesToLoad = Utils.RemoveDuplicate(GameImagesToLoad);
            GameAudiosToLoad = Utils.RemoveDuplicate(GameAudiosToLoad);

            GameLoadImage(this, GameImagesToLoad, () => {
                GameLoadAudio(this, GameAudiosToLoad, () => {
                    // TODO launch an audio on the main menu

                    // Start off main loop
                    that.GameLoop.main();
                    LoadingScreenManager.end();
                    console.timeEnd("Started game in");
                });
            });
        } catch (e) {
            WindowManager.fatal(e);
        }
    }

    getGameMainPath() {
        const t = this.constants.href.split("index.html");
        if (t.length > 1) {
            this.constants.href = t.join("");
            console.log("Server detected, correcting source URL.");
        } else if (this.constants.isNodejs === true) {
            console.log("Running on app.");
            this.constants.platform = process.platform;
        } else {
            console.log("Server not detected. Giving vanilla URL.");
        }
    }
}