import config from "../config/db";
import User from "../models/user.model";
const jwt = require("jsonwebtoken");
import errorHandler from '../config/errorHandler';

class Auth {
  signUp(req, res) {
    if (!req.body.username || !req.body.password) {
      errorHandler.run(res, 'Please pass username and password.');
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      // save the user
      newUser.save((err) => {
        if (err) {
          errorHandler.run(res, 'Username already exists.');
        }
        res.json({ message: "Successful created new user." });
      });
    }
  }
  signIn(req, res) {
    User.findOne(
      {
        username: req.body.username,
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          errorHandler.run(res, 'Authentication failed. User not found.', 401);
        } else {
          // check if password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: "4h",
              });
              // return the information including token as JSON
              res.json({ token: "JWT " + token });
            } else {
              errorHandler.run(res, 'Authentication failed. Wrong password.', 401);
            }
          });
        }
      }
    );
  }
}

export default new Auth();
