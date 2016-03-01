var Comment    = require("../models/comment"),
    Campground = require("../models/campground");
    
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in!");
    res.redirect("/login");
};

middlewareObj.isAuthorOfCampground = function (req, res, next){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found!");
            res.redirect("back");
        } else {
            if (foundCampground.author._id.equals(req.user._id)){
                return next();
            }
            req.flash("error", "This campground doesn't belong to you!");
            res.redirect("back");
        }
    });
};

middlewareObj.isAuthorOfComment = function (req, res, next){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Comment not found!");
            res.redirect("back");
        } else {
            if (foundComment.author._id.equals(req.user._id)){
                return next();
            }
            req.flash("error", "This comment doesn't belong to you!");
            res.redirect("back");
        }
    });
};

module.exports = middlewareObj;