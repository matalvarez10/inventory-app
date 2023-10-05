const Videogame = require("../models/videogame");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req,res,next)=>{
    //res.send("TODO IMPLEMENTED: GET INDEX")
    
    res.render("index.ejs",{title:"homepage"})
})

exports.all_videogames = asyncHandler(async(req,res,next)=>{
    gamesList = await Videogame.find({});
    res.render("games_list.ejs",{gamesList:gamesList,title:"All Videogames List"});
})

exports.videogame_detail = asyncHandler(async (req,res,next) => {
    videogameDetail = await Videogame.findById(req.params.id);
    res.render("games_detail.ejs",{videogameDetail: videogameDetail});
})

exports.videogame_create_get = asyncHandler(async (req,res,next) => {
    const title = "Games Form" 
    res.render("games_form.ejs",{title:"Add new Game"});
})

exports.videogame_create_post = asyncHandler(async (req,res,next) => {
    res.send("Todo implement: post create videogame");
})

exports.videogame_delete_get = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: videogame delete get ")
})
exports.videogame_delete_post = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: videogame delete post ")
})

exports.videogame_update_get = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: videogame update get ")
})

exports.videogame_update_post = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: videogame update post ")
})