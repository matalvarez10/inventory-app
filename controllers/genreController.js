const Videogame = require("../models/videogame");
const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");


exports.filter_by_genres = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: GET BY GENRE")
})
exports.get_all_genres = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: GET all genres")
})
exports.genre_create_get = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: GET create genres")
})
exports.genre_create_post = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: post create genres")
})

exports.genre_delete_get = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: genre delete get ")
})
exports.genre_delete_post = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: genre delete post ")
})
