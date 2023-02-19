# Documentation

If you are here, your are ether interested in the code, or wondering what the *cursed* is going on. To be honest, I don not think I am managing my project files well, but anyway, I am finding myself in that. So here is the help you wanted.

Before anything, I am not a professional developer, and this is a project I try to bring to life. I will gladly take advice.

## Index:

- [Files and Folders names](#files-and-folders-names): What is the logic behind the name of those.
- [Scripts](#scripts): A vast description on how I name variables, how I make the game work etc...
- [FAQ](#faq): Some answers of questions I already got.

## Files and Folders names:

#### Folder names:

I named them after what they contains, or their purpose. For example [App](./App/) contains the application files, [build](./build/) is where the builded application goes, and [interface](./App/src/interface/) is where all user interface scripts are stored.


### Files names:

The same logic kind of fit for files names, they are named after what they do. The pattern in the [application folder](./App/) is `[containing folder].[name]`, like [src.game](./App/src/src.game.js), who is the startup of the game. It's in the src folder, so the `[containing folder]` is `src` and the `[name]` is `game`.

### Others:

The game will save data into the [save folder](./App/save/) under the extension `kyraadv` and under cryption.

All game resources such as fonts, images, sounds etc... is stocked in the [resources folder](./App/resources/) and under sub folder named after their purpose.

The [test folder](./App/test/) is purely for test. Maybe I will save example, maybe not. Except various change and maybe not a lot of senses here. Bigger tests will have a documented folder.

The [ts folder](./App/ts/) is here to keep track of the type. As you can see, I am writting the project in JavaScript, because I do not really know how to do it in TypeScript. I will try to get a better pattern for those files.

## Scripts:

I try to comment my code as much as possible? It is still not a habit of mine, so some part may not be explicit enough. I also try to keep the variables names as close as what they are supposed to be. Global variables (in my understanding: those that you can call by typing them directly in the console) will start by the prefix `Game`. For example: `GameAudiosToLoad` or `GameImagesToLoad`.

## FAQ:

- **Why two package.json and favicon?**
Because it's how NW works. The main ones in the main folder are for github page icon, as well as the project package. The ones in the App folder are useful for NW, when building the project. The icon will be the window icon, and the package will be the data required by NW.
- **Why is there mess everywhere, sometimes duplicates?**
I work alone, and I started this project nearly at the same time I started coding, so it's old and I did a mess. I try to keep it clean now, and I check everything from time to time. Feel free to create an issue if you inf a proflem though.
- **Why TS files if I'm doing it in JS?**
That's... a good quesion. I don't want to transform everything in TS, so I just keeps the type to make my life easier between files. 