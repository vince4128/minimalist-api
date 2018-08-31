const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        serverConfig    = require("./server/server.config");

serverConfig.config(app);