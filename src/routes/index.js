const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send('Hello World');
  res.render('index');
});

/*
router.get('/about', (req, res) => {
  res.render('about');
});
*/
module.exports = router;
