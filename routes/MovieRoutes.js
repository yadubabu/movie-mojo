const express = require("express");
const movie = require("../modal/MovieModal");

const router = express();

//Get Movies
router.get("/", async (req, res) => {
  const skip = Number(req.query.skip || "0");
  const limit = Number(req.query.limit || "16");
  const total = await movie.countDocuments();

  try {
    const movies = await movie
      .find()
      .limit(limit)
      .skip(limit * skip);

    res.json({
      total,

      skip,
      limit,

      movies,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error..!");
  }
});

//Post Movies
router.post("/", async (req, res) => {
  const { title, genre, released, artists, rating, image, about, keywords } =
    req.body;
  try {
    const newMovie = new movie({
      title,
      image,
      genre,
      released,
      artists,
      about,
      rating,
      keywords,
    });
    const movie1 = await newMovie.save();

    res.json(movie1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error..!");
  }
});

//Get Single Movie With an @id
router.get("/:id", (req, res) => {
  movie
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error:" + err));
});

//Update Movie Data @id
router.put("/:id", async (req, res) => {
  const { title, genre, released, artists, rating, image, about } = req.body;

  const movieFields = {};
  if (title) movieFields.title = title;
  if (genre) movieFields.genre = genre;
  if (released) movieFields.released = released;
  if (artists) movieFields.artists = artists;
  if (rating) movieFields.rating = rating;
  if (image) movieFields.image = image;
  if (about) movieFields.about = about;

  try {
    let Movie = await movie.findById(req.params.id);

    if (!Movie) return res.sendStatus(404).json({ msg: "user not found..." });
    Movie = await movie.findByIdAndUpdate(
      req.params.id,
      { $set: movieFields },
      { new: true }
    );

    res.json(Movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error..!");
  }
});

//delete Movie with an @id
router.delete("/:id", (req, res) => {
  movie
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("User was deleted..."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//search movie with an title
router.get("/search/movie/:title", (req, res) => {
  let regex = new RegExp(req.params.title, "i");
  movie.find({ title: regex }).then((result) => {
    res.status(200).json(result);
  });
});

export default router;
