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

//Create add a new item to data
router.post("/", (req,res)=>{
    //recuperer l'auteur dans la collection user
    const title = req.body.title;
    const description = req.body.description;
    const shortDescription = req.body.shortDescription;
    const image = req.body.image;
    
    const newItem = {title,description,shortDescription,image};

    //create a new item and add it to the db
    Item.create(newItem, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new item added ', newlyCreated);
            res.send(JSON.stringify(newlyCreated));
        }
    })
});

// SHOW - shows more info about one particular item
router.get("/:id", function(req, res){
    //find the item with the provided ID
    Item.findById(req.params.id).populate("author").populate("subitem").exec(function(err, foundItem){
        if(err){
            console.log(err);
        } else {
            console.log(foundItem);
            res.send(JSON.stringify(foundItem));        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedItem);
            res.send(JSON.stringify(updatedItem));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", function(req, res){
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