function MouseTrackerManager() {
    throw new StaticClassError("MouseTrackerManager is a static class.");
}

MouseTrackerManager.data = {
    lastMove: {
        x: null,
        y: null
    },
    /**
     * @type {{x: number, y: number, date: number}[]}
     */
    click: []
};

MouseTrackerManager.init = function() {
    document.onmousedown = function(ev) { MouseTrackerManager.OnMouseClick(ev); };
    document.onmousemove = function(ev) { MouseTrackerManager.OnMouseMove(ev); };
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseMove = function(event) {
    MouseTrackerManager.data.lastMove = { x: event.clientX, y: event.clientY };
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseClick = function(event) {
    MouseTrackerManager.data.click.push({
        x: event.clientX,
        y: event.clientY,
        date: Date.now()
    });
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @returns {boolean}
 */
MouseTrackerManager.checkOver = function(x, y, w, h) {
    const o = MouseTrackerManager.data.lastMove;
    if (o.x >= x && o.x <= x + w && o.y >= y && o.y <= y + h) return true;
    else return false;
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number|100} time
 * @returns {boolean}
 */
MouseTrackerManager.checkClick = function(x, y, w, h, time) {
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