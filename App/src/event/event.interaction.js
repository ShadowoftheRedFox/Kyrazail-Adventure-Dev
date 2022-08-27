/// <reference path="../../ts/type.d.ts"/>
function MouseTrackerManager() {
    throw new StaticClassError("This is a static class.");
}

MouseTrackerManager.data = {
    lastMove: {
        // init false coordinate to prevent bug
        x: -100,
        y: -100
    },
    /**
     * @type {{x: number, y: number, date: number}[]}
     */
    click: [{ x: -100, y: -100, date: 0 }]
};

MouseTrackerManager.init = function () {
    document.onmousedown = function (ev) { MouseTrackerManager.OnMouseClick(ev); };
    document.onmousemove = function (ev) { MouseTrackerManager.OnMouseMove(ev); };
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseMove = function (event) {
    MouseTrackerManager.data.lastMove = { x: event.clientX, y: event.clientY };
    MouseTrackerManager.moving = true;
    MouseTrackerManager.update();
    MouseTrackerManager.stopedMoved({ x: event.clientX, y: event.clientY });
};

MouseTrackerManager.moving = false;
MouseTrackerManager.stopedMoved = function (old) {
    // to "vanish" the cursor if it stopped moving at the next frame
    // so that you can freely use the keyboard even if the cursor is hover a button
    if (MouseTrackerManager.moving) {
        setTimeout(() => {
            if (MouseTrackerManager.data.lastMove.x == old.x && MouseTrackerManager.data.lastMove.y == old.y) MouseTrackerManager.data.lastMove = { x: -10, y: -10 };
        }, 1000 / GameConfig.targetFps);
        MouseTrackerManager.moving = false;
    }
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseClick = function (event) {
    MouseTrackerManager.data.click.push({
        x: event.clientX,
        y: event.clientY,
        date: Date.now()
    });
    // remove too old click
    if (MouseTrackerManager.data.click.length > 20) {
        MouseTrackerManager.data.click.shift();
    }
    MouseTrackerManager.update();
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @returns {boolean}
 */
MouseTrackerManager.checkOver = function (x, y, w, h) {
    const o = MouseTrackerManager.data.lastMove;
    if (o.x >= x && o.x <= x + w && o.y >= y && o.y <= y + h) return true;
    else return false;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number | 100} time
 * @returns {boolean}
 */
MouseTrackerManager.checkClick = function (x, y, w, h, time) {
    if (MouseTrackerManager.data.click.length === 0) return false;
    let c = MouseTrackerManager.data.click[MouseTrackerManager.data.click.length - 1];

    //check if click is new enough, under 100 ms [default]
    if (!time) time = 100;
    if (Date.now() - c.date <= time) {
        if (c.x >= x && c.x <= x + w && c.y >= y && c.y <= y + h) {
            return true;
        } else {
            return false;
        }
    }
};

MouseTrackerManager.updated = false;
MouseTrackerManager.waitTimeUpdate = 100;

MouseTrackerManager.update = function () {
    MouseTrackerManager.updated = true;
    setTimeout(() => {
        MouseTrackerManager.updated = false;
    }, MouseTrackerManager.waitTimeUpdate);
};

function KeyboardTrackerManager() {
    throw new Error("This is a static class.");
}

/**
 * Hold which keys are pressed and which are not.
 * @example
 * KeyboardTrackerManager.map => {
 *  "a":true,
 *  "b":false,
 *  " ":false
 * }
 */
KeyboardTrackerManager.map = {};
/**
 * Hold which keys are currently being pressed.
 * @example
 * KeyboardTrackerManager.array => ["a", " ", "m"]
 */
KeyboardTrackerManager.array = [];

KeyboardTrackerManager.init = function () {
    document.onkeydown = function (ev) { KeyboardTrackerManager.onkeydown(ev); };
    document.onkeyup = function (ev) { KeyboardTrackerManager.onkeyup(ev); };
};

/**
 * @param {KeyboardEvent} ev 
 */
KeyboardTrackerManager.onkeydown = function (ev) {
    // remember this in map
    ev = ev || event; // to deal with IE
    KeyboardTrackerManager.map[ev.key] = true;

    // remember this in array
    if (KeyboardTrackerManager.array.indexOf(ev.key) == -1) KeyboardTrackerManager.array.push(ev.key);
};

/**
 * @param {KeyboardEvent} ev 
 */
KeyboardTrackerManager.onkeyup = function (ev) {
    // remember this in map
    ev = ev || event; // to deal with IE
    KeyboardTrackerManager.map[ev.key] = false;

    // remember this in array
    if (KeyboardTrackerManager.array.indexOf(ev.key) > -1) {
        KeyboardTrackerManager.array.splice(KeyboardTrackerManager.array.indexOf(ev.key), 1);
    }
};