

const GameMainInterfaceTopBackground = [
    ["Battlebacks1/Ship", "Battlebacks2/Ship", "white"],
    ["Battlebacks1/Clouds", "Battlebacks2/Clouds", "black"],
    ["Battlebacks1/Sky", "Battlebacks2/Sky", "black"],
    ["Battlebacks1/Snowfield", "Battlebacks2/Snowfield", "black"],
    ["Battlebacks1/Snow", "Battlebacks2/Snowfield", "black"],
    ["Battlebacks1/Dirt1", "Battlebacks2/Cliff", "black"],
    ["Battlebacks1/Dirt2", "Battlebacks2/Port", "black"],
    ["Battlebacks1/Grassland", "Battlebacks2/Forest1", "black"],
    ["Battlebacks1/GrassMaze", "Battlebacks2/Forest2", "white"],
    ["Battlebacks1/Cobblestones4", "Battlebacks2/Bridge", "black"]
];
const GameMainInterfacechosen = GameMainInterfaceTopBackground[Math.floor(Math.random() * GameMainInterfaceTopBackground.length)];
class GameMainMenuInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.MAIN,
            canvasGroup: "GameMainGroup",
            requiredImage: [
                "System/Window",
                GameMainInterfacechosen[0], GameMainInterfacechosen[1],
                "Icons/Account", "Icons/Discord", "Icons/Github", "Icons/Website"
            ],
            requiredAudio: ["MAIN/Adeste", "MAIN/Dramatic", "MAIN/Moon", "MAIN/Silence"],
            transitionLeave: true,
            transitionSpawn: true
        }, scope);

        this.chosen = GameMainInterfacechosen;
        this.menu = [
            {
                name: "",
                function: this.mainMenuFct,
                button: [
                    {
                        name: "NewGameButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.startNewGame
                    }, {
                        name: "LoadButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toLoad
                    }, {
                        name: "SettingsButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toSettings
                    }, {
                        name: "CreditsButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: () => { open("./credits.html", "_blank"); }
                    }, {
                        name: "QuitGameButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: WindowManager.closeGame
                    }
                ],
                focusedButton: 0
            },
            {
                name: "LoadGameTitle",
                function: this.loadMenuFct,
                button: [
                    {
                        name: "RetryButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.loadSaveFileRetry
                    }, {
                        name: "LoadButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.loadSave,
                        loader: true
                    },
                    {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toMain,
                        back: true
                    }
                ],
                focusedButton: 0
            },
            {
                name: "SettingsButton",
                function: this.settingsMenuFct,
                button: [
                    {
                        name: "GeneralButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toGeneral
                    }, {
                        name: "AudioButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toAudio
                    }, {
                        name: "ControlButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toKeyBind
                    }, {
                        name: "LanguageButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toLanguage
                    }, {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toMain,
                        back: true
                    }
                ],
                focusedButton: 0
            },
            {
                name: "SettingsGeneralTitle",
                function: this.settingsGeneralMenuFct,
                button: [
                    {
                        name: "AlwaysRunSetting",
                        x: 0, y: 0, w: 0, h: 0,
                        function: () => { GameConfig.alwaysRun = (GameConfig.alwaysRun ? false : true); }
                    },
                    {
                        name: "FPSSetting",
                        x: 0, y: 0, w: 0, h: 0,
                        special: true,
                        function: (dir) => {
                            if (dir == 1 && GameConfig.targetFps + 10 <= 140) { GameConfig.targetFps += 10; }
                            else if (dir == 0 && GameConfig.targetFps - 10 >= 30) { GameConfig.targetFps -= 10; }
                        }
                    },
                    {
                        name: "DebugSetting",
                        x: 0, y: 0, w: 0, h: 0,
                        function: () => {
                            ConfigConst.DEBUG = (ConfigConst.DEBUG ? false : true);
                            // clear fps if debug has been disabled
                            if (!ConfigConst.DEBUG) WindowManager.data.ctx.clearRect(0, 0, scope.w, scope.h);
                        }
                    },
                    {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toSettings,
                        back: true
                    }
                ],
                focusedButton: 0
            },
            {
                name: "SettingsAudioTitle",
                function: this.settingsAudioMenuFct,
                button: [
                    {
                        name: "MusicVolumeSetting",
                        x: 0, y: 0, w: 0, h: 0,
                        special: true,
                        function: (dir) => {
                            var s = scope.soundsSettings.volumeBG * 100;
                            if (dir == 1 && s + 5 <= 100) {
                                s += 5;
                            } else if (dir == 0 && s - 5 >= 0) {
                                s -= 5;
                            }
                            scope.soundsSettings.volumeBG = Math.round((s / 100 + Number.EPSILON) * 100) / 100;
                        }
                    },
                    {
                        name: "SoundVolumeSetting",
                        x: 0, y: 0, w: 0, h: 0,
                        special: true,
                        function: (dir) => {
                            var s = scope.soundsSettings.volumeEFX * 100;
                            if (dir == 1 && s + 5 <= 100) {
                                s += 5;
                            } else if (dir == 0 && s - 5 >= 0) {
                                s -= 5;
                            }
                            scope.soundsSettings.volumeEFX = Math.round((s / 100 + Number.EPSILON) * 100) / 100;
                        }
                    },
                    {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toSettings,
                        back: true
                    }
                ],
                focusedButton: 0
            },
            {
                name: "SettingsControlTitle",
                function: this.settingsKeyBindMenuFct,
                button: [
                    {
                        name: "ControlUp",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.up[0],
                        key2: GameConfig.keyBoard.up[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.up[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.up[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlDown",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.down[0],
                        key2: GameConfig.keyBoard.down[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.down[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.down[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlRight",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.left[0],
                        key2: GameConfig.keyBoard.left[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.left[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.left[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlLeft",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.right[0],
                        key2: GameConfig.keyBoard.right[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.right[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.right[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlRun",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.run[0],
                        key2: GameConfig.keyBoard.run[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.run[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.run[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlPause",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.pause[0],
                        key2: GameConfig.keyBoard.pause[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.pause[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.pause[1] = b.key2;
                            }
                        }
                    }, {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.back[0],
                        key2: GameConfig.keyBoard.back[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.back[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.back[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlInteraction",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.confirm[0],
                        key2: GameConfig.keyBoard.confirm[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.confirm[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.confirm[1] = b.key2;
                            }
                        }
                    }, {
                        name: "ControlInventory",
                        x: 0, y: 0, w: 0, h: 0,
                        keyboard: true,
                        enabled: true,
                        key1: GameConfig.keyBoard.inventory[0],
                        key2: GameConfig.keyBoard.inventory[1],
                        function: (dir, b) => {
                            if (dir == 0) {
                                // custom key 1
                                GameConfig.keyBoard.inventory[0] = b.key1;
                            } else if (dir == 1) {
                                // custom key 2
                                GameConfig.keyBoard.inventory[1] = b.key2;
                            }
                        }
                    }, {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toSettings,
                        back: true
                    }
                ],
                arrow: [
                    {
                        name: "",
                        x: 0, y: 0, w: 0, h: 0,
                        function: (that, f) => { that.arrowHeightChange += 52;/*f is the button focused var*/f++; },
                        draw: (c) => { return ArrowDrawer.pixel("up", c); },
                        arrowUp: true,
                        enabled: false
                    }, {
                        name: "",
                        x: 0, y: 0, w: 0, h: 0,
                        function: (that, f) => { that.arrowHeightChange -= 52;/*f is the button focused var*/f--; },
                        draw: (c) => { return ArrowDrawer.pixel("down", c); },
                        arrowDown: true,
                        enabled: false
                    }
                ],
                focusedButton: 0,
                sideButton: 1
            },
            {
                name: "GameAccount",
                function: this.accountFct,
                button: [
                    {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toMain,
                        back: true
                    }
                ],
                focusedButton: 0
            },
            {
                name: "LanguageButton",
                function: this.accountFct,
                button: [
                    {
                        name: "English",
                        x: 0, y: 0, w: 0, h: 0,
                        function: (scope, that) => { scope.language = "en"; ConfigConst.LANGUAGE = "en"; }
                    }, {
                        name: "Français",
                        x: 0, y: 0, w: 0, h: 0,
                        function: (scope, that) => { scope.language = "fr"; ConfigConst.LANGUAGE = "fr"; }
                    },
                    {
                        name: "BackButton",
                        x: 0, y: 0, w: 0, h: 0,
                        function: this.toSettings,
                        back: true
                    }
                ],
                focusedButton: 0
            }
        ];
        this.social = [
            // {
            //TODO add a global var that save the account, if online server is setup one day
            //     name: "Coming soon!",//"Account",
            //     x: 0,
            //     y: 0,
            //     w: 0,
            //     h: 0,
            //     function: () => { },//this.toAccount,
            //     icon: "Icons/Account",
            //     hover: false
            // },
            {
                name: "Discord",
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                function: (scope) => {
                    if (scope.constants.isNwjs) {
                        // open a url in a browser and not in the app
                        var gui = require("nw.gui");
                        gui.Shell.openExternal(scope.constants.package.support.url);
                    } else open(scope.constants.package.support.url, "_blank", "rel:'noopener;'");
                },
                icon: "Icons/Discord",
                hover: false
            }, {
                name: "GitHub",
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                function: (scope) => {
                    if (scope.constants.isNwjs) {
                        // open a url in a browser and not in the app
                        var gui = require("nw.gui");
                        gui.Shell.openExternal(scope.constants.package.homepage);
                    } else open(scope.constants.package.homepage, "_blank", "rel:'noopener;'");
                },
                icon: "Icons/Github",
                hover: false
            }, {
                name: "SocialOnlineGame",
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                function: (scope) => {
                    if (scope.constants.isNwjs) {
                        // open a url in a browser and not in the app
                        var gui = require("nw.gui");
                        gui.Shell.openExternal(scope.constants.package.online);
                    } else open(scope.constants.package.online, "_blank", "rel:'noopener;'");
                },
                icon: "Icons/Website",
                hover: false
            }
        ];
        this.focusedMenu = 0;

        // for keyboard customisation
        this.oldKey = { key1: "", key2: "" };
        this.awaitInput = false;
        /**
         * @type {{ id: number, key: number }}
         */
        this.buttonToChange = { id: null, key: null };
        this.arrowHeightChange = 0;
        /** The delay for the confirm key. Otherwise, it keeps getting the confirm key as the key to bind. */
        this.keyboardConfirmDelay = 0;

        /**
         * @type {GameSaveLoadObject}
         */
        this.loadSaveFileApp = null;
        this.loadSaveFileAppMessage = "Loading files...";

        this.loadSaveFile = {
            /**
             * @type {File}
             */
            file: null,
            /**
             * @type {string}
             */
            name: null,
            /**
             * @type {string}
             */
            contentString: null,
            /**
             * @type {GameSaveObject}
             */
            contentObject: null,
            /**
             * @type {Date | string}
             */
            lastEditDate: null,
            failed: false,
            /**
             * @type {string[]}
             */
            error: [],
            try: 0
        };

        // delay to scroll with keyboard
        this.KeyboardDelay = 0;
    }

    /**
     * 
     * @param {GameScope} scope 
     * @param {this} that 
     */
    startNewGame(scope, that) {
        GameEventHandler.handle("NewGame");
        scope.cache.context[that.canvasGroup].clearRect(0, 0, scope.w, scope.h);
    }

    toLanguage(scope, that) { that.focusedMenu = 7; } toAccount(scope, that) { that.focusedMenu = 6; } toMain(scope, that) { that.focusedMenu = 0; } toLoad(scope, that) { that.focusedMenu = 1; } toGeneral(scope, that) { that.focusedMenu = 3; } toAudio(scope, that) { that.focusedMenu = 4; } toKeyBind(scope, that) { that.focusedMenu = 5; } toSettings(scope, that) { if (that.awaitInput) { const currentMenu = that.menu[that.focusedMenu], bu = currentMenu.button[that.buttonToChange.id]; currentMenu.button.forEach((b, idx) => { if (idx == that.buttonToChange.id) { b.key1 = that.oldKey.key1; b.key2 = that.oldKey.key2; } }); that.endOfInput(that); } that.focusedMenu = 2; }
    /**
     * @param {GameScope} scope 
     * @param {this} that
     */
    accountFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, GameTranslate(currentMenu.name), that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        //TODO add a distant server where you can load/save your data online (mongodb?)

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.reverseIndex()) {
                    that.createGradient(ctx, button);
                    const metrics = ctx.measureText(GameTranslate(button.name));
                    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                    ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                } else {
                    ctx.fillRect(w / 2 - 200, h / 1.8 + 52 * index - 16, 400, 40);
                }
            }
            ctx.fillStyle = that.chosen[2];
            //? back button will always be the last one in the array
            if (index == currentMenu.button.reverseIndex()) {
                that.createBackButton(ctx, button, w, h);
            } else {
                ctx.fillText(GameTranslate(button.name), w / 2, h / 1.8 + 52 * index, w);
                button.x = w / 2 - 200;
                button.y = h / 1.8 + 52 * index - 16;
                button.w = 400;
                button.h = 40;
            }
        });
    }

    /**
     * @param {GameScope} scope 
     * @param {this} that
     */
    mainMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];

        ctx.fillStyle = "#fff";
        ctx.font = '300% Azure';
        ctx.imageSmoothingQuality = "high";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        //background title
        ctx.globalAlpha = 0.9;
        RectangleCreator.roundRect(ctx, (w - (ctx.measureText("Kyrazail Adventure").width - 20)) / 2 - 40, h / 4 - 60, ctx.measureText("Kyrazail Adventure").width + 60, 100, 50, true, false);
        ctx.globalAlpha = 1;

        //create the gradient of title
        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 3, w / 2 + 200, h / 3);
        gradient.addColorStop(0, "#F3C126");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE");
        ctx.fillStyle = gradient;

        //write title
        ctx.fillText("Kyrazail Adventure", w / 2, h / 4);
        underline(ctx, "Kyrazail Adventure", w / 2, h / 4, gradient, "40px", ctx.textAlign);

        ctx.textBaseline = "middle";
        ctx.font = '200% Azure';

        //? black gradient if colored one is not okay
        // gradient = ctx.createLinearGradient(w / 2 - 200, h / 2.5, w / 2 + 200, h / 2.5); gradient.addColorStop(0, "#00000000"); gradient.addColorStop(0.5, "#000000"); gradient.addColorStop(1, "#00000000"); ctx.fillStyle = gradient;
        //? colored gradient
        gradient = ctx.createLinearGradient(w / 2 - 200, h / 2.5, w / 2 + 200, h / 2.5); gradient.addColorStop(0, "#F3C12600"); gradient.addColorStop(0.5, "#6FE0E1"); gradient.addColorStop(1, "#3C1EEE00");
        ctx.fillStyle = gradient;
        ctx.fillRect(w / 2 - 200, h - 45 * currentMenu.button.reverseIndex(currentMenu.focusedButton) - 66, 400, 40);

        ctx.fillStyle = that.chosen[2];
        currentMenu.button.forEach((button, index) => {
            button.x = w / 2 - 200;
            button.y = h - 45 * currentMenu.button.reverseIndex(index) - 66;
            button.w = 400;
            button.h = 40;
            ctx.fillText(GameTranslate(button.name), w / 2, h - 45 * currentMenu.button.reverseIndex(index) - 50, w);
        });

        // prevent the canvas from getting unwanted pixel
        ctx.imageSmoothingEnabled = false;
        //draw the frame around button
        RectangleCreator.frameRectangle(scope, ctx, currentMenu.button[0].x - 10, currentMenu.button[0].y - 10,
            currentMenu.button[0].w + 20, 45 * currentMenu.button.length + 15);
        ctx.imageSmoothingEnabled = true;

        const socialImageSize = 50,
            spaceBetweenButton = 10;

        // to know how much buttons are on the left side of the screen
        let socialButtonCorrected = 0;

        that.social.forEach((b, i) => {
            //if the social button is not hover the frame
            if (currentMenu.button[0].x + currentMenu.button[0].w + 10 < w - (socialImageSize + spaceBetweenButton) * (i + 1)) {
                b.x = w - (socialImageSize + spaceBetweenButton) * (i + 1);
            } else {
                // else, draw them on the other side
                b.x = (socialImageSize + spaceBetweenButton) * socialButtonCorrected;
                socialButtonCorrected++;
            }

            b.y = h - (socialImageSize + spaceBetweenButton);
            b.h = socialImageSize + spaceBetweenButton;
            b.w = socialImageSize + spaceBetweenButton;
            ctx.drawImage(scope.cache.image[b.icon].image, b.x + spaceBetweenButton / 2, b.y + spaceBetweenButton / 2, socialImageSize, socialImageSize);
            if (b.hover) {
                ctx.textAlign = (b.x < currentMenu.button[0].x ? "left" : "right");
                ctx.font = "20px Azure";
                ctx.textBaseline = "bottom";
                ctx.fillText(GameTranslate(b.name), b.x + socialImageSize + spaceBetweenButton / 2, b.y);
                ctx.textAlign = "center";
                ctx.font = "150% Azure";
                ctx.textBaseline = "middle";
            }
        });
    }

    drawTitle(ctx, title, that, w, h) {
        ctx.fillStyle = that.chosen[2];
        ctx.font = '200% Azure';
        ctx.imageSmoothingQuality = "high";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(title, w / 2, h / 6);
        ctx.font = '150% Azure';
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    settingsGeneralMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, GameTranslate(currentMenu.name), that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.reverseIndex()) {
                    that.createGradient(ctx, button);
                    const metrics = ctx.measureText(GameTranslate(button.name));
                    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                    ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                } else {
                    ctx.fillRect(0, h / 1.8 + 52 * index - 16, w, 40);
                }
            }
            ctx.fillStyle = that.chosen[2];
            //? back button will always be the last one in the array
            if (index == currentMenu.button.reverseIndex()) {
                that.createBackButton(ctx, button, w, h);
            } else {
                // special button menu
                switch (index) {
                    case 0:
                        ctx.textAlign = "left";
                        ctx.fillText(GameTranslate(button.name), w / 10, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(GameConfig.alwaysRun ? "Enabled" : "Disabled", w / 2, h / 1.8 + 52 * index);
                        break;
                    case 1:
                        ctx.textAlign = "left";
                        ctx.fillText(GameTranslate(button.name), w / 10, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${GameConfig.targetFps > 30 ? "-" : " "}    ${GameConfig.targetFps}    ${GameConfig.targetFps < 140 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                    case 2:
                        ctx.textAlign = "left";
                        ctx.fillText(GameTranslate(button.name), w / 10, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(ConfigConst.DEBUG ? "Enabled" : "Disabled", w / 2, h / 1.8 + 52 * index);
                        break;
                }
            }
        });
    }

    createGradient(ctx, button) {
        var gradient = ctx.createLinearGradient(button.x, button.y, button.x + button.w, button.y);
        gradient.addColorStop(0, "#F3C126");
        gradient.addColorStop(0.5, "#6FE0E181");
        gradient.addColorStop(1, "#3C1EEE00");
        ctx.fillStyle = gradient;
    }

    createBackButton(ctx, button, w, h) {
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        const metrics = ctx.measureText(GameTranslate(button.name));
        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        ctx.fillText(GameTranslate(button.name), 20, h - 20, w);
        // bigger hitbox, that's why it's different than the text coos
        button.x = 0;
        button.y = h - actualHeight - 40;
        button.w = metrics.width + 40;
        button.h = actualHeight + 40;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    settingsAudioMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, GameTranslate(currentMenu.name), that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.reverseIndex()) {
                    that.createGradient(ctx, button);
                    const metrics = ctx.measureText(GameTranslate(button.name));
                    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                    ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                } else {
                    ctx.fillRect(w / 2 - w / 4, h / 1.8 + 52 * index - 16, w, 40);
                }
            }
            ctx.fillStyle = that.chosen[2];
            //? back button will always be the last one in the array
            if (index == currentMenu.button.reverseIndex()) {
                that.createBackButton(ctx, button, w, h);
            } else {
                // special button menu
                switch (index) {
                    case 0:
                        ctx.textAlign = "left";
                        ctx.fillText(GameTranslate(button.name), w / 18, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${scope.soundsSettings.volumeBG > 0 ? "-" : " "}    ${Math.floor(scope.soundsSettings.volumeBG * 100)}%    ${scope.soundsSettings.volumeBG < 1 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                    case 1:
                        ctx.textAlign = "left";
                        ctx.fillText(GameTranslate(button.name), w / 18, h / 1.8 + 52 * index, w);
                        button.x = 0;
                        button.y = h / 1.8 + 52 * index - 16;
                        button.w = w;
                        button.h = 40;
                        ctx.textAlign = "center";
                        ctx.fillText(`${scope.soundsSettings.volumeEFX > 0 ? "-" : " "}    ${Math.floor(scope.soundsSettings.volumeEFX * 100)}%    ${scope.soundsSettings.volumeEFX < 1 ? "+" : " "}`, w / 2, h / 1.8 + 52 * index);
                        break;
                }
            }
        });
    }
    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    settingsKeyBindMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, GameTranslate(currentMenu.name), that, scope.w, scope.h);
        ctx.lineWidth = 3;

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        // get the size of the title
        ctx.font = '200% Azure';
        const metrics = ctx.measureText(GameTranslate(currentMenu.name));

        currentMenu.button.forEach((button, index) => {
            ctx.fillStyle = that.chosen[2];
            ctx.strokeStyle = that.chosen[2];
            //? back button will always be the last one in the array
            if (index == currentMenu.button.reverseIndex()) {
                ctx.font = '150% Azure';
                if (currentMenu.focusedButton == currentMenu.button.reverseIndex()) {
                    that.createGradient(ctx, button);
                    const metrics = ctx.measureText(GameTranslate(button.name));
                    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                    ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                    ctx.fillRect(button.x, button.y, button.w, button.h);
                }
                ctx.fillStyle = that.chosen[2];
                that.createBackButton(ctx, button, w, h);
            } else {
                ctx.textAlign = "left";
                button.x = w / 2 - w / 8;
                button.y = h / 3.5 + 52 * index - 16 + that.arrowHeightChange;
                button.w = w / 2;
                button.h = 40;
                ctx.textAlign = "center";
                ctx.font = "bold 200% serif";
                const b1 = that.keyBindShowerCorrect(button.key1),
                    b2 = that.keyBindShowerCorrect(button.key2);

                //if we can see the button, draw them
                if (button.y > h / 6 + metrics.actualBoundingBoxDescent + 10 && button.y + button.h < h - 10) {
                    button.enabled = true;
                    ctx.fillText(GameTranslate(button.name), w / 6, button.y + 16, w);
                    ctx.fillText(b1, button.x + button.w / 4, button.y + 16);
                    ctx.fillText(b2, button.x + 3 * button.w / 4, button.y + 16);

                    // underline the current button where the mouse is on
                    if (currentMenu.focusedButton == index && currentMenu.sideButton > 0) {
                        const metrics = ctx.measureText((currentMenu.sideButton == 1 ? b1 : b2));
                        ctx.beginPath();
                        // beccause sideButton is 1 or 2, we use this multiplication to only do one task, and not test the side
                        ctx.moveTo((button.x + (currentMenu.sideButton - 1) * button.w / 2) + button.w / 4 - metrics.width / 2,
                            button.y + button.h);
                        ctx.lineTo((button.x + (currentMenu.sideButton - 1) * button.w / 2) + button.w / 4 + metrics.width / 2,
                            button.y + button.h);
                        ctx.stroke();
                    }
                } else {
                    button.enabled = false;
                }
                ctx.font = "200% Azure";
            }
        });

        // check if first button is out of screen
        if (currentMenu.button[0].y < h / 6 + metrics.actualBoundingBoxDescent + 10) {
            // button is out of screen, enable arrow down
            currentMenu.arrow[0].enabled = true;
        } else if (currentMenu.arrow[0].enabled) {
            // disable the arrow
            currentMenu.arrow[0].enabled = false;
            currentMenu.arrow[0].x = 0;
            currentMenu.arrow[0].y = 0;
            currentMenu.arrow[0].w = 0;
            currentMenu.arrow[0].h = 0;
        }

        // check if last button is out of screen
        if (currentMenu.button.last(1).y + currentMenu.button.last(1).h > h - 10) {
            // button is out of screen, enable arrow down
            currentMenu.arrow[1].enabled = true;
        } else if (currentMenu.arrow[1].enabled) {
            // disable the arrow
            currentMenu.arrow[1].enabled = false;
            currentMenu.arrow[1].x = 0;
            currentMenu.arrow[1].y = 0;
            currentMenu.arrow[1].w = 0;
            currentMenu.arrow[1].h = 0;
        }

        const arrowSize = 20,
            arrowOffset = 50;
        currentMenu.arrow.forEach((a, i) => {
            if (i == 0 && (a.enabled || ConfigConst.DEBUG)) {
                a.w = arrowSize + arrowOffset;
                a.h = arrowSize + arrowOffset;
                a.x = w - 10 - arrowOffset - arrowOffset / 2;
                a.y = h / 6 + metrics.actualBoundingBoxDescent + arrowOffset - arrowOffset / 2;
                if (ConfigConst.DEBUG) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(a.x, a.y, a.w, a.h);
                }
                ctx.drawImage(a.draw(that.chosen[2]), w - 10 - arrowOffset, h / 6 + metrics.actualBoundingBoxDescent + arrowOffset, arrowSize, arrowSize);
            } else if (i == 1 && (a.enabled || ConfigConst.DEBUG)) {
                a.w = arrowSize + arrowOffset;
                a.h = arrowSize + arrowOffset;
                a.x = w - 10 - arrowOffset - arrowOffset / 2;
                a.y = h - 10 - arrowOffset - arrowOffset / 2;
                if (ConfigConst.DEBUG) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(a.x, a.y, a.w, a.h);
                }
                ctx.drawImage(a.draw(that.chosen[2]), w - 10 - arrowOffset, h - 10 - arrowOffset, arrowSize, arrowSize);
            }
        });
    }

    /**
     * Correct control name for better visibility.
     * @param {string} str 
     * @returns {string}
     */
    keyBindShowerCorrect(str) {
        var r = "";
        switch (str) {
            case " ":
                r = "Space";
                break;
            case undefined:
                r = "Undefined";
                break;
            default:
                r = str.CapitalizeFirstLetterWord();
                break;
        }
        return r;
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    settingsMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, GameTranslate(currentMenu.name), that, scope.w, scope.h);

        var gradient = ctx.createLinearGradient(w / 2 - 200, h / 1.8, w / 2 + 200, h / 1.8);
        gradient.addColorStop(0, "#F3C12600");
        gradient.addColorStop(0.5, "#6FE0E1");
        gradient.addColorStop(1, "#3C1EEE00");

        currentMenu.button.forEach((button, index) => {
            if (index == currentMenu.focusedButton) {
                ctx.fillStyle = gradient;
                if (index == currentMenu.button.reverseIndex()) {
                    that.createGradient(ctx, button);
                    const metrics = ctx.measureText(GameTranslate(button.name));
                    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                    ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                } else {
                    ctx.fillRect(w / 2 - 200, h / 1.8 + 52 * index - 16, 400, 40);
                }
            }
            ctx.fillStyle = that.chosen[2];
            //? back button will always be the last one in the array
            if (index == currentMenu.button.reverseIndex()) {
                that.createBackButton(ctx, button, w, h);
            } else {
                ctx.fillText(GameTranslate(button.name), w / 2, h / 1.8 + 52 * index, w);
                button.x = w / 2 - 200;
                button.y = h / 1.8 + 52 * index - 16;
                button.w = 400;
                button.h = 40;
            }
        });
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    loadMenuFct(scope, that) {
        const ctx = scope.cache.context[that.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentMenu = that.menu[that.focusedMenu];
        that.drawTitle(ctx, "Load Game", that, scope.w, scope.h);

        //if in app
        if (scope.constants.isNwjs) {
            //TODO if distant server is set up, load online save on local
            // await the function to laod all the files
            if (!that.loadSaveFileApp) {
                GameSaveManager.load().then(result => {
                    that.loadSaveFileApp = result;
                    //TODO create new buttons for each saves
                    console.log(result);
                    let tempButton = [];
                    result.files.forEach(file => {
                        tempButton.push({
                            name: file.name.CapitalizeFirstLetterSentence(),
                            lastEditDate: file.lastEditDate,
                            x: 0,
                            y: 0,
                            w: 0,
                            h: 0,
                            function: () => { GameGlobalObject.loadGame(file.content); }
                            //TODO add infos relative to the game, like current map, player name, wealth etc...
                        });
                    });
                    // also push the back button inside the new button list
                    tempButton.push(currentMenu.button.last());
                    currentMenu.button = tempButton;
                    that.u();
                }).catch(error => {
                    console.error(error);
                    // make the game stop looping this part
                    that.loadSaveFileApp = true;
                    if (error[0] == "EMPTY") {
                        that.loadSaveFileAppMessage = error[1];
                    } else {
                        that.loadSaveFileAppMessage = "A problem happened when loading files.";
                    }
                    that.u();
                });
            } else {
                currentMenu.button.forEach((b, i) => {
                    b.x = 20;
                    b.w = w - 40;
                    b.y = 2 * h / 6 + i * 45;
                    b.h = 40;
                    //TODO display infos relatives to the save (time played, map, player name)

                    ctx.fillStyle = "#b8b8b8";
                    ctx.strokeStyle = "#4d4b4b";
                    ctx.lineWidth = 4;
                    ctx.globalAlpha = (i == currentMenu.focusedButton ? 0.7 : 0.5);
                    RectangleCreator.roundRect(ctx, b.x, b.y, b.w, b.h, 10, true, true);
                    ctx.globalAlpha = 1;
                });
            }

            //if it fails, create a back button
            if (!that.loadSaveFileApp || that.loadSaveFileApp === true) {
                that.createGradient(ctx, currentMenu.button.last());
                const metrics = ctx.measureText(currentMenu.button.last().name);
                const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                ctx.fillStyle = that.chosen[2];
                currentMenu.focusedButton = currentMenu.button.reverseIndex();
                that.createBackButton(ctx, currentMenu.button.last(), w, h);
                ctx.fillText(that.loadSaveFileAppMessage, w / 2, h / 2, w);
                that.loadSaveFileApp = null;
            }
        } else {
            //if online

            var gradient = ctx.createLinearGradient(w / 2 - 200, h / 3, w / 2 + 200, h / 3);
            gradient.addColorStop(0, "#F3C12600");
            gradient.addColorStop(0.5, "#6FE0E1");
            gradient.addColorStop(1, "#3C1EEE00");

            ctx.fillText("Choose a save file:", w / 2, h / 3 - 40);
            currentMenu.button.forEach((button, index) => {
                if (index == currentMenu.focusedButton) {
                    ctx.fillStyle = gradient;
                    if (index == currentMenu.button.reverseIndex()) {
                        that.createGradient(ctx, button);
                        const metrics = ctx.measureText(GameTranslate(button.name));
                        const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                        ctx.fillRect(0, h - actualHeight - 40, metrics.width + 40, + actualHeight + 40);
                    } else {
                        ctx.fillRect(w / 2 - 200, h / 3 + 52 * index - 16, 400, 40);
                    }
                }
                ctx.fillStyle = that.chosen[2];
                //? back button will always be the last one in the array
                if (index == currentMenu.button.reverseIndex()) {
                    that.createBackButton(ctx, button, w, h);
                } else {
                    ctx.fillText(GameTranslate(button.name), w / 2, h / 3 + 52 * index, w);
                    button.x = w / 2 - 200;
                    button.y = h / 3 + 52 * index - 16;
                    button.w = 400;
                    button.h = 40;
                }
            });

            if (!that.checkSaveFile) {
                that.checkSaveFile = true;
                that.loadSaveFileRetry(scope, that);
            }

            const metrics = ctx.measureText("TMWBpqliyQKL"),
                heightDiff = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 10;

            //TODO display data relative to the saved data, and change the retry name button in "Load another file"
            if (that.loadSaveFile.file && !that.loadSaveFile.failed) {
                currentMenu.button[0].name = "Load another file";

                ctx.textAlign = "left";
                ctx.font = "100% Azure";

                ctx.fillText("Name: " + that.loadSaveFile.name.split(".")[0], w / 4, h / 3 + 100);
                ctx.fillText("Last Update: " + Utils.convertDate(Date.now() - that.loadSaveFile.lastEditDate), w / 4, h / 3 + 100 + heightDiff);

                ctx.font = "150% Azure";
                ctx.textAlign = "center";
            } else if (that.loadSaveFile.file && that.loadSaveFile.failed) {
                currentMenu.button[0].name = "Retry";

                ctx.textAlign = "left";
                ctx.font = "100% Azure";

                ctx.fillText("Error: " + that.loadSaveFile.error[0], w / 4, h / 3 + 100);
                ctx.fillText("Try loading a file again.", w / 4, h / 3 + 100 + heightDiff);
                if (that.loadSaveFile.try > 2) ctx.fillText("You can call for help on our support if needed.", w / 4, h / 3 + 100 + heightDiff * 2);

                ctx.font = "150% Azure";
                ctx.textAlign = "center";
            }
        }
    }

    //TODO add the load method when save object is ready
    /**
     * @param {GameScope} scope 
     * @param {this} that 
     */
    loadSave(scope, that) {
        if (!scope.constants.isNwjs) {
            const currentMenu = that.menu[that.focusedMenu],
                b = currentMenu.button[currentMenu.focusedButton];
            if ((!that.loadSaveFile.file || that.loadSaveFile.failed === false) && b.name != "Load a file before!") {
                const o = b.name;
                b.name = "Load a file before!";
                that.u();
                setTimeout(() => {
                    b.name = o;
                    that.u();
                }, 5000);
            } else {
                //TODO enable the loading screen, saying "Loading your save"
                that.activated = false;
                LoadingScreenManager.init();
                LoadingScreenManager.setMaxProgress(1);
                LoadingScreenManager.message = "Loading your save";
                setTimeout(() => {
                    LoadingScreenManager.end();
                    that.activated = true;
                }, 5000);
                console.log(that.loadSaveFile);
            }
        }
    }

    /**
     * @param {GameScope} scope 
     * @param {this} that 
     */
    loadSaveFileRetry(scope, that) {
        if (!scope.constants.isNwjs) {
            //add a input element and check it
            let inputs = document.createElement('input');
            inputs.type = 'file';
            inputs.hidden = true;
            inputs.accept = ".kyraadv,.kyraadvsave";
            inputs.id = "GameSaveInput";
            inputs.name = "GameSaveInput";
            // we want only one file
            inputs.multiple = false;

            inputs.click();
            inputs.onchange = ev => {
                // the first file inputed only
                that.loadSaveFile.file = inputs.files[0];
                //get the name and the ext of the file
                that.loadSaveFile.name = ev.target.value.split('\\').pop();
                that.loadSaveFile.lastEditDate = inputs.files[0].lastModified;

                const saveReader = new FileReader();
                saveReader.readAsText(that.loadSaveFile.file, "UTF-8");
                saveReader.onload = function (evt) {
                    // content of the file
                    that.loadSaveFile.contentString = evt.target.result;
                    const decrypt = GameDecrytpData(that.loadSaveFile.contentString);
                    try {
                        that.loadSaveFile.contentObject = JSON.parse(decrypt);
                        that.u();
                    } catch (e) {
                        that.loadSaveFile.failed = true;
                        that.loadSaveFile.error = ["Failed to load the content. File may be corrupted.", e];
                        that.loadSaveFile.try++;
                        that.u();
                    }
                    console.log(that.loadSaveFile);
                };
                saveReader.onerror = function (evt) {
                    console.log("error reading file");
                    console.log(evt);
                    that.loadSaveFile.failed = true;
                    that.loadSaveFile.error = ["Failed to load the content. File may be corrupted.", e];
                    that.loadSaveFile.try++;
                    that.u();
                };
            };
        }
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    render(scope) {
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h;
        ctx.clearRect(0, 0, w, h);
        // render the background
        ctx.drawImage(scope.cache.image[this.chosen[0]].image, 0, 0, w, h);
        ctx.drawImage(scope.cache.image[this.chosen[1]].image, 0, 0, w, h);

        if (ConfigConst.DEBUG) {
            this.menu[this.focusedMenu].button.forEach((b, idx) => {
                ctx.fillStyle = "red";
                if (!b.special) ctx.fillRect(b.x, b.y, b.w, b.h);
                else {
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(b.x, b.y, b.w / 2, b.h);
                    ctx.fillStyle = "green";
                    ctx.fillRect(b.x + b.w / 2, b.y, b.w / 2, b.h);
                }
                if (MTM.clickOver(b.x, b.y, b.w, b.h)) {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(b.x, b.y, b.w, b.h);
                }
            });
        }

        try {
            // render the current menu
            this.menu[this.focusedMenu].function(scope, this);
        } catch (e) {
            WindowManager.fatal(e);
        }
        this.needsUpdate = false;
    }

    /**
     * Check if the given key exists in the config in all parameters.
     * If yes, then return false, otherwise, return true.
     * @param {string} key
     * @returns {boolean} 
     */
    checkNoDuplicateKey(key) {
        let validation = false;
        for (var keysCategory in GameConfig.keyBoard) {
            if (GameConfig.keyBoard[keysCategory].includes(key.toLowerCase())) { validation = true; break; }
        }
        return validation;
    }

    endOfInput(that) {
        that.awaitInput = false;
        that.buttonToChange = { id: null, key: null };
        that.oldKey = { key1: "", key2: "" };
        that.u();
    }

    /**
     * @param {GameScope} scope
     * @param {this} that 
     */
    update(scope) {
        const that = this,
            k = GameConfig.keyBoard,
            currentMenu = this.menu[this.focusedMenu];
        const kup = KTM.pressed(k.up),
            kdown = KTM.pressed(k.down),
            kright = KTM.pressed(k.right),
            kleft = KTM.pressed(k.left),
            kconfirm = KTM.pressed(k.confirm),
            kback = KTM.pressed(k.back);

        if (this.awaitInput && that.keyboardConfirmDelay + 150 < Date.now()) {
            onkeydown = (ev) => {
                // the current button
                const b = that.menu[5].button[that.buttonToChange.id];
                if (that.buttonToChange.key == 1 && ev.key.toLowerCase() != b.key2 && !that.checkNoDuplicateKey(ev.key.toLowerCase())) {
                    b.key1 = ev.key.toLowerCase();
                    // change the correct data in the config
                    b.function(0, b);
                    that.endOfInput(that);
                }
                if (that.buttonToChange.key == 2 && b.key1.toLowerCase() != ev.key && !that.checkNoDuplicateKey(ev.key.toLowerCase())) {
                    b.key2 = ev.key.toLowerCase();
                    // change the correct data in the config
                    b.function(1, b);
                    that.endOfInput(that);
                }
            };
        }

        // to apply the delay for the keyboard
        if (kup || kdown || kright || kleft || kconfirm || kback) {
            if (this.KeyboardDelay + 100 >= Date.now()) {
                return;
            } else {
                this.KeyboardDelay = Date.now();
            }
        }

        if (!that.awaitInput) {
            // scroll up and down in the buttons of the current menu
            if (kdown && currentMenu.focusedButton < currentMenu.button.reverseIndex()) {
                currentMenu.focusedButton++;
                that.u();
            }
            if (kup && currentMenu.focusedButton > 0) {
                currentMenu.focusedButton--;
                that.u();
            }
            if (kconfirm && !currentMenu.button[currentMenu.focusedButton].special &&
                !currentMenu.button[currentMenu.focusedButton].keyboard) {
                currentMenu.button[currentMenu.focusedButton].function(scope, that);
                that.u();
            }
            if (currentMenu.button[currentMenu.focusedButton].special) {
                if (kright) { currentMenu.button[currentMenu.focusedButton].function(1); that.u(); }
                if (kleft) { currentMenu.button[currentMenu.focusedButton].function(0); that.u(); }
            } else if (kleft && currentMenu.button[currentMenu.button.reverseIndex()].back &&
                (!currentMenu.sideButton || currentMenu.sideButton == 1)) {
                // to focus on the back button
                currentMenu.focusedButton = currentMenu.button.reverseIndex();
                that.u();
            }
            if (kback && currentMenu.button[currentMenu.button.reverseIndex()].back) {
                currentMenu.button[currentMenu.button.reverseIndex()].function(scope, that);
                that.u();
            }
            if (currentMenu.sideButton) {
                if (kright) { currentMenu.sideButton = 2; that.u(); }
                if (kleft) { currentMenu.sideButton = 1; that.u(); }
            }
        }
        if (kconfirm && currentMenu.button[currentMenu.focusedButton].keyboard &&
            currentMenu.button[currentMenu.focusedButton].enabled) {
            const b = currentMenu.button[currentMenu.focusedButton];
            if (!that.awaitInput && that.keyboardConfirmDelay + 150 < Date.now()) {
                that.keyboardConfirmDelay = Date.now();
                // create input
                console.log("create");
                switch (currentMenu.sideButton) {
                    case 1:
                        that.oldKey = { key1: b.key1, key2: b.key2 };
                        b.key1 = "Press a key...";
                        that.awaitInput = true;
                        that.buttonToChange = { id: currentMenu.focusedButton, key: 1 };
                        that.u();
                        break;
                    case 2:
                        that.oldKey = { key1: b.key1, key2: b.key2 };
                        b.key2 = "Press a key...";
                        that.awaitInput = true;
                        that.buttonToChange = { id: currentMenu.focusedButton, key: 2 };
                        that.u();
                        break;
                }
            } else {
                // cancel input
                // check if it's the same button
                if (currentMenu.focusedButton == that.buttonToChange.id && currentMenu.sideButton == that.buttonToChange.key && that.keyboardConfirmDelay + 150 < Date.now()) {
                    console.log("cancel");
                    that.keyboardConfirmDelay = Date.now();
                    switch (currentMenu.sideButton) {
                        case 1:
                            b.key1 = that.oldKey.key1;
                            that.endOfInput(that);
                            break;
                        case 2:
                            b.key2 = that.oldKey.key2;
                            that.endOfInput(that);
                            break;
                    }
                } else if (that.keyboardConfirmDelay + 150 < Date.now()) {
                    // if not, cancel last button and prepare that one
                    // create input for this current button
                    that.keyboardConfirmDelay = Date.now();
                    console.log("cancel then create");
                    switch (currentMenu.sideButton) {
                        case 1:
                            currentMenu.button[that.buttonToChange.id].key1 = that.oldKey.key1;
                            currentMenu.button[that.buttonToChange.id].key2 = that.oldKey.key2;
                            that.oldKey = { key1: b.key1, key2: b.key2 };
                            b.key1 = "Press a key...";
                            that.awaitInput = true;
                            that.buttonToChange = { id: currentMenu.focusedButton, key: 1 };
                            that.u();
                            break;
                        case 2:
                            currentMenu.button[that.buttonToChange.id].key1 = that.oldKey.key1;
                            currentMenu.button[that.buttonToChange.id].key2 = that.oldKey.key2;
                            that.oldKey = { key1: b.key1, key2: b.key2 };
                            b.key2 = "Press a key...";
                            that.awaitInput = true;
                            that.buttonToChange = { id: currentMenu.focusedButton, key: 2 };
                            that.u();
                            break;
                    }
                }
            }
        }


        // time between two frame
        const time = 1000 / scope.GameLoop.fps;
        currentMenu.button.forEach((b, idx) => {
            if (MTM.checkOver(b.x, b.y, b.w, b.h, true)) {
                currentMenu.focusedButton = idx;
                // underline the button
                if (currentMenu.button[idx].keyboard) {
                    if (MTM.checkOver(b.x, b.y, b.w / 2, b.h)) {
                        currentMenu.sideButton = 1;
                    } else if (MTM.checkOver(b.x + b.w / 2, b.y, b.w / 2, b.h)) {
                        currentMenu.sideButton = 2;
                    }
                }
                that.u();
            }
            if (MTM.clickOver(b.x, b.y, b.w, b.h, false, time) && !b.special) {
                b.function(scope, that);
                that.u();
            }
            if (b.special) {
                if (MTM.clickOver(b.x, b.y, b.w / 2, b.h, false, time)) {
                    b.function(0);
                    that.u();
                }
                if (MTM.clickOver(b.x + b.w / 2, b.y, b.w / 2, b.h, false, time)) {
                    b.function(1);
                    that.u();
                }
            }
            if (b.keyboard && b.enabled) {
                if (!that.awaitInput) {
                    // create input
                    if (MTM.clickOver(b.x, b.y, b.w / 2, b.h, false, time)) {
                        that.oldKey = { key1: b.key1, key2: b.key2 };
                        b.key1 = "Press a key...";
                        that.awaitInput = true;
                        that.buttonToChange = { id: idx, key: 1 };
                        that.u();
                    } else if (MTM.clickOver(b.x + b.w / 2, b.y, b.w / 2, b.h, false, time)) {
                        that.oldKey = { key1: b.key1, key2: b.key2 };
                        b.key2 = "Press a key...";
                        that.awaitInput = true;
                        that.buttonToChange = { id: idx, key: 2 };
                        that.u();
                    }
                } else {
                    // cancel input
                    // check if it's the same button
                    if (idx == that.buttonToChange.id &&
                        ((MTM.clickOver(b.x, b.y, b.w / 2, b.h, false, time) && that.buttonToChange.key == 1) ||
                            (MTM.clickOver(b.x + b.w / 2, b.y, b.w / 2, b.h, false, time) && that.buttonToChange.key == 2))) {
                        if (MTM.clickOver(b.x, b.y, b.w / 2, b.h, false, time)) {
                            b.key1 = that.oldKey.key1;
                            that.awaitInput = false;
                            that.buttonToChange = { id: null, key: null };
                            that.u();
                        } else if (MTM.clickOver(b.x + b.w / 2, b.y, b.w / 2, b.h, false, time)) {
                            b.key2 = that.oldKey.key2;
                            that.awaitInput = false;
                            that.buttonToChange = { id: null, key: null };
                            that.u();
                        }
                    } else {
                        // if not, cancel last button and prepare that one
                        // create input for this current button
                        if (MTM.clickOver(b.x, b.y, b.w / 2, b.h, false, time)) {
                            currentMenu.button[that.buttonToChange.id].key1 = that.oldKey.key1;
                            currentMenu.button[that.buttonToChange.id].key2 = that.oldKey.key2;
                            that.oldKey = { key1: b.key1, key2: b.key2 };
                            b.key1 = "Press a key...";
                            that.awaitInput = true;
                            that.buttonToChange = { id: idx, key: 1 };
                            that.u();
                        } else if (MTM.clickOver(b.x + b.w / 2, b.y, b.w / 2, b.h, false, time)) {
                            currentMenu.button[that.buttonToChange.id].key1 = that.oldKey.key1;
                            currentMenu.button[that.buttonToChange.id].key2 = that.oldKey.key2;
                            that.oldKey = { key1: b.key1, key2: b.key2 };
                            b.key2 = "Press a key...";
                            that.awaitInput = true;
                            that.buttonToChange = { id: idx, key: 2 };
                            that.u();
                        }
                    }
                }
            }
        });

        /*
        ? So what's going on since last time:
        TODO Didn't add keyboard navigation up and down scroll
        TODO Also need to add a keyboard navigation that will reach the arrows
        BUG if key1 == key2, stuck on Awaiting key even if we can move freely
        */
        if (currentMenu.arrow) currentMenu.arrow.forEach(a => {
            if (MTM.clickOver(a.x, a.y, a.w, a.h, false, time) && a.enabled) {
                a.function(that, currentMenu);
                that.u();
            }
        });

        var alreadyHovered = false;
        if (that.focusedMenu == 0) that.social.forEach(a => {
            if (MTM.checkOver(a.x, a.y, a.w, a.h, true) && !alreadyHovered) {
                a.hover = true;
                alreadyHovered = true;
                that.u();
            } else {
                a.hover = false;
            }
            if (MTM.clickOver(a.x, a.y, a.w, a.h, false, time)) {
                a.function(scope, that);
                that.u();
            }
        });
    }

    u() { this.needsUpdate = true; }
}


//BUG save can be created and downloaded at the start of the game? (spam keys?)