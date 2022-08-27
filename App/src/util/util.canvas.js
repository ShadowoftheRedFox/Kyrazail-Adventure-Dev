/// <reference path="../../ts/type.d.ts"/>
/*
/**
 * @param {CanvasRenderingContext2D} context 
 * @returns 
 * /
function getPixelRatio(context) {
    var backingStores = [
        'webkitBackingStorePixelRatio',
        'mozBackingStorePixelRatio',
        'msBackingStorePixelRatio',
        'oBackingStorePixelRatio',
        'backingStorePixelRatio'
    ];

    var deviceRatio = window.devicePixelRatio;

    // Iterate through our backing store props and determine the proper backing ratio.
    var backingRatio = backingStores.reduce(function (prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
    });

    // Return the proper pixel ratio by dividing the device ratio by the backing ratio
    return deviceRatio / parseInt(backingRatio);
}

/**
 * Create a canvas element on the html page.
 * @param {number} w width of the canvas
 * @param {number} h heigth of the canvas
 * @param {number} i z-index of the canvas 
 * @returns {HTMLCanvasElement}
 * /
function generateCanvas(w, h, i = 1) {
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
    canvas.style.zIndex = i;
    // Scale the context so we get accurate pixel density
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    return canvas;
}

/**
 * Edit the canvas element on the html page to the new dimension.
 * @param {HTMLCanvasElement} canvas canvas element
 * @param {number} neww width of the canvas
 * @param {number} newh heigth of the canvas 
 * /
function regenerateCanvas(canvas, neww, newh) {
    const context = canvas.getContext("2d");
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

function regenerateAllCanvas(neww, newh) {
    const ac = document.getElementsByTagName("canvas");
    for (var c of ac) {
        const cc = c.getContext('2d');
        var ratio = getPixelRatio(cc);

        // Set the canvas' width then downscale via CSS
        c.width = Math.round(neww * ratio);
        c.height = Math.round(newh * ratio);
        c.style.width = neww + 'px';
        c.style.height = newh + 'px';
        // Scale the context so we get accurate pixel density
        cc.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
}

/**
 * Remove an element from the DOM.
 * @param {string} id Id of the element.
 * @returns {boolean} Success or not.
 * /
function removeElement(id) {
    const c = document.getElementById(id);
    if (c) {
        c.remove();
        return true;
    } else { return false; }
}
*/
function getPixelRatio(c) { var b = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio'], d = window.devicePixelRatio, B = b.reduce(function (prev, curr) { return (c.hasOwnProperty(curr) ? c[curr] : 1); }); return d / parseInt(B); } function generateCanvas(w, h, i = 1) { var c = document.createElement('canvas'), x = c.getContext('2d'); var r = getPixelRatio(x); c.width = Math.round(w * r); c.height = Math.round(h * r); c.style.width = w + 'px'; c.style.height = h + 'px'; c.style.zIndex = i; x.setTransform(r, 0, 0, r, 0, 0); return c; } function regenerateCanvas(c, w, h) { const x = c.getContext("2d"); var r = getPixelRatio(x); c.width = Math.round(w * r); c.height = Math.round(h * r); c.style.width = w + 'px'; c.style.height = h + 'px'; x.setTransform(r, 0, 0, r, 0, 0); } function regenerateAllCanvas(w, h) { const ac = document.getElementsByTagName("canvas"); for (var c of ac) { const cc = c.getContext('2d'); var r = getPixelRatio(cc); c.width = Math.round(w * r); c.height = Math.round(h * r); c.style.width = w + 'px'; c.style.height = h + 'px'; cc.setTransform(r, 0, 0, r, 0, 0); } } function removeElement(i) { const c = document.getElementById(i); if (c) { c.remove(); return true; } else return false; }