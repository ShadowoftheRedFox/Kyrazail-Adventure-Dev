/// <reference path="../../ts/type.d.ts"/>

/**
 * @param {GameScope} scope
 * @param {string[]} imageArray 
 * @param {()=>{}} callback 
 */
function GameLoadImage(scope, imageArray, callback) {
    if (!imageArray) throw new ReferenceError("You must pass an array.");
    if (!Array.isArray(imageArray)) throw new TypeError("The imageArray must be a string array.");
    if (callback && typeof callback != "function") throw new TypeError("Callback must be a function");

    LoadingScreenManager.message = "Loading images";
    if (imageArray.length == 0) return callback();
    LoadingScreenManager.setMaxProgress(imageArray.length);
    let c = imageArray.length;

    imageArray.forEach(image => {
        if (scope.cache.image[image]) console.log(`${image} is already loaded`);
        else {
            const i = new Image();
            i.onerror = function () {
                console.warn(`${i.src} failed`);
                LoadingScreenManager.addProgress(1);
                c--;
            };
            i.onload = function () {
                scope.cache.image[image] = GameLoadImage.structure(i, image);
                LoadingScreenManager.addProgress(1);
                c--;
            };
            i.src = scope.constants.href + "resources/Image/" + image + ".png";
        }
    });

    const r = setInterval(() => { if (c == 0) { callback(); clearInterval(r); } }, 100);
}

/**
 * 
 * @param {HTMLImageElement} image 
 * @param {string} n
 * @return {{}}
 */
GameLoadImage.structure = function (image, n) {
    const folder = n.split("/")[0],
        name = n.split("/")[1];

    const s = {
        image: image
    };

    if (["Battlebacks1", "Battlebacks2", "Battlers", "Parallaxes", "Titles1", "Titles2", "Introduction", "Icons"].includes(folder)) return s;
    if (folder === "Tilesets") {
        s.tileW = 16;
        s.tileH = 16;
        s.col = image.width / 16;
        s.row = image.height / 16;
        return s;
    }
    if (folder === "Animations") {
        s.tileW = 192;
        s.tileH = 192;
        s.col = image.width / 192;
        s.row = image.height / 192;
        return s;
    }
    if (folder === "Faces") {
        s.tileW = 96;
        s.tileH = 96;
        s.col = image.width / 96;
        s.row = image.height / 96;
        return s;
    }
    if (folder === "System") {
        if (name === "Shadow" || name === "Window" || name === "GameOver" || name === "BattleStart") return s;
        if (name === "Balloon") {
            s.tileW = 32;
            s.tileH = 32;
            s.col = image.width / 32;
            s.row = image.height / 32;
            return s;
        }
        if (name === "IconSet") {
            s.tileW = 16;
            s.tileH = 16;
            s.col = image.width / 16;
            s.row = image.height / 16;
            return s;
        }
    }
    if (folder === "Characters") {
        if (name.includes("$")) {
            s.tileW = image.width / 3;
            s.tileH = image.height / 4;
            s.col = 3;
            s.row = 4;
            return s;
        } else {
            s.tileW = image.width / 12;
            s.tileH = image.height / 8;
            s.col = 12;
            s.row = 8;
            return s;
        }
    }
};