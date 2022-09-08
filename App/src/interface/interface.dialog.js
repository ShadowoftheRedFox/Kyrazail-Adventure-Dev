/// <reference path="../../ts/type.d.ts"/>

class GameDialogInterface extends GameInterfaces {
    /**
     * @param {GameScope} scope
     */
    constructor(scope) {
        super({
            asOwnCanvas: true,
            zindex: ConfigConst.ZINDEX.DIALOG,
            canvasGroup: "GameDialogGroup"
        }, scope);
        /**
         * @type {GameEventsListType1}
         */
        this.textList = [];
        this.callback = null;
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
     * @param {GameScope} scope 
     */
    render(scope) {
        if (this.textList.length == 0) return;
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentItem = this.textList[this.itemProgress];

        // call the end function
        if (!currentItem) return this.callback();

        ctx.clearRect(0, 0, w, h);
        if (currentItem.announcement) {
            // do announcement (center, Takhi)
        } else if (currentItem.fullscreen) {
            // print full screen (1/1)
        } else {
            // normal dialog (1/4)

            // prevent the canvas from getting unwanted pixel
            ctx.imageSmoothingEnabled = false;
            RectangleCreator.frameRectangle(scope, ctx, 10, h - this.getFrameHeight(h) - 10, w - 20, this.getFrameHeight(h));
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.fillStyle = "white";
            // get the name font
            ctx.font = `120% ${currentItem.font[0]}`;

            const nameMetrics = ctx.measureText(currentItem.name),
                nameHeight = nameMetrics.actualBoundingBoxAscent + nameMetrics.actualBoundingBoxDescent;

            // change the text align depending of the side 
            ctx.textAlign = (currentItem.side == 0 ? "left" : "right");
            // 21 because 10 frame offset, 6 frame line width, 5 text offset from frame
            ctx.fillText(currentItem.name, (currentItem.side == 0 ? 21 : w - 21), h - this.getFrameHeight(h) + 15, w);
            ctx.textAlign = "left";

            // get the text font
            ctx.font = `100% ${currentItem.font[1]}`;

            var textToPrint = "";
            // print each letters until we reach the lettersProgress
            for (let p = 0; p < this.letterProgress; p++) {
                textToPrint += this.fullText[p];
            }

            // invoke the print method, because it's huge
            this.printNormal(textToPrint, scope);

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
    }

    /**
     * @param {string} text
     * @param {GameScope} scope
     */
    printNormal(text, scope) {
        // create needed constances to print at the correct height
        const ctx = scope.cache.context[this.canvasGroup],
            w = scope.w,
            h = scope.h,
            currentItem = this.textList[this.itemProgress],
            nameMetrics = ctx.measureText(currentItem.name),
            nameHeight = nameMetrics.actualBoundingBoxAscent + nameMetrics.actualBoundingBoxDescent,
            lineMarginTop = 5,
            // the start point, if there is an image and it's on the left side
            marginLeft = ((currentItem.side == 0 && currentItem.image) ? 96 + 21 + 5 : 21),
            // the end point, if there is an image and it's on the right side
            // 96 is image width, 5 is for space between image and text, 42 is left + right offset
            marginRight = ((currentItem.side == 1 && currentItem.image) ? w - (96 + 21 + 5) : w - 21);


        // now that we have the string that we need to print, print it correctly
        const textMetrics = ctx.measureText(text);
        // because right + left offset
        if (textMetrics.width < marginRight - marginLeft) {
            // text is small enough to be printed right away
            ctx.fillText(text, marginLeft, nameHeight + h - this.getFrameHeight(h) + 15 + lineMarginTop);
        } else {
            //? text is too long to pe printed directly
            //? so we'll basically split the text in words and check if the next words is out of the frame
            //? if yes, print it a line under and continue on this line

            // split the text in words
            const words = text.split(" ");
            // get the metrics of a word for size reference
            // we can't use words because we don't know if the first on is empty or not
            // we'll remplce it latter by the real word, we just need a height
            let wordMetric = ctx.measureText("WordSizepyLl");
            // this on is constant, to make the space between lines 
            const wordHeight = wordMetric.actualBoundingBoxAscent + wordMetric.actualBoundingBoxDescent;

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
                // check if \n is in the text, if yes, create a new line
                if (word.includes("\n")) {
                    result.push(textLine);
                    textLine = word;
                    temp = "";
                } else {
                    if (tempMetrics.width < marginRight - marginLeft) textLine = temp;
                    else {
                        result.push(textLine);
                        textLine = word;
                        temp = "";
                    }
                }
            });
            // push the last line, because it can fit inside
            result.push(temp);

            //then print each result line by line
            //TODO add a scroll up if number of line is too long for the frame (automatic, once it went up, it's finish)
            result.forEach((line, id) => {
                ctx.fillText(line.trim(), marginLeft, nameHeight + h - this.getFrameHeight(h) + 20 + (wordHeight + lineMarginTop) * id);
            });

        }
        // draw the image if there is one
        if (currentItem.image) {
            const image = scope.cache.image[currentItem.image[0]];
            ctx.drawImage(image.image,
                image.tileW * currentItem.image[1], image.tileH * currentItem.image[2],
                // -1 toprevent image smoothing to take the pixel of the other images
                image.tileW - 1, image.tileH - 1,
                (currentItem.side == 0 ? 21 : w - (image.tileW + 21)), nameHeight + h - this.getFrameHeight(h) + 10,
                96, 96
            );
        }
    }

    /**
     * @param {GameScope} scope 
     */
    update(scope) {
        if (this.textList.length == 0) return;
        const currentItem = this.textList[this.itemProgress];
        // call the end function
        if (!currentItem) return this.callback();

        //TODO also create a responsive keyboard (just the alphabet and basic interaction, such as space, delete, numbers...)
        if (currentItem.announcement) {
            // do announcement (center, Takhi)
        } else if (currentItem.fullscreen) {
            // print full screen (1/1)
        } else {
            //TODO also be able to draw an image on right or left side of the text frame

            if (currentItem.skipable) {
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
                    //BUG weird behavior when clicking multiple times when text is spreading
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
                    textSpeed = currentItem.textSpeed;
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
                            // skip the space animation
                            if (this.fullText[this.letterProgress] == " " ||
                                this.fullText[this.letterProgress] == "\n" ||
                                this.fullText[this.letterProgress] == "\r") this.letterProgress++;
                            // so that it refresh the context
                            this.needsUpdate = true;
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
            }

            // get all the text, then we just need to print this.letterProgress letters of it
            if (this.fullText == 0) {
                this.textList.forEach(i => { this.fullText += i.text; });
            }
        }

        /** 
         * ?What's going since last time?
         * need to do the next parameter, so clear everything and print item (just re launch the event without first items?)
         * need to do announcement and fullscreen
         */
    }
}