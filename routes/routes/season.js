var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:season', (req, res, next) => {
  let season = require("../../seasons/material/"+req.params.season)
  let dictionary = require("../../seasons/dictionaries/"+req.params.season)
  let memory = require("../../seasons/memory/"+req.params.season)
  let conversions = require("../../seasons/conversions/"+req.params.season)
  res.send({season,dictionary,memory,conversions});
});

module.exports = router;