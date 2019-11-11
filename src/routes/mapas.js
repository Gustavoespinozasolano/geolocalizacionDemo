const router = require('express').Router();

const { isAuthenticated } = require('../helpers/auth');

//routes
const nombre=null;
router.get('/mapas/mapa',isAuthenticated,(req, res) => {
    //res.send('Hello World');
    res.render('mapa.ejs');
    console.log(req.user.nombres);



});
//sessionStorage.setItem("Nombre", nombre);

module.exports = router;