var express = require("express");
var router = express.Router({mergeParams: true});
var Sight = require("../models/sight");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments routes
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find sight by ID
    Sight.findById(req.params.id, function(err, sight){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {sight: sight});
        }
    });
});

router.post("/", function(req, res){
    //lookup sight by ID
    Sight.findById(req.params.id, function(err, sight){
        if(err){
            console.log(err);
            res.redirect("/sights");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    sight.comments.push(comment);
                    sight.save();
                    req.flash("success", "Successfully created comment.");
                    res.redirect('/sights/' + sight._id);
                }
            });
            console.log(req.body.comment);
        }
    });
});

//Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.flash("error", "You don't have permission to do that.");
            res.redirect("back");
        } else {
            res.render("comments/edit", {sight_id: req.params.id, comment: foundComment});
        }
    });
});

//Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.flash("error", "You don't have permission to do that.");
            res.redirect("back");
        } else {
            res.redirect("/sights/" + req.params.id);
        }
    });
});

//Delete Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.flash("error", "You don't have permission to do that.");
            res.redirect("back");
        } else {
            res.redirect("/sight/" + req.params.id);
        }
    });
});

module.exports = router;