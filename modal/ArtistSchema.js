const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  role: {
    type: String,
  },
});

const artist = mongoose.model("artist", ArtistSchema);
// export ArtistSchema;
module.exports = artist;
