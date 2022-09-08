/* Event reminders
type:
    1: something to display in the dialog interface
*/

const TestEvents = {
    StartNewGame: {
        type: 1,
        list: [{
            text: "You are a new soul that just felt from the soul tree. ",
            name: "Unknown Goddess",
            font: ["Unreadable", "Azure"],
            image: null,
            side: 0,
            next: false,
            skipable: true,
            textSpeed: 5,
            stop: false,
            fullscreen: false,
            announcement: false
        }, {
            text: "You will get a new existence in this world. ",
            name: "Unknown Goddess",
            font: ["Unreadable", "Azure"],
            image: null,
            side: 0,
            next: false,
            skipable: true,
            textSpeed: 5,
            stop: true,
            fullscreen: false,
            announcement: false
        }, {
            text: "\n \nChoose your name carefully, young one.",
            name: "Unknown Goddess",
            font: ["Unreadable", "Azure"],
            image: null,
            side: 0,
            next: true,
            skipable: true,
            textSpeed: 5,
            stop: true,
            fullscreen: false,
            announcement: false
        }],
        end: () => { GameEvent.emit("MainCharacterName"); },
        stop: ["main"],
        start: ["dialogue"]
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
            scope.state.menu.dialogue.textList = event.list;
            scope.state.menu.dialogue.callback = event.end;
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