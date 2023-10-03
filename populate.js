#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Genre = require("./models/genre");
const Videogame = require("./models/videogame");
const System = require("./models/system");

const genres = [];
const videogames = [];
const systems = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDb = userArgs[0];

main().catch((err) => console.log(err));
async function main() {
  console.log("About to connect...");
  await mongoose.connect(mongoDb);
  console.log("Debug: Should be connected?");
  await createGenres();
  console.log("DEBUG: clossing connection");
  mongoose.connection.close();
}

async function genreCreate(index, title, description) {
  const genre = new Genre({ title: title, description: description });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${title}`);
}

async function systemCreate(index, title, description) {
  const system = new System({ title: title, description: description });
  await system.save();
  system[index] = system;
  console.log(`Added system: ${title}`);
}

async function videogameCreate(
  name,
  developer,
  publisher,
  description,
  price,
  stock,
  genre,
  system
) {
    const videogame = new Videogame({})
}
async function createGenres() {
  console.log("Adding Genres...");
  await Promise.all([
    genreCreate(0, "fantasia", "muy bonito hermano"),
    genreCreate(1, "deportes", "furbol"),
  ]);
}
