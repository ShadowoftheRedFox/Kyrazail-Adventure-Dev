export { };

declare global {
    type treeResponse = {
        data: {
            sha: string,
            url: URL,
            tree: {
                path: string,
                mode: number,
                type: "tree" | "blob",
                sha: string,
                url: URL
            }[],
            truncated: boolean
        },
        headers: {
            /**
             * @example "cache-control":"public, max-age=86400, s-maxage=86400"
             */
            "cache-control": string
            /**
             * @example "content-length": "512"
             */
            "content-length": String & number
            "content-type": "application/json; charset=utf-8"
            /**
             * @example "W/\"f967f239acf6ace458778c1d0cd56d4b3481210fd09e89847b85bdc3df4cc760\""
             */
            etag: string
            /**
             * @example "last-modified": "Sat, 07 May 2022 16:30:59 GMT"
             */
            "last-modified": string
            "x-github-media-type": "github.v3; format=json"
            "x-github-request-id": string
            /**
             * @example "x-ratelimit-limit": "100" 
             */
            "x-ratelimit-limit": String & number
            /**
             * @example "x-ratelimit-remaining": "100" 
             */
            "x-ratelimit-remaining": String & number
            /**
             * @example "x-ratelimit-reset": "100" 
             */
            "x-ratelimit-reset": String & number
            /**
             * @example "x-ratelimit-resource": "100" 
             */
            "x-ratelimit-resource": "core"
            /**
             * @example "x-ratelimit-used": "100" 
             */
            "x-ratelimit-used": String & number
        },
        /**
         * 200	OK
         * 404  Resource not found
         * 422	Validation failed
         */
        status: 200 | 404 | 422,
        url: URL
    }

    type contentResponseMult = {
        data: {
            "name": string,
            "path": string,
            "sha": string,
            "size": number,
            "url": URL,
            "html_url": URL,
            "git_url": URL,
            "download_url": URL,
            "type": "file" | "dir",
            "_links": {
                "self": URL,
                "git": URL,
                "html": URL
            }
        }[] | {
            "name": string,
            "path": string,
            "sha": string,
            "size": number,
            "url": URL,
            "html_url": URL,
            "git_url": URL,
            "download_url": URL,
            "type": "file",
            /* If content is empty, encoding is none. It means the file is too big to be checked by content, you will need to download it. */
            "content": string | "",
            /* If encoding is none, conent is empty. It means the file is too big to be checked by content, you will need to download it. */
            "encoding": "none" | "base64",
            "_links": {
                "self": URL,
                "git": URL,
                "html": URL
            }
        }
    }

    type contentResponseSolo = {
        data: {
            "name": string,
            "path": string,
            "sha": string,
            "size": number,
            "url": URL,
            "html_url": URL,
            "git_url": URL,
            "download_url": URL,
            "type": "file",
            /* If content is empty, encoding is none. It means the file is too big to be checked by content, you will need to download it. */
            "content": string | "",
            /* If encoding is none, conent is empty. It means the file is too big to be checked by content, you will need to download it. */
            "encoding": "none" | "base64",
            "_links": {
                "self": URL,
                "git": URL,
                "html": URL
            }
        }
    }

    type gitFile = {
        "name": string,
        "path": string,
        "sha": string,
        "size": number,
        "url": URL,
        "html_url": URL,
        "git_url": URL,
        "download_url": URL,
        "type": "file",
        /* If content is empty, encoding is none. It means the file is too big to be checked by content, you will need to download it. */
        "content": string | "",
        /* If encoding is none, conent is empty. It means the file is too big to be checked by content, you will need to download it. */
        "encoding": "none" | "base64",
        "_links": {
            "self": URL,
            "git": URL,
            "html": URL
        }
    }

    type scope = {
        updateData: null
        state: {
            global: {
                progress: number,
                player: {
                    level: number,
                    mana: number,
                    pv: number,
                    sp: number,
                    def: number,
                    atk: number,
                    agility: number,
                    perception: number,
                    int: number,
                    luck: number,
                    username: string,
                    xp: number,
                    equipement: {
                        head: string,
                        body: string,
                        feet: string,
                        weapon: string,
                        shield: string,
                        ring1: string,
                        ring2: string
                    },
                    clas: string
                },
                inv: {
                    gold: number
                },
                difficulty: {
                    difficultyLevel: string
                },
                character: {
                    /**
                     * Line of the player on the image, 0 or 1.
                     */
                    playerRow: number,
                    /**
                     * Row of the player on the image 0 to 3.
                     */
                    playerLine: number
                },
                face: {
                    /**
                     * Row of the face on the image 0 to 3.
                     */
                    playerLine: number,
                    /**
                     * Line of the face on the image, 0 or 1.
                     */
                    playerRow: number,
                    playerImage: "string"
                },
                quest: {
                    active: {
                        main: {},
                        secondary: {}
                    },
                    solved: {
                        main: {},
                        secondary: {}
                    },
                    failed: {
                        main: {},
                        secondary: {}
                    }
                },
                party: [{
                    pause: {
                        level: number,
                        def: number,
                        atk: number,
                        agility: number,
                        perception: number,
                        int: number,
                        luck: number,
                        xp: number,
                        pv: number,
                        mana: number,
                        username: string,
                        face: {
                            image: string,
                            line: number,
                            row: number
                        },
                        class: string[]
                    }
                }],
                map: {
                    current: string,
                    cornerX: number,
                    cornerY: number
                }
            }

            entities: {
                player: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
            }
            menu: {
                main: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
                idle: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
                pause: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
                gameOver: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
                doUpdate: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
            }
            welcome: {
                main: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
            }
            once: {
                intro: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
                checkUpdate: {
                    state: {},
                    update: () => void,
                    render: () => void
                }
            }
        }
        settings: {
            /**
             * Volume of the sounds. Between 0 and 1.
             * @default {0.5}
             */
            volumeMain: 0.5,
            /**
             * Volume of the sounds. Between 0 and 1.
             * @default {0.5}
             */
            volumeOther: 0.5,
            language: "en" | "fr",
            config: {
                /**
                 * if the game will update at the next start
                 */
                willUpdate: boolean,
                /**
                 * the fps the game will be running. Between 1 and 60
                 * @default {60}
                 */
                targetFps: number,
                /**
                 * quality of the game, add or removes details. Between 1 and 3
                 * @default {3}
                 */
                quality: number,
                /**
                 * adjusting color if needed. Between 0 and 1
                 */
                filter: {
                    red: number,
                    green: number,
                    blue: number
                },
                /**
                 * always run enabled or disabled
                 */
                alwaysRun: boolean,
                /**
                 * language of the game
                 */
                lang: "en",
                /**
                 * key input
                 * ? See all KEY NAME here: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/#a-full-list-of-key-event-values
                 * ! It is not recommended to put same keys at two different functionnality
                 */
                keyBoard: {
                    up: ["ArrowUp", "z"],
                    down: ["ArrowDown", "s"],
                    right: ["ArrowRight", "d"],
                    left: ["ArrowLeft", "q"],
                    run: ["Shift"],
                    interaction: ["e", "Enter"],
                    debug: ["k"],
                    pause: ["p"],
                    back: ["Backspace", "x"],
                    confirm: ["Enter"],
                    inventory: ["c", "a"]
                }
            }
        }

        menu: {
            loadingGame: boolean,
            loadingMap: boolean,
            loadingTiles: boolean,
            intro: boolean,
            welcome: boolean,
            gameOver: boolean,
            paused: boolean,
            update: boolean
        }

        updateGame: {
            checkUpdate: boolean
        }

        debug: {
            showFps: boolean,
            debug: boolean
        }

        constants: {
            /**
             * if NodeJS is included.
             */
            isNodejs: boolean,
            /**
             * The url relativ to the game.
             */
            href: string,
            /**
             * The current filter applied.
             */
            defaultFilter: string,
            /**
             * The text is written in the middle of the given y axis.
             */
            textBaseline: 'middle',
            /**
             * The path to access save folder.
             */
            savePath: string,
            /**
             * The current platform of the user. ONly works if isNodeJS === true; 
             * If false, platform = "Cloud"
             */
            platform: "Cloud" | "aix" | "darwin" | "freebsd" | "linux" | "openbsd" | "sunos" | "win32" | "android",
            /**
             * The width of the window. 
             * min-width: 800px / max-width: 5120px
             */
            width: number,
            /**
             * The heigth of the window.
             * min-height: 400px / max-height: 2880px
             */
            height: number,
            /**
             * The fps to reach.
             */
            targetFps: number,
            /**
             * Transition property.
             */
            transition: {
                /**
                 * If a transition is going on.
                 */
                transition: boolean,
                /**
                 * If the transition is starting.
                 */
                start: boolean,
                /**
                 * If a transition is ending.
                 */
                end: boolean,
                /**
                 * The speed of the transition.
                 */
                speed: number,
                /**
                 * The count to keep track of the transition progression.
                 */
                count: number
            },
            /**
             * Idle property to show idle screen.
             */
            idle: {
                /**
                 * The idle time to reach before starting the idle screen, in ms.
                 */
                idleTimeMax: number,
                /**
                 * The current idle time, in ms.
                 */
                idleTime: number,
                /**
                 * The last time the idle time has been checked, in ms.
                 */
                lastIdleCheck: number,
                /**
                 * If the game is idle or not.
                 */
                isIdle: boolean
            },
            /**
             * TIme property, to order reminders.
             */
            time: {
                /**
                 * The time the game started, in ms.
                 */
                startedPlayingSession: number,
                /**
                 * The last remind time, in ms.
                 */
                lastRemind: number
            },
            //loads after
            tilesNames: null,
            tilesMap: null
        }

        viewport: HTMLCanvasElement

        //this one for map and entities
        viewportMap: HTMLCanvasElement

        // Get and store the canvas context as a global
        contextMap: CanvasRenderingContext2D
        context: CanvasRenderingContext2D

        //load and store image, while showing the loading screen
        /**
         * Game storage object.
         */
        cache: {
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
             * Where general data are stocked. See ressources json for data form. 
             */
            data: {
                map: {
                    name: {
                        "height": number,
                        "infinite": false,
                        "layers": {
                            "data": number[],
                            "height": number,
                            "id": number,
                            "name": string,
                            "opacity": number,
                            "type": "tilelayer",
                            "visible": boolean,
                            "width": number,
                            "x": number,
                            "y": number
                        }[],
                        "orientation": "orthogonal",
                        "renderorder": "right-up",
                        "tileheight": number,
                        "tilesets": {
                            "firstgid": number,
                            "source": string
                        }[],
                        "tilewidth": number,
                        "width": number,
                        "spawn": [number, number],
                        "colision": number[][]
                    }
                },
                package: {
                    "name": "kyra_adventure",
                    "main": "index.html",
                    "js-flags": "--expose-gc",
                    "chromium-args": "--enable-webgl --ignore-gpu-blacklist --disable-setuid-sandbox --force-color-profile=srgb",
                    "window": {
                        "title": "Kyrazail Adventure",
                        "toolbar": false,
                        "width": 816,
                        "height": 624,
                        "icon": "icon/icon.png"
                    },
                    "version": string,
                    "lastUpdate": string,
                    "release": "Dev/Alpha" | "Dev/Beta" | "Dev/Vanilla" | "Alpha" | "Beta" | "Vanilla",
                    "changelog": string[]
                },
                Update: {
                    updateFound: boolean,
                    versionFound: string,
                    lastCheck: string
                }
            }
        }

        /**
         * Game audio property, those who are running.
         */
        audio: {
            /**
             * Currently running background audio.
             */
            background: HTMLAudioElement,
            /**
             * Currently running ambiant audio.
             */
            ambiant: HTMLAudioElement,
            /**
             * Currently running system audio.
             */
            system: HTMLAudioElement,
            /**
             * Currently running battle audio.
             */
            battle: HTMLAudioElement
        }

        /**
         * Frequently and globally used function will be here.
         */
        function: {}
        update: () => void  // gameUpdate(this)
        maprender: () => void// gameMapRender(this)
        render: () => void// gameRender(this)
        loop: () => void//new  gameLoop(this)
        edit: () => void// gameEdit(this)
        crashHandler: () => void
    }

    /**
     * Create a bubble reaction on top (32px higher) of the given coordinate. Bubble time recommended: 3.6s
     * @param {scope} scope The scope.
     * @param {number} x Horyzontal position.
     * @param {number} y Vertical position.
     * @param {number} bubble The ballon you want, starting from 0 to 9.
     * @param {number} bubbleCase Case of the ballon, starting from 0 to 7.
     * @description For bubble:
     * 0 = exclamation,
     * 1 = interogation,
     * 2 = music,
     * 3 = love,
     * 4 = angry,
     * 5 = sweat,
     * 6 = bad mood,
     * 7 = silent,
     * 8 = idea,
     * 9 = sleep.
     */
    function bubble(scope: scope, x: number, y: number, bubble: number, bubbleCase: number): void;

    /**
     * Create a frame with the given parameters. Draw it like a stroke rectangle with shady background.
     * @param {scope} scope Scope.
     * @param {number} x Upper left corner x coordinate.
     * @param {number} y Upper left corner x coordinate.
     * @param {number} w Width of the rectangle.
     * @param {number} h Heigth of the rectangle.
     */
    function frameRectangleTrans(scope: scope, x: number, y: number, w: number, h: number): void;

    /**
     * Create a frame with the given parameters. Draw it like a stroke rectangle.
     * @param {scope} scope Scope.
     * @param {number} x Upper left corner x coordinate.
     * @param {number} y Upper left corner x coordinate.
     * @param {number} w Width of the rectangle.
     * @param {number} h Heigth of the rectangle.
     * @param {HTMLImageElement} [imageToDraw] The image you want to draw inside the frame. Optionnal.
     * @param {number} [ix] Upper left corner x coordinate or the image. If imageToDraw is specified, must be defined.
     * @param {number} [iy] Upper left corner x coordinate or the image. If imageToDraw is specified, must be defined.
     * @param {number} [iw] Width of the rectangle of the image. If imageToDraw is specified, must be defined.
     * @param {number} [ih] Heigth of the rectangle of the image. If imageToDraw is specified, must be defined.
     */
    function frameRectangle(scope: scope, x: number, y: number, w: number, h: number, imageToDraw: HTMLImageElement, ix: number, iy: number, iw: number, ih: number): void;

    /**
     * Create a light effect. Add one pixel by one pixel.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x Center of the circle.
     * @param {number} y Center of the circle.
     * @param {number} diameter Diameter of the circle.
     * @param {number} [beginDiameter=0] The first diameter that will increase to diameter. Default: 0
     * @param {number} [alphaRatio=0] Light will go from dark to bright proportinaly of the given globalAlpha. Default: 0
     * @param {number} [brightness=0.012] Wanted brightness of the light; Default: 0.012
     * @param {string | CanvasGradient | CanvasPattern} [color="#e6cd7c"] Color of the light. Default: #e6cd7c
     */
    function lightEffect(ctx: CanvasRenderingContext2D, x: number, y: number, diameter: number, beginDiameter?: number, alphaRatio?: number, brightness?: number, color?: string): void;

    /**
     * Create a light effect depending of the time of the day.
     * @param {CanvasRenderingContext2D} ctx the canvas to draw on
     * @param {number} time times of th day, in ms?
     * @returns 
     */
    function dayNightCycle(ctx: CanvasRenderingContext2D, time: number): void;

    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} [radius = 5] The corner radius; It can also be an object to specify different radius for corners
     * @param {Number} [radius.tl = 0] Top left
     * @param {Number} [radius.tr = 0] Top right
     * @param {Number} [radius.br = 0] Bottom right
     * @param {Number} [radius.bl = 0] Bottom left
     * @param {Boolean} [fill = false] Whether to fill the rectangle.
     * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
     */
    function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius?: number, fill?: boolean, stroke?: boolean): void;

    /**
     * Reduce or increase little by little the alpha.
     * @param {number} speed the bigger is the number, the slower it goes.
     * @param {scope} scope to get the dimendion of the canvas 
     */
    function transition(speed: number, scope: scope): void;

    /**
     * Draw an underline under a given text and position
     * @param {CanvasRenderingContext2D} context 
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     * @param {string | CanvasGradient | CanvasPattern} color 
     * @param {string} textSize 
     * @param {CanvasTextAlign} align 
     */
    function underline(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, textSize: string, align: CanvasTextAlign): void;

    /**
     * Load wanted image and sounds.
     * @param {scope} scope The scope of the game
     * @param {boolean} [battle = false] Return battle ressources.
     * @param {boolean} [map = false] Return map ressources.
     * @param {boolean} [animations = false] Return animations ressources.
     * @param {boolean} [background = false] Return background ressources.
     * @param {boolean} [introduction = true] Return default ressources, to start the game.
     */
    function loadGame(scope: scope, battle?: boolean, map?: boolean, animations?: any, background?: boolean, introduction?: boolean): Promise<{ image: { intro: {}, faces: {}, battlebacks1: {}, battlebacks2: {}, battlers: {}, animations: {}, tilesets: {}, titles1: {}, titles2: {}, system: {}, parallaxes: {}, characters: {} }, audio: { BGM: {}, BGS: {}, MAIN: {}, ME: {}, SE: {} } }>

    /**
     * Load image or sounds from names.
     * @param {scope} scope 
     * @param {string[]} imgArray Array of image name to return.
     * @param {string[]} sndArray Array of sounds name to return.
     */
    function loadFromName(scope: scope, imgArray: string[], sndArray: string[]): Promise<{ image: { intro: {}, faces: {}, battlebacks1: {}, battlebacks2: {}, battlers: {}, animations: {}, tilesets: {}, titles1: {}, titles2: {}, system: {}, parallaxes: {}, characters: {} }, audio: { BGM: {}, BGS: {}, MAIN: {}, ME: {}, SE: {} } }>

    /**
     * The static class that manages the plugins.
     */
    const PluginManager: {
        setup(plugins: Array<{}>, call: any): void
    };

    /**
     * The static class that manages the json files.
     */
    const DataManager: {
        setup(plugins: Array<{}>, call: any): void
    };

    /**
    * The static class that manages the window.
    */
    const WindowManager: {
        /**
         * Show error on canvas, for fatal one that block and stops the game.
         * @param {Error} e The error.
         * @param {number} w Width of the canvas.
         * @param {number} h Height of the canvas.
         */
        fatal(e: Error, w: number, h: number): void
        /**
         * Initialise the fatal error display.
         */
        init(): void
        /**
         * "remove" the game from the current game.
         */
        closeGame(): void
        /**
         * Reload the game.
         */
        reloadGame(): void
        data: {
            viewport: HTMLCanvasElement,
            ctx: CanvasRect,
            created: boolean
        }
    }

    /**
     * The static class that manages the auto updates of the game.
     */
    const UpdateManager: {
        /**
         * Check the package.json in the git repo, and check version, if different, return true, if same, return false
         * @param {string} version Current version of the game that will be tested with the version online. 
         * @param {any} call callback function
         * @returns { same: boolean, version: string }
         */
        checkVersion(version: string, call: any): { same: boolean, version: string },

        /**
         * We know there is a new version, save it if possible.
         * @param {string} version Version found
         */
        laterSave(version: string): void;
    }

    /**
     * Play a sound on the game from sound folder, looping the sound by default.
     * @param {"BGM" | "BGS" | "MAIN" | "ME" | "SE"} folder Name of the folder.
     * @param {String | "random"} sound Name of the song in folder.
     * @param {scope} scope The position of the sound folder from the file that call this function.
     * @returns {HTMLAudioElement}
     * @throws {HTMLAudioElement} If no audio found, throw the first one or an error
     * @link https://www.chosic.com/free-music/calm/
     * @example playSound("Adeste", scope)
     */
    function playSound(folder: "BGM" | "BGS" | "MAIN" | "ME" | "SE", sound: String | "random", scope: scope): HTMLAudioElement

    const defaultConfig: {
        /**
         * if the game will update at the next start
         */
        willUpdate: boolean,
        /**
         * the fps the game will be running. Between 1 and 60
         * @default {60}
         */
        targetFps: number,
        /**
         * quality of the game, add or removes details. Between 1 and 3
         * @default {3}
         */
        quality: number,
        /**
         * adjusting color if needed. Between 0 and 1
         */
        filter: {
            red: number,
            green: number,
            blue: number
        },
        /**
         * always run enabled or disabled
         */
        alwaysRun: boolean,
        /**
         * language of the game
         */
        lang: "en",
        /**
         * key input
         * ? See all KEY NAME here: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/#a-full-list-of-key-event-values
         * ! It is not recommended to put same keys at two different functionnality
         */
        keyBoard: {
            up: ["ArrowUp", "z"],
            down: ["ArrowDown", "s"],
            right: ["ArrowRight", "d"],
            left: ["ArrowLeft", "q"],
            run: ["Shift"],
            interaction: ["e", "Enter"],
            debug: ["k"],
            pause: ["p"],
            back: ["Backspace", "x"],
            confirm: ["Enter"],
            inventory: ["c", "a"]
        }
    }

    /**
     * Get the proper pixel ratio of teh creen.
     * @param {CanvasRenderingContext2D} context 
     */
    function getPixelRatio(context: CanvasRenderingContext2D): number

    /**
     * Create a canvas element on the html page.
     * @param {number} w width of the canvas
     * @param {number} h heigth of the canvas 
     * @returns {HTMLCanvasElement}
     */
    function generateCanvas(w: number, h: number): HTMLCanvasElement

    /**
     * Edit the canvas element on the html page to the new dimension.
     * @param {HTMLCanvasElement} canvas canvas element
     * @param {CanvasRenderingContext2D} context
     * @param {number} neww new width of the canvas
     * @param {number} newh new heigth of the canvas 
     */
    function regenerateCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, neww: number, newh: number): void

    /**
     * Return current date in dd/mm/yyyy format.
     * @returns {string}
     * @example "19/05/2022"
     */
    function getDate(): string

    /**
     * Return the exact date in dd/mm/yyyy hh:mm:ss format
     * @returns {string} exact date
     * @example '05/17/2012 10:52:21'
     */
    function getExactDate(): string

    /**
     * Check wether or not to save log.
     * Called by CustomConsole.
     * @private
     */
    function checkIfNeedToLog(): void

    /**
     * Custom logs: exactly like log, except that it logs the args to get pushed into a log file
     */
    const CustomConsole: {
        log(any: any, ...args: any): void
        warn(any: any, ...args: any): void
        error(any: any, ...args: any): void
        assert(any: any, ...args: any): void
        clear(any: any, ...args: any): void
        context(any: any, ...args: any): void
        count(any: any, ...args: any): void
        countReset(any: any, ...args: any): void
        debug(any: any, ...args: any): void
        dir(any: any, ...args: any): void
        dirxml(any: any, ...args: any): void
        group(any: any, ...args: any): void
        groupCollapsed(any: any, ...args: any): void
        groupEnd(any: any, ...args: any): void
        info(any: any, ...args: any): void
        profile(any: any, ...args: any): void
        profileEnd(any: any, ...args: any): void
        table(any: any, ...args: any): void
        time(any: any, ...args: any): void
        timeEnd(any: any, ...args: any): void
        timeLog(any: any, ...args: any): void
        timeStamp(any: any, ...args: any): void
        trace(any: any, ...args: any): void
    }

    /**
     * Built in translate module. Translate the given string in other language
     * @param {"en"|"fr"} lang the lang to translate
     * @param {string} str the default string to translate, a keyCode like string
     * @param {array} [param=string[]] the paramters of the string to translate, if there is.
     * @example translate("en","mainMenuNewGameButton"); //-> "New game"
     * translate("fr","mainMenuNewGameButton"); //-> "Nouveau jeux"
     */
    function translate(lang: "en" | "fr", str: string, param?: string[]): string

    /**
     * Return the element or null if found
     * @param {Document | HTMLElement} document document or root element
     * @param {HTMLElementTagNameMap} element type of element to find, as string
     * @returns {null | HTMLElement}
     * @example findElement(document, "p") => null | p //who is a HTMLElement
     */
    function findElement(document: Document, element: HTMLElementTagNameMap): null | HTMLElement

    const MouseTrackerManager: {
        data: {
            lastMove: { x: number, y: number },
            click: {
                x: number,
                y: number,
                date: number
            }[]
        }
        /**
         * Initialise the manager.
         */
        init(): void
        /**
         * Track the mouse move event.
         * @param {MouseEvent} event 
         */
        OnMouseMove(event: MouseEvent): void
        /**
         * Track the mouse click event.
         * @param {MouseEvent} event 
         */
        OnMouseClick(event: MouseEvent): void
        /**
         * Check if the mouse is inside the rectangle
         */
        checkOver(x: number, y: number, w: number, h: number): boolean
        /**
         * Check if there is a click inside the rectangle
         */
        checkClick(x: number, y: number, w: number, h: number, time:number): boolean
    };
}