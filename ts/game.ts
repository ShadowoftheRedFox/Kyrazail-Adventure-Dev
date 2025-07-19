import { GameLoadAudio } from "./build/build.audio";
import { GameLoadImage } from "./build/build.image";
import { CONFIG_CONSTANTS } from "./config/game.config";
import { GameLoop } from "./core/core.loop";
import { Utils } from "./util/utils"
import { GameRender } from "./core/core.render";
import { GameStateUpdate } from "./core/core.update";
import { GameTransitionInterface } from "./function/function.transition";

declare global {
    interface Window {
        game: Game;
    }
    const GameInstance: Game;
}

export class Game {
    state: {
        entities: {
            player: {}
        };
        menu: {
            transition: GameTransitionInterface | null,
            intro?: null,
            dialogue?: null,
            main?: null,
            pause?: null,
        }
    };
    language: string;
    constants: {
        isNwJs: boolean;
        isAndroidChrome: boolean;
        isMobileSafari: boolean;
        isMobileDevice: boolean;
        platform: string;
        href: string;
        package: Object;
    };
    checkGameUpdate: {
        lastCheck: string;
    }
    w: number;
    h: number;
    soundsSettings: {
        volumeBG: number;
        volumeEFX: number;
        playingBGM: HTMLAudioElement | null;
        playingBGS: HTMLAudioElement | null;
        playingMAIN: HTMLAudioElement | null;
        playingME: HTMLAudioElement | null;
        playingSE: HTMLAudioElement | null
    };
    cache: {
        image: {};
        audio: {};
        map: {}; //DataLoaderManager._dataLoaded.map,
        // we preloaded his data at the load of the dom
        data: {}; //DataLoaderManager._dataLoaded.Data,
        // store the interfaces contexts
        context: {};
        layers: {};
    };
    global: {};
    GameLoop: GameLoop;
    GameStateUpdate: Function;
    GameRender: Function;

    constructor() {
        // Instantiate an empty state object
        this.state = {
            entities: {
                player: {}
            },
            menu: {
                transition: null,
                intro: null,
                dialogue: null,
                main: null,
                pause: null,
            }
        };
        // get the current language from const
        this.language = CONFIG_CONSTANTS.LANGUAGE;
        // declare session relative constants
        this.constants = {
            /**Checks whether the platform is Nw.js. */
            isNwJs: Utils.General.isNwJs(),
            /**Checks whether the platform is Android Chrome. */
            isAndroidChrome: Utils.General.isAndroidChrome(),
            /**Checks whether the platform is Mobile Safari. */
            isMobileSafari: Utils.General.isMobileSafari(),
            /**Checks whether the platform is a mobile device. */
            isMobileDevice: Utils.General.isMobileDevice(),
            platform: "Cloud",
            href: window.location.href,
            // for the introduction information 
            package: {} //DataLoaderManager._dataLoaded.package //TODO
        };

        // will be used to update the game if needed
        // may be removed in the future, and subject to change
        this.checkGameUpdate = {
            lastCheck: "" //DataLoaderManager._dataLoaded.Update
        };
        // add an easy access to width and height property
        this.w = CONFIG_CONSTANTS.MAINCONTAINER.offsetWidth;
        this.h = CONFIG_CONSTANTS.MAINCONTAINER.offsetHeight;

        // check if the game is running online or in the app, to correctly get ressources.
        const CurrentHref = this.constants.href.split("index.html");
        if (CurrentHref.length > 1) {
            this.constants.href = CurrentHref.join("");
            console.log("Server detected, correcting source URL.");
        } else if (this.constants.isNwJs === true) {
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
            map: {}, //DataLoaderManager._dataLoaded.map,
            // we preloaded his data at the load of the dom
            data: {}, // DataLoaderManager._dataLoaded.Data,
            // store the interfaces contexts
            context: {},
            layers: {}
        };

        // Where all data relativ to the game itself will be stored
        this.global = {}

        try {
            // initialise the event system
            //GameEventHandler.init(this); //TODO

            // add every rendering object to their current object
            this.state.entities = this.state.entities || {};
            // this.state.entities.player = null; // player is created with the map change
            // others entities are added as they arrive

            this.state.menu = this.state.menu || {};
            this.state.menu.transition = new GameTransitionInterface(this);
            // this.state.menu.intro = new GameIntroductionInterface(this);
            // this.state.menu.dialogue = new GameDialogueInterface(this);
            // this.state.menu.main = new GameMainMenuInterface(this);
            // this.state.menu.pause = new GamePauseInterface(this);
            // this.state.menu.gameOver = new GameOver(this); // TODO this will be disactivated by default, but shown by event system
            // this.state.menu.checkUpdate = new updateMenu(this); // TODO will be added later, because use a lot of data trafic and must manage the github API

            // Instantiate core modules with the current scope
            // this.GameCrashHandler = GameCrashHandler(this);
            this.GameStateUpdate = GameStateUpdate(this);
            this.GameRender = GameRender(this);
            this.GameLoop = new GameLoop(this);

            var that = this;

            GameImagesToLoad = Utils.General.RemoveDuplicate(GameImagesToLoad);
            GameAudiosToLoad = Utils.General.RemoveDuplicate(GameAudiosToLoad);

            GameLoadImage(this, GameImagesToLoad, () => {
                GameLoadAudio(this, GameAudiosToLoad, () => {
                    // TODO launch an audio on the main menu

                    // Start off main loop
                    that.GameLoop.main(0);
                    LoadingScreenManagerInstance.end();
                    // GameSoundManager.playMusic(["MAIN/Adeste", "MAIN/Dramatic", "MAIN/Moon", "MAIN/Silence"].random());
                    console.timeEnd("Started game in");
                });
            });
        } catch (e) {
            ErrorHandlerInstance.fatal(e);
        }
    }
}

const GameInstance = new Game();