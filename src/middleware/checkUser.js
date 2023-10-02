const isLogin = (req, res, next) => {
  try {
    let logon = req.isAuthenticated();
    console.log("check logon", logon);
    if (logon) {
      if (req.path === "/login") {
        res.redirect("/");
        next();
      } else {
        next();
      }
    } else {
      if (req.path === "/login") {
        next();
      } else {
        res.redirect("/login");
      }
    }
  } catch (e) {
    console.log("happen error", e);
  }
};

const handleLogout = (req, res, next) => {
  try {
    // router.post('/logout', function(req, res, next) {
    //     req.logout(function(err) {
    //       if (err) { return next(err); }
    //       res.redirect('/');
    //     });
    //   });

    req.session.destroy((error) => {
      req.logout();
      res.redirect("/");
    });
  } catch (e) {}
};
module.exports = {
  isLogin,
  handleLogout,
};
