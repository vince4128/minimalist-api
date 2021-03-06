const   express = require("express"),
        router  = express.Router({mergeParams:true});
        User = require("../models/user.model");

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
                        
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });        

//Index show all item
router.get("/",(req,res)=>{

    //get all item from db
    User.find({}, (err, alluser)=>{
        if(err){
            console.log(err)
        }else{ res.send(
            alluser.map((user)=>{
                return {"_id":user._id,"email":user.email};
            })
        )};
    })
});

//Create add a new item to data
router.post("/", (req,res)=>{

    //recuperer l'auteur dans la collection user
    const email = req.body.email;
    const password = req.body.password;
    
    const newUser = {email,password};

    //create a new item and add it to the db
    User.create(newUser, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new item added ', newlyCreated);
            res.send(JSON.stringify(newlyCreated));
        }
    })
});

// SHOW - shows more info about one particular user

router.get("/:id", function(req, res){
    //find the user with the provided ID
    User.findById(req.params.id,(err, foundUser)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundUser);
            res.send(JSON.stringify(foundUser));        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedUser);
            res.send(JSON.stringify(updatedUser));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send("deleted");
        }
    })
    
 });

module.exports = router;