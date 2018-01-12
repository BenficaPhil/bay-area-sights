var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    Sight           = require("./models/sight"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    sightsRoutes        = require("./routes/sights"),
    indexRoutes         = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "The president says GYNA!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/sights", sightsRoutes);
app.use("/sights/:id/comments", commentRoutes);

// Start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening.");
});