const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideogameSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  developer: { type: String, required: true, minLength: 1, maxLength: 100 },
  publisher: { type: String, required: true, minLength: 1, maxLength: 100 },
  description: { type: String, required: true, minLength: 1, maxLength: 400 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  system: [{ type: Schema.Types.ObjectId, ref: "System" }],
  imgUrl:{type:String},
});

VideogameSchema.virtual("url").get(function(){
    return `/games/${this._id}`
})

module.exports = mongoose.model("Videogame",VideogameSchema);