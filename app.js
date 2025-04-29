const express = require("express");
const path= require("path");
const  fs= require("fs");
const port=5000;
const app= express();
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/data');

  
}

var userdata = new mongoose.Schema({
   yourname: String,
   youremail:String,
   yournumber:Number,
   youridea:String,

 });


 var User = mongoose.model('user', userdata);//here user is our document name which is automatic convert into plural form


//EXPRESS SPECIFIC STUFF 
 app.use('/public',express.static('public'));
 app.use(express.urlencoded());

 // PUG SPECIFIC STUFF  
 app.set('view engine','pug');//set the pug template engine 
 app.set('views',path.join(__dirname,'views'))//set the view directory 


 app.get('/',(req,res)=>{

     res.status(200).render("index.pug");
})

 app.get('/Resume',(req,res)=>{
     res.status(200).render("resume.pug");
 })


  app.get('/skills',(req,res)=>{
     res.status(200).render('skills.pug');
  })

  
  app.get('/project',(req,res)=>{
     res.status(200).render("project.pug");
  })

  app.get('/contact',(req,res)=>{  //this /name here same as our anchor tag href value 
     res.status(200).render("contact.pug");
  })


   app.post('/contact',(req,res)=>{
      var  Yourdata= new User(req.body);

      Yourdata.save().then(()=>{
          res.send(`<h1 style="text-align:center; margin-top:34vh; color:green">Your form has been submitted. I will dm or contact you </h1>`)
      }).catch(()=>{
          res.status(400).send(`<h1 style="color:red;text-align:center; margin-top:34vh;" >Something got wrong</h1>`)
      })

   })
app.listen( port,()=>{

    console.log(`server running at port ${port}`);
})