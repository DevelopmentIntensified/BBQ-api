const express = require('express');
const getRoutes = require('../../utils/routes');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(getRoutes('usersRoutes'));
  res.send('users Node Express JS: Socket.IO Module ');
});

module.exports = router;
