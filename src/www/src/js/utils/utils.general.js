/**
 * Return current date in dd/mm/yyyy format.
 * @returns {string}
 * @example "19/05/2022"
 */
function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //januar = 0
    let yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

/**
 * Return the exact date in dd/mm/yyyy hh:mm:ss format
 * @returns {string} exact date
 * @example '05/17/2012 10:52:21'
 */
function getExactDate() {
    var date = new Date();

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' + [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

/**
 * Check wether or not to save log
 */
function checkIfNeedToLog() {
    if (window.log.length < 100) return;
    if (typeof require === "function" && typeof process === 'object') {
        const fs = require("fs");
        //if node js is present
        if (!window.sessionStart) {
            window.sessionStart = `KyraLog${getExactDate()}.log`;
        }

        fs.access("../../../KyraLog", fs.F_OK, (err) => {
            if (err) {
                //if no file with same window.sessionStart, create it
                fs.mkdir(path, { recursive: true }, (er) => {
                    if (er) throw er;
                    console.log('Directory created successfully!');
                });
                fs.writeFile(`../../../KyraLog/${window.sessionStart}`, window.log.join("\n"), 'utf8', (er) => {
                    if (er) throw er;
                });
            } else {
                //if file with same sessionStart exists, edit it
                console.log("Directory already exists");
                const content = require(`../../../KyraLog/${window.sessionStart}`);
                fs.writeFile(`../../../KyraLog/${window.sessionStart}`, content + "\n\n" + window.log.join("\n"), (er) => {
                    // throws an error, you could also catch it here
                    if (er) {
                        console.warn(`Could not edit`);
                        console.error(er);
                    } else {
                        console.log(`edited successfully.`);
                    }
                });
            }
        });
    } else {
        //if node js is not present, justt clear it
        console.warn("Cleared window.log since node js isn't present.");
        window.log = [];
    }
}

/**
 * Custom logs: exactly like log, except that it logs the args to get pushed into a log file
 */
const CustomConsole = {
    log: (any, ...args) => {
        console.log(any, args);
        const date = `[${getExactDate()}] logged: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    warn: (any, ...args) => {
        console.warn(any, args);
        const date = `[${getExactDate()}] warned: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    error: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] errored: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    assert: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] asserted: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    clear: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] cleared: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    context: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] contexted: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    count: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] counted: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    countReset: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] countReseted: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    debug: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] debuged: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    dir: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] dired: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    dirxml: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] dirxmled: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    group: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] grouped: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    groupCollapsed: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] groupCollapseded: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    groupEnd: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] groupEnded: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    info: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] infoed: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    profile: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] profileed: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    profileEnd: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] profileEnded: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    table: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] tableed: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    time: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] timeed: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    timeEnd: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] timeEnded: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    timeLog: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] timeLoged: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    timeStamp: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] timeStamped: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    },
    trace: (any, ...args) => {
        console.error(any, args);
        const date = `[${getExactDate()}] traceed: `;
        window.log.push(date);
        window.log.push(any, args);
        window.log.push("");
        checkIfNeedToLog();
    }
};