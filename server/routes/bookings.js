const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

const db = mongojs("mongodb://eman:eman@ds163181.mlab.com:63181/taxiapp", [
  "bookings"
]);

router.get("/bookings", (req, res, next) => {
  db.bookings.find(function(err, bookings) {
    if (err) {
      res.send(err);
    }
    res.json(bookings);
  });
});

router.post("/bookings", (req, res, next) => {
  const booking = req.body.data;
  const nearbyDriver = req.body.nearbyDriver;
  const io = req.app.io;

  if (!booking.userName) {
    res.status(400);
    res.json({
      error: "Invalid data"
    });
  } else {
    db.bookings.save(booking, (err, newBooking) => {
      if (err) {
        res.send(err);
      }

      res.json(newBooking);

      if (nearbyDriver.socketId) {
        io.emit((nearbyDriver.socketId = "driverRequest"), newBooking);
      } else {
        console.log("Driver not connected");
      }
    });
  }
});

// Driver  Update Booking done on driver side
router.put("/bookings/:id", function(req, res, next) {
  var io = req.app.io;
  var booking = req.body;
  if (!booking.status) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    db.bookings.update(
      { _id: mongojs.ObjectId(req.params.id) },
      {
        $set: {
          driverId: booking.driverId,
          status: booking.status
        }
      },
      function(err, updatedBooking) {
        if (err) {
          res.send(err);
        }
        if (updatedBooking) {
          //Get Confirmed booking
          db.bookings.findOne(
            { _id: mongojs.ObjectId(req.params.id) },
            function(error, confirmedBooking) {
              if (error) {
                res.send(error);
              }
              res.send(confirmedBooking);
              io.emit("action", {
                type: "BOOKING_CONFIRMED",
                payload: confirmedBooking
              });
            }
          );
        }
      }
    );
  }
});

module.exports = router;
