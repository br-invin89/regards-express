import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model";
import config from "../config/db"; // get db config file
import errorHandler from './errorHandler';

class passportManager {
  initialize() {
    var opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: config.secret,
    };
    passport.use(
      new Strategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
    );
    return passport.initialize();
  }
  authenticate(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        if (info.name === "TokenExpiredError") {
          errorHandler.run(res, 'Your token has expired.', 401);
        } else {
          errorHandler.run(res, info.message, 401);
        }
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
}
export default new passportManager();
