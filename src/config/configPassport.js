import LocalStrategy from "passport-local";
import passport from "passport";
import loginRegisterService from "../service/loginRegisterService";

const configPassport = () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      let rawData = {
        valueLogin: username,
        password: password,
      };
      let res = await loginRegisterService.handleUserLogin(rawData);
      console.log("check res", res);
      if (res && +res.EC === 0) {
        return cb(null, { data: res.DT }); // output cho ra, chuẩn bị lưu vào DB
      }
      if (res && res.EC !== 0) {
        return cb(null, false, { message: res.EM });
      }

      // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
      //   if (err) { return cb(err); }
      //   if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

      //   crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      //     if (err) { return cb(err); }
      //     if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
      //       return cb(null, false, { message: 'Incorrect username or password.' });
      //     }
      //     return cb(null, user);
      //   });
      // });
    })
  );
};

export default configPassport;
