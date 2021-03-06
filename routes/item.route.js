const   express = require("express"),
        router  = express.Router({mergeParams:true}),
        Item    = require("../models/item.model");    
//        
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
        
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//Index show all item
router.get("/", (req,res)=>{    
    //get all item from db
    Item.find({}).populate("author", "-password -created -__v").populate("category").populate("image").exec((err, allItems)=>{
        if(err) console.log(err);
        else res.send(allItems);
    });
    /*Item.find({}, (err, allItems)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allItems));
    })*/
});

//AUTH
router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);

//Create add a new item to data
router.post("/", requireAuth, (req,res)=>{
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    //recuperer l'auteur dans la collection user
    const title = req.body.title;
    const description = req.body.description;
    const shortDescription = req.body.shortDescription;
    const image = req.body.image;
    const author = req.body.author;
    const category = req.body.category;

    const newItem = {title,description,shortDescription,image,author,category};

    //create a new item and add it to the db
    Item.create(newItem, (err,newlyCreated)=>{
        if(err){
            console.log(err);                        
        }else{
            console.log('new item added ', newlyCreated);
            res.send(newlyCreated);
        }
    })
});

// SHOW - shows more info about one particular item
router.get("/:id", function(req, res){
    //find the item with the provided ID
    Item.findById(req.params.id).populate("author", "-password -created -__v").populate("subitem").populate("category").populate("image").exec(function(err, foundItem){
        if(err){
            console.log(err);
        } else {
            console.log(foundItem);
            res.send(foundItem);        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", requireAuth, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedItem);
            res.send(updatedItem);
        }
    });
});

//DELETE ROUTE
router.delete("/:id", requireAuth, function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send("deleted");
        }
    })
    
 });

module.exports = router;