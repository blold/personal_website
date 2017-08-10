var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewares = require("../middleware");

//Index - show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
             res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    })
   
})

//Create - add new campground to DB
router.post("/", middlewares.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    console.log("Create campground user: " + req.user);
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    })
})

//NEW - show form to create new campground
router.get("/new", middlewares.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//Show - show more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provied ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit Campground Route
router.get("/:id/edit", middlewares.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update Campground Route
router.put("/:id", middlewares.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect show page
});

//Destory Campground route
router.delete("/:id", middlewares.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;