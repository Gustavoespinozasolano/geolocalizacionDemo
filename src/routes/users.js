const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { nombres,apellidos,dni, celular, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Contraseñas no coinciden'});
  }
  if(password.length < 4) {
    errors.push({text: 'La contraseña al menos debe ser 4 caracteres'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, nombres, apellidos,dni,celular, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({celular: celular});
    const dniUser = await User.findOne({dni: dni});
    if(emailUser) {
      req.flash('error_msg', 'El celular ya fue registrado');
      res.redirect('/users/signup');
    } else if(dniUser) {
      req.flash('error_msg', 'El Dni ya fue registrado');
      res.redirect('/users/signup');
    }else
      {
      // Saving a New User
      const newUser = new User({nombres,apellidos,dni,celular, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Se Registro Correctamente');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/mapas/mapa',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Cerro Sesion Satisfactoriamente');
  res.redirect('/users/signin');
});

module.exports = router;
