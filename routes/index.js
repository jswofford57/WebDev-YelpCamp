
var passport = require("passport");
var User = require("../models/user");
var express = require("express");
var router = express.Router();

//Root
router.get("/", function(req,res){
    res.render("landing");
});
//show register form
router.get("/register", function(req,res){
    res.render("register");
});
//Sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Account " + user.username + " Successfully Created");
            res.redirect("/campgrounds")
        });
    });
});
//show login form
router.get("/login", function(req, res){
    res.render("login");
});
//Login logic
// format: app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
{successRedirect: "/campgrounds",
 failureRedirect: "/login"
}), function(req, res){

});
//Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out")
    res.redirect("/campgrounds");
});

//MIDDLEWARE
//login check
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;