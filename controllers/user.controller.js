import User from "../models/user.model";
import errorHandler from '../config/errorHandler';

class UserController {
  async get(req, res) {
    try {
      let user = await User.findOne({ username: req.user.username });
      return res.status(200).json({ user: user.toJSON() });
    } catch (err) {
      errorHandler.run(res, err, 500);
    }
  }
}

export default new UserController();
