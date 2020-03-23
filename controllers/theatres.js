// theatre controllers
const Theatre = require("../models/Theatres");
async function create(req, res) {
  try {
    /*let seats = [];
    for (let i = 0; i < req.body.seats; i++) {
      seats.push({ name: `S-${i}`, available: true });
    }
    req.body.seats = seats;*/
    req.body.seats = new Array(req.body.seats)
      .fill(null)
      .map((element, index) => ({
        name: `Seat${index}`,
        available: true
      }));
    // const newTheatre = await Theatre.create(req.body.theatre);
    const newTheatre = await Theatre.create(req.body);
    delete newTheatre.seats;
    res.json({ newTheatre });
  } catch (e) {
    console.log(e);
    res.json({ name: e.name, message: e.message });
  }
}
module.exports = { create };
