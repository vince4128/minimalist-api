const mongoose        = require("mongoose");
const db = "mongodb://127.0.0.1/minimalistapi?connectTimeoutMS=5000";

module.exports = {

    connect : function(){

        mongoose.connect(db, { useNewUrlParser: true }).then(
            ()=>console.log('connected to database !'),
            err => console.log('an error has occured ', err.message)
        );

    }

}

