import { getPixelRatio, generateCanvas, regenerateCanvas, regenerateAllCanvas, removeElement } from "./util.canvas";
import { GameEncryptData, GameDecrytpData, GameTestCryptInsecure } from "./util.save"
import { isNwJs, isMobileDevice, isMobileSafari, isAndroidChrome, getDate, getExactDate, convertDate, RemoveDuplicate, Point2D, Vector2D } from "./util.general"
export const Utils = {
    General: {
        isNwJs,
        isMobileDevice,
        isMobileSafari,
        isAndroidChrome,
        getDate,
        getExactDate,
        convertDate,
        RemoveDuplicate,
        Point2D,
        Vector2D,
    },
    Canvas: {
        getPixelRatio,
        generateCanvas,
        regenerateCanvas,
        regenerateAllCanvas,
        removeElement,
    },
    Save: {
        GameEncryptData,
        GameDecrytpData,
        GameTestCryptInsecure,
    },
}