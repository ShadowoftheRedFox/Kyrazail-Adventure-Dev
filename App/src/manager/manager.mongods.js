/// <reference path="../../ts/type.d.ts"/>

function MongoDBManager() {
    throw new Error("This is a static class.");
}

MongoDBManager.init = function () {
    if (navigator.onLine) {
        
    } else {
        throw new RangeError("Game is offline. Can't connect to the MongoDB server.");
    }
};