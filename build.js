console.log("running");

const { nwbuild } = require("nw-builder");

nwbuild({
    files: "*.*", // all files, all extensions
    platforms: ['win', 'linux'],
    zip: false,
    forceDownload: false,
    buildDir: "./build",
    mode: "build",
    macCredits: "App/credits.html",
    macIcns: "App/favicon.ico",
    winVersionString: {
        'CompanyName': 'Kyrazail Team',
        'FileDescription': 'Kyrazail adventure game.',
        'ProductName': 'Kyrazail Adventure',
        'LegalCopyright': 'ISC',
    },
    winIco: "App/favicon.ico"
}, (e) => {
    console.error(e);
});