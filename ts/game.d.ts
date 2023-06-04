import "./core"
import "./data"
import "./declaration"
import "./event"
import "./map"
import "./type"

export { }

declare global {
    type GameGlobalState = {
        player: GamePlayerMember
        party: GamePartyMember[]
        inventory: {
            [name: GameItemName]: number
        }
        quest: {
            active: GameQuest
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

    type GameSpeciesBase = "elf" | "dwarf" | "demon" | "human" | "vampire" | "angel" | "fairy"
    type GameSpeciesAdvanced = "high elf" | "ancient dwarf" | "archi demon" | "ancient vampire" | "archangel" | "high fairy" | "human heroe"
    type GameFigthClass = "Assasin" | "Warrior" | "Bersek" | "Mage" | "Long range" | "Tank"

    type GameQuest = {
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
        /**Help for certain point of the progression */
        help: string[]
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

    type GameEntitiesOptions = {
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

    type GameStatusEffect = {
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

    type GameItem = {
        name: GameLanguageObject
        image: string
        col: number
        row: number
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

    type GameRecipe = {
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

    type GameAttackType = "physical" | "magic" | "fire" | "water" | "ice" | "electricity" | "dark" | "holy"

    type GameOrientation = "east" | "south" | "west" | "north"

    /** A code that will be used in the language module to return the true string but translated in the wanted language.*/
    type GameLanguageCodedString = string

    /** Refers to the name of an item. */
    type GameItemName = string

    type GameItemType = "resource" | "equipement" | "potion"

    type GameEntitiesStats = {
        hp: number
        maxhp: number
        mp: number
        maxmp: number
        sp: number
        maxsp: number

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

    type GamePlayerMember = {
        firstName: string
        lastName: string

        lvl: number
        xp: number
        species: GameSpeciesBase | GameSpeciesAdvanced
        advancedSpecies: boolean
        class: GameFigthClass
        description: string

        face: GameIcon
        character: GameIcon

        stats: {
            hp: number
            maxhp: number
            mp: number
            maxmp: number
            sp: number
            maxsp: number

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

    type GamePartyMember = {
        name: string

        lvl: number
        xp: number
        species: GameSpeciesBase | GameSpeciesAdvanced
        advancedSpecies: boolean
        class: GameFigthClass
        description: string

        face: GameIcon
        character: GameIcon


        stats: {
            hp: number
            maxhp: number
            mp: number
            maxmp: number
            sp: number
            maxsp: number

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

    type GameEntitiesEquipment = {
        head: GameItemName
        torso: GameItemName
        foot: GameItemName
        weapon1: GameItemName
        weapon2: GameItemName
        jewel1: GameItemName
        jewel2: GameItemName
    }

    type GameIcon = {
        invisible: boolean
        row?: number
        col?: number
        src?: string
    }

    type GameSpecialAbility = {
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

    type GameLanguage = "fr" | "en"
    type GameLanguageObject = {
        fr: string
        en: string
    }
}