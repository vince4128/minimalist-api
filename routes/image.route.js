const   express = require("express"),
        router  = express.Router({mergeParams:true});
        Image = require("../models/image.model");

//Index show all item
router.get("/",(req,res)=>{
    //get all item from db
    Image.find({}, (err, allImage)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allImage));
    })
});

module.exports = router;