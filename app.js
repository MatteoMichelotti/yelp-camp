var express               = require("express"),
    passport              = require("passport"),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    flash                 = require("connect-flash"),
    localStrategy         = require("passport-local"),
    methodOverride        = require("method-override");
    
var User = require("./models/user");
    
var indexRoutes      = require("./routes/index"),
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

var app = express();
    
app.set("view engine", "ejs");

mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//--- passport setup ---
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//---------------------

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.errorMsg = req.flash("error");
   res.locals.successMsg = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//===== LISTENER =====
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server started!"); 
});




