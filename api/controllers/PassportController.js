const passport = require('passport');

module.exports = {

  signup: function(req, res) {
    var userData = { username: req.body.username, password: req.body.password };
    User.create(userData).exec(function(err, user) {
      if (err) {
        return res.json(err.invalidAttributes.username[0].message);
      } else {
        return res.created({message: 'success signup'});
      }
    })
  },

  login: function(req, res, next) {
    passport.authenticate('local', {successRedirect:'/signup', failureRedirect: 'http://localhost:4200/login' }, function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
       res.json(info)
      }
      else {
        res.json(user)
      }
    })(req, res, next);
  },


  logout: function(req, res) {
    delete req.logout();
    res.json({ success: true })
  }
}
