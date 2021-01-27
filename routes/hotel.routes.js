module.exports = (app) => {
  const Hotel = require("../controllers/hotel.controller.js");

  // Create a new booking
  app.post("/booking", Hotel.create);

  // Retrieve all booking
  app.get("/booking", Hotel.findAll);

  // Retrieve a single booking by id
  app.get("/booking/:id", Hotel.findOne);

  // Update a booking with id
  app.put("/booking/:id", Hotel.update);

  // Delete a booking by id
  app.delete("/booking/:id", Hotel.delete);
};
