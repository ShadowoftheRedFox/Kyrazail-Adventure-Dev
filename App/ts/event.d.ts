export { }

declare global {
    type GameEventCodeName = "Test" |
        "NewGame" |
        undefined

    type GameEvent = {
        id: number,
        start: string[],
        stop: string[],
        callbackEvent: GameEventCodeName | null,
        data: {
            // fullscreen text
            type: "text",
            text: string[],
            font: string,
            skipable: boolean
        } | {
            // announcement sentence
            type: "announcement",
            ratioWidth: number,
            ratioHeight: number,
            text: string,
            font: string,
            color: string,
            bold: boolean,
            underlined: boolean,
            fadeIn: number,
            fadeOut: number
        } | {
            // dialogue
            type: "dialogue",
            title: string,
            text: string[],
            image: {
                src: string | null,
                col: number | null,
                row: number | null
            },
            // true is left
            position: boolean,
            titleFont: string | null,
            textFont: string | null,
            skipable: boolean
        } | {
            type: "keyboard",
            text: string,
            font: string
        } | {
            type: "map",
            map: string
        } | {
            type: "timeout",
            time: number
        }

        /*
        TODO event that may need to be added:
        fade in, fade out
        animation: flash, shake, bubbles
        
        
        */
    }
}