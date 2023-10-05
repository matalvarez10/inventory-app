const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SystemSchema = new Schema({
    title: {type:String, minLength:2,maxLength:50},
    description: {type:String, minLength:2,maxLength:200},
})

SystemSchema.virtual("url").get(function(){
    return `/system/${this._id}`;
})

module.exports = mongoose.model("System",SystemSchema);