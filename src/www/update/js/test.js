const fs = require("fs");
var path = require('path');
const ignoredFolderName = [".git", "test"];
const ignoredFileExtension = ["sh", "bat", "", "idx", ".gitignore"];

var walk = function(dir, done) {
    var results = [];
    var ignored = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results, ignored);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    let l = file.split("/");
                    if (ignoredFolderName.indexOf(l[l.length - 1]) > -1) {
                        ignored.push(file);
                        if (!--pending) done(null, results, ignored);
                    } else {
                        walk(file, function(err, res) {
                            results = results.concat(res);
                            if (!--pending) done(null, results, ignored);
                        });
                    }
                } else {
                    let l = file.split("/");
                    if (ignoredFileExtension.indexOf(l[l.length - 1]) > -1 || file.includes("test")) {
                        ignored.push(file);
                        if (!--pending) done(null, results, ignored);
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results, ignored);
                    }
                }
            });
        });
    });
};

walk("/home/shadowoftheredfox/Kyrazail-Adventure/", function(err, results, ignored) {
    if (err) throw err;
    let index = 0; //faster than using indexOf at each iteration
    results.forEach(r => {
        let toBeRemove = "/home/shadowoftheredfox/Kyrazail-Adventure/";
        r = r.replace(toBeRemove, '');
        results[index] = r;
        index++;
    });
    console.log(results);
    console.log(ignored);
});