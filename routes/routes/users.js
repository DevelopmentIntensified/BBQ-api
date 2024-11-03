var express = require('express');
var path = require("path")
var getRoutes = require("../../utils/routes")
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(getRoutes('usersRoutes'))
  res.send( 'users Node Express JS: Socket.IO Module ');
});

module.exports = router;