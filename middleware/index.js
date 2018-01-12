var Sight = require("../models/sight");
var Comment = require("../models/comment");
var User = require("../models/user");

var middlewareObj = {};

middlewareObj.checkSightOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Sight.findById(req.params.id, function(err, foundSight){
           if(err){
               req.flash("error", "Sight not found.");
               res.redirect("back");
           } else {
                //does user own the Sight?
                if(foundSight.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("You don't have permission to do that.");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do this.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
                res.redirect("back");
           } else {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
           }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkUserOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                res.redirect("back");
           } else {
                //does user own the comment?
                if(req.params.id == req.user._id){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
           }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj;