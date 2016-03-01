var express    = require("express"),
    middleware = require("../middleware"),
    Campground = require("../models/campground");
    
var router = express.Router();

//--- INDEX ---
router.get("/", function(req, res){
    Campground.find({}, function(err, findResults){
        if(err){
            req.flash("error", "Campgrounds not found!");
            res.redirect("back");
        } else res.render("campgrounds/index", {campgrounds: findResults});
    });
});

//--- NEW ---
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//--- CREATE ---
router.post("/", middleware.isLoggedIn, function(req, res){
    var newCamp = req.body.campground;
    newCamp.author = req.user;
    Campground.create(newCamp, function(err, campground){
            if(err){
                req.flash("error", "Couldn't create campground!");
                res.redirect("back");
            } else {
                req.flash("success", "Succesfully created new campground!");
                res.redirect("/campgrounds");
            }
        });
});

//--- SHOW ---
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Couldn't find Campground!");
            res.redirect("back");
        } else res.render("campgrounds/show", {campground: foundCampground});
    });
});

//--- EDIT ---
router.get("/:id/edit", middleware.isLoggedIn, middleware.isAuthorOfCampground, function(req ,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Couldn't find Campground!");
            res.redirect("back");
        } else res.render("campgrounds/edit", {campground: campground});
    });
});

//--- UPDATE ---
router.put("/:id", middleware.isLoggedIn, middleware.isAuthorOfCampground, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, result){
        if(err){
            req.flash("error", "Couldn't find Campground!");
            res.redirect("back");
        }else {
            req.flash("success", "Succesfully updated campground!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//--- DESTROY ---
router.delete("/:id", middleware.isLoggedIn, middleware.isAuthorOfCampground, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Couldn't find Campground!");
            res.redirect("back");
        }else {
            req.flash("success", "Succesfully removed campground");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;