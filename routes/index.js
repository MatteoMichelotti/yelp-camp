var express  = require("express"),
    passport = require("passport"),
    User = require("../models/user");
    
var router = express.Router();

//===== ROOT ROUTES =====
router.get("/", function(req, res){
    res.render("landing");
});

//===== AUTH ROUTES =====
//--- Sign Up ---
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            return res.render("register", {errorMsg: err.message});
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    }); 
});

//--- Login ---
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        successFlash: true,
        failureRedirect: "/login",
        failureFlash: true
    }),
    function(req,res){
});

//--- Logout ---
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Succesfully logged out!");
    res.redirect("/campgrounds");
});


module.exports = router;