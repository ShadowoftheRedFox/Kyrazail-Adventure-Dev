
/**
 * Translate a code message and return the translated message.
 * @param {string} messageCode The code message to translate.
 * @param  {...any} [args] The arguments if needed.
 * @returns {string | null} The translated message.
 * @example GameTranslate("ExamplePlayerNameCheck", "Kyra")
 * // if the game is in language "en":
 * => "Your name is Kyra, is that correct?"
 */
function GameTranslate(messageCode, ...args) {
    if (!messageCode) return "UndefinedMessageCode";

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
        case "NewGameButton": return "New game";
        case "LoadButton": return "Load";
        case "SettingsButton": return "Settings";
        case "CreditsButton": return "Credits";
        case "QuitGameButton": return "Quit Game";
        case "BackButton": return "Back";
        case "RetryButton": return "Retry";
        case "LoadGameButton": return "Load game";
        case "GeneralButton": return "General";
        case "AudioButton": return "Audio";
        case "ControlButton": return "Control";
        case "LanguageButton": return "Language";
        case "SettingsGeneralTitle": return "Settings: General";
        case "AlwaysRunSetting": return "Always run:";
        case "FPSSetting": return "Game FPS:";
        case "DebugSetting": return "Debug mode:";
        case "SettingsAudioTitle": return "Settings: Audio";
        case "MusicVolumeSetting": return "Musics volume:";
        case "SoundVolumeSetting": return "Sounds volume:";
        case "SettingsControlTitle": return "";
        case "ControlUp": return "Up";
        case "ControlDown": return "Down";
        case "ControlRight": return "Right";
        case "ControlLeft": return "Left";
        case "ControlRun": return "Run";
        case "ControlPause": return "Pause";
        case "ControlInteraction": return "Interaction";
        case "ControlInventory": return "Inventory";
        case "GameAccount": return "Kyrazail Account";
        case "SocialOnlineGame": return "Online game";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        default: return m;
    }
};

GameTranslate.toFR = function (m, a) {
    switch (m) {
        case "WindowManagerFatalError": return "Erreur Fatale";
        case "WindowManagerLongLog": return "Log de crash long trouvé. Regardez la console pour un rapport complet.";
        case "EventBeforeUnload": return "Êtes vous sur de vouloir quitter la page? La progression n'est peut être pas sauvegardé.";
        //? example de comment utiliser les arguments
        case "ExamplePlayerNameCheck": return `Donc votre nom est ${a[0]} ${a[1]}, cela est il correct?`;
        case "NewGameButton": return "Nouvelle partie";
        case "LoadButton": return "Charger";
        case "SettingsButton": return "Paramètres";
        case "CreditsButton": return "Crédits";
        case "QuitGameButton": return "Quitter le jeu";
        case "BackButton": return "Retour";
        case "RetryButton": return "Réessayer";
        case "LoadGameButton": return "Charger une partie";
        case "GeneralButton": return "Général";
        case "AudioButton": return "Audio";
        case "ControlButton": return "Contrôle";
        case "LanguageButton": return "Langage";
        case "SettingsGeneralTitle": return "Paramètres: Général";
        case "AlwaysRunSetting": return "Toujours courir:";
        case "FPSSetting": return "FPS du jeu:";
        case "DebugSetting": return "Mode de débogage:";
        case "SettingsAudioTitle": return "Paramètres: Audio";
        case "MusicVolumeSetting": return "Volume des musiques:";
        case "SoundVolumeSetting": return "Volume des sons:";
        case "SettingsControlTitle": return "";
        case "ControlUp": return "Haut";
        case "ControlDown": return "Bas";
        case "ControlRight": return "Droite";
        case "ControlLeft": return "Gauche";
        case "ControlRun": return "Courir";
        case "ControlPause": return "Pause";
        case "ControlInteraction": return "Intéragir";
        case "ControlInventory": return "Inventaire";
        case "GameAccount": return "Compte Kyrazail";
        case "SocialOnlineGame": return "Jeu en ligne";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        case "": return "";
        default: return m;
    }
};