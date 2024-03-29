/*
Export all element directly related to the game scope.
*/

export { }

declare global {
    type GameScope = {
        /**Width of the game screen.*/
        w: number
        /**Height of the game screen.*/
        h: number
        /**State of the game.*/
        state: GameState
        /** Handle errors and corrupted data. */
        GameCrashHandler(): void;
        /** Update the state of the game. */
        GameStateUpdate(now: number): GameState;
        /** Render the game. */
        GameRender(): void;
        /** Make the game loop. */
        GameLoop: {
            /** The current fps of the game. */
            fps: number
            /** Function that loop through the requestAnimationFrame. */
            main(targetFps: number): void
        }
        /**The language wanted.*/
        language: GameLanguage
        /**Game session relative constants.*/
        constants: {
            isNwjs: boolean
            isAndroidChrome: boolean
            isMobileSafari: boolean
            isMobileDevice: boolean
            /**What platform the game is currently running on.*/
            platform: "Cloud" | string
            /**The url location of the game.*/
            href: string
            /**Package.json*/
            package: {
                name: "kyrazail-adventure"
                version: string
                description: "Kyrazail adventure game."
                author: "Shadow of the Red Fox#5881"
                lastUpdate: string
                releaseType: "Dev/Alpha" | "Dev/Beta" | "Release"
                changelog: string[]
                /** Discord server link. */
                support: { url: string }
                /** Github repo readme link. */
                homepage: string
                /** Online game link. */
                online: string
            }
        }
        checkGameUpdate: {
            lastCheck: {
                updateFound: boolean
                versionFound: string
                lastCheck: string
            }
        }
        soundsSettings: {
            volumeBG: number
            volumeEFX: number
            playingBGM: HTMLAudioElement | null
            playingBGS: HTMLAudioElement | null
            playingMAIN: HTMLAudioElement | null
            playingME: HTMLAudioElement | null
            playingSE: HTMLAudioElement | null
        }
        cache: {
            image: {
                [name: string]: {
                    image: HTMLImageElement
                    tileW?: number
                    tileH?: number
                    col?: number
                    row?: number
                }
            }
            audio: { [name: string]: HTMLAudioElement }
            map: { [name: string]: GameMapPattern }
            // we preloaded his data at the load of the dom
            data: {
                names: {
                    malefirstnames: string[]
                    femalefirstnames: string[]
                    lastnames: string[]
                }
                item: { [name: GameItemName]: GameItem }
                event: { [name: string]: GameEvent }
                title: {}
                monsters: {}
                class: {}
                skills: { [name: string]: GameSpecialAbility }
                map: MapData
            }
            context: { [name: string]: CanvasRenderingContext2D }
            layers: {
                [mapName: string]: {
                    ground: HTMLImageElement
                    collision: HTMLImageElement
                    over: HTMLImageElement,
                    collisionPattern: boolean[][]
                }
            }
        }

        /**
         * Where all data that needs to be saved are stocked.
         * If we load a save, that's here that the data are fully changed.
         */
        global: GameGlobalState

        /**
         * Calculate the level, total needed and xp left given xp amount and level.
         * @param level The current level
         * @param xp The amount of experience 
         * @returns l is the amount of level, r the amount of xp left, and t the total amount to level up  
         */
        calculateXp(level: number, xp: number): { l: number, r: number, t: number }

        /**
         * Divide the given string to fit in the given dimension.
         * @param ctx context where the text that will be printed 
         * @param string Text to split
         * @param w Max width
         * @param h Max height
         * @param lineh Height of each line when dsiplaying
         * @returns The splited text
         */
        divideText(ctx: CanvasRenderingContext2D, string: string, w: number, h: number, lineh: number): string[]
    }

    type GameState = {
        menu: {
            [name: string]: GameInterfaces
            main: GameInterfaces
            intro: GameInterfaces
            dialogue: GameInterfaces
            map: GameInterfaces
            pause: GameInterfaces
        }
        entities: {
            [name: string]: GameEntitiesClass
            player: GameEntityPlayer
        }
    }
}