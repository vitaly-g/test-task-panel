const config = require('../config');
const bcrypt = require('bcrypt');
const authService = require('../services/auth');
const userService = require('../services/user');

class AuthController {

  async login(req, res) {
    try {
      const token = await authService.authenticate(req.body);
      res.send({
        success: true,
        data: { token }
      });
    } catch (err) {
      if (err.type === 'custom') {
        res.send({
          success: false,
          message: err.message
        });
      }
      res.send({
        success: false,
        message: 'Authentication failed. Unexpected Error.'
      });
    }
  }

  async register(req, res) {
    try {
      const exists = await userService.getUserByLogin(req.body.login || '');
      if (exists) {
        res.send({
          success: false,
          message: 'Registration failed. User with this login already registered.'
        });
        return;
      }
      let user = {
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, config.saltRounds)
      }
      await userService.addUser(user)
      res.send({ success: true });
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = new AuthController();
