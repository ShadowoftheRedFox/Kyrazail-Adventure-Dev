export enum GAME_EVENT {
    GameEvent_DialogueText,
    GameEvent_DialogueFullscreen,
    GameEvent_DialogueKeyboard,
    GameEvent_DialogueAnnouncement,

    GameEvent_LoadgingScreenStart,
    GameEvent_LoadgingScreenEnd,

    GameEvent_NewGame,

    GameEvent_UnknownEvent
};

export enum GAME_ORIENTATION {
    Orientation_South,
    Orientation_West,
    Orientation_East,
    Orientation_North
}

export enum Z_INDEX {
    UNKNOWN,
    MAP,
    MAPANIMATED,
    ENTITIES,
    MAPOVER,
    MAPEFFECT,
    FIGHT,
    PLAYERQUIPEMENT,
    DIALOGUE,
    PAUSE,
    MAIN,
    MAINSUBMENU,
    INTRODUCTION,
    TRANSITION,
    LOADING,
    ERROR
}