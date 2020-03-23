const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  name: String,
  available: Boolean
});

const theatreSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  zipcode: { type: String, length: 5 },
  Movies: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Movies" }],
  seats: [seatSchema]
});
theatreSchema.methods.toJSON = function() {
  let object = this.toObject();
  delete object.seats;
  return object;
};
module.exports = mongoose.model("Theatres", theatreSchema);
