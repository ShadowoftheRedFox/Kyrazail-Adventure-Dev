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
        state: {
            menu: {
                [name: string]: GameInterfaces
                intro: GameIntroductionInterface
                main: GameMainInterface
                dialogue: GameDialogueInterface
                entity: GameEntityInterface
                introduction: GameIntroductionInterface
                map: GameMapInterface
                over: GameOverInterface
                pause: GamePauseInterface
            }
        }
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
        /**Game session relativ constants.*/
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
                event: {}
                title: {}
                monsters: {}
                class: {}
                skills: { [name: string]: GameSpecialAbility }
            }
            context: { [name: string]: CanvasRenderingContext2D }
        }

        /**
         * Where all data that needs to be saved are stocked.
         * If we load a save, that's here that the data are fully changed.
         */
        global: GameGlobalState
    }

    type GameInterfacesOptions = {
        asOwnCanvas: boolean | false
        canvasGroup: string | "MainGameGroup"
        zindex: number | 0
        requiredImage: string[] | []
        requiredAudio: string[] | []

        transitionSpawnDuration: number | 1000
        transitionLeaveDuration: number | 1000
        transitionSpawn: boolean | false
        transitionLeave: boolean | false
        activated: boolean | false
        needsUpdate: boolean | true
    }

    type GameMenuOptions = {
        x: number
        y: number
        name: string
    }
}