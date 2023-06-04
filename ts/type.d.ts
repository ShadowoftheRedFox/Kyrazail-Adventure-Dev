export { }

declare global {
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
        w: number
        h: number
        positionX: "center" | "left" | "right"
        positionY: "center" | "top" | "bottom"
        menu: GameMenuOptionsMenu[]
        menuFocused: number
        name: string
        align: "horizontal" | "vertical"
    }

    type GameMenuOptionsMenu = {
        name: string,
        focused: boolean,
        value: "function" | "menu"
        function?: Function
        menu?: GameMenuOptionsMenu[]
        menuFocused?: number
        align: "horizontal" | "vertical"
    }

    type GameEvents = {
        type: number
        /**Depends the type of the event. Check your reminder.*/
        list: GameEventsListType1[] | GameEventsListType2[] | any[]
        end: string | (() => {}) | null
        init: string | (() => {}) | null
        stop: string[]
        start: string[] | []
    }

    type GameEventsListType1 = {
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

    type GameEventsListType2 = {
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
}