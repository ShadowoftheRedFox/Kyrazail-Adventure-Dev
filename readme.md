<p align="center">
    <img src="./App/resources/Image/Intro/icon.png" alt="teamIcon" width="200" title="Team icon" />
</p>

This game is made by Shadow of the Red Fox\#5881 and the Kyrazail
Adventure Team. 

For any support, join us on Discord [here](https://discord.gg/5mF5AHnRCr).

------------------------------------------------------------------------

What is it about
================

This repository is the main sources of changes. All versions are made from this one, and the online version on itch.io is a replica of the **App** folder.

You will be able to downlaod all file version from [itch.io](https://shadowoftheredfox.itch.io/kyrazail-adventure).


Update
======

If you have an internet connection, the game will check during the
loading the lastest version and your current version.

He will notice you and ask you if you want to update the game. And if
you accept, it will download the latest version and install it, and will
ask a restart of the application to apply the changes.

If a bug occurs, or the update is not effective, plase download a new
version online. (You can get the link of the game on our [Discord
server](https://discord.gg/5mF5AHnRCr)).

Uninstalling
============

We are sorry if you wan to uninstall our game. But happily, this is
easy. Just erase [this folder](./) and the game is gone! 

We would be
very happy if you could send us the reason of the uninstalation. You can
contact us [here](./README.html#contact-us).

Bug and Support
===============

Known bug and future updates announcements can be found on our [Discord server](https://discord.gg/5mF5AHnRCr). You can report bug via Discord
or via the mail ****kyra.devs\@gmail.com****. 

Discord might be more
reactive and tell you if it's a known bug or not. If you need any help
in the game, press **P** to open the pause menu and select the **Help**
section. If you are still stuck, ask for help on Discord.

Contact us
==========

You can contact us on ****kyra.devs\@gmail.com**** or on our [Discord server](https://discord.gg/5mF5AHnRCr).

------------------------------------------------------------------------

Customizing parameters
======================

**Please be aware that you can change the key bind in game, as well as
most of those parameters, so prevent editing this file directly!**

In *`Game -> www -> src`*, there is a file called
[config.js](./src/src/config.js). The default file looks like this:

```js
const GameConfig = {
    willUpdate: false,
    targetFps: 60,
    alwaysRun: false,
    keyBoard: {
        up: ["ArrowUp", "z"],
        down: ["ArrowDown", "s"],
        right: ["ArrowRight", "d"],
        left: ["ArrowLeft", "q"],
        run: ["Shift"],
        interaction: ["e", "Enter"],
        debug: ["k"],
        pause: ["p"],
        back: ["Backspace", "x"],
        confirm: ["Enter"],
        inventory: ["c", "a"]
    }
};
```

You can manually edit those data, even if it's better to changes them via the game.

**willUpdate** is a reminder that the game can update himself. Do not touch it. *Even if you do, it wouldn't change anything. ¯\\_(ツ)_/¯*

**targetFps** is the wanted frame per second to reach. You can make him lower or higher.
Lower than 30 may make the game look laggy.
Over 60 (or your screen refresh rate), the game can be hard to run or not work properly.

**alwaysRun** is to make your character run even if you don't press the run key. If it's enabled, the run key is now the walk key, and vice versa. `true` or `false` value only. Default is ``false``.

**keyBoard** is the list of keys that will do the action, for exemple, by default, the action **up**, in menu or when moving, will be **ArrowUp** or **Z**.
If you want to manually edit them, check the key sintax [here](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/#a-full-list-of-key-event-values). 

It is not recommended to put same keys at two different functionnality, or it could cause bugged interactions.
