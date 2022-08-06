const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const connectDB = require("./db");
const cors = require("cors");
const MovieSchema = require("./modal/MovieModal");
const ArtistSchema = require("./modal/ArtistSchema");
const LoginSchema = require("./modal/LoginModal");

// import MovieRoutes from "./routes/MovieRoutes";
// import CastRoutes from "./routes/CastRoutes";

dotenv.config();

const app = express();

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"));

app.use(express.json());
app.use(cors());

app.use(express.Router());

app.post("/login/adduser", async (req, res) => {
  // const { email, password } = req.body;
  try {
    const newUser = new LoginSchema({
      email: "mohini@gmail.com",
      password: "1234",
    });
    await newUser.save();
    return res.json(LoginSchema.find());
  } catch (err) {
    console.log(err);
  }
});
app.get("/login/getuser", async (req, res) => {
  try {
    return res.json(await LoginSchema.find());
  } catch (err) {
    console.log(err);
  }
});
app.post("/addartist", async (req, res) => {
  try {
    const newArtist = new ArtistSchema(
      {
        name: "Ishwarya",
        dob: "12-8-1989",
        role: "heroine",
      },
      {
        name: "Chiranjeevi",
        dob: "23-4-1954",
        role: "hero",
      }
    );
    await newArtist.save();
  } catch (err) {
    console.log(err);
  }
});

app.get("/getartist", async (req, res) => {
  try {
    return res.json(await ArtistSchema.find());
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/addmovie", async (req, res) => {
  const { title, image, genre, released, about, rating } = req.body;
  try {
    const newMovie = new MovieSchema({
      title: title,
      image: image,
      genre: genre,
      released: released,
      about: about,
      rating: rating,
    });
    await newMovie.save();
    return res.send(MovieSchema.find());
  } catch (err) {
    console.log(err);
  }
});

app.get("/", async (req, res) => {
  try {
    return res.json(await MovieSchema.find());
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await MovieSchema.findByIdAndDelete(req.params.id);
    return res.json(await MovieSchema.find());
  } catch (err) {
    console.log(err);
  }
});

// app.use("/api/movies", MovieRoutes);
// app.use("/api/movies/cast", CastRoutes);

app.listen(3006, () => console.log(`Movie Server Started On Port 3006`));
