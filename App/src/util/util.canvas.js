/// <reference path="../../ts/type.d.ts"/>

/**
 * @param {CanvasRenderingContext2D} context 
 * @returns {number} the ratio
 */
function getPixelRatio(context) {
    const backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1,

        deviceRatio = window.devicePixelRatio || 1;

    // Return the proper pixel ratio by dividing the device ratio by the backing ratio
    return deviceRatio / backingStoreRatio;
}

/**
 * Create a canvas element on the html page.
 * @param {number} w width of the canvas
 * @param {number} h heigth of the canvas
 * @param {number} i z-index of the canvas 
 * @returns {HTMLCanvasElement}
 */
function generateCanvas(w, h, i = 1) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    if (!context) throw new Error("Context is not supported on your brower.");

    // Pass our canvas' context to our getPixelRatio method
    var ratio = getPixelRatio(context);

    // Set the canvas' width then downscale via CSS
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    canvas.width = Math.floor(w * ratio);
    canvas.height = Math.floor(h * ratio);

    canvas.style.zIndex = i;
    // Scale the context so we get accurate pixel density
    context.scale(ratio, ratio);

    return canvas;
}

/**
 * Edit the canvas element on the html page to the new dimension.
 * @param {HTMLCanvasElement} canvas canvas element
 * @param {number} neww width of the canvas
 * @param {number} newh heigth of the canvas 
 */
function regenerateCanvas(canvas, neww, newh) {
    const context = canvas.getContext("2d");
    // Pass our canvas' context to our getPixelRatio method
    var ratio = getPixelRatio(context);

    // Set the canvas' width then downscale via CSS
    canvas.style.width = neww + 'px';
    canvas.style.height = newh + 'px';

    canvas.width = Math.floor(neww * ratio);
    canvas.height = Math.floor(newh * ratio);
    // Scale the context so we get accurate pixel density
    context.scale(ratio, ratio);
}

function regenerateAllCanvas(neww, newh) {
    const CanvasArray = document.getElementsByTagName("canvas");
    for (const canvas of CanvasArray) {
        regenerateCanvas(canvas, neww, newh);
    }
}

/**
 * Remove an element from the DOM.
 * @param {string} id Id of the element.
 * @returns {boolean} Success or not.
 */
function removeElement(id) {
    const c = document.getElementById(id);
    if (c) {
        c.remove();
        return true;
    } else { return false; }
}