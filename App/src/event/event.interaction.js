function MouseTrackerManager() {
    throw new Error("This is a static class.");
}
/**@type {MTM} */
const MTM = MouseTrackerManager;

// TODO detect when mouse isn't moving
// TODO detect click when mouse isn't moving

MTM.holding = false;
MTM.moving = false;
MTM.lastMove = {};
MTM.oldMove = {};

MTM.init = function () {
    // since events are different between mobile and computer, we need different handlers
    if (Utils.isMobileDevice() === true) {
        window.addEventListener("touchstart", MTM.OnTouchStart);
        window.addEventListener("touchmove", MTM.OnTouchMove);
        window.addEventListener("touchend", MTM.OnTouchEnd);
    } else {
        // init the cursor data
        MTM.lastMove = {
            0: {
                x: -100,
                y: -100,
                date: Date.now(),
                id: 0
            }
        };
        MTM.oldMove = {
            0: {
                x: -100,
                y: -100,
                date: Date.now(),
                id: 0
            }
        };
        window.addEventListener("mousedown", MTM.OnMouseClick);
        window.addEventListener("mousemove", MTM.OnMouseMove);
        window.addEventListener("mouseup", MTM.OnMouseUnclick);
    }
};

/**
 * @param {TouchEvent} event 
 */
MTM.OnTouchStart = function (event) {
    MTM.holding = true;
    for (let i = 0; i < event.changedTouches.length; i++) {
        MTM.lastMove[event.changedTouches.item(i).identifier.toString()] = {
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
MTM.OnTouchEnd = function (event) {
    for (let i = 0; i < event.changedTouches.length; i++) {
        delete MTM.lastMove[event.changedTouches.item(i).identifier.toString()];
    }
    if (Object.keys(MTM.lastMove).length === 0) MTM.holding = false;
};

/**
 * @param {TouchEvent} event 
 */
MTM.OnTouchMove = function (event) {
    MTM.moving = true;

    for (let i = 0; i < event.changedTouches.length; i++) {
        MTM.lastMove[event.changedTouches.item(i).identifier.toString()].x = event.changedTouches.item(i).clientX;
        MTM.lastMove[event.changedTouches.item(i).identifier.toString()].y = event.changedTouches.item(i).clientY;
        MTM.lastMove[event.changedTouches.item(i).identifier.toString()].date = Date.now();
        // there is no hover, so kinda useless, just stays here just in case
        MTM.stopedMoved(MTM.lastMove[event.changedTouches.item(i).identifier.toString()]);
    }
};

/**
 * @param {MouseEvent} event 
 */
MTM.OnMouseMove = function (event) {
    MTM.moving = true;
    MTM.lastMove["0"] = { x: event.clientX, y: event.clientY, date: 0, id: 0 };
    MTM.stopedMoved(MTM.lastMove["0"]);
};

MTM.stopedMoved = function (old) {
    // to "vanish" the cursor if it stopped moving at the next frame
    // so that you can freely use the keyboard even if the cursor is hover a button
    setTimeout(() => {
        MTM.oldMove[old.id] = { x: old.x, y: old.y, date: old.date, id: old.id };
    }, 1000 / (window.game.GameLoop ? window.game.GameLoop.fps : 16));
};

/**
 * @param {MouseEvent} event 
 */
MTM.OnMouseClick = function (event) {
    MTM.holding = true;
    MTM.lastMove["0"].date = Date.now();
};

/**
 * @param {MouseEvent} event 
 */
MTM.OnMouseUnclick = function (event) {
    MTM.holding = false;
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
MTM.clickOver = function (x, y, w, h, mustMove = false, time = 0) {
    let t = MTM.checkOver(x, y, w, h, mustMove, time);
    // console.log(t);
    return t && MTM.holding === true;
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
MTM.checkOver = function (x, y, w, h, mustMove = false, time = 0) {
    if (typeof mustMove != "boolean") throw new Error("Must move must be a boolean");
    if (Utils.isMobileDevice() === false) {
        //* If mustMove is true, that means that if oldMove===lasMove, return false
        const l = MTM.lastMove["0"] || { x: -100, y: -100, date: 0, id: 0 },
            o = MTM.oldMove["0"] || { x: -100, y: -100, date: 0, id: 0 };


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
        for (const e of Object.keys(MTM.lastMove)) {
            const l = MTM.lastMove[e],
                f = MTM.lastMove[e];
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

MTM.getCoos = function () {
    return MTM.lastMove[MTM.lastMove.length - 1];
};

function KeyboardTrackerManager() {
    throw new Error("This is a static class.");
}

/**@type {KTM} */
const KTM = KeyboardTrackerManager;

/**
 * Hold which keys are pressed and which are not.
 * @example
 * KTM.map => {
 *  "a": true,
 *  "b": false,
 *  " ": false
 * }
 */
KTM.map = {};
/**
 * Hold which keys are currently being pressed.
 * @example
 * KTM.array => ["a", " ", "m"]
 */
KTM.array = [];

KTM.init = function () {
    window.addEventListener("keydown", KTM.onkeydown);
    window.addEventListener("keyup", KTM.onkeyup);
};

/**
 * @param {KeyboardEvent} ev 
 */
KTM.onkeydown = function (ev) {
    // remember this in map
    ev = ev || event; // to deal with IE
    let k = ev.key.toLowerCase();
    KTM.map[k] = true;
    // console.log(k + " down");

    // remember this in array
    if (KTM.array.indexOf(k) == -1) KTM.array.push(k);
};

/**
 * @param {KeyboardEvent} ev 
 */
KTM.onkeyup = function (ev) {
    // set to false in map
    ev = ev || event; // to deal with IE
    let k = ev.key.toLowerCase();
    KTM.map[k] = false;
    // console.log(k + " up");

    // remove in array
    if (KTM.array.indexOf(k) > -1) {
        KTM.array.splice(KTM.array.indexOf(k), 1);
    }
};

/**
 * Give arrays of string, and check if there is at least one key that is pressed in one of each of them.
 * @param  {...string[]} array 
 * @returns {boolean} 
 */
KTM.pressed = function (...array) {
    const resultArray = [];
    let index = 0;
    for (const arr of array) {
        for (const a of arr) {
            if (KTM.array.includes(a) || !!KTM.map[a]) {
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