const   express = require("express"),
        router  = express.Router({mergeParams:true}),
        Image = require("../models/image.model"),
        crypto  = require('crypto'),
        path    = require('path'),
        multer  = require("multer");     

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
                
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const storage = multer.diskStorage({    
    destination: './upload/',
    filename: function (req, file, cb) {
      if(req.body.filename){
        //cb(null, req.body.filename + '-' + Date.now() + path.extname(file.originalname))
        cb(null, req.body.filename + '-' + Date.now() + path.extname(file.originalname))
      }else{
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) return cb(err)
    
          cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
      }
    }
  })

upload = multer({storage});

//Create add a new upload
router.post("/", requireAuth, upload.single('file'), (req,res)=>{

    //fonctionne
    console.log('upload route', req.body, req.file, req.file.originalname);
    res.json({file: `upload/${req.body.filename}.jpg`});
    //end fonctionne

});

module.exports = router;
