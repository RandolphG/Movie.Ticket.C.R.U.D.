/* starting express server */
const express = require("express");
const logger = require("morgan");
require("dotenv").config();
/* executes database code */
require("./config/database");
const app = express();
app.use(logger("dev"));
/* parse the post body string to json 'req.body' */
app.use(express.json());
/* mounting a router to the app */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
/* routes*/
app.use("/api/users", require("./routes/users"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/theatres", require("./routes/theatres"));
app.listen(3001, () => console.log("listening from port 3001"));
