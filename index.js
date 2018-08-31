const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        serverConfig    = require("./server/server.config"),
        serverConnect   = require("./server/server.connect"),
        routes          = require("./routes")

serverConfig.config(app);
serverConnect.connect();

app.use("/", routes.itemRoute);
app.use("/subitem", routes.subitemRoute);
app.use("/image", routes.imageRoute);
app.use("/user", routes.userRoute);