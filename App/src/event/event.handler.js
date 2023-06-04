function GameEventHandler() {
    throw new Error("This is a static class.");
}

/**@type {GameScope} */
GameEventHandler.scope = null;

GameEventHandler.init = function (scope) {
    GameEventHandler.scope = scope;
};

/**
 * 
 * @param {GameEventCodeName} EventName 
 * @param  {...any} args 
 */
GameEventHandler.handle = function (EventName, ...args) {
    const scope = GameEventHandler.scope;
    const data = scope.cache.data.event;
    const event = data[EventName];
    if (!args) args = [];
    if (!event) {
        console.warn(`Got an unknown event code: ${EventName}\nWith args: \n${args.join("\n")}`);
    }
    if (event.argumentsNb != args.length) {
        console.warn(`Got ${args.length} arguments, needed ${event.argumentsNb} for ${EventName}`);
    }

    switch (EventName) {
        case "Test":
            console.log(`Got a test event, with args: \n${args.join("\n")}`);
            break;
        case "NewGame":
            // TODO create a save file
            // TODO start reminder
            window.game.state.menu.map = new GameMapInterface(window.game);
            window.game.state.menu.mapUI = new GameMapUIInterface(window.game);
            GameEventHandler.run(event);
            GameGlobalObject.newGame();
            break;
        case "giveItem":
            if (!scope.global.inventory[args[0]]) { scope.global.inventory[args[0]] = 0; }
            scope.global.inventory[args[0]] += args[1];
            break;
        default:
            GameEventHandler.run(event);
            break;
    }
};

/**
 * 
 * @param {GameEvent} event 
 */
GameEventHandler.run = function (event) {
    // console.log(event);
    // stop the wanted interfaces
    event.stop.forEach(interface => {
        if (this.scope.state.menu[interface]) {
            this.scope.state.menu[interface].activated = false;
            this.scope.state.menu[interface].needsUpdate = false;
        }
    })
    // start the wanted interfaces
    event.start.forEach(interface => {
        if (this.scope.state.menu[interface]) {
            this.scope.state.menu[interface].activated = true;
            this.scope.state.menu[interface].needsUpdate = true;
        }
    })

    if (["text", "announcement", "dialogue", "keyboard"].includes(event.data.type)) {
        this.scope.state.menu.dialogue.currentEvent = event;
    } else if (event.data.type === "map") {
        this.scope.state.menu.map.changeMap(this.scope, event.data.map, event.data.spawn);
    } else if (event.data.type === "timeout") {
        setTimeout(() => {
            GameEventHandler.handle(event.callbackEvent);
        }, event.data.time * 1000);
    }
};