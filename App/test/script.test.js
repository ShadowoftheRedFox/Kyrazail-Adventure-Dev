const string = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ",",
    ";",
    ":",
    "!",
    "?",
    ".",
    "/",
    "§",
    "ù",
    "%",
    "$",
    "£",
    "*",
    "+",
    "-",
    "(",
    ")",
    "=",
    "{",
    "}",
    "[",
    "]",
    "@",
    "&",
    "<",
    ">",
    "'"
];

let pass = "";
for (let tries = 0; tries < 5; tries++) {
    for (let c = 0; c < 200; c++) {
        let char = string[Math.floor(string.length * Math.random())];
        if (Math.random() < 0.5) char = char.toUpperCase();
        pass += char;
    }
    console.log(pass.toString());
    console.log("\n");
    pass = "";
}
