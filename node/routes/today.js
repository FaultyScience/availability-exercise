const express = require("express");

const utils = require("../resources/utils");

const router = express.Router();

// endpoint to return current local date
router.get("/today", (req, res) => {

  res.send({
    today: utils.today()
  });
});

module.exports = router;
