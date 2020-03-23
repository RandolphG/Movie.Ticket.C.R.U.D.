const express = require("express");
const router = express.Router();
const moviesCtrl = require("../controllers/movies");
// mapping http requests to controller functions
router.get("/", moviesCtrl.findAll);
router.post("/", moviesCtrl.create);
router.get("/:title", moviesCtrl.show);
router.put("/:title", moviesCtrl.update);
router.delete("/:title", moviesCtrl.remove);
router.post("/:title/actors", moviesCtrl.addActor);
router.delete("/:title/actors", moviesCtrl.removeActor);
module.exports = router;
