function readDirAndFiles() {
    const fs = require("fs"),
        path = require("path");
    const savePath = path.resolve(path.resolve(), "save");

    function readFiles(dirname, onFileContent, onError) {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                onError(err);
                return;
            }
            filenames.forEach(function (filename, idx, array) {
                fs.readFile(dirname + "/" + filename, 'utf-8', function (err, content) {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(filename, content, idx, array.length);
                });
            });
        });
    }

    readFiles(savePath, content, (e) => console.error(e));

    const files = [];
    function content(name, content, i, l) {
        files.push({ name: name, content: content });
        if (i == l - 1) console.log(files);
    }
}

function main() {
    const canvas = document.getElementsByTagName("canvas")[0];
    if (!canvas) throw new Error("No canvas.");
    canvas.style.height = "100px";
    canvas.style.width = "100px";
    const h = canvas.height = 100;
    const w = canvas.width = 100;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No context.");

    const image = ArrowDrawer.pixel(w, h, "right");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0, w, h);
}

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
 * draw a pixelised arrow
 * @param {number} w width
 * @param {number} h height
 * @param {"up" | "down" | "right" | "left"} a direction the arrow is pointing
 * @returns {HTMLCanvasElement} the arrow
 */
ArrowDrawer.pixel = function (w = 20, h = 20, a = 0) {
    const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
    canvas.width = 20;
    canvas.height = 20;
    canvas.style.width = '20px';
    canvas.style.height = '20px';

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