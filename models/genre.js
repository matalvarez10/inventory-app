const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    title: {type:String, minLength:2,maxLength:50},
    description: {type:String, minLength:2,maxLength:200},
})

GenreSchema.virtual("url").get(function(){
    return `/genres/${this._id}`
})
GenreSchema.virtual("detailUrl").get(function(){
    return `/genres/detail/${this._id}`
})

module.exports = mongoose.model("Genre",GenreSchema);