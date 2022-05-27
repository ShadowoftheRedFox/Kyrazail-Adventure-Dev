//https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
//api get manifest, check version 
//if version different, for every script edit, for every image, check if here and add it if not
const res = () => {
    var xmlHttp = new XMLHttpRequest();
    const url = "http://localhost:8000";
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    console.log("Checking updates");
    return xmlHttp.response;
};

/**
 * Will update the version of the game if needed
 * @param {import("../../../game").scope} scope 
 */
function updateReq(scope) {
    /**Create a full black background */
    const ctx = scope.context,
        wereIntro = scope.menu.intro;

    function bbg() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, scope.constants.width, scope.constants.height);
    }
    if (scope.constants.isNodejs === true && scope.update.checkUpdate === true) {
        ctx.clearRect(0, 0, scope.constants.width, scope.constants.height);
        bbg();
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = '16px Arial';
        ctx.fillText("Checking updates...", scope.constants.width / 2, scope.constants.height / 2);

        try {
            /**
             * @type {import("../../../game").updateManifest}
             */
            var r = JSON.parse(res());
            if (scope.debug.omnipotent === true) console.log(r);
            //check the version
            const gameVersion = parseInt(scope.settings.config.version.split(".").join(""));
            const cloudVersion = parseInt(r.result.version.split(".").join(""));
            if (cloudVersion > gameVersion) {
                console.log("Higher versionn found, trying update.");
                scope.updateData = r;
                ctx.clearRect(0, 0, scope.constants.width, scope.constants.height);
                bbg();
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.font = '16px Arial';
                ctx.fillText("New version found.", scope.constants.width / 2, scope.constants.height / 2);
                scope.menu.doUpdate = true;
            } else {
                scope.menu.intro = wereIntro;
            }
            scope.menu.update = false;
        } catch (e) {
            console.log("Checking updates failed");
            console.log(e);
            scope.menu.update = false;
            scope.menu.intro = wereIntro;
        }
    } else {
        scope.menu.intro = wereIntro;
        scope.menu.update = false;
    }
}

/**
 * This will create, delete and edit file to update the game.
 * @param {import("../../../game").scope} scope 
 * @param {any} callback Callback function fired when the process is finished. 
 */
function updateGame(scope, callback) {
    try {
        if (scope.constants.isNodejs === true && scope.updateData) {
            const fs = require("fs"),
                /**
                 * this is the APP folder from this file
                 */
                basePath = "../../../../../",
                files = scope.updateData.files;
            files.forEach(file => {
                var path = basePath + file.path + file.name;
            });
        }
        setTimeout(() => {
            callback({ error: false });
        }, 10 * 1000);
    } catch (e) {
        console.log(e);
        callback({ error: true });
    }
}

function githUpdateGame() {
    const request = require('request');

    const URL = 'https://raw.githubusercontent.com/myuser/myrepo/master/myfile.js';
    const TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

    var options = {
        url: URL,
        headers: {
            'Authorization': 'token ' + TOKEN
        }
    };

    function callback(error, response, body) {
        console.log(response.statusCode);
        console.error(error);
        console.log(body);
    }

    request(options, callback);
}