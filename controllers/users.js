const User = require("../models/Users");
const jwt = require("jsonwebtoken");

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function index(req, res) {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (e) {
    console.error(e);
    res.status(400).json({ name: e.name, message: e.message });
  }
}

/**
 * authenticate user
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function authenticate(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).json({ message: "invalid username or password" });
    const match = await user.comparePassword(req.body.password);
    if (!match)
      return res.status(400).json({ message: "invalid username or password" });

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        fullName: user.fullName
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(400).json({ name: e.name, message: e.message });
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
  } catch (e) {
    console.error(e);
    res.status(400).json({ name: e.name, message: e.message });
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
    const user = await User.create(req.body);
    res.json({ user });
  } catch (e) {
    console.error(e);
    res.status(400).json({ name: e.name, message: e.message });
  }
}

/**
 *  get the details of the logged in user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function show(req, res) {
  /* if the authenticated user-id !== user-id of route */
  try {
    if (req._id === req.params.id) {
      res.json({
        message: `${req.username} is currently logged in`,
        name: req.username
      });
    } else res.status(403).json({ message: "access denied" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ name: e.name, message: e.message });
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
  } catch (e) {
    console.error(e);
    res.status(400).json({ name: e.name, message: e.message });
  }
}

module.exports = { authenticate, index, update, create, show, remove };
