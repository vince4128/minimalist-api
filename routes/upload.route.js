const   express = require("express"),
        router  = express.Router({mergeParams:true}),
        //Image = require("../models/image.model"),
        fs      = require("fs"),
        multer  = require("multer");     

//const Authentication = require('../controllers/authentication');
//const passportService = require('../services/passport');
//const passport = require('passport');
                
//const requireAuth = passport.authenticate('jwt', { session: false });
//const requireSignin = passport.authenticate('local', { session: false });

upload = multer({dest: "public/"});

//Create add a new upload
router.post("/", upload.single('imageToUpload'), (req,res)=>{
    console.log('upload route', req);
    res.json({"filename": req.file.name, "type": req.file.mimetype});
});

module.exports = router;
