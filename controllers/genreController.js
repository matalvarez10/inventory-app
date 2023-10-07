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
    videogamesRef:null
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
    .isLength({ min: 1, max: 150 }),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1, max: 400 }),
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


exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const videogamesRef = await Videogame.find({genre:req.body.genreid},"name");
  if(videogamesRef.length !== 0){
    const [genres,genreTitle] = await Promise.all([
      Genre.find().exec(),
      Genre.find({_id:req.body.genreid}).exec()
    ])
    res.render("genres_list.ejs",{
      title: "All Genres Details",
      genreList:genres,
      videogamesRef: videogamesRef,
      genreTitle: genreTitle[0].title,
    })
  }else{
    await Genre.findByIdAndDelete(req.body.genreid)
    res.redirect("/genres");
  }
});
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  try{
    const genre = await Genre.findById(req.params.id);
    res.render("genre_form.ejs", {
      title: `Update Genre: ${genre.title}`,
      genre : genre,
      errors : null
    });

  }catch(err){
    const errShow = new Error("Genre not found");
    errShow.status = 404;
    return next(errShow);
  }
});
exports.genre_update_post = [
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1, max: 150 }),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1, max: 400 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({
      title:req.body.title,
      description:req.body.description,
      _id: req.params.id,
    })
    if(!errors.isEmpty()){
      res.render("genre_form.ejs",{
        title: `Update Genre: ${genre.title}`,
        errors:errors.array(),
        genre:genre,
      })
    }else{
       await Genre.findByIdAndUpdate(
        req.params.id,
        {$set:genre},
        {}
      );
      res.redirect("/genres");
    }
})]
