const userService = require('../services/user');

class UserController {

  async getAppointedOrders(req, res) {
    try {
      const userId = req.user.id;
      const data = await userService.getAppointedOrders(userId);
      res.send(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }

  }

  async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      const data = await userService.getMyOrders(userId);
      res.send(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = new UserController();
