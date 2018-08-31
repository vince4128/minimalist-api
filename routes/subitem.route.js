const   express = require("express"),
        router  = express.Router({mergeParams:true});
        //Subitem = require("../models/subitem.model");

//Index show all item
router.get("/",(req,res)=>{
    //get all item from db
    Subitem.find({}, (err, allSubitem)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allSubitem));
    })
});

module.exports = router;