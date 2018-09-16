const   express         = require("express"),
        app             = express(),
        mongoose        = require("mongoose"),
        multer          = require("multer"),
        serverConfig    = require("./server/server.config"),
        serverConnect   = require("./server/server.connect"),
        routes          = require("./routes")

serverConfig.config(app);
serverConnect.connect();

app.use("/category", routes.categoryRoute);
app.use("/subitem", routes.subitemRoute);
app.use("/image", routes.imageRoute);
app.use("/user", routes.userRoute);
app.use("/upload", routes.uploadRoute);
app.use("/", routes.itemRoute);

//TODO error handler

//500
/*app.use((req,res, next) => {
        console.error(err.stack)
})


//404
app.use((req,res, next) => {
        res.status(404).send('We think you are lost !');
})*/
