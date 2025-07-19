/**
 * @param {CanvasRenderingContext2D} context 
 * @returns {number} the ratio
 */
export function getPixelRatio(context: CanvasRenderingContext2D): number {
    const backingStoreRatio = /* context?.webkitBackingStorePixelRatio ||
        context?.mozBackingStorePixelRatio ||
        context?.msBackingStorePixelRatio ||
        context?.oBackingStorePixelRatio ||
        context?.backingStorePixelRatio ||  */1;

    const deviceRatio = window.devicePixelRatio || 1;

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
export function generateCanvas(w: number, h: number, i = 1): HTMLCanvasElement {
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

    canvas.style.zIndex = `${i}`;
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
export function regenerateCanvas(canvas: HTMLCanvasElement | null, neww: number, newh: number) {
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) {
        console.error("Unable to get context of the canvas.");
        return;
        //TODO throw error here
    }
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

export function regenerateAllCanvas(neww: number, newh: number) {
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
export function removeElement(id: string) {
    const c = document.getElementById(id);
    if (c) {
        c.remove();
        return true;
    } else { return false; }
}


