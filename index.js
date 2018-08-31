const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        serverConfig    = require("./server/server.config"),
        serverConnect   = require("./server/server.connect");

serverConfig.config(app);
serverConnect.connect();