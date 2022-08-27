/// <reference path="../../ts/type.d.ts"/>
/**
 * Create a light effect. Add one pixel by one pixel.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x Center of the circle.
 * @param {number} y Center of the circle.
 * @param {number} diameter Diameter of the circle.
 * @param {number} [beginDiameter=0] The first diameter that will increase to diameter. Default: 0
 * @param {number} [alphaRatio=0] Light will go from dark to bright proportinaly of the given globalAlpha. Default: 0
 * @param {number} [brightness=0.012] Wanted brightness of the light; Default: 0.012
 * @param {string | CanvasGradient | CanvasPattern} [color="#e6cd7c"] Color of the light. Default: #e6cd7c
 */
function lightEffect(ctx, x, y, diameter, beginDiameter, alphaRatio, brightness, color) {
    if (!ctx) throw new Error("Context is not defined.");
    if (!x) throw new Error("x is not defined.");
    if (!y) throw new Error("y is not defined.");
    if (!diameter) throw new Error("diameter is not defined.");
    if (isNaN(x) === true) throw new TypeError("x is not a number.");
    if (isNaN(y) === true) throw new TypeError("y is not a number.");
    if (isNaN(diameter) === true) throw new TypeError("diameter is not a number.");

    const defaultStyle = ctx.fillStyle,
        defaultAlpha = ctx.globalAlpha;
    if (!beginDiameter || isNaN(beginDiameter)) beginDiameter = 0;
    if (!alphaRatio || isNaN(alphaRatio) === true) alphaRatio = 1;
    if (!brightness || isNaN(brightness) === true) brightness = 0.012;
    if (!color || (typeof color !== "string" && !(color instanceof CanvasGradient) && !(color instanceof CanvasPattern))) {
        color = "#e6cd7c";
        console.log("Color by default.");
    }
    diameter = diameter * alphaRatio;
    beginDiameter = beginDiameter * alphaRatio;
    ctx.fillStyle = "#e6cd7c";
    ctx.globalAlpha = brightness;
    for (var diam = beginDiameter; diam <= diameter; diam++) {
        ctx.beginPath();
        ctx.arc(x, y, diam, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    ctx.fillStyle = defaultStyle;
    ctx.globalAlpha = defaultAlpha;
}

/**
 * Create a light effect depending of the time of the day.
 * @param {CanvasRenderingContext2D} ctx the canvas to draw on
 * @param {number} time time ofthe day in ms
 * @returns 
 */
function dayNightCycle(ctx, time) {
    return;
}