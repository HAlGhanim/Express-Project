const Movie = require("../../models/Movie");

exports.fetchMovie = async (movieId, next) => {
  try {
    const updatedRating = await Movie.findById(movieId);
    return updatedRating;
  } catch (error) {
    return next(error);
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const average =
      req.movie.ratings.reduce((total, current) => total + current, 0) /
      req.movie.ratings.length;
    console.log(average);
    return res.status(200).json({ ...req.movie._doc, average });
  } catch (error) {
    return next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.posterImage = `http://${req.get("host")}/media/${
        req.file.filename
      }`;
      console.log(req.body.posterImage);
    }
    const newMovies = await Movie.create(req.body);
    res.status(201).json(newMovies);
  } catch (error) {
    next(error);
  }
};
exports.deleteMovie = async (req, res, next) => {
  try {
    await req.movie.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    await req.movie.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.updateMovieRating = async (req, res, next) => {
  try {
    if (req.body.ratings <= 10 && req.body.ratings >= 0) {
      const updatedRating = await Movie.updateOne(
        req.movie,
        { $push: { ratings: [req.body.ratings] } },
        {
          new: true,
        }
      );
      return res.status(201).json(updatedRating);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid rating must be between 0-19" });
    }
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
