const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  //username:String
  username: {
    type: String,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    minlength: 5
  },
  movieHistory: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Movies" }]
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  /* hash the passwords */
  bcrypt.hash(user.password, 6, (error, hashPassword) => {
    if (error) {
      return next(error);
    }
    user.password = hashPassword;
    next();
  });
});

/* compares password */
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
  // return this.password === password;
};
module.exports = mongoose.model("Users", userSchema);
