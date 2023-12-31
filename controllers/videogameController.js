const Videogame = require("../models/videogame");
const Genre = require("../models/genre");
const System = require("../models/system");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/data/uploads'); // Relative path to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid conflicts
  },
});

const upload = multer({ storage });

exports.index = asyncHandler(async (req, res, next) => {
  //res.send("TODO IMPLEMENTED: GET INDEX")

  res.redirect("/games");
});

exports.all_videogames = asyncHandler(async (req, res, next) => {
  gamesList = await Videogame.find({});
  res.render("games_list.ejs", {
    gamesList: gamesList,
    title: "All Videogames List",
  });
});

exports.videogame_detail = asyncHandler(async (req, res, next) => {
  videogameDetail = await Videogame.findById(req.params.id);
  res.render("games_detail.ejs", { videogameDetail: videogameDetail });
});

exports.videogame_create_get = asyncHandler(async (req, res, next) => {
  const [genres, systems] = await Promise.all([
    Genre.find({}, "title").exec(),
    System.find({}, "title").exec(),
  ]);
  res.render("games_form.ejs", {
    title: "Add new Game",
    genres: genres,
    systems: systems,
    game: null,
    errors: null,
  });
});

exports.videogame_create_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    if (!(req.body.system instanceof Array)) {
      if (typeof req.body.system === "undefined") req.body.system = [];
      else req.body.system = new Array(req.body.system);
    }
    next();
  },
  upload.single('uploaded_file'),
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("developer", "Developer must not be empty")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("publisher", "Publisher must not be empty")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1, max: 400 })
    .escape(),
  body("price", "Price must be a numeric value").isFloat({ min: 0 }).escape(),
  body("stock", "Stock must be a numeric value").isInt({ min: 0 }).escape(),
  body("*genre").escape(),
  body("*system").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const game = new Videogame({
      name: req.body.title,
      developer: req.body.developer,
      publisher: req.body.publisher,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      genre: req.body.genre,
      system: req.body.system,
    });
    if(['image/png','image/jpg'].includes(req.file.mimetype)){
      game.imgUrl = req.file.destination.slice(7) + "/" + req.file.filename;
    }
    if (!errors.isEmpty()) {
      const [genres, systems] = await Promise.all([
        Genre.find().exec(),
        System.find().exec(),
      ]);

      for (const genre of genres) {
        if (game.genre.includes(genre._id)) {
          genre.checked = "true";
        } else {
          genre.checked = "false";
        }
      }
      for (const system of systems) {
        if (game.system.includes(system._id)) {
          system.checked = "true";
        } else {
          system.checked = "false";
        }
      }
      res.render("games_form.ejs", {
        title: "Add New game",
        genres: genres,
        systems: systems,
        game: game,
        errors: errors.array(),
      });
    } else {
      await game.save();
      res.redirect(game.url);
    }
  }),
];

exports.videogame_delete_post = asyncHandler(async (req, res, next) => {
  await Videogame.findByIdAndDelete(req.body.gameid);
  res.redirect("/games");
});

exports.videogame_update_get = asyncHandler(async (req, res, next) => {
  const [game, genres, systems] = await Promise.all([
    Videogame.findById(req.params.id).exec(),
    Genre.find().exec(),
    System.find().exec(),
  ]);
  if (game === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  genres.forEach((genre) => {
    genre.checked = game.genre.includes(genre._id) ? "true" : "false";
  });
  systems.forEach((system) => {
    system.checked = game.system.includes(system._id) ? "true" : "false";
  });
  res.render("games_form.ejs", {
    title: `Update : ${game.name}`,
    systems: systems,
    genres: genres,
    game: game,
    errors: null,
  });
});

exports.videogame_update_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    if (!(req.body.system instanceof Array)) {
      if (typeof req.body.system === "undefined") req.body.system = [];
      else req.body.system = new Array(req.body.system);
    }
    next();
  },
  upload.single('uploaded_file'),
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("developer", "Developer must not be empty")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("publisher", "Publisher must not be empty")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1, max: 400 })
    .escape(),
  body("price", "Price must be a numeric value").isFloat({ min: 0 }).escape(),
  body("stock", "Stock must be a numeric value").isInt({ min: 0 }).escape(),
  body("*genre").escape(),
  body("*system").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const game = new Videogame({
      name: req.body.title,
      developer: req.body.developer,
      publisher: req.body.publisher,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      genre: req.body.genre,
      system: req.body.system,
      _id:req.params.id,
    });
    if(['image/png','image/jpeg'].includes(req.file.mimetype)){
      game.imgUrl = req.file.destination.slice(7) + "/" + req.file.filename;
    }
    if (!errors.isEmpty()) {
      const [genres, systems] = await Promise.all([
        Genre.find().exec(),
        System.find().exec(),
      ]);
      genres.forEach((genre) => {
        genre.checked = game.genre.includes(genre._id) ? "true" : "false";
      });
      systems.forEach((system) => {
        system.checked = game.system.includes(system._id) ? "true" : "false";
      });
      res.render("games_form.ejs", {
        title: `Update : ${game.name}`,
        genres: genres,
        systems: systems,
        errors: errors.array(),
        game: game,
      });
    } else {
      const updatedGame = await Videogame.findByIdAndUpdate(
        req.params.id,
        {$set:game},
        {}
      );
      res.redirect(updatedGame.url);
    }
  }),
];
