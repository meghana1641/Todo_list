const mongoose = require('mongoose');
const todoschema = new mongoose.Schema({
description:{type:String}, 
category:{type:String },
duedate:{type:String},
duetime:{type:String}
});
const tododata = mongoose.model('tododata',todoschema)
module.exports = tododata;