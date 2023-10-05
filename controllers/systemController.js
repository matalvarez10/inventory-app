const Videogame = require("../models/videogame");
const System = require("../models/system");
const asyncHandler = require("express-async-handler");


exports.filter_by_system = asyncHandler(async (req,res,next) => {
    const gamesList = await Videogame.find({system:req.params.id});
    const systemInfo = await System.findById(req.params.id);
    res.render("games_list.ejs",{title:`All ${systemInfo.title} games`,gamesList:gamesList})
})
exports.get_all_systems = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: GET all system")
})
exports.system_create_get = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: GET create system")
})
exports.system_create_post = asyncHandler(async (req,res,next) => {
    res.send("TODO IMPLEMENT: post create system")
})

exports.system_delete_get = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: system delete get ")
})
exports.system_delete_post = asyncHandler(async (req,res,next) => {
    res.send("TODO implement: system delete post ")
})
