module.exports = (app) => {
  const Hotel = require("../controllers/hotel.controller.js");

  // Create a new todo
  app.post("/booking", Hotel.create);

  // Retrieve all todos
  app.get("/booking", Hotel.findAll);

  // Retrieve a single todo by id
  app.get("/booking/:id", Hotel.findOne);

  // Update a Todo with id
  app.put("/booking/:id", Hotel.update);

  // Delete a Todo by id
  app.delete("/booking/:id", Hotel.delete);
};
