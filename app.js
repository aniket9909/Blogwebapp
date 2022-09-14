var express=require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Blog=require("./moduls/blog");
var Comment=require("./moduls/comments");
var seedDB=require("./seeds");
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
mongoose.connect("mongodb://localhost/blogapp_v5");

// Blog.create({
//     name:"aniket",
//     image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//     decription:"this is first decription"
// },(err,addblog)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(addblog);
//         // res.render("AllBlogs",{blog:addblog})
//     }
// })

// var blogs=[
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
//     {name:"aniket",image:"https://images.unsplash.com/photo-1439066290691-510066268af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VtbWVyJTIwY2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}

// ]
app.get("/",(req,res)=>{
    res.render("blogs/home")
})

app.get("/allblogs",(req,res)=>{
    Blog.find({},(err,addblog)=>{
        if (err) {
            console.log(err);
        } else {
            // console.log(addblog);
            res.render("blogs/AllBlogs",{blog:addblog})
        }
    })
})
app.post("/allblogs",(req,res)=>{
    var name=req.body.blogName;
    var image=req.body.image;
    var desc=req.body.description;

    var newblog={name:name,image:image,description:desc}
    Blog.create(newblog,(err,addblog)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(addblog);
            res.redirect("/allblogs");
        }
    })
})
app.get("/blog/new",(req,res)=>{
    res.render("blogs/newblog")
})

app.get("/blog/show/:id",(req,res)=>{
    var id =req.params.id;
    Blog.findById(id).populate("comments").exec((err,showone)=>{
        if (err) {
            console.log(err);
        } else {
            // console.log(showone);
            res.render("blogs/show",{blog:showone});
        }
    });
});

// add comment routes

app.get("/blogs/:id/comment/new",(req,res)=>{
    Blog.findById(req.params.id,(err,oneblog)=>{
        if (err) {
            console.log(err);
        } else {
            // console.log(oneblog);
            res.render("comment/new",{blog:oneblog});
        }
    })
})

app.post("/blogs/:id/comment",(req,res)=>{
    Blog.findById(req.params.id,(err,blog)=>{
        if (err) {
            console.log("something went wrong");
        } else {
            // console.log(blog.comments);
            Comment.create(req.body.comment,(err,comment)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log(comment);
                    blog.comments.push(comment);
                    blog.save()
                    res.redirect("/blog/show/"+blog._id)
                    console.log("comment added");
                }
            })
        }
    })
})
app.listen("3000",()=>{
    console.log("Blog App Server has been started !!");
})