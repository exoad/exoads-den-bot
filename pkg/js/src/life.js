// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const http = require('http');

http.createServer(function (r, res) {
  res.write("HTTP ready");
  res.end();
}).listen("Listening for a http request.");