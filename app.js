const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');

require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
   // await mongoose.connect('mongodb://localhost/data');
   
   
   //for deploy connection using mongodb atlas 
   try{
   await mongoose.connect(process.env.MONGODB_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true
   });
    console.log('Connected to mongodb successfully ');
}
catch(err){
   console.log(err);
}

}


var userdata = new mongoose.Schema({
   yourname: String,
   youremail: String,
   yournumber: Number,
   youridea: String,
   
});


var User = mongoose.model('user', userdata);//here user is our document name which is automatic convert into plural form


//EXPRESS SPECIFIC STUFF 
app.use('/public', express.static('public'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF  
app.set('view engine', 'pug');//set the pug template engine 
app.set('views', path.join(__dirname, 'views'))//set the view directory 


app.get('/', (req, res) => {
   
   res.status(200).render("index.pug");
})



//use the dynamic route 
app.get('/:dynamicroute', (req, res) => {
   if (req.params.dynamicroute == 'Resume') {//here value same as anchor tag not any character lowercase or uppercase change in this 
      res.status(200).render('resume.pug');
   }
   else if (req.params.dynamicroute == 'project') {
      res.status(200).render('project.pug');
   }
   else if (req.params.dynamicroute == 'Skills') {
      res.status(200).render('skills.pug');
   }
   else if (req.params.dynamicroute == 'contact') {
      res.status(200).render('contact.pug');
   }
   
})


app.post('/contact', (req, res) => {
   var Yourdata = new User(req.body);
   
   Yourdata.save().then(() => {
      res.send(`<h1 style="text-align:center; margin-top:34vh; color:green">Your form has been submitted. I will dm or contact you </h1>`)
   }).catch(() => {
      res.status(400).send(`<h1 style="color:red;text-align:center; margin-top:34vh;" >Something got wrong</h1>`)
   })
   
})

const port = process.env.PORT;
app.listen(port, () => {
   
   console.log(`server running at port ${port}`);
})