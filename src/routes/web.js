import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import passport from "passport";
import checkUser from "../middleware/checkUser";
import loginController from "../controller/loginController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //path, handler
  // middle ware chi chay vao 1 route khi kb --> duong nhien roi
  router.get("/", checkUser.isLogin, homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  router.get("/login", checkUser.isLogin, loginController.getLoginPage);
  // router.post(
  //   "/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/user",
  //     failureRedirect: "/login",
  //   })
  // );

  router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      function(error, user, info) {
        if (error) {
          return res.status(500).json(error);
        }

        if (!user) {
          return res.status(401).json(info.message);
        }

        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          console.log(req.body.serviceURL);
          console.log("user", user);
          return res
            .status(200)
            .json({ ...user, redirectURL: req.body.serviceURL });
          // Bug: ko truyen dc tham so 404 not found
        });
      },
    })(req, res, next);
  });

  router.post("/logout", checkUser.handleLogout);
  //rest api
  //GET - R, POST- C, PUT - U, DELETE - D
  router.get("/api/test-api", apiController.testApi);
  router.post("/verify-token", loginController.verifySSOToken);

  return app.use("/", router);
};

export default initWebRoutes;
