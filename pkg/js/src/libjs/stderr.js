// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

module.exports = function (fn) {
  var buf = "";
  process.stderr.setEncoding("utf8");
  process.stderr.on("data", function (s) {
    buf += s;
  });
  process.stderr
    .on("end", function () {
      fn(buf);
    })
    .resume();
};
