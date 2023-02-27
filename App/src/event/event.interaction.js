
function MouseTrackerManager() {
    throw new Error("This is a static class.");
}

// TODO detect when mouse isn't moving
// TODO detect click when mouse isn't moving

MouseTrackerManager.holding = false;
MouseTrackerManager.moving = false;
MouseTrackerManager.lastMove = {};
MouseTrackerManager.oldMove = {};

MouseTrackerManager.init = function () {
    // since events are different between mobile and computer, we need different handlers
    if (Utils.isMobileDevice() === true) {
        window.addEventListener("touchstart", MouseTrackerManager.OnTouchStart);
        window.addEventListener("touchmove", MouseTrackerManager.OnTouchMove);
        window.addEventListener("touchend", MouseTrackerManager.OnTouchEnd);
    } else {
        // init the cursor data
        MouseTrackerManager.lastMove = {
            0: {
                x: -100,
                y: -100,
                date: Date.now(),
                id: 0
            }
        };
        MouseTrackerManager.oldMove = {
            0: {
                x: -100,
                y: -100,
                date: Date.now(),
                id: 0
            }
        };
        window.addEventListener("mousedown", MouseTrackerManager.OnMouseClick);
        window.addEventListener("mousemove", MouseTrackerManager.OnMouseMove);
        window.addEventListener("mouseup", MouseTrackerManager.OnMouseUnclick);
    }
};

/**
 * @param {TouchEvent} event 
 */
MouseTrackerManager.OnTouchStart = function (event) {
    MouseTrackerManager.holding = true;
    for (let i = 0; i < event.changedTouches.length; i++) {
        MouseTrackerManager.lastMove[event.changedTouches.item(i).identifier.toString()] = {
            x: event.changedTouches.item(i).clientX,
            y: event.changedTouches.item(i).clientY,
            date: Date.now(),
            id: event.changedTouches.item(i).identifier
        };
    }
};

/**
 * @param {TouchEvent} event 
 */
MouseTrackerManager.OnTouchEnd = function (event) {
    for (let i = 0; i < event.changedTouches.length; i++) {
        delete MouseTrackerManager.lastMove[event.changedTouches.item(i).identifier.toString()];
    }
    if (Object.keys(MouseTrackerManager.lastMove).length === 0) MouseTrackerManager.holding = false;
};

/**
 * @param {TouchEvent} event 
 */
