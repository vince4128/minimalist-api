const   express = require("express"),
        router  = express.Router({mergeParams:true});
        Item    = require("../models/item.model");

//Index show all item
router.get("/",(req,res)=>{
    //get all item from db
    Item.find({}, (err, allItems)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allItems));
    })
});

module.exports = router;