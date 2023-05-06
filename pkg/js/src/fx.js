// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { exec } = require("child_process");
const { stringify } = require("querystring");
const { BANNED_WORDS } = require("../../../ipkg/config/h.json");

function randomFromArr(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  const item = arr[randomIndex];

  return item;
}

const cmdexec = require("child_process").exec;

function exec_command(cmd, callback) {
  exec(cmd, function (error, stdout, stderr) {
    callback(stdout);
  });
}

function matchNumero(match) {
  const numeroLookup = {
    a: ["4"],
    e: ["3"],
    i: ["1"],
    o: ["0"],
    s: ["5", "z"],
    g: ["9"],
    t: ["7"],
  };

  return numeroLookup[match.toLowerCase()] || match;
}

function getNotOks(str) {
  str = str.toLowerCase();
  const matchedWords = new Set();
  const regexString = BANNED_WORDS.map((word) => {
    let numeronym = word.replace(/([a-z])/gi, matchNumero);
    const matches = numeronym.match(/[0-9]+/g);
    if (matches) {
      for (const match of matches) {
        const index = numeronym.indexOf(match);
        const char = String.fromCharCode(97 + parseInt(match, 10) - 1);
        numeronym =
          numeronym.substring(0, index) +
          char +
          numeronym.substring(index + match.length);
      }
    }
    matchedWords.add(word);
    matchedWords.add(numeronym);
    return `\\b(${word}|${numeronym})\\b`;
  }).join("|");

  const regex = new RegExp(regexString, "gi");
  const matches = str.match(regex);
  if (!matches) {
    return [];
  }
  const matchedSet = new Set(matches);
  const result = [...matchedSet].filter((word) => matchedWords.has(word));
  return result;
}

module.exports = { randomFromArr, getNotOks, matchNumero, exec_command };
