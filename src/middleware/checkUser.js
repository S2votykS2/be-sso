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

module.exports = {
  isLogin,
};
