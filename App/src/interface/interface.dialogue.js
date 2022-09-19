/// <reference path="../../ts/type.d.ts"/>

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
        /**
         * @type {GameEventsListType1[]}
         */
        this.textList = [];
        this.callback = null;
        this.eventType = 0;
        this.itemProgress = 0;
        this.activated = false;

        // preload it once, so we don't need to do it multiple times
        this.arrow = ArrowDrawer.hat("down", "white");
        this.last = 0;

        this.letterProgress = 0;
        this.letterProgressCount = 0;
        this.itemProgress = 0;
        this.nextArrowAlpha = 0;
        this.nextArrowAlphaBounce = 1; // or -1 when going decreasing
        this.awaitUserInput = false;

        this.fullText = "";
        /** @type {{n:number,e:boolean}[]} */
        this.fullTextItemLength = [];

        /**
         * @type {GameEventsListType2[]}
         */
        this.inputList = [];
        this.keyboard = [
            [
                {
                    key: "a", name: "a", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "b", name: "b", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "c", name: "c", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "d", name: "d", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "e", name: "e", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "f", name: "f", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "g", name: "g", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "h", name: "h", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "i", name: "i", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }
            ],
            [
                {
                    key: "j", name: "j", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "k", name: "k", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "l", name: "l", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "m", name: "m", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "n", name: "n", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "o", name: "o", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "p", name: "p", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "q", name: "q", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "r", name: "r", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }
            ],
            [
                {
                    key: "s", name: "s", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "t", name: "t", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "u", name: "u", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "v", name: "v", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "w", name: "w", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "x", name: "x", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "y", name: "y", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }, {
                    key: "z", name: "z", hover: false,
                    x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: () => { }
                }
            ],
            [
                {
                    key: " ",
                    name: "Space", hover: false, x: 0, y: 0, w: 0, h: 0,
                    auto: true,
                    f: (str) => { return str + " "; }
                }, {
                    key: "Backspace",
                    name: "Delete", hover: false, x: 0, y: 0, w: 0, h: 0,
                    f: (str) => { str.slice(0, -1); return str; }
                }, {
                    key: "Shift",
                    name: "Shift", hover: false, x: 0, y: 0, w: 0, h: 0,
                    f: () => { }
                }, {
                    key: "Enter",
                    name: "Confirm", hover: false, x: 0, y: 0, w: 0, h: 0,
                    f: () => { }
                }
            ]
        ];
        this.keyboardShift = false;
        this.inputUser = "";
        /**@type {string[]} */
        this.saveInput = [];
    }

    /**
     * Calc the frame height
     * @param {number} h
     * @returns {number} 
     */
    getFrameHeight(h) {
        var H = h / 4;
        if (H < 139) H = 139;
        return H;
    }

    /**
     * Create lines so any text fit nicely in the given width.
     * @param {string} string The string to separate
     * @param {number} w The width allowed to print the string.
     * @param {CanvasRenderingContext2D} ctx The context to get the measureTex method.
     * @returns {string[]} The array of line.
     */
    wordSeparate(string, w, ctx) {
        // split the text in words
        const words = string.split(" ");

        // current line
        let textLine = "";
        // where all lines are saved
        /**@type {string[]}*/
        let result = [];
        // temporary line when we add each words
        let temp = "";

        // set each word to a line
        words.forEach(word => {
            // check if the word isn't out of the frame
            temp = textLine + " " + word;
            const tempMetrics = ctx.measureText(temp);
            // check if \n | \r is in the text, if yes, create a new line
            if (word.includes("\n") || word.includes("\r")) {
                result.push(textLine);
                textLine = word;
                temp = "";
            } else {
                if (tempMetrics.width < w) textLine = temp;
                else {
                    result.push(textLine);
                    textLine = word;
                    temp = "";
                }
            }
        });
        // push the last line, because it can fit inside
        result.push(temp);

        // cleaning up
        result.forEach(s => { s.trim(); });
        return result;
    }

    /**
     * @param {string} text
     * @param {GameScope} scope
     */
    printNormal(scope) {
        // create needed constances to print at the correct height
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentItemText = this.textList[this.itemProgress],
            nameMetrics = ctx.measureText(currentItemText.name),
            nameHeight = nameMetrics.actualBoundingBoxAscent + nameMetrics.actualBoundingBoxDescent,
            lineMarginTop = 5,
            // the start point, if there is an image and it's on the left side
            marginLeft = ((currentItemText.side == 0 && currentItemText.image) ? 96 + 21 + 5 : 21),
            // the end point, if there is an image and it's on the right side
            // 96 is image width, 5 is for space between image and text, 42 is left + right offset
            marginRight = ((currentItemText.side == 1 && currentItemText.image) ? w - (96 + 21 + 5) : w - 21);

        // prevent the canvas from getting unwanted pixel
        ctx.imageSmoothingEnabled = false;
        RectangleCreator.frameRectangle(scope, ctx, 10, h - this.getFrameHeight(h) - 10, w - 20, this.getFrameHeight(h));
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.fillStyle = "white";
        // get the name font
        ctx.font = `120% ${currentItemText.font[0]}`;

        // change the text align depending of the side 
        ctx.textAlign = (currentItemText.side == 0 ? "left" : "right");
        // 21 because 10 frame offset, 6 frame line width, 5 text offset from frame
        ctx.fillText(currentItemText.name, (currentItemText.side == 0 ? 21 : w - 21), h - this.getFrameHeight(h) + 15, w);
        ctx.textAlign = "left";

        // get the text font
        ctx.font = `100% ${currentItemText.font[1]}`;

        /*
        ? new method for pritting current text, minding next parameter
        
        ? What we need:
        v We need a way to know if the text currently printing is part of an item with next = true
        v If that's the case, delete current string and fill it with the text of the current item and the other item
        v that will come, until another next = true
        
        ! so we need to know if the char we are currently adding is part of what item
        
        ? How we will achieve it:
        we will add char by char, from each item
        if it's the first char of the item, check the next state
        if true, delete old char
        */

        // prepare a var where we will remember the current text to print
        var textToPrint = "";
        // prepare a char count to campare with this.letterProgress
        var charCount = 0;
        // iterate through all item
        this.textList.forEach((item, id) => {
            // iterate through all char of the current item text
            item.text.split("").forEach((char, rankInItem) => {
                // add to know the rank of the char in the text to print
                charCount++;
                // check if the current charCount is less or equal than the letterProgress
                if (charCount <= this.letterProgress) {
                    // if yes, now check if the item has a next state, and the curren char is the first of the item
                    if (rankInItem == 0 && item.next) {
                        // we reset the old char
                        textToPrint = "";
                    }
                    // we add the char to the texttToPrint
                    textToPrint += char;
                }
            });
        });

        // now that we have the string that we need to print, print it correctly
        const textMetrics = ctx.measureText(textToPrint);
        // because right + left offset
        if (textMetrics.width < marginRight - marginLeft) {
            // text is small enough to be printed right away
            ctx.fillText(textToPrint, marginLeft, nameHeight + h - this.getFrameHeight(h) + 15 + lineMarginTop);
        } else {
            //? text is too long to pe printed directly
            //? so we'll basically split the text in words and check if the next words is out of the frame
            //? if yes, print it a line under and continue on this line

            let result = this.wordSeparate(textToPrint, marginRight - marginLeft, ctx);

            //then print each result line by line
            //TODO add a scroll up if number of line is too long for the frame (automatic, once it went up, it's finish)
            result.forEach((line, id) => {
                ctx.fillText(line.trim(), marginLeft,
                    nameHeight + h - this.getFrameHeight(h) + 20 +
                    (textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent + lineMarginTop) * id);
            });
        }
        // draw the image if there is one
        if (currentItemText.image) {
            const image = scope.cache.image[currentItemText.image[0]];
            ctx.drawImage(image.image,
                image.tileW * currentItemText.image[1], image.tileH * currentItemText.image[2],
                // -1 toprevent image smoothing to take the pixel of the other images
                image.tileW - 1, image.tileH - 1,
                (currentItemText.side == 0 ? 21 : w - (image.tileW + 21)), nameHeight + h - this.getFrameHeight(h) + 10,
                96, 96
            );
        }

        // if awaitUserInput, draw a arrow to tell the user that the game is waiting
        if (this.awaitUserInput) {
            // increase or decrease depending the bounce sign, this should take 1s before changing sign
            this.nextArrowAlpha += (1 / GameConfig.targetFps) * this.nextArrowAlphaBounce;
            //changin sign if we hit one of the two limit
            if (this.nextArrowAlpha <= 0) {
                this.nextArrowAlphaBounce = 1;
                // make sure that this.nextArrowAlpha is == 0 and not negativ, 
                // otherwise the canvas will set it to 1 and it will flush
                this.nextArrowAlpha = 0;
            } else if (this.nextArrowAlpha >= 1) {
                this.nextArrowAlphaBounce = -1;
            }

            ctx.globalAlpha = this.nextArrowAlpha;
        } else {
            // otherwise, hide the arrow
            ctx.globalAlpha = 0;
        }
        //-5 to center the arrow that is 10px width
        //-20 because -10 for the edge of the frame, -10 for the height of the arrow 
        ctx.drawImage(this.arrow, w / 2 - 5, h - 41, 10, 10);
        ctx.globalAlpha = 1;

        this.needsUpdate = false;
    }

    /**
     * @param {GameScope} scope 
     */
    input(scope) {
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentItemInput = this.inputList[this.itemProgress];

        ctx.font = "100% sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const keyboard = this.keyboard;

        // check the amount of line and calculated the height of the box of each keys
        const linesAmount = keyboard.length,
            keysMargin = 5,
            keysHeight = h / (2 * linesAmount);
        keyboard.forEach((line, idxLine) => {
            // check the amount of keys in the line to draw a box on each one
            const keysAmount = line.length,
                //cal the width of each key box
                // -5 / keysAmount to have a margin at the end of the screen
                keysWidth = w / keysAmount - keysMargin / keysAmount;
            line.forEach((key, idxKey) => {
                key.x = idxKey * keysWidth + keysMargin;
                key.y = idxLine * keysHeight + keysMargin;
                key.w = keysWidth - keysMargin;
                key.h = keysHeight - keysMargin;

                ctx.fillStyle = "grey";
                ctx.globalAlpha = (key.hover ? 0.7 : 0.5);
                ctx.fillRect(key.x, key.y, key.w, key.h);

                ctx.globalAlpha = 1;
                ctx.fillStyle = "white";
                ctx.fillText(((this.keyboardShift && idxLine != keyboard.reverseIndex()) ?
                    key.name.toUpperCase() : key.name),
                    key.x - keysMargin + keysWidth / 2, key.y - keysMargin + keysHeight / 2);
            });
        });

        // prevent the canvas from getting unwanted pixel
        ctx.imageSmoothingEnabled = false;
        RectangleCreator.frameRectangle(scope, ctx, 10, h / 2 + 10, w - 20, h / 2 - 20);
        ctx.imageSmoothingEnabled = true;

        // draw the wanted instruction, then under it, the user input
        ctx.font = "100% Azure";
        ctx.textAlign = "left";
        const instructionMetrics = ctx.measureText(currentItemInput.text),
            instructionHeight = instructionMetrics.actualBoundingBoxAscent + instructionMetrics.actualBoundingBoxDescent;
        ctx.fillText(currentItemInput.text, 21, h / 2 + 15 + instructionHeight);

        ctx.textAlign = "center";
        ctx.fillText(this.inputUser, w / 2, 3 * h / 4);

        this.needsUpdate = false;
    }

    /**
     * @param {GameScope} scope 
     */
    choice(scope) {
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h;

        //TODO text animation like printNormal
        //TODO also, try to find a fricking easier mthod to do it, it's really a mess >:l
        //? maybe do a global method for it, same for wordSeparate

    }

    /**
         * @param {GameScope} scope 
         */
    render(scope) {
        if (this.textList.length == 0 && this.inputList.length == 0) return;
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentItemText = this.textList[this.itemProgress],
            currentItemInput = this.inputList[this.itemProgress];

        // call the end function
        if (!currentItemText && !currentItemInput) {
            this.eventType = 0;
            this.itemProgress = 0;
            this.activated = false;
            return this.callback();
        }

        ctx.clearRect(0, 0, w, h);
        if (this.eventType == 2) {
            // it's a input event
            this.input(scope);
        } else if (this.eventType == 3) {
            // choice between multiple options
            this.choice(scope);
        } else if (this.eventType == 1 && currentItemText.announcement) {
            // do announcement (center, Takhi)
        } else if (this.eventType == 1 && currentItemText.fullscreen) {
            // print full screen (1/1)
        } else if (this.eventType == 1) {
            // normal dialogue (1/4)
            this.printNormal(scope);
        }
    }

    /**
     * @param {GameScope} scope 
     */
    update(scope) {
        if (this.textList.length == 0 && this.inputList.length == 0) return;
        const currentItemText = this.textList[this.itemProgress],
            currentItemInput = this.inputList[this.itemProgress];
        // call the end function
        if (!currentItemText && !currentItemInput) {
            this.eventType = 0;
            this.itemProgress = 0;
            return this.callback();
        }

        if (this.eventType == 2) {
            // input event
            this.keyboard.forEach((line, idxLine) => {
                line.forEach((key, idxKey) => {
                    if (MouseTrackerManager.trueCheckOver(key.x, key.y, key.w, key.h)) {
                        key.hover = true;
                        this.needsUpdate = true;
                    } else if (key.hover) {
                        key.hover = false;
                        this.needsUpdate = true;
                    }
                    if (MouseTrackerManager.checkClick(key.x, key.y, key.w, key.h)) {
                        if (key.key == "Shift") {
                            // reverse the boolean
                            this.keyboardShift = !this.keyboardShift;
                        } else if (key.key == "Enter" && this.inputUser.length > 0) {
                            // check if there is an item after
                            if (this.inputList[this.itemProgress + 1]) {
                                // if yes, switch to next item and save the last input
                                this.itemProgress++;
                                this.saveInput.push(this.inputUser.slice());
                                this.inputUser = "";
                            } else {
                                // call the callback function
                                this.eventType = 0;
                                this.itemProgress = 0;
                                this.saveInput.push(this.inputUser);
                                this.needsUpdate = true;
                                return this.callback(...this.saveInput);
                            }
                        } else if (key.key == "Backspace") {
                            this.inputUser = this.inputUser.replace(/.$/, '');
                        } else if (key.auto) {
                            this.inputUser += (this.keyboardShift ? key.key.toUpperCase() : key.key);
                        }
                        this.needsUpdate = true;
                    }
                });
            });

            // get letters directly from keyboard
            document.onkeydown = (ev) => {
                // isNaN to remove numbers from names, like, who call themself R2D2?
                if (ev.key.length == 1 && isNaN(ev.key)) this.inputUser += (this.keyboardShift ? ev.key.toUpperCase() : ev.key.toLowerCase());
                else if (ev.key == "Backspace") this.inputUser = this.inputUser.replace(/.$/, '');
                else if (ev.key == "Shift") this.keyboardShift = !this.keyboardShift;
                // check if user input is filled
                else if (ev.key == "Enter" && this.inputUser.length > 0) {
                    // check if there is an item after
                    if (this.inputList[this.itemProgress + 1]) {
                        // if yes, switch to next item and save the last input
                        this.itemProgress++;
                        this.saveInput.push(this.inputUser);
                        this.inputUser = "";
                    } else {
                        // call the callback function
                        this.eventType = 0;
                        this.itemProgress = 0;
                        this.saveInput.push(this.inputUser);
                        this.needsUpdate = true;
                        return this.callback(...this.saveInput);
                    }
                }
                this.needsUpdate = true;
            };
        } else if (this.eventType == 3) {
            // choice between multiple options
        } else if (this.eventType == 1 && currentItemText.announcement) {
            // do announcement (center, Takhi)
        } else if (this.eventType == 1 && currentItemText.fullscreen) {
            // print full screen (1/1)
        } else if (this.eventType == 1) {
            if (currentItemText.skipable) {
                // if the message is skipable, await input
                document.onkeydown = (ev) => {
                    if (GameConfig.keyBoard.confirm.includes(ev.key)) {
                        // set the letterProgress to the total letters until this item
                        var count = 0;
                        this.textList.forEach((i, x) => {
                            if (x <= this.itemProgress) count += i.text.length;
                        });
                        // then update the letter progress
                        this.letterProgress = count;
                        this.needsUpdate = true;
                    }
                };
                // also await click and do the same
                if (MouseTrackerManager.checkClick(0, 0, scope.w, scope.h)) {
                    // set the letterProgress to the total letters until this item
                    var count = 0;
                    this.textList.forEach((i, x) => {
                        if (x <= this.itemProgress) count += i.text.length;
                    });
                    // then update the letter progress
                    this.letterProgress = count;
                    this.needsUpdate = true;
                    //BUG weird behavior when clicking/confirm multiple times when text is spreading
                }
            }

            if (this.awaitUserInput == true) {
                // await user input to display next item
                document.onkeydown = (ev) => {
                    if (GameConfig.keyBoard.confirm.includes(ev.key)) {
                        this.itemProgress++;
                        this.awaitUserInput = false;
                        this.needsUpdate = true;
                    }
                };
                // also await click and do the same
                if (MouseTrackerManager.checkClick(0, 0, scope.w, scope.h)) {
                    this.itemProgress++;
                    this.awaitUserInput = false;
                    this.needsUpdate = true;
                }
                // always update the game, for the arrow bounce
                this.needsUpdate = true;
            } else {
                // if not waiting user, just calc what we need next
                // count how much letters left until the next item
                var lettersTotal = 0,
                    textSpeed = currentItemText.textSpeed;
                this.textList.forEach((item, idx) => {
                    if (idx < this.itemProgress) {
                        // this the items we already seen, so we don't need to re print them letters per letters
                        lettersTotal += item.text.length;
                    } else {
                        // otherwise, add a letter at the text speed of the last item
                        // counting delay, until it reach textSpeed
                        if (this.letterProgressCount < textSpeed) this.letterProgressCount++;
                        else if (this.letterProgressCount >= textSpeed) {
                            // reached textSpeed, so reseting delay and adding a letter
                            this.letterProgressCount = 0;
                            this.letterProgress++;
                            // check if the next char is a space
                            // if yes, skip the space animation
                            if (this.fullText[this.letterProgress] == " " ||
                                this.fullText[this.letterProgress] == "\n" ||
                                this.fullText[this.letterProgress] == "\r") this.letterProgress++;
                        }
                        // if we reached the end of the text of the current item
                        if (this.letterProgress == lettersTotal + item.text.length && idx == this.itemProgress) {
                            // check if we need to wait user input 
                            if (item.stop) {
                                this.awaitUserInput = true;
                            }
                            // else just add without waiting for user
                            else {
                                this.itemProgress++;
                            }
                        }
                    }
                });
                if (this.fullText.length == 0) {
                    this.textList.forEach((i, id) => {
                        // add all the char to the full text
                        this.fullText += i.text;
                    });
                }
                // so that it refresh the context
                this.needsUpdate = true;
            }
        }

        /** 
         * ?What's going since last time?
         * need to do announcement, choice and fullscreen
         * v done the next handling
         */
    }
}