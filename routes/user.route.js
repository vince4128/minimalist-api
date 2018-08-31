const   express = require("express"),
        router  = express.Router({mergeParams:true});
        user = require("../models/user.model");

//Index show all item
router.get("/",(req,res)=>{
    //get all item from db
    user.find({}, (err, alluser)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(alluser));
    })
});

module.exports = router;