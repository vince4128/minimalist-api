const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        methodOverride  = require("method-override");
        serverConfig    = require("./server/server.config");

serverConfig.config(app);