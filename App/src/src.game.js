// / <reference path="../ts/type.d.ts"/>
/**
 * Main function, it create every instances and object needed to start the game.
 * @param {number} w Width of the starting canvas .
 * @param {number} h Heigth of the starting canavs.
 * @param {number} targetFps Refresh speed of the canvas.
 */
class Game {
    constructor() {
        // Instantiate an empty state object
        this.state = {};

        // get the current language from const
        this.language = ConfigConst.LANGUAGE;

        // declare session relative constants
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
        const CurrentHref = this.constants.href.split("index.html");
        if (CurrentHref.length > 1) {
            this.constants.href = CurrentHref.join("");
            console.log("Server detected, correcting source URL.");
        } else if (this.constants.isNwjs === true) {
            console.log("Running on app.");
            this.constants.platform = process.platform;
        } else {
            console.log("Server not detected. Giving vanilla URL.");
        }

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

        // create a cache element where all data can be stored/erased
        this.cache = {
            image: {},
            audio: {},
            map: DataLoaderManager._dataLoaded.map,
            // we preloaded his data at the load of the dom
            data: DataLoaderManager._dataLoaded.Data,
            // store the interfaces contexts
            context: {},
            layers: {}
        };

        // Where all data relativ to the game itself will be stored
        this.global = {}

        try {
            // initialise the event system
            GameEventHandler.init(this);

            // TODO add a share method so that every rendering object in their creating function share the same canavs
            //add every rendering object to their current object
            this.state.entities = this.state.entities || {};
            this.state.entities.player = null; // player is created with the map change
            // others entities are added as they arrive

            this.state.menu = this.state.menu || {};
            this.state.menu.transition = new GameTransitionInterface(this);
            this.state.menu.intro = new GameIntroductionInterface(this);
            this.state.menu.dialogue = new GameDialogueInterface(this);
            this.state.menu.main = new GameMainMenuInterface(this);
            this.state.menu.map = new GameMapInterface(this);
            this.state.menu.pause = new GamePauseInterface(this);
            // this.state.menu.gameOver = new GameOver(this); // TODO this will be disactivated by default, but shown by event system
            // this.state.menu.checkUpdate = new updateMenu(this); // TODO will be added later, because use a lot of data trafic and must manage the github API

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

    /**
     * Calculate the level, total needed and xp left given xp amount and level.
     * @param {number} level The current level
     * @param {number} xp The amount of experience 
     * @returns {{l:number,r:number,t:number}} l is the amount of level, r the amount of xp left, and t the total amount to level up  
     */
    calculateXp(level = 1, xp = 0) {
        if (isNaN(xp)) throw new TypeError("xp must be a number");
        // formula: Math.pow((level/x), y) = xp
        // reverse: Math.pow(xp, 1/y) * x = level
        // x affect the amount of xp, lower value = more xp required per level
        // y affect the amount to get per level, higher value = larger gap between levels
        const X = 0.07;
        const Y = 2;
        const r = {};
        // xp for the next level
        r.t = Math.pow(((level + 1) / X), Y) - Math.pow((level / X), Y);
        // while the xp is bigger than the xp needed, level up
        while (xp >= r.t) {
            level++;
            xp -= r.t;
            r.t = Math.pow(((level + 1) / X), Y) - Math.pow((level / X), Y);
        }

        // return results
        r.t = Math.floor(r.t);
        r.r = Math.floor(xp);
        r.l = Math.floor(level);

        return r;
    }

    /**
     * Divide the given string to fit in the given dimension.
     * @param {CanvasRenderingContext2D} ctx Metrics function
     * @param {string} string Text to split
     * @param {number} w Max width
     * @param {number} h Max height
     * @returns {string[]} The splited text
     */
    divideText(ctx, string, w, h) {
        const result = [];
        let tempstr = "";
        // split with width
        string.split(" ").forEach(word => {
            if (ctx.measureText(tempstr).width + ctx.measureText(word).width > w) {
                result.push(tempstr);
                tempstr = word + ' ';
            } else {
                tempstr += word + ' ';
            }
        });
        result.push(tempstr);
        // split with height
        let tot = 0;
        let i = 0;
        for (const line of result) {
            if (tot > h) {
                result.splice(i, result.length - i + 1);
                break;
            } else {
                tot += ((e) => { (e.actualBoundingBoxAscent + e.actualBoundingBoxDescent) })(ctx.measureText(line));
                i++;
            }
        }

        return result;
    }
}