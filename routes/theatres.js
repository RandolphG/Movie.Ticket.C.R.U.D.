const router = require("express").Router();
const theatreCtrl = require("../controllers/theatres");
router.post("/", theatreCtrl.create);
module.exports = router;
