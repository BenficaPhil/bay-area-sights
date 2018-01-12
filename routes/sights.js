var express = require("express");
var router = express.Router();
var Sight = require("../models/sight");
var middleware = require("../middleware");
var dotenv = require("dotenv").config();
var geocoder = require("geocoder");
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
var upload = multer({storage: storage, fileFilter: imageFilter});

var cloudinary = require("cloudinary");
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//INDEX - Show all sights
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Sight.find({name: regex}, function(err, allSights){
            if(err){
                console.log(err);
            } else {
                if(allSights.length === 0){
                    noMatch = "No sights match that search. Please try again.";
                }
                res.render("sights/index", {sights:allSights, noMatch:noMatch});
            }
        });
    } else {
        // Get all sights from DB
        Sight.find({}, function(err, allSights){
            if(err){
                console.log(err);
            } else {
                res.render("sights/index", {sights:allSights, noMatch:noMatch});
            }
        });
    }
});

//CREATE - Add new sights to the DB
router.post("/", middleware.isLoggedIn, upload.single("image"), function(req, res){
    geocoder.geocode(req.body.location, function (err, data){
        //get data from Google Maps
        req.body.sight.lat = data.results[0].geometry.location.lat;
        req.body.sight.lng = data.results[0].geometry.location.lng;
        req.body.sight.location = data.results[0].formatted_address;
        cloudinary.uploader.upload(req.file.path, function(result) {
            // add cloudinary url for the image to the sight object under image property
            req.body.sight.image = result.secure_url;
            // add author to sight
            req.body.sight.author = {
                id: req.user._id,
                username: req.user.username
            };
            //Create new sight and save it to DB
            Sight.create(req.body.sight, function(err, newlyCreated){
                if(err){
                    req.flash("error", err.message);
                    return res.redirect("back");
                } else {
                    res.redirect("/sights");
                }
            });
        });
    });
});

//NEW - Show form to create new sight
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("sights/new");
});

//SHOW - Shows more info about one sight
router.get("/:id", function(req, res){
    //find the sight with provided ID
    Sight.findById(req.params.id).populate("comments").exec(function(err, foundSight){
        if(err){
            console.log(err);
        } else {
        //render show template with that sight
        res.render("sights/show", {sight: foundSight});
        }
    });
});

//EDIT - Show form to edit sight
router.get("/:id/edit", middleware.checkSightOwnership, function(req, res){
    Sight.findById(req.params.id, function(err, foundSight){
        res.render("sights/edit", {sight: foundSight});
    });
});

//UPDATE 
router.put("/:id", middleware.checkSightOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, city: req.body.city, description: req.body.description, location: location, lat: lat, lng: lng};
        //find and update the correct sight
        Sight.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, sight){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success","Successfully Updated!");
                res.redirect("/sights/" + sight._id);
            }
        });
    });
});

//DESTROY
router.delete("/:id", middleware.checkSightOwnership, function(req, res){
    Sight.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/sights");
        } else {
            res.redirect("/sights");
        }
    });
});

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;