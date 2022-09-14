var mongoose=require("mongoose");
var Blog=require("./moduls/blog");
var Comment=require("./moduls/comments")

var data=[
    {
        name:"aniket",
        image:"https://pixabay.com/get/g1384b680f655a240bf7168f1d7a2f0e8918af294a083ea28f2a862596a2bcacd1f4dcdb108c5ce326d2df0b5594beb2c_340.jpg",
        description:"In MongoDB, find() method is used to select documents in a collection and return a cursor to the selected documents. Cursor means a pointer that points to a document, when we use find() method it returns a pointer on the selected documents and returns one by one. If we want to return pointer on all documents then use empty() parameter that returns all documents one by one. It takes only some optional parameters. The first optional parameter is the selection criteria on which we want to return a cursor. To return all documents in a collection use empty document({}). Using this method you can also replace embedded documents. You can also use this method in multi-document transactions. If you use this method in the mongo shell, then the shell will automatically iterate the cursor to display up to 20 documents in the collection, if you want to continue then type it or you can manually iterate the result of the find() method by assigning the returned cursor to a variable with the var keyword. You can also modify the behavior of this method using cursor methods."
    },
    {
        name:"aniket",
        image:"https://pixabay.com/get/g1384b680f655a240bf7168f1d7a2f0e8918af294a083ea28f2a862596a2bcacd1f4dcdb108c5ce326d2df0b5594beb2c_340.jpg",
        description:"In MongoDB, find() method is used to select documents in a collection and return a cursor to the selected documents. Cursor means a pointer that points to a document, when we use find() method it returns a pointer on the selected documents and returns one by one. If we want to return pointer on all documents then use empty() parameter that returns all documents one by one. It takes only some optional parameters. The first optional parameter is the selection criteria on which we want to return a cursor. To return all documents in a collection use empty document({}). Using this method you can also replace embedded documents. You can also use this method in multi-document transactions. If you use this method in the mongo shell, then the shell will automatically iterate the cursor to display up to 20 documents in the collection, if you want to continue then type it or you can manually iterate the result of the find() method by assigning the returned cursor to a variable with the var keyword. You can also modify the behavior of this method using cursor methods."
    },
    {
        name:"aniket",
        image:"https://pixabay.com/get/g1384b680f655a240bf7168f1d7a2f0e8918af294a083ea28f2a862596a2bcacd1f4dcdb108c5ce326d2df0b5594beb2c_340.jpg",
        description:"In MongoDB, find() method is used to select documents in a collection and return a cursor to the selected documents. Cursor means a pointer that points to a document, when we use find() method it returns a pointer on the selected documents and returns one by one. If we want to return pointer on all documents then use empty() parameter that returns all documents one by one. It takes only some optional parameters. The first optional parameter is the selection criteria on which we want to return a cursor. To return all documents in a collection use empty document({}). Using this method you can also replace embedded documents. You can also use this method in multi-document transactions. If you use this method in the mongo shell, then the shell will automatically iterate the cursor to display up to 20 documents in the collection, if you want to continue then type it or you can manually iterate the result of the find() method by assigning the returned cursor to a variable with the var keyword. You can also modify the behavior of this method using cursor methods."
    }
]
function seeddb() {
    Blog.remove({},(err)=>{
        if(err){
            console.log(err);
        }
        console.log("removed all blogs")
        data.forEach(function(seed){
            Blog.create(seed,(err,blog)=>{
                if(err){
                    console.log(err);
                }
                console.log("blog added");
                Comment.create({
                    text:"In MongoDB, find() method is used to select documents in a collection and return a cursor to the selected documents. Cursor means a pointer that points to a document, when we use find() method it returns a pointer on the selected documents and returns one by one. If we want to return pointer on all documents then use empty() parameter that returns all documents one by one. It takes only some optional parameters. The first optional parameter is the selection criteria on which we want to return a cursor. To return all documents in a collection use empty document({}). Using this method you can also replace embedded documents. You can also use this method in multi-document transactions. If you use this method in the mongo shell, then the shell will automatically iterate the cursor to display up to 20 documents in the collection, if you want to continue then type it or you can manually iterate the result of the find() method by assigning the returned cursor to a variable with the var keyword. You can also modify the behavior of this method using cursor methods.",
                    author:"aniket"
                },(err,comment)=>{
                    if(err){
                        console.log(err);
                    }else{
                        blog.comments.push(comment);
                        blog.save();
                        console.log("comments added");
                    }
                })
            })
        })
    })
}

module.exports=seeddb;