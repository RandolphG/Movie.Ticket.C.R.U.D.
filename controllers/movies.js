// movie controllers
const Movie = require("../models/Movies");

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function findAll(req, res) {
  try {
    const movies = await Movie.find();
    //defines the body of the response
    res.json({ movies });
  } catch (e) {
    console.log(e);
    res.json({ name: e.name, message: true.message });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function create(req, res) {
  try {
    const newMovieDetails = {
      title: req.body.title,
      actors: req.body.actors,
      // price: req.body.price,
      mpaa: req.body.mpaa
    };
    const newMovie = await Movie.create(newMovieDetails);
    // res.sendfile;
    // res.json({ newMovie: newMovie });
    res.json({ newMovie });
  } catch (e) {
    console.log(e);
    // res.send(e.name);
    res.json({ name: e.name, message: e.message });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function show(req, res) {
  try {
    const movie = await Movie.findOne({ title: req.params.title });
    // res.end();
    res.json({ movie });
  } catch (e) {
    console.log(e);
    res.json({ name: e.name, message: e.message });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function update(req, res) {
  try {
    const movie = await Movie.findOneAndUpdate(
      { title: req.params.title },
      req.body.movie,
      { new: true }
    );
    res.json({ movie });
  } catch (e) {
    console.log(e);
    res.json({ name: e.name, message: e.message });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function remove(req, res) {
  try {
    const movie = await Movie.findOneAndDelete({ title: req.params.title });
    if (movie === null)
      return res.status(400).json(`${req.params.title} : movie not found.`);
    res.send();
  } catch (e) {
    console.log(e);
    res.json({ name: e.name, message: e.message });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function addActor(req, res) {
  try {
    const movie = await Movie.findOneAndUpdate(
      { title: req.params.title },
      { $push: { actors: req.body.actor } }
    );
    if (movie === null)
      return res.status(400).json(`${res.params.actor}: actor not found`);
    res.send();
  } catch (e) {
    console.log(e);
    // res.json({ name: e.name, message: e.message });
    res.status(400).json({ name: e.name, message: e.message });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function removeActor(req, res) {
  try {
    await Movie.findOneAndUpdate(
      { title: req.params.title },
      { $pull: { actors: req.body.actor } }
    );
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).json;
    // res.json({ name: e.name, message: e.message });
  }
}
module.exports = {
  create,
  show,
  update,
  remove,
  addActor,
  removeActor,
  findAll
};
