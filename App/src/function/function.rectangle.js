
function RectangleCreator() {
    throw new Error("RectangleCreator is a static class.");
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object to specify different radius for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
RectangleCreator.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
    if (!ctx) throw new ReferenceError(`Context is not defined.`);
    if (isNaN(x)) throw new TypeError(`x is not a number.`);
    if (isNaN(y)) throw new TypeError(`y is not a number.`);
    if (isNaN(width)) throw new TypeError(`w is not a number.`);
    if (isNaN(height)) throw new TypeError(`h is not a number.`);

    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (width == 0 || height == 0) return;
    if (typeof radius === 'number') {
        // smooth edge if width or height smaller than radius
        while ((Math.abs(width) / 2) < radius || (Math.abs(height) / 2) < radius) {
            radius = radius - 1;
        }
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
};

/**
 * Create a frame with the given parameters. Draw it like a stroke rectangle with shady background.
 * @param {GameScope} scope Scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw on.
 * @param {number} x Upper left corner x coordinate.
 * @param {number} y Upper left corner x coordinate.
 * @param {number} w Width of the rectangle.
 * @param {number} h Heigth of the rectangle.
 */
RectangleCreator.frameRectangleTrans = function (scope, ctx, x, y, w, h) {
    if (!scope) throw new ReferenceError(`Scope is not defined.`);
    if (!ctx) throw new ReferenceError(`Context is not defined.`);
    if (!scope.cache) throw new ReferenceError(`Cache is not defined.`);
    if (isNaN(x)) throw new TypeError(`x is not a number.`);
    if (isNaN(y)) throw new TypeError(`y is not a number.`);
    if (isNaN(w)) throw new TypeError(`w is not a number.`);
    if (isNaN(h)) throw new TypeError(`h is not a number.`);
    const i = scope.cache.image["System/Window"].image,
        oldAlpha = ctx.globalAlpha,
        oldFillStyle = ctx.fillStyle;

    //? since we can only scretch inside rectangle, we'll need to draw border one by one
    //draw the mist background first
    //! old version: we get the mist from the image and scretch it
    // ctx.drawImage(i, 68, 68, 24, 24, x + 2, y + 2, w - 4, h - 4);
    //! new version: we just draw a grey rectangle at 0.2 globalAlpha
    ctx.fillStyle = "grey";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
    ctx.fillStyle = oldFillStyle;
    ctx.globalAlpha = oldAlpha;

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
};

/**
 * Create a frame with the given parameters. Draw it like a stroke rectangle.
 * @param {GameScope} scope Scope.
 * @param {CanvasRenderingContext2D} ctx The context to draw on.
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
RectangleCreator.frameRectangle = function (scope, ctx, x, y, w, h, imageToDraw, ix, iy, iw, ih) {
    if (!scope) throw new ReferenceError(`Scope is not defined.`);
    if (!ctx) throw new ReferenceError(`Context is not defined.`);
    if (!scope.cache) throw new ReferenceError(`Cache is not defined.`);
    if (isNaN(x)) throw new TypeError(`x is not a number.`);
    if (isNaN(y)) throw new TypeError(`y is not a number.`);
    if (isNaN(w)) throw new TypeError(`w is not a number.`);
    if (isNaN(h)) throw new TypeError(`h is not a number.`);
    if (imageToDraw && imageToDraw.tagName != "IMG") throw new ReferenceError(`imageToDraw is not a HTMLImageElement.`);
    if (imageToDraw && isNaN(ix)) throw new TypeError(`ix is not a number.`);
    if (imageToDraw && isNaN(iy)) throw new TypeError(`iy is not a number.`);
    if (imageToDraw && isNaN(iw)) throw new TypeError(`iw is not a number.`);
    if (imageToDraw && isNaN(ih)) throw new TypeError(`ih is not a number.`);
    const i = scope.cache.image["System/Window"].image;

    if (imageToDraw) ctx.drawImage(imageToDraw, ix, iy, iw, ih, x + 3, y + 3, w - 6, h - 6);
    //? draw corner
    // upper left corner
    ctx.drawImage(i, 64, 0, 24, 24, x, y, 24, 24);
    // upper right corner
    ctx.drawImage(i, 104, 0, 24, 24, w + x - 24, y, 24, 24);
    // lower left corner
    ctx.drawImage(i, 64, 40, 24, 24, x, y + h - 24, 24, 24);
    // lower right corner
    ctx.drawImage(i, 104, 40, 24, 24, x + w - 24, y + h - 24, 24, 24);

    //? then draw side lines
    // NB: lines width are 6px, frame image start at (64,0), end at (128,64)
    // upper
    ctx.drawImage(i, 64 + 24, 0, 2, 8, x + 24, y, w - 48, 8);
    // lower 
    ctx.drawImage(i, 64 + 24, 64 - 8, 2, 8, x + 24, y + h - 8, w - 48, 8);
    // left
    ctx.drawImage(i, 64, 24, 8, 2, x, y + 24, 8, h - 48);
    // right
    ctx.drawImage(i, 128 - 8, 24, 8, 2, x + w - 8, y + 24, 8, h - 48);
};

/**
 * Draw a line of frame with the given parameters.
 * @param {GameScope} scope 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} l length of the line
 * @param {boolean} horizontal horizontal line if true, vertical if false
 * @param {boolean} facing facing the origin or no
 */
RectangleCreator.frameLine = function (scope, ctx, x, y, l, horizontal = true, facing = true) {
    if (!scope) throw new ReferenceError(`Scope is not defined.`);
    if (!ctx) throw new ReferenceError(`Context is not defined.`);
    if (!scope.cache) throw new ReferenceError(`Cache is not defined.`);
    if (isNaN(x)) throw new TypeError(`x is not a number.`);
    if (isNaN(y)) throw new TypeError(`y is not a number.`);
    if (isNaN(l)) throw new TypeError(`l is not a number.`);
    const i = scope.cache.image["System/Window"].image;

    if (horizontal) {
        if (facing) {
            // upper
            ctx.drawImage(i, 64 + 24, 0, 2, 8, x, y - 4, l, 8);
        } else {
            // lower 
            ctx.drawImage(i, 64 + 24, 64 - 6, 2, 8, x, y - 4, l, 8);
        }
    } else {
        if (facing) {
            // left
            ctx.drawImage(i, 64, 24, 8, 2, x - 4, y, 8, l);
        } else {
            // right
            ctx.drawImage(i, 128 - 8, 24, 8, 2, x - 4, y, 8, l);
        }
    }
}