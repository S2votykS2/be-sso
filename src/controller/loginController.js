const getLoginPage = (req, res) => {
  let serviceURL = req.query.serviceURL;
  return res.render("login.ejs", {
    redirectURL: serviceURL,
  });
};

const verifySSOToken = (req, res) => {
  return res.status(200).json({
    EM: "ok",
    EC: 0,
    DT: req.body.ssoToken,
  });
};
module.exports = {
  getLoginPage,
  verifySSOToken,
};
