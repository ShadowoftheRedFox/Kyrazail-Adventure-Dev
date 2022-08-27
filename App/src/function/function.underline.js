/// <reference path="../../ts/type.d.ts"/>
/**
 * Draw an underline under a given text and position
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {number} x 
 * @param {number} y 
 * @param {string | CanvasGradient | CanvasPattern} color 
 * @param {string} textSize 
 * @param {CanvasTextAlign} align 
 */
function underline(context, text, x, y, color, textSize, align) {

    var textWidth = context.measureText(text).width;
    var startX = 0;
    var startY = y + (parseInt(textSize) / 15);
    if (context.textBaseline == "middle") startY = y + parseInt(textSize) + 1 - 7 * (parseInt(textSize) / 15);
    var endX = 0;
    var endY = startY;
    var underlineHeight = parseInt(textSize) / 15;

    if (underlineHeight < 1) {
        underlineHeight = 1;
    }

    if (align == "center") {
        startX = x - (textWidth / 2);
        endX = x + (textWidth / 2);
    } else if (align == "right") {
        startX = x - textWidth;
        endX = x;
    } else {
        startX = x;
        endX = x + textWidth;
    }

    //save parameters to set like before underline
    const preColor = context.strokeStyle,
        preLineWidth = context.lineWidth;

    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = underlineHeight;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    //set parameters like before
    context.strokeStyle = preColor;
    context.lineWidth = preLineWidth;
}