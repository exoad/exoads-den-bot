// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

module.exports = function (fn) {
  var buffer = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", function (s) {
    buffer += s;
  });
  process.stdin
    .on("end", function () {
      fn(buffer);
    })
    .resume();
};
