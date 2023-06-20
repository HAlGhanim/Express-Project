const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  posterImage: { type: String, required: true },
  ratings: [Number],
  cast: [{ actorName: String, actorImage: String }],
});

module.exports = model("Movie", MovieSchema);
