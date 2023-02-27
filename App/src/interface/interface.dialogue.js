

class GameDialogueInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.DIALOGUE,
            canvasGroup: "GameDialogueGroup"
        }, scope);
        this.keyboard = [[
            { key: "a", name: "a", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "b", name: "b", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "c", name: "c", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "d", name: "d", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "e", name: "e", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "f", name: "f", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "g", name: "g", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "h", name: "h", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "i", name: "i", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } }], [
            { key: "j", name: "j", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "k", name: "k", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "l", name: "l", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "m", name: "m", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "n", name: "n", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "o", name: "o", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "p", name: "p", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "q", name: "q", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "r", name: "r", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } }], [
            { key: "s", name: "s", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "t", name: "t", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "u", name: "u", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "v", name: "v", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "w", name: "w", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "x", name: "x", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "y", name: "y", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } },
            { key: "z", name: "z", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: () => { } }], [
            { key: " ", name: "Space", hover: false, x: 0, y: 0, w: 0, h: 0, auto: true, f: (str) => { return str + " "; } },
            { key: "Backspace", name: "Delete", hover: false, x: 0, y: 0, w: 0, h: 0, f: (str) => { str.slice(0, -1); return str; } },
            { key: "Shift", name: "Shift", hover: false, x: 0, y: 0, w: 0, h: 0, f: () => { } },
            { key: "Enter", name: "Confirm", hover: false, x: 0, y: 0, w: 0, h: 0, f: () => { } }
        ]];

        /**
         * Current event loaded.
         * @type {GameEvent}
        */
        this.currentEvent = null;

        /**Text to print through every event. */
        this.text = "";
        /**If all texts of the event have been added to the this.text. */
        this.textAdded = false;
        /**
         * Font depending of where we are in the text.
         * @type {string[]}
         */
        this.textFont = [];
        /**
         * Size of each text bit to align with font.
         * @type {number[]}
         */
        this.textLength = [];
        /**
         * Font size depending of where we are in the text.
         * @type {string[]}
         */
        this.textSize = [];
        /**
         * If the current text part is skipable.
         * @type {boolean[]}
         */
        this.textSkip = [];
        /**
         * If the current text part is a new part (clear the text before).
         * @type {boolean[]}
         */
        this.textNext = [];
        /**The index of the last character to display. */
        this.currentTextCharacter = 0;

    }

    /**
     * @param {GameScope} scope 
     */
    render(scope) {
        if (!this.currentEvent) {
            this.needsUpdate = false;
            return;
        }
        switch (this.currentEvent.type) {
            case "DialogueText":
                this.displayText(scope);
                break;
            default:
                WindowManager.fatal(new Error(`${this.currentEvent.type} type of event doesn't belong in dialogue!`));
                this.currentEvent = null;
                break;
        }
    }

    /**
     * @param {GameScope} scope 
     */
    displayText(scope) {
        const ctx = scope.cache.context[this.canvasGroup],
            Width = scope.w,
            Height = scope.h;

        ctx.clearRect(0, 0, Width, Height);

        // add every variables to the interfaces data
        if (!this.textAdded) {
            return;
        }
        // create the frame
        // prevent the canvas from getting unwanted pixel
        ctx.imageSmoothingEnabled = false;
        RectangleCreator.frameRectangle(scope, ctx, 10, Height - this.getMinHeight(Height) - 10, Width - 20, this.getMinHeight(Height));
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        /*
        TODO                                                                      .
        & What we need to do to print everything in a single event AND next event?
        add every parameters of each part to the array
        and save if skip or not
        and clear or not
        */
    }

    /**
     * @param {GameScope} scope 
     */
    update(scope) {
        document.onkeydown = (ev) => {
            if (GameConfig.keyBoard.confirm.includes(ev.key)) { }
        };
        // also await click and do the same
        if (MouseTrackerManager.clickOver(0, 0, scope.w, scope.h)) { }
    }

    /**
     * Used to put and load an event in the interface from outside.
     * @param {GameEvent} Event 
     */
    getEvent(Event) {
        //load image if there is one that isn't in cache
        const PartImage = [];
        Event.data.forEach(/**@param {GameEventDialogueText} part */part => {
            switch (Event.type) {
                case "DialogueText":
                    if (part.image && typeof part.image == "string" && !window.game.cache.image[part.image]) {
                        PartImage.push(part.image);
                        //now add every part to it's own datas
                        this.text += part.text;
                        this.textFont.push(part.textFont);
                        this.textSize.push(part.textSize);
                        this.textLength.push(part.text.length);
                        this.textSize.push(part.textSize);
                        this.textSkip.push(part.skipable);
                        this.textNext.push(part.next);
                    }
                    break;
                default:
                    WindowManager.fatal(new Error(`${this.currentEvent.type} type of event doesn't belong in dialogue!`));
                    this.currentEvent = null;
                    break;
            }
        });
        this.textAdded = true;

        // load images that aren't in cache
        GameLoadImage(window.game, PartImage, () => {
            // reset and change every varaibles needed
            this.currentEvent = Event;
            this.textAdded = false;
            this.needsUpdate = true;
        });

    }

    /**
     * Get the min height for the display area.
     * @param {number} height 
     */
    getMinHeight(height) {
        // min size is 1/3 of min screen height, so 1/3 of 400, which is 133, otherwise, 1/4
        let h = height / 4;
        if (h < 133) { return 133; }
        else { return h; }
    }
}