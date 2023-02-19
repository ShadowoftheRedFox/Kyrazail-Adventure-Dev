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
    if (!args) args = [];
    if (!data[EventName]) {
        console.warn(`Got an unknown event code: ${EventName}\nWith args: \n${args.join("\n")}`);
    }

    switch (EventName) {
        default:
            GameEventHandler.run(data[EventName]);
            break;
        case "Test":
            console.log(`Got a test event, with args: \n${args.join("\n")}`);
            break;
        case "NewGame":
            // TODO create a save file
            // TODO start reminder
            GameEventHandler.run(data[EventName]);
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
        } else if (this.scope.state.entities[interface]) {
            this.scope.state.entities[interface].activated = true;
            this.scope.state.entities[interface].needsUpdate = true;
        }
    })
    if (["text", "announcement", "dialogue", "keyboard"].includes(event.data.type)) {
        this.scope.state.menu.dialogue.currentEvent = event;
    } else if (event.data.type === "map") {
        this.scope.state.menu.map.changeMap(this.scope, event.data.map);
    } else if (event.data.type === "timeout") {
        setTimeout(() => {
            GameEventHandler.handle(event.callbackEvent);
        }, event.data.time * 1000);
    }
};