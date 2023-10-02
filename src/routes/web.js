import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import passport from "passport";
import checkUser from "../middleware/checkUser";

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

  router.get("/login", checkUser.isLogin, homeController.handleLogin);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/user",
      failureRedirect: "/login",
    })
  );
  //rest api
  //GET - R, POST- C, PUT - U, DELETE - D
  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};

export default initWebRoutes;
