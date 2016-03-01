var express    = require("express"),
    middleware = require("../middleware"),
    Comment    = require("../models/comment"),
    Campground = require("../models/campground");
    
var router = express.Router({mergeParams: true});
    

//--- NEW ---
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Couldn't find comment!");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//--- CREATE ---
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Couldn't find comment!");
            res.redirect("/campgrounds");
        } else {
            Comment.create({
                text: req.body.text,
                author: req.user }, function(err, comment){
                    if(err){
                        req.flash("error", "Couldn't create comment!");
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        req.flash("success", "Succesfully created comment!");
                        res.redirect("/campgrounds/"+campground._id);
                    }
            });
        }
    });
});

//--- EDIT ---
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.isAuthorOfComment, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Couldn't find comment!");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//--- UPDATE ---
router.put("/:comment_id", middleware.isLoggedIn, middleware.isAuthorOfComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.text}, function(err, foundComment){
       if(err){
           req.flash("error", "Couldn't find comment!");
           res.redirect("back");
       } else {
           req.flash("success", "Succesfully updated comment!");
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
});

//--- DESTROY ---
router.delete("/:comment_id", middleware.isLoggedIn, middleware.isAuthorOfComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Couldn't find comment!");
            res.redirect("/campgrouds/"+ req.params.id);
        } else {
            req.flash("success", "Succesfully removed comment!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

module.exports = router;