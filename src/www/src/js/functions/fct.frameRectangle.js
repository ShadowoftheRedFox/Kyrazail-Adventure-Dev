/**
 * Create a frame with the given parameters. Draw it like a stroke rectangle with shady background.
 * @param {scope} scope Scope.
 * @param {number} x Upper left corner x coordinate.
 * @param {number} y Upper left corner x coordinate.
 * @param {number} w Width of the rectangle.
 * @param {number} h Heigth of the rectangle.
 */
function frameRectangleTrans(scope, x, y, w, h) {
    if (!scope) throw new Error(`Scope is not defined.`);
    if (!scope.context) throw new Error(`Context is not defined.`);
    if (!scope.cache) throw new Error(`Cache is not defined.`);
    if (isNaN(x) === true) throw new TypeError(`x is not a number.`);
    if (isNaN(y) === true) throw new TypeError(`y is not a number.`);
    if (isNaN(w) === true) throw new TypeError(`w is not a number.`);
    if (isNaN(h) === true) throw new TypeError(`h is not a number.`);
    const i = scope.cache.image.system.Window.image,
        ctx = scope.context;

    //? since we can only scretch inside rectangle, we'll need to draw border one by one
    //draw the mist background first
    ctx.drawImage(i, 68, 68, 24, 24, x + 2, y + 2, w - 4, h - 4);

    //? then draw border
    //upper left corner
    ctx.drawImage(i, 64, 0, 24, 24, x, y, 24, 24);
    //upper right corner
    ctx.drawImage(i, 104, 0, 24, 24, w + x - 24, y, 24, 24);
    //lower left corner
    ctx.drawImage(i, 64, 40, 24, 24, x, y + h - 24, 24, 24);
    //lower right corner
    ctx.drawImage(i, 104, 40, 24, 24, x + w - 24, y + h - 24, 24, 24);

    //? then draw side lines
    //NB: lines width are 6px
    //upper
    ctx.drawImage(i, 88, 0, 2, 6, x + 24, y, w - 48, 6);
    //lower 
    ctx.drawImage(i, 88, 0, 2, 6, x + 24, y + h - 6, w - 48, 6);
    //left
    ctx.drawImage(i, 64, 24, 6, 2, x, y + 24, 6, h - 48);
    //right
    ctx.drawImage(i, 64, 24, 6, 2, x + w - 6, y + 24, 6, h - 48);
}

/**
 * Create a frame with the given parameters. Draw it like a stroke rectangle.
 * @param {scope} scope Scope.
 * @param {number} x Upper left corner x coordinate.
 * @param {number} y Upper left corner x coordinate.
 * @param {number} w Width of the rectangle.
 * @param {number} h Heigth of the rectangle.
 * @param {HTMLImageElement} [imageToDraw] The image you want to draw inside the frame. Optionnal.
 * @param {number} [ix] Upper left corner x coordinate or the image. If imageToDraw is specified, must be defined.
 * @param {number} [iy] Upper left corner x coordinate or the image. If imageToDraw is specified, must be defined.
 * @param {number} [iw] Width of the rectangle of the image. If imageToDraw is specified, must be defined.
 * @param {number} [ih] Heigth of the rectangle of the image. If imageToDraw is specified, must be defined.
 */
function frameRectangle(scope, x, y, w, h, imageToDraw, ix, iy, iw, ih) {
    if (!scope) throw new Error(`Scope is not defined.`);
    if (!scope.context) throw new Error(`Context is not defined.`);
    if (!scope.cache) throw new Error(`Cache is not defined.`);
    if (!imageToDraw) throw new Error(`imageToDraw is not defined.`);
    if (isNaN(x) === true) throw new TypeError(`x is not a number.`);
    if (isNaN(y) === true) throw new TypeError(`y is not a number.`);
    if (isNaN(w) === true) throw new TypeError(`w is not a number.`);
    if (isNaN(h) === true) throw new TypeError(`h is not a number.`);
    if (isNaN(ix) === true) throw new TypeError(`ix is not a number.`);
    if (isNaN(iy) === true) throw new TypeError(`iy is not a number.`);
    if (isNaN(iw) === true) throw new TypeError(`iw is not a number.`);
    if (isNaN(ih) === true) throw new TypeError(`ih is not a number.`);
    const i = scope.cache.image.system.Window.image,
        ctx = scope.context;

    //? we'll need to draw border one by one
    if (imageToDraw) ctx.drawImage(imageToDraw, ix, iy, iw, ih, x + 3, y + 3, w - 6, h - 6);
    //? then draw border
    //upper left corner
    ctx.drawImage(i, 64, 0, 24, 24, x, y, 24, 24);
    //upper right corner
    ctx.drawImage(i, 104, 0, 24, 24, w + x - 24, y, 24, 24);
    //lower left corner
    ctx.drawImage(i, 64, 40, 24, 24, x, y + h - 24, 24, 24);
    //lower right corner
    ctx.drawImage(i, 104, 40, 24, 24, x + w - 24, y + h - 24, 24, 24);

    //? then draw side lines
    //NB: lines width are 6px
    //upper
    ctx.drawImage(i, 88, 0, 2, 6, x + 24, y, w - 48, 6);
    //lower 
    ctx.drawImage(i, 88, 0, 2, 6, x + 24, y + h - 6, w - 48, 6);
    //left
    ctx.drawImage(i, 64, 24, 6, 2, x, y + 24, 6, h - 48);
    //right
    ctx.drawImage(i, 64, 24, 6, 2, x + w - 6, y + 24, 6, h - 48);
}