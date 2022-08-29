
function ArrowDrawer() {
    throw new Error("This is a static class.");
}

ArrowDrawer.createContext = function (w, h) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");
    var backingRatio = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio'].reduce(function (prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
    }), ratio = window.devicePixelRatio / parseInt(backingRatio);
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
};

ArrowDrawer.createStrictContext = function (w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    return canvas;
};

/**
 * @param {HTMLCanvasElement} img the type of arrow to draw
 * @param {number} w width
 * @param {number} h height
 * @param {"up" | "down" | "right" | "left"} a direction the arrow is pointing
 * @return {HTMLImageElement} the arrow image
 */
ArrowDrawer.draw = function (img, w = 20, h = 20, a = "right") {
    const canvas = ArrowDrawer.createContext(w, h),
        ctx = canvas.getContext("2d");
    var rad = Math.PI;
    switch (a) {
        case "up":
            rad = 0;
            break;
        case "right":
            rad = rad / 2;
            break;
        case "left":
            rad = rad * 1.5;
            break;
    }
    console.log(w, h);

    ctx.imageSmoothingQuality = "high";
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(rad);
    ctx.fillStyle = "black";
    // center of a rect is -w/2 and -h/2
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    console.log(canvas.toDataURL());

    return canvas;
};

/**
 * Draw a pixelised arrow.
 * @param {number} w width
 * @param {number} h height
 * @param {"up" | "down" | "right" | "left"} a direction the arrow is pointing
 * @returns {HTMLCanvasElement} the arrow
 */
ArrowDrawer.pixel = function (w = 20, h = 20, a = "right") {
    const canvas = ArrowDrawer.createStrictContext(20, 20),
        ctx = canvas.getContext("2d");

    //draw the arrow form
    const arrow = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    ];

    ctx.clearRect(0, 0, 20, 20);
    ctx.fillStyle = "black";
    arrow.forEach((l, lx) => {
        l.forEach((r, rx) => {
            if (r == 1) ctx.fillRect(rx, lx, 1, 1);
        });
    });
    console.log(canvas.toDataURL());

    return ArrowDrawer.draw(canvas, w, h, a);
};