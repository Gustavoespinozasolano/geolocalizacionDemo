const router = require('express').Router();




//routes
router.get('/',(req, res) => {
    //res.send('Hello World');
    res.render('index');
});

module.exports = router;