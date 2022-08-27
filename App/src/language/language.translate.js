/// <reference path="../../ts/type.d.ts"/>
/**
 * Translate a code message and return the translated message.
 * @param {string} messageCode The code message to translate.
 * @param  {...any} [args] The arguments if needed.
 * @returns {string} The translated message.
 * @example GameTranslate("ExamplePlayerNameCheck", "Kyra")
 * // if the game is in language "en":
 * => "Your name is Kyra, is that correct?"
 */
function GameTranslate(messageCode, ...args) {
    if (!messageCode) throw new ReferenceError("messagecode is not defined.");

    switch (ConfigConst.LANGUAGE.toLocaleLowerCase()) {
        case "fr":
            return GameTranslate.toFR(messageCode, args);
        default:
            return GameTranslate.toEN(messageCode, args);
    }
}

GameTranslate.toEN = function (m, a) {
    switch (m) {
        case "WindowManagerFatalError": return "Fatal Error";
        case "WindowManagerLongLog": return "Long crash log found. Check console for a full report.";
        case "EventBeforeUnload": return "Are you sure you want to leave this page? Progression might not be saved.";
        //? example of how to use args
        case "ExamplePlayerNameCheck": return `So your name is ${a[0]} ${a[1]}, is that correct?`;
        default: return "Unknown message code";
    }
};

GameTranslate.toFR = function (m, a) {
    switch (m) {
        case "WindowManagerFatalError": return "Erreur Fatale";
        case "WindowManagerLongLog": return "Log de crash long trouvé. Regardez la console pour un rapport complet.";
        case "EventBeforeUnload": return "Êtes vous sur de vouloir quitter la page? La progression n'est peut être pas sauvegardé.";
        //? exemple de comment utiliser les arguments
        case "ExamplePlayerNameCheck": return `Donc votre nom est ${a[0]} ${a[1]}, cela est il correct?`;
        default: return "Code de message inconnu";
    }
};