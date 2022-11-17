export declare type GameScope = {
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
    GameStateUpdate(state: object): object;
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
    global: {
        player: {
            firstName: string
            lastName: string

            /** 
             * We calculate the player level with xp. So there is no need for an level object. 
             * Same goes for mana and special point. It also depends the species
             */
            xp: number
            species: GameSpeciesBase | GameSpeciesAdvanced
            advancedSpecies: boolean

            face: GameIcon
            character: GameIcon

            stats: {
                pv: number
                mp: number
                sp: number

                def: number
                magicdef: number
                atk: number
                magicatk: number
                agi: number
                luck: number

                special: GameSpecialAbility[]

                /** Regenerate by himself.*/
                regeneration: number

                /** Reduce by 2 the damage taken.*/
                resistance: GameAttackType[]
                /** Increase by 2 the damage taken.*/
                weakness: GameAttackType[]

                status: GameStatusEffect[]
            }
            equipment: GameEntitiesEquipment
        }
        party: {}
        inventory: {}
        map: {}
        quest: {
            finished: GameQuest[]
            ongoing: GameQuest[]
            failed: GameQuest[]
        }
        knowledge: {
            totalSkillPoint: number
            availableSkillPoint: number
            skillTree: number[]
        }
        adventure: {}
    }
}

export declare type GameSpeciesBase = "elf" | "dwarf" | "demon" | "human" | "vampire" | "angel" | "fairy"

export declare type GameSpeciesAdvanced = "high elf" | "ancient dwarf" | "archi demon" | "ancient vampire" | "archangel" | "high fairy" | "human heroe"

export declare type GameQuest = {
    name: string
    description: string
    reward: GameItemName[]
    requirement: {
        name: string
        max: number
        progression: number
        finished: boolean
        failed: boolean
        /** If important is true, this requirement must be finished for the quest to be valid. */
        important: boolean
    }[]
    /** Condition to enable the quest. */
    condition: {
        /** Name of the condition. */
        name: string[]
        /** Value for the given condition name. */
        value: (number | boolean | string)[]
    }
    status: {
        enabled: boolean
        newQuest: boolean
        finished: boolean
        failed: boolean
    }
}

export declare type GameEntitiesOptions = {
    name: string | GameLanguageObject
    /** If type is "hostile".*/
    stats: GameEntitiesStats | undefined
    /** If type is marchand.*/
    shop: {
        canPlayerSell: boolean
        canPlayerBuy: boolean
        canPlayerEquip: boolean
        items: GameItemName[]
        welcomeMessage: GameLanguageCodedString[]
    } | undefined
    /** If type is npc.*/
    dialog: GameLanguageCodedString[] | ["..."]

    type: "hostile" | "npc" | "marchand" | "player"
    pattern: "follow" | "merge" | "idle" | "custom" | "player"

    spawnX: number | 0
    spawnY: number | 0
    spawnOrientation: GameOrientation | "south"

    character: GameIcon

    movementSpeed: number | 0

    speakImage: string | null
    speakRow: number | null
    speakCol: number | null
}

export declare type GameStatusEffect = {
    /** In round.*/
    duration: number
    /** Add the number for the target on his pv.*/
    pv: number
    /** Add the number for the target on his mp.*/
    mp: number
    /** Add the number for the target on his sp.*/
    sp: number
    /** If the effect can cause death.*/
    canKill: boolean
    /** The image displayed in the status.*/
    effectImage: string
    effectRow: number
    effectCol: number
    /** If there is an animation each time the effect is inflicted.*/
    animationEffect: boolean
    animationImage: string
}

export declare type GameItem = {
    name: GameLanguageObject
    image: string
    col: number
    rown: number
    description: GameLanguageCodedString
    special: boolean
    usable: boolean
    /** How many times can we use this item.*/
    usageAmount: number
    helmet: boolean
    torso: boolean
    legging: boolean
    boot: boolean
    singleHanded: boolean
    twoHanded: boolean
    type: GameItemType[]
}

export declare type GameRecipe = {
    name: GameLanguageObject
    description: GameLanguageCodedString
    /** Array of items names */
    recipeList: {
        /** Refers to an item name.*/
        item: string
        amount: number
    }[]
    usageAmount: number | null
    result: {
        /** Refers to an item name.*/
        item: string
        amount: number
    }
}

export declare type GameAttackType = "physical" | "magic" | "fire" | "water" | "ice" | "electricity" | "dark" | "holy"

export declare type GameOrientation = "east" | "south" | "west" | "north"

/** A code that will be used in the language module to return the true string but translated in the wanted language.*/
export declare type GameLanguageCodedString = string

/** Refers to the name of an item. */
export declare type GameItemName = string

export declare type GameItemType = "resource" | "equipement" | "potion"

export declare type GameEntitiesStats = {
    pv: number
    mp: number
    sp: number

    def: number
    magicdef: number
    atk: number
    magicatk: number
    agi: number
    luck: number

    special: GameSpecialAbility[]

    /** Regenerate by himself.*/
    regeneration: number

    /** Reduce by 2 the damage taken.*/
    resistance: GameAttackType[]
    /** Increase by 2 the damage taken.*/
    weakness: GameAttackType[]

    status: GameStatusEffect[]
    loots: { item: GameItemName, amount: number }[]
    gold: number
    exp: number

    boss: boolean
    bossLoot: { item: GameItemName, amount: number }[]
}

