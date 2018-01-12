var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Sight       = require("../models/sight"),
    middleware  = require("../middleware");


//Landing Page
router.get("/", function(req, res){
    res.render("landing"); 
});

//===========
//AUTH ROUTES
//===========

//Show Register form
router.get("/register", function(req, res) {
    res.render("register"); 
});

//Sign Up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Bay Area Sights " + user.username + "!");
            res.redirect("/sights");
        });
    });
});

//Show Login form
router.get("/login", function(req, res) {
    res.render("login");
});

//Login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/sights",
        failureRedirect: "/login"
    }), function(req, res) {
});

//Logout Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/sights");
});

//===========
//USER ROUTES
//===========

//User Profile Route
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/");
        }
        Sight.find().where("author.id").equals(foundUser._id).exec(function(err, sights){
            if(err) {
                req.flash("error", "Something went wrong.");
                res.redirect("/");
            }
        res.render("users/show", {user: foundUser, sights: sights});
        });
    });
});

//User Profile Edit Route
router.get("/users/:id/edit", middleware.checkUserOwnership, function(req, res) {
    User.findById(req.params.id, function(err, foundUser){
        if(err) {
            req.flash("error", "You can't edit another user's profile.");
            res.redirect("back");
        } else {
            res.render("users/edit", {user: foundUser});
        }
    });
});

//User Profile Update Route
router.put("/users/:id", middleware.checkUserOwnership, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedProfile){
        if(err){
            req.flash("error", "You can't update another user's profile.");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully updated profile!");
            res.redirect("/users/" + req.params.id);
        }
    });
});

//User Profile Delete Route
router.delete("/users/:id", middleware.checkUserOwnership, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "You can't delete another user's profile.");
            res.redirect("back");
        } else {
            res.redirect("/sights");
        }
    });
});

module.exports = router;