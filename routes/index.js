const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let runtime = req.app.get('runtime');
  res.render('index', { title: 'Express', runtime: runtime });
  req.app.get('wss').clients.forEach(function each(client) {
    client.send("hello");
  })
});

module.exports = router;
