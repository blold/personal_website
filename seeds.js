var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud",
        image: "https://farm4.staticflickr.com/3902/15172396171_570752776b.jpg",
        description: "Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "
    },
    {
        name: "campground 2",
        image: "http://www.photosforclass.com/download/35301859822.jpg",
        description: "Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "
    },
    {
        name: "campground 3",
        image: "https://farm5.staticflickr.com/4123/4943676109_b93d9c1203.jpg",
        description: "Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "
    }
]

function seeDB(){
    
    //Remove all campgrounds
        Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Remove all campgrounds");   
        }
        
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("add a campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "This place is awesome",
                            author: "mike"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    })
}

module.exports = seeDB;