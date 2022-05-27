// import { tokenGeneration } from "./utils.token.js";
/**
 * Used to save data.
 * @param {scope} scope
 * @param {string} path Where the file should be saved
 * @param {string} name the name of the file
 * @param {any} data the data that will be saved in the file, crypted
 * @param {boolean} auto wether or not this function was called by auto save or not
 * @param {number} timeCreated In ms. The time of the world creation.
 * @return {{ success: boolean, error: Error | null }} info if the action succeed, or not, and some other info
 */
function saveScope(scope, path, name, data, auto, timeCreated) {
    if (scope.constants.isNodejs === true) {
        //save in local save using Node.js
        const fs = require('fs');
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                fs.mkdir(path);
            }
        });

        const toE = {
            saveName: name,
            gameVersion: scope.cache.data.package.version,
            auto: auto,
            local: true,
            timeSave: Date.now(),
            timeCreated: timeCreated,
            config: scope.constants.config,
            data: data
        };

        const E = tokenGeneration(toE);

        fs.writeFile(path + name, E, e => {
            if (e) {
                //handle error
                return { success: false, error: e };
            } else {
                //everything went fine
                return { success: true, error: null };
            }
        });
    } else {
        //save in local files using filesystem: https://web.dev/file-system-access/
    }
}