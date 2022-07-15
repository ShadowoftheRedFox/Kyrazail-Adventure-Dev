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
 * @param {number} time
 * @returns {boolean}
 */
MouseTrackerManager.checkClick = function(x, y, w, h, time) {
    let clickedIn = true;
    MouseTrackerManager.data.click.forEach(c => {
        //check if click is new enough, under 100 ms
        if (Date.now() - c.date <= time) {
            if (c.x >= x && c.x <= x + w && c.y >= y && c.y <= y + h) {
                //the click is in but we won't count it
            } else {
                clickedIn = false;
            }
        }
    });
    return clickedIn;
};

/*
basically, this file will track the mouse and it's click
but
*pain* xD 

i need to set a box for each button, check if the mouse if over
if yes, highlight, if no, un highlight or stay still
if click on it -> action
IT'S PAIN TO DOO   :( lol  well do u know how to do  it? lol 
    (yh and for the game is there anything i can do
    or just that uhhhhhh )

kinda

look; i'll try with the current menu i'm doing

well
i'll try to put the basis of the mouse interaction, and we'll try to do it together, it shouldn't be too hard i think
okkk well idk how im supposted to help u with that but ok i try 

so up there, it's where all the event of the internet page are catched
cool ok

now, i need to bind this function to the main game
the thing is, how...
well uhh in what u made it? 
or u just only use codes?

wdym use just code?
ohh well i mean nvm xD
k? xD 


*/