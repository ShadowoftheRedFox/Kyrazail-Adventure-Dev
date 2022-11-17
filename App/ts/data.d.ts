export { }

declare global {
    type GameScriptPreLoad = {
        name: string
        path: string
        status: boolean
        description: string
    }

    type GameDataPreLoad = {
        name: string
        path: string
        status: boolean
        parameters: object
        description: string
        objPath: string
    }

    type GameSaveObject = {
        content: {}
        crypted: boolean
        version: string
    }

    type GameSaveLoadObject = {
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
}