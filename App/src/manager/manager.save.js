/// <reference path="../../ts/type.d.ts"/>

function GameSaveManager() {
    throw new Error("This is a static class.");
}

GameSaveManager.save = function (data) {
    console.log("Saving...");
};

GameSaveManager.load = function (name) { };