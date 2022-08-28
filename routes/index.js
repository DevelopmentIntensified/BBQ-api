const express = require('express');

const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
