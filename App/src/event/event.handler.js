/* Event reminders
type:
    1: something to display in the dialog interface
*/

const TestEvents = {
    StartNewGame: {
        type: 1,
        list: [{
            id: 1,
            text: "You are a new soul that just felt from the soul tree.",
            image: null
        }, {
            id: 1,
            text: "What is your name, young one?",
            image: null
        }],
        end: () => { GameEvent.emit("MainCharacterName"); },
        stop: ["main"],
        start: ["dialog"]
    }
};

function GameEventHandler() {
    throw new Error("This is a static class.");
}

/**
 * @param {GameEvents} event 
 */
GameEventHandler.handle = function (event) {
    const scope = window.game,
        events = scope.cache.data.event;

    // stop all given interface
    if (event.stop.length > 0) event.stop.forEach(s => { scope.state.menu[s].activated = false; });
    // start all given interface
    if (event.start.length > 0) event.start.forEach(s => { scope.state.menu[s].activated = true; });

    switch (event.type) {
        case 1:
            scope.state.menu.dialog.textList = event.list;
            scope.state.menu.dialog.callback = event.end;
            break;
        default:
            WindowManager.fatal(new ReferenceError(`${key} is an inkown event key.`));
            break;
    }

};

GameEvent.on("StartNewGame", () => {
    const scope = window.game,
        events = scope.cache.data.event;

    //TODO save the game in an auto save if a game is currently being played

    //TODO launch a new game

    //TODO also create on start 2 auto save files

    GameEventHandler.handle(TestEvents.StartNewGame);
});