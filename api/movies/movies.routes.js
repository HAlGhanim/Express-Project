const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/uploader");
const ratingErrorValidator = require("express-validation");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  fetchMovie,
  updateMovieRating,
} = require("./movies.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const foundMovie = await fetchMovie(movieId);
    if (!foundMovie) return next({ status: 404, message: "Movie not found" });
    req.movie = foundMovie;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllMovies);

router.get("/:movieId", getMovieById);

router.post("/", upload.single("posterImage"), createMovie);

router.delete("/:movieId", deleteMovie);

router.patch("/:movieId", updateMovieRating);

router.put("/:movieId", updateMovie);
module.exports = router;
