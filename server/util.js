const checkLoggedIn = (req, res, next) => (req.session.username ? next() : res.redirect('/login'));

module.exports.checkLoggedIn = checkLoggedIn;
