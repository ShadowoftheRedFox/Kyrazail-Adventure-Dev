const getPixelRatio = function getPixelRatio(context) {
    var backingStores = [
        'webkitBackingStorePixelRatio',
        'mozBackingStorePixelRatio',
        'msBackingStorePixelRatio',
        'oBackingStorePixelRatio',
        'backingStorePixelRatio'
    ];

    var deviceRatio = window.devicePixelRatio;

    // Iterate through our backing store props and determine the proper backing ratio.
    var backingRatio = backingStores.reduce(function(prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
    });

    // Return the proper pixel ratio by dividing the device ratio by the backing ratio
    return deviceRatio / parseInt(backingRatio);
};

/**
 * Create a canvas element on the html page.
 * @param {number} w width of the canvas
 * @param {number} h heigth of the canvas 
 * @returns {HTMLCanvasElement}
 */
function generateCanvas(w, h) {
    console.log('Generating canvas.');

    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');
    // Pass our canvas' context to our getPixelRatio method
    var ratio = getPixelRatio(context);

    // Set the canvas' width then downscale via CSS
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    // Scale the context so we get accurate pixel density
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    return canvas;
}

/**
 * Edit the canvas element on the html page to the new dimension.
 * @param {HTMLCanvasElement} canvas canvas element
 * @param {CanvasRenderingContext2D} context
 * @param {number} neww width of the canvas
 * @param {number} newh heigth of the canvas 
 */
function regenerateCanvas(canvas, context, neww, newh) {
    // Pass our canvas' context to our getPixelRatio method
    var ratio = getPixelRatio(context);

    // Set the canvas' width then downscale via CSS
    canvas.width = Math.round(neww * ratio);
    canvas.height = Math.round(newh * ratio);
    canvas.style.width = neww + 'px';
    canvas.style.height = newh + 'px';
    // Scale the context so we get accurate pixel density
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
}