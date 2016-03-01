var mongoose     = require("mongoose"),
    Comment      = require("./models/comment"),
    Campground   = require("./models/campground");
    
var seedData = [
    {
        name: "Rocky Springs",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "Lorem ipsum dolor sit amet, non scelerisque consectetuer, ut ultrices in wisi elit ut, nunc duis ultricies velit vel. Neque facilisi cupidatat dui. Elit vitae sociis potenti ut pellentesque. Placerat eu ultricies, quis vitae consectetur. Ultricies vestibulum tincidunt eu, mi dis luctus praesent ut sit, consectetuer dolor feugiat eget a, nulla in pede varius cras nec. Est nec. Sit at volutpat. Erat vestibulum amet dictum erat, curabitur aenean quam sed nullam voluptas, elementum est rutrum elit. Lacus non nulla felis, congue vel nullam vulputate eleifend, phasellus tortor faucibus odio tincidunt, eu lectus ac pellentesque molestie, nisl metus nec justo."
    },
    {
        name: "Green Valley",
        image: "https://farm3.staticflickr.com/2888/9613885906_e271d89326.jpg",
        description: "Pellentesque odio ac donec. Enim pulvinar turpis ultricies condimentum metus enim, metus ut wisi, dolor dictum et dolor, tellus justo eget aliquam quis. Id quam. Aenean turpis fermentum accumsan, tristique elit mi eaque lectus suspendisse, cursus mauris, varius condimentum sollicitudin lorem pulvinar. Sit pellentesque. Risus auctor malesuada massa et urna, elit felis ut donec eleifend eu, lacus laborum nec sed diam, vehicula maecenas molestie imperdiet, scelerisque phasellus amet varius pellentesque turpis amet. Vestibulum sollicitudin vitae libero, sed vel et nulla, laoreet amet, sociis mattis. Lobortis praesent sed, sed mi."
    },
    {
        name: "Lakeside View",
        image: "https://farm5.staticflickr.com/4048/4661960920_a9bd6d972f.jpg",
        description: "Egestas tellus odio. Dictum in massa amet metus at, ut velit amet nostrum quisque eget urna, aptent quis arcu nunc non. Et dignissim, sed rutrum in dapibus metus scelerisque, commodo tristique pede vel, ut ipsum adipiscing est lacus, explicabo arcu est ante. Scelerisque erat arcu, mi eget in arcu, hymenaeos eget dictum, pharetra varius, urna nec scelerisque ipsum hendrerit. Aliquam maecenas malesuada velit, eros velit est a faucibus cubilia, aliquam massa. Et fugiat aenean condimentum pulvinar quis eu, wisi mauris, impedit tortor ipsum rhoncus pellentesque praesent, velit eu, pellentesque natoque vulputate felis. Assumenda nibh, urna aenean habitasse enim congue. Ultrices massa vestibulum. Turpis ultrices id vestibulum orci."
    }
];
    
    
function SeedDB (){
    //Remove all Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Campgrounds Removed!");
            
            //Insert new Campgrounds
            // seedData.forEach(function(seed){
            //     Campground.create(seed, function(err, newCamp){
            //         if(err){
            //             console.og(err);
            //         } else {
            //             console.log("New campground added");
                        
            //             //Insert new comments
            //             Comment.create({
            //                 text: "Beautiful, but no internet!!",
            //                 author: "Homer"
            //             }, function(err, comment){
            //                 if(err){
            //                     console.log(err);
            //                 } else {
            //                     console.log("New comment added");
            //                     newCamp.comments.push(comment);
            //                     newCamp.save();
            //                 }
            //             });
            //         }
            //     });
            // });
        }
    });
}

module.exports = SeedDB;