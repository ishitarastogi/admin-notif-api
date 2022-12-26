const express = require("express");
const router = new express.Router();

const eventsController = require('../controller/eventsController')

router
  .route("/add-event-details")
  .post(eventsController.addEvent);


module.exports = router