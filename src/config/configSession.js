import { express } from "express";
import session from "express-session";
import Sequelize from "sequelize";
import passport from "passport";

const configSession = (app) => {
  // initalize sequelize with session store
  let SequelizeStore = require("connect-session-sequelize")(session.Store);
  // create database, ensure 'sqlite3' in your package.json
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false,
      define: {
        freezeTableName: true,
      },
      timezone: "+07:00",
    }
  );

  // configure express
  //   create/sync the database table
  let myStore = new SequelizeStore({
    db: sequelize,
  });
  app.use(
    session({
      secret: "keyboard cat",
      store: new SequelizeStore({
        db: sequelize,
      }),
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
      saveUninitialized: false,
      expiration: 30 * 1000,
      cookie: { expires: 30 * 1000 },
    })
  );
  myStore.sync();

  app.use(passport.authenticate("session"));

  // continue as normal
  //   mã hóa: chuyển định dạng và mã hóa rồi lưu xuống DB
  passport.serializeUser(function (user, cb) {
    // console.log("check user before", user);
    process.nextTick(function () {
      // cb(null, { id: user.id, username: user.username });
      cb(null, user); // lưu xuống DB với dât là user
    });
  });
  // giải mã: đọc thông tin mã hóa từ DB => check quyền
  passport.deserializeUser(function (user, cb) {
    // console.log("check user after", user);
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