MouseTrackerManager.OnTouchMove = function (event) {
    MouseTrackerManager.moving = true;

    for (let i = 0; i < event.changedTouches.length; i++) {
        MouseTrackerManager.lastMove[event.changedTouches.item(i).identifier.toString()].x = event.changedTouches.item(i).clientX;
        MouseTrackerManager.lastMove[event.changedTouches.item(i).identifier.toString()].y = event.changedTouches.item(i).clientY;
        MouseTrackerManager.lastMove[event.changedTouches.item(i).identifier.toString()].date = Date.now();
        // there is no hover, so kinda useless, just stays here just in case
        MouseTrackerManager.stopedMoved(MouseTrackerManager.lastMove[event.changedTouches.item(i).identifier.toString()]);
    }
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseMove = function (event) {
    MouseTrackerManager.moving = true;
    MouseTrackerManager.lastMove["0"] = { x: event.clientX, y: event.clientY, date: 0, id: 0 };
    MouseTrackerManager.stopedMoved(MouseTrackerManager.lastMove["0"]);
};

MouseTrackerManager.stopedMoved = function (old) {
    // to "vanish" the cursor if it stopped moving at the next frame
    // so that you can freely use the keyboard even if the cursor is hover a button
    setTimeout(() => {
        MouseTrackerManager.oldMove[old.id] = { x: old.x, y: old.y, date: old.date, id: old.id };
    }, 1000 / (window.game.GameLoop ? window.game.GameLoop.fps : 16));
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseClick = function (event) {
    MouseTrackerManager.holding = true;
    MouseTrackerManager.lastMove["0"].date = Date.now();
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseUnclick = function (event) {
    MouseTrackerManager.holding = false;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {boolean} [mustMove] If cursor isnt moving, return false
 * @param {number} time How young in ms the click must be
 * @returns {boolean}
 */
MouseTrackerManager.clickOver = function (x, y, w, h, mustMove = false, time = 0) {
    let t = MouseTrackerManager.checkOver(x, y, w, h, mustMove, time);
    // console.log(t);
    return t && MouseTrackerManager.holding === true;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {boolean} [mustMove] If cursor isnt moving, return false
 * @param {number} [time] How young in ms the click must be
 * @returns {boolean}
 */
MouseTrackerManager.checkOver = function (x, y, w, h, mustMove = false, time = 0) {
    if (typeof mustMove != "boolean") throw new Error("Must move must be a boolean");
    if (Utils.isMobileDevice() === false) {
        //* If mustMove is true, that means that if oldMove===lasMove, return false
        const l = MouseTrackerManager.lastMove["0"] || { x: -100, y: -100, date: 0, id: 0 },
            o = MouseTrackerManager.oldMove["0"] || { x: -100, y: -100, date: 0, id: 0 };


        if (mustMove && l.x === o.x && l.y === o.y) {
            return false;
        }

        if (l.x >= x && l.x <= x + w && l.y >= y && l.y <= y + h) {
            if (time !== 0 && l.date + time < Date.now()) {
                return false;
            }
            return true;
        }
        return false;
    } else {
        let over = false;
        for (const e of Object.keys(MouseTrackerManager.lastMove)) {
            const l = MouseTrackerManager.lastMove[e],
                f = MouseTrackerManager.lastMove[e];
            if (mustMove && l.x === f.x && l.y === f.y) {
                over = false;
            }

            if (l.x >= x && l.x <= x + w && l.y >= y && l.y <= y + h) {
                over = true;
                if (time !== 0 && l.date + time < Date.now()) {
                    over = false;
                }
            }

            if (over === true) {
                return true;
            }
        }
        return false;
    }
};

MouseTrackerManager.getCoos = function () {
    return MouseTrackerManager.lastMove[MouseTrackerManager.lastMove.length - 1];
};

function KeyboardTrackerManager() {
    throw new Error("This is a static class.");
}

/**
 * Hold which keys are pressed and which are not.
 * @example
 * KeyboardTrackerManager.map => {
 *  "a": true,
 *  "b": false,
 *  " ": false
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
    window.addEventListener("keydown", KeyboardTrackerManager.onkeydown);
    window.addEventListener("keyup", KeyboardTrackerManager.onkeyup);
};

/**
 * @param {KeyboardEvent} ev 
 */
KeyboardTrackerManager.onkeydown = function (ev) {
    // remember this in map
    ev = ev || event; // to deal with IE
    let k = ev.key.toLowerCase();
    KeyboardTrackerManager.map[k] = true;

    // remember this in array
    if (KeyboardTrackerManager.array.indexOf(k) == -1) KeyboardTrackerManager.array.push(k);
};

/**
 * @param {KeyboardEvent} ev 
 */
KeyboardTrackerManager.onkeyup = function (ev) {
    // remember this in map
    ev = ev || event; // to deal with IE
    let k = ev.key.toLowerCase();
    KeyboardTrackerManager.map[k] = false;

    // remember this in array
    if (KeyboardTrackerManager.array.indexOf(k) > -1) {
        KeyboardTrackerManager.array.splice(KeyboardTrackerManager.array.indexOf(k), 1);
    }
};

KeyboardTrackerManager.pressed = function (...array) {
    const resultArray = [];
    let index = 0;
    for (const arr of array) {
        for (const a of arr) {
            if (KeyboardTrackerManager.array.includes(a) || !!KeyboardTrackerManager.map[a]) {
                resultArray.push(true);
                break;
            }
        }
        if (!resultArray[index]) {
            return false;
        }
        index++;
    }

    return true;
};