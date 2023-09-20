const express = require('express');
const mongoose = require('./config/mongoose');
const path = require('path');
const Listdo = require('./models/schema');
const tododata = require('./models/schema');
// data is inserted into database after creating as document and push into collection
const PORT = 9010;
const app = express();
app.use(express.static('../final_todo/public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.get('/',function(req,res){
res.send("i am in home page for redirecting to todo list page you can type /show after port number");
});

app.get('/delete-data',function(req,res){
    var id=req.query;
    var len = Object.keys(id).length;
    var deletePromises = [];
    for(let i=0;i<len;i++){
        deletePromises.push(tododata.findByIdAndDelete(Object.keys(id)[i]));
    }
    Promise.all(deletePromises)
    .then(() =>{
        console.log("task(s) deleted successfully");
        return res.redirect('back');
    })
    .catch((err) => {
        console.log("Error in deleting data",err);
        return res.redirect('back');
    })
});
app.get('/show',function(req,res){
    const todos = Listdo.find({}).exec();
    todos
    .then(data =>{
        console.log(data);
        res.render('todolist',{data:data});
    })
    .catch(err => {
        console.log("error while fetching data from db");
    });
});
app.post('/add-data',function(req,res){
const tdlist = new Promise((resolve,reject) => {
Listdo.create({
    description:req.body.description,
    category:req.body.category,
    duedate:req.body.duedate,
    duetime:req.body.duetime
})
.then(newData => {
    console.log("****newData**");
    resolve(newData);})
    .catch(err =>{
    console.log("Error in Adding data",err);
    reject(err);
});

});
tdlist
.then((newData) => {
    res.redirect('back');
})
.catch(err =>{
    console.log("Error",err);})
});
app.listen(PORT,function(err){
if(err){
console.log("Server is not running");
return;
}
console.log("Server is UP & Running on port:",PORT);
});