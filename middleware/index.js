//all middlewares goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }else{
                //foundCampground.author.id is a object
                console.log(foundCampground.author.id);
                //req.user._id is a String
                console.log(req.user._id);
                if(foundCampground.author.id.equals(req.user._id)){
                     next();
                }else{
                    req.flash("error", "You do not permisstion");
                    res.send("You do not permisstion");
                    res.redirect("back");
                }
               
            }
        });
    }else{
        console.log("You need to be logged in");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "comment not found");
                res.redirect("back");
            }else{
                //foundCampground.author.id is a object
                console.log(foundComment.author.id);
                //req.user._id is a String
                console.log(req.user._id);
                if(foundComment.author.id.equals(req.user._id)){
                     next();
                }else{
                    req.flash("error", "You do not have permission");
                    console.log("You do not permisstion");
                    res.redirect("back");
                }
               
            }
        });
    }else{
        req.flash("error", "You need to be logged in first");
        console.log("You need to be logged in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first!");
    res.redirect("/login");
}

module.exports = middlewareObj