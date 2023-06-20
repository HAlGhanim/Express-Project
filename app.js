const express = require("express");
const connectDB = require("./database");
const notFound = require("./middlewares/notfound");
const cors = require("cors");
const movieRoutes = require("./api/movies/movies.routes");
const errorHandler = require("./middlewares/errorhandler");
const morgan = require("morgan");
const path = require("path");
const dotEnv = require("dotenv");

dotEnv.config();

const app = express();
app.use(cors())
connectDB();

app.use("/media/", express.static(path.join(__dirname, "media")));
app.use(express.json());
app.use(morgan("dev"));

app.use("/movies", movieRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
