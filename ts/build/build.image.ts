import { CONFIG_CONSTANTS } from "../config/game.config";
import { Game } from "../game";

export function GameLoadImage(scope: Game, ImageArray: string[], callback: Function) {
    if (!ImageArray) throw new ReferenceError("You must pass an array.");
    if (!Array.isArray(ImageArray)) throw new TypeError("The ImageArray must be a string array.");
    if (callback && typeof callback != "function") throw new TypeError("Callback must be a function");

    LoadingScreenManagerInstance.message = "Loading images";
    if (ImageArray.length == 0) return callback();
    LoadingScreenManagerInstance.setMaxProgress(ImageArray.length);
    let c = ImageArray.length;

    ImageArray.forEach(image => {
        if (CONFIG_CONSTANTS.DEBUG && scope.cache.image[image]) { console.log(`${image} is already loaded`); c--; }
        else {
            const i = new Image();
            i.onerror = () => {
                // warn and add progress
                console.warn(`${i.src} failed`);
                LoadingScreenManagerInstance.addProgress(1);
                c--;
            };
            i.onload = () => {
                // push the loaded image in the cache
                scope.cache.image[image] = GameLoadImage.structure(i, image);
                // add the progress
                LoadingScreenManagerInstance.addProgress(1);
                c--;
            };
            i.src = scope.constants.href + "resources/Image/" + image + ".png";
        }
    });

    const r = setInterval(() => { if (c == 0) { callback(); GameImagesToLoad = []; clearInterval(r); } }, 100);
}

/**
 * 
 * @param {HTMLImageElement} image 
 * @param {string} n
 * @return {{}}
 */
GameLoadImage.structure = function (image: HTMLImageElement, n: string) {
    const folder = n.split("/")[0],
        name = n.split("/")[1];

    const s = {
        image: image,
        tileW: 0,
        tileH: 0,
        col: 0,
        row: 0
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