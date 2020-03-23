const router = require("express").Router();
const usersCtrl = require("../controllers/users");
const jwt = require("jsonwebtoken");

/* called for every request*/
router.use((req, res, next) => {
  let token = req.get("Authorization");
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) next(error);
      else {
        /* token verified | username defined in header */
        req.username = decoded.username;
        req._id = decoded._id;
        /* next controller function */
        next();
      }
    });
  } else {
    next();
  }
});

/* check authenticated username */
const authorized = (req, res, next) => {
  if (!req.username) {
    res.status(403).json({ message: "user not authenticated" });
  } else {
    next();
  }
};

router.post("/signup", usersCtrl.create);
router.post("/login", usersCtrl.authenticate);

router.get("/", authorized, usersCtrl.index);
router.get("/:id", authorized, usersCtrl.show);
router.put("/:id", authorized, usersCtrl.update);

module.exports = router;
