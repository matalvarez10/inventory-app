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
  await createSystems();
  await createVideogames();
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
  systems[index] = system;
  console.log(`Added system: ${title}`);
}

async function videogameCreate(
  index,
  name,
  developer,
  publisher,
  description,
  price,
  stock,
  genre,
  system
) {
  const videogame = new Videogame({
    name: name,
    developer: developer,
    publisher: publisher,
    description: description,
    price: price,
    stock: stock,
    genre: genre,
    system: system,
  });
  await videogame.save();
  videogames[index] = videogame;
  console.log(`Added videogame : ${name}`);
}
async function createGenres() {
  console.log("Adding Genres...");
  await Promise.all([
    genreCreate(0, "Action", "Games with action-packed gameplay"),
    genreCreate(1, "Adventure", "Games with story-driven adventures"),
    genreCreate(2, "Sports", "Games containing different sports"),
    // Add more genres as needed
  ]);
}

// Create and add systems
async function createSystems() {
  console.log("Adding Systems...");
  await Promise.all([
    systemCreate(0, "PlayStation 5", "Next-gen gaming console"),
    systemCreate(1, "Xbox Series X", "Microsoft's gaming console"),
    systemCreate(2, "Nintendo Switch", "Nintendo's handheld console"),
    // Add more systems as needed
  ]);
}

// Create and add video games
async function createVideogames() {
  console.log("Adding Videogames...");
  await Promise.all([
    videogameCreate(
      0,
      "The Last of Us Part II",
      "Naughty Dog",
      "Sony Interactive Entertainment",
      "Set five years after The Last of Us (2013), the game focuses on two playable characters in a post-apocalyptic United States whose lives intertwine: Ellie, who sets out in revenge for a murder, and Abby, a soldier who becomes involved in a conflict between her militia and a religious cult.",
      59.99,
      100,
      [genres[0]], // Assuming you have genres array populated from createGenres()
      [systems[0]] // Assuming you have systems array populated from createSystems()
    ),
    videogameCreate(
      1,
      "Halo Infinite",
      "343 Industries",
      "Microsoft Studios",
      "Halo Infinite is a first-person shooter. In the game's story mode, players assume the role of player character Master Chief, as he wages a war against the Banished, an alien faction. Players traverse the open world Zeta Halo, fighting the Banished with a mixture of vehicles and weapons.",
      49.99,
      50,
      [genres[0],genres[1]], // You can assign the appropriate genre
      [systems[1]] // You can assign the appropriate system
    ),
    videogameCreate(
      2,
      "FIFA 22",
      "EA Vancouver",
      "Electronic Arts",
      "FIFA 22 brings a new season of innovation across every mode in the game; enjoy more consistency between the posts with a goalkeeper rewrite that brings more composure to the most important position on the pitch, live out your football dreams as you create and manage your custom club to glory in Career Mode.",
      39.99,
      100,
      [genres[2]], // You can assign the appropriate genre
      [systems[0],systems[1],systems[2]] // You can assign the appropriate system
    ),
    videogameCreate(
      3,
      "The Legend of Zelda: Breath of the Wild",
      "Nintendo",
      "Nintendo",
      "The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U. Set at the end of the Zelda timeline, the player controls an amnesiac Link as he sets out to save Princess Zelda and prevent Calamity Ganon from destroying the world.",
      59.99,
      75,
      [genres[0],genres[1]], // You can assign the appropriate genre
      systems[2] // You can assign the appropriate system
    ),
    videogameCreate(
      4,
      "Cyberpunk 2077",
      "CD Projekt Red",
      "CD Projekt",
      "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.",
      49.99,
      25,
      [genres[0],genres[1]], // You can assign the appropriate genre
      [systems[0],systems[1]] // You can assign the appropriate system
    )
    // Add more video games as needed
  ]);
}
