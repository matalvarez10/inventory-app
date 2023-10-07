const Videogame = require("../models/videogame");
const Genre = require("../models/genre");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.filter_by_genres = asyncHandler(async (req, res, next) => {
  const gamesList = await Videogame.find({ genre: req.params.id });
  const genreInfo = await Genre.findById(req.params.id);
  res.render("games_list.ejs", {
    title: `All ${genreInfo.title} games`,
    gamesList: gamesList,
  });
});
exports.get_all_genres = asyncHandler(async (req, res, next) => {
    const genreList = await Genre.find();
  res.render("genres_list.ejs",{
    title: "All Genres Details",
    genreList:genreList,
  });
});
exports.get_genre_detail = asyncHandler(async (req, res, next) => {
  res.send("TODO: Implement genre detail");
});
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render("genre_form.ejs", {
    title: "Add New Genre",
    genre : null,
    errors : null
  });
});
exports.genre_create_post = [
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 2, max: 50 }),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 2, max: 200 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({
        title:req.body.title,
        description:req.body.description,
    })
    if(!errors.isEmpty()){
        res.render("genre_form.ejs",{
            title: "Add New Genre",
            genre : genre,
            errors : errors.array()
        })
    }else{
        await genre.save();
        res.redirect("/genres");
    }
  }),
];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("TODO implement: genre delete get ");
});
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("TODO implement: genre delete post ");
});
