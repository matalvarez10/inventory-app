const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    title: {type:String, minLength:1,maxLength:150},
    description: {type:String, minLength:1,maxLength:400},
})

GenreSchema.virtual("url").get(function(){
    return `/genres/${this._id}`
})
GenreSchema.virtual("detailUrl").get(function(){
    return `/genres/detail/${this._id}`
})

module.exports = mongoose.model("Genre",GenreSchema);