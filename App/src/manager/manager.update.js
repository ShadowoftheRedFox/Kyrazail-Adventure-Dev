/// <reference path="../../ts/type.d.ts"/>
function UpdateManager() {
    throw new Error("UpdateManager is a static class.");
}

/**
 * Check the package.json in the git repo, and check version, if different, return true, if same, return false
 * @param {string} version Current version of the game that will be tested with the version online. 
 * @param {any} call callback function
 * @returns {Boolean}
 */
UpdateManager.checkVersion = function (version, call) {
    if (!call) throw new TypeError("Call is not defined");

    function reqListener(res) {
        res = JSON.parse(res);
        const gamePackage = JSON.parse(window.atob(res.content));
        if (gamePackage.version === version) {
            call({ same: true, version: gamePackage.version });
        } else {
            call({ same: false, version: gamePackage.version });
        }
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.github.com/repositories/462473385/contents/package.json", false); // false for synchronous request
    xmlHttp.send(null);
    xmlHttp.onload = reqListener(xmlHttp.responseText);
};

/**
 * We know there is a new version, save it if possible.
 * @param {string} version Version found
 */
UpdateManager.laterSave = function (version) {
    if (typeof require === "function" && typeof process === 'object') {
        const date = getDate();
        const fs = require("fs");
        const updateSaveFile = require("../../resources/data/Update.json");
        updateSaveFile.lastCheck = date;
        updateSaveFile.versionFound = version;
        updateSaveFile.updateFound = true;
        fs.writeFileSync(`../../resources/data/Update.json`, JSON.stringify(updateSaveFile), function (err) {
            if (err) throw err;
        });
    }
};