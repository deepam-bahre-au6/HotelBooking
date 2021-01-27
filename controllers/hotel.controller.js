const Booking = require("../models/hotel.model.js");

// Create and Save a new Booking
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customerName) {
    return res.status(400).send({
      message: "Hotel booking description can not be empty",
    });
  }

  Booking.find({
    roomNo: req.body.roomNo,
    hotelName: req.body.hotelName,
    Date: req.body.Date,
  })
    .then((bookings) => {
      if (bookings) {
        res.status(302).json({
          message: "This room already booked",
        });
      } else {
        //Create a Booking
        const booking = new Booking({
          customerName: req.body.customerName || "Untitled booking",
          roomNo: req.body.roomNo,
          hotelName: req.body.hotelName,
          Date: req.body.Date,
        });

        //     // Save Booking in the database
        booking
          .save()
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Booking.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving booking.",
      });
    });
};

// Retrieve and return all bookings from the database.
exports.findAll = (req, res) => {
  Booking.find()
    .then((bookings) => {
      res.send(bookings);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving booking.",
      });
    });
};

// Find a single booking with a id
exports.findOne = (req, res) => {
  Booking.findById(req.params.id)
    .then((booking) => {
      if (!booking) {
        return res.status(404).send({
          message: "Booking not found with id " + req.params.id,
        });
      }
      res.send(booking);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Booking not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving booking with id " + req.params.id,
      });
    });
};

// Update a booking identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.customerName) {
    return res.status(400).send({
      message: "Booking description can not be empty",
    });
  }

  // Find booking and update it with the request body
  Booking.findByIdAndUpdate(
    req.params.id,
    {
      Date: req.body.Date || "Untitled Booking",
      customerName: req.body.customerName,
    },
    { new: true }
  )
    .then((booking) => {
      if (!booking) {
        return res.status(404).send({
          message: "Booking not found with id " + req.params.id,
        });
      }
      res.send(booking);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Booking not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating booking with id " + req.params.id,
      });
    });
};

// Delete a booking with the specified id in the request
exports.delete = (req, res) => {
  Booking.findByIdAndRemove(req.params.id)
    .then((booking) => {
      if (!booking) {
        return res.status(404).send({
          message: "Booking not found with id " + req.params.id,
        });
      }
      res.send({ message: "Booking deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.customerName === "NotFound") {
        return res.status(404).send({
          message: "Booking not found with id " + req.params.booking,
        });
      }
      return res.status(500).send({
        message: "Could not delete booking with id " + req.params.id,
      });
    });
};
