

const nodemailer  = require("nodemailer");
const express = require("express");
const multer = require("multer");
const bodyParser  = require("body-parser");
const fs= require("fs");
const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());



var to;
var subject ;
var body ;
var path ;

var Storage = multer.diskStorage({
    destination:function(req ,file ,callback){
        callback(null , './images');
    },
    filename:function (req, file  ,callback){
        callback(null , file.fieldname+"_"+Date.now()+"_"+file.originalname);

    }
});


var  upload  = multer ({
    storage:Storage,

}).single('images');

//middleware here 
app.use(express.static('public'));
// app.use(express.json());  this is here wrong things 


//routing monting 
app.get("/" , (req,res)=>{
    res.send("/index.html");
})


app.post("/sendemail", (req,res)=>{
    //execute middleware to upload image 
    upload(req,res ,function(err){
        if(err){
            console.log(err);
            return res.end("Something went wrong here ")
        }
        else{
            to = req.body.to
            subject = req.body.subject
            body = req.body.body
            path = req.file.path
            console.log(to )
            console.log(subject )
            console.log(path )
            console.log(body )


            var transpoter  =nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'lakhangupta53223@gmail.com',
                    pass: 'wggkkycxdwsrlxsd'
                }


            })

            var milOptions = {
                from :"lakhangupta53223@gmail.com",
                to:to,
                subject:subject,
                text:body,
                attachments:[
                    {
                        path:path
                    }
                ]


            }

            transpoter.sendMail(milOptions , function(err , info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email send " +info.response);

                    fs.unlink(path, function (err){
                        if(err){
                            console.log("error");
                            return res.end(err);
                        }
                        else{
                            console.log("Deleted ");
                            return res.redirect('/result.html');
                        }
                    })
                }
            })
          
        }
    })


})
//start server here 

app.listen(5000 , ()=>{
    console.log("App is started on Port 5000")
})