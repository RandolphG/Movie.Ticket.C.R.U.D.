const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  actors: [String],
  // price: Number,
  rating: { type: String, enum: ["1", "2", "3", "4", "5"] },
  mpaa: { type: String, enum: ["G", "PG", "PG-13", "R", "NC-17"] },
  theatres: { type: mongoose.SchemaTypes.ObjectId, ref: "Theatres" }
});

movieSchema.pre("findOneAndUpdate", function(next) {
  // console.log(this.getFilter());
  if (this.getUpdate().$push && this.getUpdate().$push.actors) {
    const title = this.getFilter().title;
    this.findOne({ title }, (err, movie) => {
      for (let i = 0; i < movie.actors.length; i++) {
        if (this.getUpdate().$push.actors === movie.actors[i]) {
          console.log("Movie already found");
          return next(new Error("Movie already exists"));
        }
      }
      next();
    });
  } else {
    next();
  }
});
module.exports = mongoose.model("Movies", movieSchema);
