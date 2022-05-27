//plugins
const audioFiles = [{
    name: "audio.playSound",
    path: "./src/js/audio/",
    status: true,
    description: "Play sound when needed."
}];

const buildFiles = [{
    name: "build.loadGame",
    path: "./src/js/build/",
    status: true,
    description: "Load images and sounds."
}, {
    name: "build.map.tile",
    path: "./src/js/build/",
    status: true,
    description: "Create maps for map data and easy reading."
}];

const coreFiles = [{
    name: "game.crashhandler",
    path: "./src/js/core/",
    status: true,
    description: "Manage crash and try to repair errors."
}, {
    name: "game.edit",
    path: "./src/js/core/",
    status: true,
    description: "Edit constants of the game, while running."
}, {
    name: "game.loop",
    path: "./src/js/core/",
    status: true,
    description: "Main module, loop the game at the wanted fps and running other modules."
}, {
    name: "game.mouseTracker",
    path: "./src/js/core/",
    status: true,
    description: "Track the position and events of the mouse."
}, {
    name: "game.render",
    path: "./src/js/core/",
    status: true,
    description: "Module that render menues."
}, {
    name: "game.render.map",
    path: "./src/js/core/",
    status: true,
    description: "Module that render maps and entities."
}, {
    name: "game.update",
    path: "./src/js/core/",
    status: true,
    description: "Module that check update and launch them."
}];

const entitiesFiles = [{
    name: "entity.player",
    path: "./src/js/entities/",
    status: true,
    description: "Player entity."
}];

const eventsFiles = [];

const functionFiles = [{
    name: "fct.bubble",
    path: "./src/js/functions/",
    status: true,
    description: "Create and animate bubbles at a specific position."
}, {
    name: "fct.frameRectangle",
    path: "./src/js/functions/",
    status: true,
    description: "Create a rectangle frame at the given coordinate."
}, {
    name: "fct.lightEffect",
    path: "./src/js/functions/",
    status: true,
    description: "Create and manage light effects on the canvas."
}, {
    name: "fct.roundedRectangle",
    path: "./src/js/functions/",
    status: true,
    description: "Create rectangles with rounded angles as we like and need."
}, {
    name: "fct.transition",
    path: "./src/js/functions/",
    status: true,
    description: "Manage transition between game states."
}, {
    name: "fct.underline",
    path: "./src/js/functions/",
    status: true,
    description: "Underline text with correct width, height and color."
}];

const globalFiles = [{
    name: "global.global",
    path: "./src/js/global/",
    status: true,
    description: "Create initiate game state."
}];

const interfaceFiles = [{
    name: "menu.debug",
    path: "./src/js/interfaces/",
    status: true,
    description: "Debug interface."
}, {
    name: "menu.gameOver",
    path: "./src/js/interfaces/",
    status: true,
    description: "GameOver interface."
}, {
    name: "menu.idle",
    path: "./src/js/interfaces/",
    status: true,
    description: "Idle interface."
}, {
    name: "menu.introduction",
    path: "./src/js/interfaces/",
    status: true,
    description: "Introduction interface."
}, {
    name: "menu.pause",
    path: "./src/js/interfaces/",
    status: true,
    description: "Pause interface."
}, {
    name: "menu.update",
    path: "./src/js/interfaces/",
    status: true,
    description: "Update interface."
}, {
    name: "menu.player",
    path: "./src/js/interfaces/",
    status: true,
    description: "Player tools and inventory interface."
}, {
    name: "menu.welcome",
    path: "./src/js/interfaces/",
    status: true,
    description: "Main interface."
}];

const langFiles = [{
    name: "lang.translate",
    path: "./src/js/lang/",
    status: true,
    description: "Return a string in the needed language."
}];

const mappingFiles = [{
    name: "map.render",
    path: "./src/js/mappings/",
    status: true,
    description: "Map manager, that will do all stuff related to the map."
}, {
    name: "map.map",
    path: "./src/js/mappings/",
    status: true,
    description: "Manage the display of the map, for each layer."
}];

const tsFiles = [];

const updatesFiles = [{
    name: "updates.updater",
    path: "./src/js/updates/",
    status: true,
    description: "Update the updater, or launch it to update the game."
}];

const utilsFiles = [{
    name: "utils.canvas",
    path: "./src/js/utils/",
    status: true,
    description: "Manage creating canvas, pixelratio or resizing canvas."
}, {
    name: "utils.crypt",
    path: "./src/js/utils/",
    status: true,
    description: "Encryption/decryption module. See license and credit in the file."
}, {
    name: "utils.dom",
    path: "./src/js/utils/",
    status: true,
    description: "Manage any action on the html dom."
}, {
    name: "utils.general",
    path: "./src/js/utils/",
    status: true,
    description: "General purpose function."
}, {
    name: "utils.save",
    path: "./src/js/utils/",
    status: true,
    description: "Manage the save/load of the game."
}, {
    name: "utils.token",
    path: "./src/js/utils/",
    status: true,
    description: "Encryption/decryption helper module."
}, {
    name: "utils.pathfinder",
    path: "./src/js/utils/",
    status: false, //TODO make to true when needed 
    description: "Find teh shortest path from start to end."
}];

const testFiles = [];

const scripts = coreFiles.concat(audioFiles, buildFiles, coreFiles, entitiesFiles, eventsFiles, functionFiles, globalFiles, interfaceFiles, langFiles, mappingFiles, updatesFiles, utilsFiles, testFiles);


//json data
const mapData = [{
    name: "begin",
    path: "./src/resources/data/map/",
    status: true,
    description: "First map",
    objPath: "map"
}];

const generalData = [{
        name: "Data",
        path: "./src/resources/data/",
        status: true,
        description: "Data needed for the game.",
        objPath: "data"
    },
    {
        name: "package",
        path: "./",
        status: true,
        description: "Game ID and infos for updates.",
        objPath: ""
    },
    {
        name: "Update",
        path: "./src/resources/data/",
        status: true,
        description: "Update information on last update check.",
        objPath: ""
    }
];

const testData = [];

const datas = mapData.concat(generalData, testData);