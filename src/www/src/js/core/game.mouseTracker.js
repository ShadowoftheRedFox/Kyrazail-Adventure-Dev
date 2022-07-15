/**
 * Track the mouse mouvement, position and click.  
 * @return {MouseEvent} Object with all the data.
 */
function tracker() {
    document.onmousedown = function(ev) {};
    document.onmousemove = function(ev) {};
}

function MouseTrackerManager() {
    throw new StaticClassError("MouseTrackerManager is a static class.");
}

MouseTrackerManager.data = {
    /**
     * @type {scope}
     */
    scope: window.game
};

MouseTrackerManager.init = function() {
    MouseTrackerManager.data.scope = window.game; //when initialised, get the true scope

    document.onmousedown = function(ev) { MouseTrackerManager.OnMouseClick(ev); };
    document.onmousemove = function(ev) { MouseTrackerManager.OnMouseMove(ev); };
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseMove = function(event) {
    const x = event.clientX;
    const y = event.clientY;
};

/**
 * @param {MouseEvent} event 
 */
MouseTrackerManager.OnMouseClick = function(event) {
    const x = event.clientX;
    const y = event.clientY;
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