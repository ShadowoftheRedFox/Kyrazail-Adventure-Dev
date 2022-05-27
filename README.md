<p align="center">
    <img src="./src/src/resources/Image/Intro/icon.png" alt="teamIcon" width="200" title="Team icon" />
</p>

This game is made by Shadow of the Red Fox\#5881 and the Kyrazail
Adventure Team. For any support, join us on Discord here:
[Server](https://discord.gg/5mF5AHnRCr).\
[Credits and thank to all of our
supporters!](./www/html/teamcredits.html) We used a base of RPG Maker,
credit [here](./www/html/credits.html).

------------------------------------------------------------------------

What is it about
================

This repository is the main sources of changes. All versions are made from this one, and the online version on itch.io is a replica of the **src** file.
You will be able to downlaod all file version from itch.io (links coming soon).


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
easy. Just erase [this folder](./) and the game is gone! We would be
very happy if you could send us the reason of the unistalation. You can
contact us [here](./README.html#contact-us).

Bug and Support
===============

Known bug and future updates themes can be found on our [Discord server](https://discord.gg/5mF5AHnRCr). You can report bug via Discord
or via the mail ****kyra.devs\@gmail.com****. Discord might be more
reactive and tell you if it\'s a known bug or not. If you need any help
in the game, press **P** to open the pause menu and select the **Help**
section. If you are stuck anyway, ask hint on Discord.

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
const defaultConfig = {
    //if the game will update at the next start
    willUpdate: false,
    //the fps the game will be running
    targetFps: 60,
    //quality of the game, add or removes details
    quality: 3,
    //adjusting color if needed
    filter: {
        red: 0,
        green: 0,
        blue: 0
    },
    //always run enabled or disabled
    alwaysRun: false,
    //language of the game
    lang: "en",
    //key input
    keyBoard: {
        //? See all KEY NAME here: https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/#a-full-list-of-key-event-values
        //! It is not recommended to put same keys at two different functionnality
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

### targetFps: 

The number of image per second. The bigger the number, the smoother the
game. Making it too high can create lag. This should stay at 60 except
if your computer doesn\'t support it.

### quality: 

Between 0 and 3, the bigger the better the quality will be. The quality
difference will be the amount of details in maps and in the sounds (some
ambient sounds like clock tikings can be removed).

### filter: 

A color filter to adjust colors if needed. Between 0 and 1. Each color
add a small layer that will edit the image.

### alwaysRun: 

Make your character run by default. **true** or **false**.

### keyBoard: 

This will modify your keyboard input depending of the category. To edit
key input, please use the in game editor, or be carreful with the key
name syntax. You can see all the key name on
[freecodecamp.org](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/).
