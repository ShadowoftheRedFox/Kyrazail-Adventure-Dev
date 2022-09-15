/// <reference path="../../ts/type.d.ts"/>

function GameGlobalObject() {
    throw new Error("This is a static class.");
}

/**
 * Instantiate the global object in the game datas.
 * @param {GameScope} scope 
 */
GameGlobalObject.newGame = function (scope) {
    //TODO save the game in an auto save if a game is currently being played

    // check if global object is empty, if not, save those data
    if (scope.global != {}) {
        //? do we need to wait the end of the save?
        GameSaveManager.save(scope.global);
    }
    // create the object

    //TODO also create on start 2 auto save files
};

/**
 * Export an object that contain all data needed to save the adventure.
 * @param {GameScope} scope 
 * @returns {GameGlobalObject}
 */
GameGlobalObject.export = function (scope) {
    return { test: "damn boi, it worked!" };
};

GameGlobalObject.loadGame = function (data) { };