export declare type GamePartyMember = {
    name: string
    species: GameSpeciesBase | GameSpeciesAdvanced
    face: GameIcon
    character: GameIcon
    exp: number
    description: string

    stats: {
        pv: number
        mp: number
        sp: number

        def: number
        magicdef: number
        atk: number
        magicatk: number
        agi: number
        luck: number

        special: GameSpecialAbility[]

        /** Regenerate by himself.*/
        regeneration: number

        /** Reduce by 2 the damage taken.*/
        resistance: GameAttackType[]
        /** Increase by 2 the damage taken.*/
        weakness: GameAttackType[]

        status: GameStatusEffect[]
    }

    equipment: GameEntitiesEquipment
}

export declare type GameEntitiesEquipment = {
    head: GameItemName
    torso: GameItemName
    foot: GameItemName
    weapon1: GameItemName
    weapon2: GameItemName
    jewel1: GameItemName
    jewel2: GameItemName
}

export declare type GameIcon = {
    invisible: boolean
    row?: number
    col?: number
    src?: string
}

export declare type GameSpecialAbility = {
    name: GameLanguageObject
    mpCost: number
    hpCost: number
    spCost: number
    /** When attacking. */
    animationImage: string | null
    /** In menu. */
    skillImage: string | null
    type: GameAttackType
    /** Delay before using the skill again, in rounds.*/
    delay: number
    /** If there is a max amount of user per battle.*/
    usePerBattle: number | null
}

export declare type GameLanguage = "fr" | "en"
export declare type GameLanguageObject = {
    fr: string
    en: string
}

export declare type GameInterfacesOptions = {
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

export declare type GameMapPattern = {
    compressionlevel: number,
    height: number,
    infinite: true,
    layers: GameMapLayer[],
    nextlayerid: number,
    nextobjectid: number,
    orientation: "orthogonal",
    renderorder: "left-up",
    tiledversion: "1.8.4",
    tileheight: number,
    tilesets: GameMapTileSet[],
    tilewidth: number,
    type: "map",
    version: "1.8",
    width: number
}

export declare type GameMapLayer = {
    chunks: GameMapChunk[],
    height: number,
    id: number,
    name: "Ground" | "Over" | "Collision",
    opacity: number,
    startx: number,
    starty: number,
    type: "tilelayer",
    visible: boolean,
    width: number,
    x: number,
    y: number
}

export declare type GameMapChunk = {
    data: number[],
    height: number,
    width: number,
    x: number,
    y: number
}

export declare type GameMapTileSet = {
    firstgid: number,
    /**String pattern: ../.../Name.tsx*/
    source: string
}

export declare type GameScriptPreLoad = {
    name: string
    path: string
    status: boolean
    description: string
}

export declare type GameDataPreLoad = {
    name: string
    path: string
    status: boolean
    parameters: object
    description: string
    objPath: string
}

export declare type GameMenuOptions = {
    x: number
    y: number
    w: number
    h: number
    positionX: "center" | "left" | "right"
    positionY: "center" | "top" | "bottom"
    menu: GameMenuOptionsMenu[]
    menuFocused: number
    name: string
    align: "horizontal" | "vertical"
}

export declare type GameMenuOptionsMenu = {
    name: string,
    focused: boolean,
    value: "function" | "menu"
    function?: Function
    menu?: GameMenuOptionsMenu[]
    menuFocused?: number
    align: "horizontal" | "vertical"
}

export declare type GameSaveObject = {
    content: {

    }
    crypted: boolean
    version: string
}

export declare type GameEvents = {
    type: number
    /**Depends the type of the event. Check your reminder.*/
    list: GameEventsListType1[] | GameEventsListType2[] | any[]
    end: string | (() => {}) | null
    init: string | (() => {}) | null
    stop: string[]
    start: string[] | []
}

export declare type GameEventsListType1 = {
    /**
     * Font for, in order, the name, then the text.
     */
    font: [string, string]
    /**
     * Name of the character speaking.
     */
    name: string
    /**
     * Text to display.
     */
    text: string
    /**
     * Image of the character speaking. If null, no image.
     * String is the name of the image.
     * Numbers are in order col then row.
     */
    image: [string, number, number] | null
    /**
     * Side to draw the image if there is one. 0 is left, 1 is right.
     */
    side: 0 | 1
    /**
     * If the message triger the end function of the event.
     */
    next: boolean
    /**
     * If the precedents message needs to be cleared.
     */
    skipable: boolean
    /**
     * The text speed display in letters/s.
     */
    textSpeed: number
    /**
     * If true, when the dialog get to the end of the string, await user input. Else continue to the next item.
     */
    stop: boolean
    /**
     * If the dialog should take all the screen, and not just the bottom.
     */
    fullscreen: boolean
    /**
     * If it's an announcement, meaning that the text is short, big, and centered. 
     */
    announcement: boolean
}

export declare type GameEventsListType2 = {
    /** 
     * The text before the input 
     */
    text: string
    /**
     * Parameters of the input
     * In order: min length, max length
     */
    param: [number, number]
}

export declare type GameSaveLoadObject = {
    error: string[] | null
    files: {
        name: string
        path: string
        rawContent: string
        content: GameSaveObject
        error: string[] | null
        lastEditDate: number
    }[]
}