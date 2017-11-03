var mongoose  = require("mongoose"),
    bodyParser = require("body-parser"),
    express = require("express"),
    app =       express();


//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//MONGOOSE/MODEL CONF
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {
            type: Date, default: Date.now
        }
});
var Blog = mongoose.model("Blog", blogSchema);


//REDIRECT FROM MAIN TO BLOGS PAGE 
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//ROUTES 
// Blog.create({
//     title: "Test Blog",
//     image: "https://pbs.twimg.com/media/Bx5BI5iIQAE2f-J.jpg",
//     body: "Helloooooo"
// })


//IDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR");
        } else {
            res.render("index",{blogs: blogs});
        }
    });
}); 

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});


//CREATE ROUTE
app.post("/blogs", function(req, res){
    //CREATE BLOG 
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
        } else {
            //REDIRECT TO MAIN BLOGS
            res.redirect("/blogs");
        }
    });
});


//SERVER INFO
app.listen(3100, function(){
    console.log("Magic!");
});