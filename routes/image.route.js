const   express = require("express"),
        router  = express.Router({mergeParams:true}),
        Image = require("../models/image.model"),
        fs      = require("fs"),
        multer  = require("multer"),
        upload = multer({dest: "public/"});

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
                
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//Index show all item
router.get("/",(req,res)=>{
    //get all item from db
    Image.find({}, (err, allImage)=>{
        if(err) console.log(err);
        else res.send(JSON.stringify(allImage));
    })
});

const cpUpload = upload.single([{name:'imageToUpload'}]);

//Create add a new image
router.post("/", requireAuth, cpUpload,  (req,res)=>{

    //uploader un fichier, recuperer le nom
    const title = req.body.title;
    
    const newImg = {title};

    //create a new item and add it to the db
    Image.create(newImg, (err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            console.log('new item added ', newlyCreated);
            res.send(JSON.stringify(newlyCreated));
        }
    })
});

// SHOW - shows more info about one particular image

router.get("/:id", function(req, res){
    //find the image with the provided ID
    Image.findById(req.params.id,(err, foundImage)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundImage);
            res.send(JSON.stringify(foundImage));        
        }
    });
});

//UPDATE ROUTE
router.put("/:id", requireAuth, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Image.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedImage)=>{
        if(err){
            console.log(err);
        } else {
            console.log(updatedImage);
            res.send(JSON.stringify(updatedImage));
        }
    });
});

//DELETE ROUTE
router.delete("/:id", requireAuth, function(req, res){

    //find the image with the provided ID
    Image.findById(req.params.id,(err, foundImage)=>{
        if(err){
            console.log(err);
        } else {
            console.log(foundImage);
            const path = `./upload/${foundImage.title}`;
            fs.unlinkSync(path);
        }
    });

    Image.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("deleted");
            res.send("deleted");                        
        }
    })
    
 });

module.exports = router;