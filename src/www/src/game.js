/**
 * Main function, that create every instances and object needed to start the game.
 * @param {number} w Width of the starting canvas .
 * @param {number} h Heigth of the starting canavs.
 * @param {number} targetFps Refresh speed of the canvas.
 */
class Game {
    /**
     * @param {number} w Width of the starting canvas .
     * @param {number} h Heigth of the starting canavs.
     * @param {number} targetFps Refresh speed of the canvas.
     */
    constructor(w, h, targetFps) {
        //get the element where we will put canvases
        const $container = document.getElementById('container');

        console.time("Started game in");
        console.log("%cKyrazail Adventure", "font-family: serif; font-size: 32px; color: black; font-weight: 700; background: linear-gradient(0.25turn, #F3C126, #6FE0E1, #3C1EEE);padding: 40px");

        // Instantiate an empty state object
        this.state = {};
        this.updateData = null;

        // Setup some constants, that aren't to save
        var that;

        this.settings = {
            volumeMain: 0.5,
            volumeOther: 0.5,
            language: "en",
            config: defaultConfig
        };

        this.menu = {
            loadingGame: true,
            loadingMap: true,
            loadingTiles: true,
            intro: true,
            welcome: true,
            gameOver: false,
            paused: false,
            update: false //TODO enable when update is fixed
        };

        this.debug = {
            showFps: false,
            debug: false
        };

        this.constants = {
            /**
             * if NodeJS is included.
             */
            isNodejs: typeof require === "function" && typeof process === 'object',
            /**
             * The current platform of the user. ONly works if isNodeJS === true; 
             */
            platform: "Cloud",
            /**
             * The url relativ to the game.
             */
            href: window.location.href,
            /**
             * The current filter applied.
             */
            defaultFilter: null,
            /**
             * The text is written in the middle of the given y axis.
             */
            textBaseline: 'middle',
            /**
             * The path to access save folder.
             */
            savePath: null,
            /**
             * The width of the window.
             */
            width: w,
            /**
             * The heigth of the window.
             */
            height: h,
            /**
             * The fps to reach.
             */
            targetFps: targetFps,
            /**
             * Transition property.
             */
            transition: {
                /**
                 * If a transition is going on.
                 */
                transition: false,
                /**
                 * If the transition is starting.
                 */
                start: false,
                /**
                 * If a transition is ending.
                 */
                end: false,
                /**
                 * The speed of the transition.
                 */
                speed: 100,
                /**
                 * The count to keep track of the transition progression.
                 */
                count: 0
            },
            /**
             * Idle property to show idle screen.
             */
            idle: {
                /**
                 * The idle time to reach before starting the idle screen, in ms.
                 */
                idleTimeMax: 2 * 60 * 1000,
                /**
                 * The current idle time, in ms.
                 */
                idleTime: 0,
                /**
                 * The last time the idle time has been checked, in ms.
                 */
                lastIdleCheck: null,
                /**
                 * If the game is idle or not.
                 */
                isIdle: false
            },
            /**
             * TIme property, to order reminders.
             */
            time: {
                /**
                 * The time teh game started, in ms.
                 */
                startedPlayingSession: Date.now(),
                /**
                 * The last remind time, in ms.
                 */
                lastRemind: null
            },
            //loads after
            tilesNames: null,
            tilesMap: null
        };

        //check if the game is running online or in the app, to correctly get ressources.
        let tabHref = this.constants.href.split("index.html");
        if (tabHref.length > 1) {
            this.constants.href = tabHref.join("");
            console.log("Server detected, correcting source URL.");
        } else if (this.constants.isNodejs === true) {
            console.log("Running on app.");
            this.constants.platform = process.platform;
        } else {
            console.log("Server not detected. Giving vanilla URL.");
        }

        //getting the save path on app, or we will reach online API if it's on cloud.
        if (this.constants.isNodejs === true) {
            const path = require('path');
            if (navigator.appVersion.indexOf("Win") != -1) this.constants.platform = "win";
            if (navigator.appVersion.indexOf("Mac") != -1) this.constants.platform = "mac";
            if (navigator.appVersion.indexOf("X11") != -1) this.constants.platform = "os";
            if (navigator.appVersion.indexOf("Linux") != -1) this.constants.platform = "linux";

            if (this.constants.platform === "linux") {
                var base = path.dirname(process.mainModule.filename).split("/");
                var rBase = path.join(`/${base[1]}/${base[2]}/KyraADV/save/`);
                this.constants.savePath = rBase;
            } else if (this.constants.platform === "win") {
                let base = path.dirname(process.mainModule.filename).split("\\");
                let rBase = `${base[0]}\\KyraADV\\save`;
                this.constants.savePath = rBase;
            } else {
                console.error(new Error(`You current platform is ${this.constants.platform} and is not supported by the current game version.\nIf you want saves to work for you, come at https://discord.gg/5mF5AHnRCr and ask for help.`));
            }
        } else {
            this.constants.savePath = "Cloud";
        }

        // Generate a canvas and store it as our viewport
        //this one is for interfaces
        this.viewport = generateCanvas(w, h);
        this.viewport.id = "gameViewport";

        //this one for map and entities
        this.viewportMap = generateCanvas(w, h);
        this.viewportMap.id = "mapViewport";

        // Get and store the canvas context as a global
        this.contextMap = this.viewportMap.getContext('2d');
        this.context = this.viewport.getContext('2d');
        this.context.textAlign = 'left';
        this.constants.defaultFilter = this.context.filter;

        //? enable or disable the smoothing effect when drawing on a canvas
        this.context.imageSmoothingEnabled = true;
        this.contextMap.imageSmoothingEnabled = false;

        //load and store image, while showing the loading screen
        /**
         * Game storage object.
         */
        this.cache = {
            /**
             * Where loaded images are stocked.
             */
            image: {},
            /**
             * Where loaded sounds are stocked.
             */
            audio: {},
            /**
             * Where all maps are stocked.
             */
            map: {},
            /**
             * Where general data are stocked. 
             */
            data: /*dataNwTest*/ DataManager._dataLoaded
        };

        /**
         * Game audio property, those who are running.
         */
        this.audio = {
            /**
             * Currently running background audio.
             * @type {HTMLAudioElement}
             */
            background: null,
            /**
             * Currently running ambiant audio.
             * @type {HTMLAudioElement}
             */
            ambiant: null,
            /**
             * Currently running system audio.
             * @type {HTMLAudioElement}
             */
            system: null,
            /**
             * Currently running battle audio.
             * @type {HTMLAudioElement}
             */
            battle: null
        };

        /**
         * Frequently and globally used function will be here.
         */
        this.function = {};

        // Append viewport into our container within the dom
        $container.insertBefore(this.viewport, $container.firstChild);
        $container.insertBefore(this.viewportMap, $container.firstChild);

        // Initiate the game
        try {
            // Instantiate core modules with the current scope
            this.update = gameUpdate(this);
            this.maprender = gameMapRender(this);
            this.render = gameRender(this);
            this.loop = new gameLoop(this);
            this.edit = gameEdit(this);

            //load last to check everything
            this.crashHandler = new crashHandler(this);

            //images that we want to be loaded now.
            var fullImageToLoad = [
                "icon", "blueForest",
                'Spiritual', 'fSpiritual',
                "People4", "!Flame", "Damage1", "Damage2", "Damage3", "Damage4",
                "Monster1", "Monster2", "Monster3",
                "!Other3", "Actor1", "Actor2", "Actor3", "Actor4", "Actor5",
                "Outside_A1", "Outside_A2", "Outside_A5", "Outside_B", "Inside_B", "Inside_C",
                "Landscape", "Night",
                "Spear1",
                "Mountains", "BlueSky"
            ];

            //sounds we want to be loaded now.
            var fullAudioToLoad = MAIN;

            fullImageToLoad = fullImageToLoad.concat(system);

            //add preload image from global state
            // fullImageToLoad = fullImageToLoad.concat(globalState.preloadImage);

            //removes duplicates
            let fullImageToLoadIndex = 0;
            fullImageToLoad.forEach(img => {
                if (fullImageToLoad.indexOf(img) < fullImageToLoadIndex) {
                    fullImageToLoad.splice(fullImageToLoad.indexOf(img), 1);
                }
                fullImageToLoadIndex++;
            });

            //same for audio
            let fullAudioToLoadIndex = 0;
            fullAudioToLoad.forEach(audio => {
                if (fullAudioToLoad.indexOf(audio) < fullAudioToLoadIndex) {
                    fullAudioToLoad.splice(fullAudioToLoad.indexOf(audio), 1);
                }
                fullAudioToLoadIndex++;
            });

            loadFromName(this, fullImageToLoad, fullAudioToLoad).then(async(data) => {
                if (data) {

                    const globalState = await globalGame(this);

                    //create a global instance where all common data will be, and will be saved
                    this.state.global = globalState.global;

                    //add audio and images to cache
                    this.cache.image = data.image;
                    this.cache.audio = data.audio;

                    //load tiles
                    tileMap(this, res => {
                        this.constants.tilesNames = res.names;
                        this.constants.tilesMap = res.map;
                        this.menu.loadingTiles = false;
                    });

                    this.menu.loadingGame = false;
                    this.menu.loadingMap = false;

                    setTimeout(() => {
                        this.audio.background = playSound("MAIN", "random", this);
                        this.audio.background.loop = true;
                        this.audio.background.volume = this.settings.volumeMain;
                        this.audio.background.play().catch(e => {
                            if (e) {
                                console.log("Could not play sound because the user didn't interact. Trying until it's possible.");
                                const playSoundTry = setInterval(() => {
                                    this.audio.background.play().then(() => {
                                        console.log("Playing sound.");
                                        clearInterval(playSoundTry);
                                    }).catch(e => {});
                                }, 1000);
                            }
                        });
                    }, 3000);

                    that = this;

                    //add every rendering object to their current object
                    var createEntity = function createEntity() {
                        that.state.entities = that.state.entities || {};
                        that.state.entities.player = new Player(that, Math.round(w / 2), Math.round(h / 3));
                    }();
                    var createMenu = function createMenu() {
                        that.state.menu = that.state.menu || {};
                        that.state.menu.main = new Menu(that);
                        that.state.menu.idle = new Idle(that);
                        that.state.menu.pause = new Pause(that);
                        that.state.menu.gameOver = new GameOver(that);
                    }();
                    var createWelcome = function createWelcome() {
                        that.state.welcome = that.state.welcome || {};
                        that.state.welcome.main = new Welcome(that);
                    }();
                    var createOneUse = function useOnce() {
                        that.state.once = that.state.once || {};
                        that.state.once.intro = new Intro(that);
                        that.state.once.checkUpdate = new updateMenu(that);
                    }();

                    console.timeEnd("Started game in");
                    return this;
                } else {
                    alert("Failed to load the game, reload or change browser.");
                }
            }).catch((e) => {
                console.log(e);
                WindowManager.fatal(this.context, e, w, h);
            });

        } catch (e) {
            console.log(e);
            WindowManager.fatal(this.context, e, w, h);
        }
    }
}