module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'Usuário não autenticado');
  return res.redirect('/');
};
