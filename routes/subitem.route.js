const   express = require("express"),
        router  = express.Router({mergeParams:true});
        Subitem = require("../models/subitem.model");

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
        
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//Index show all item
router.get("/", (req,res)=>{
    //get all item from db
    Subitem.find({}, (err, allSubitems)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allSubitems));
    })
});

//Create add a new item to data
router.post("/", requireAuth, (req,res)=>{
    //recuperer l'auteur dans la collection user
    const title = req.body.title;
    const text = req.body.text;
    const image = req.body.image;

    const newSubItem = {title,text,image};

    //create a new item and add it to the db
    Subitem.create(newSubItem, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new item added ', newlyCreated);
            res.send(JSON.stringify(newlyCreated));
        }
    })
});

// SHOW - shows more info about one particular subitem

router.get("/:id", function(req, res){
    //find the subitem with the provided ID
    Subitem.findById(req.params.id,(err, foundSubItem)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundSubItem);
            res.send(JSON.stringify(foundSubItem));        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", requireAuth, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Subitem.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSubitem)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedSubitem);
            res.send(JSON.stringify(updatedSubitem));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", requireAuth, function(req, res){
    Subitem.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send("deleted");
        }
    })
    
 });

module.exports = router;