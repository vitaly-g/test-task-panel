const orderService = require('../services/order');

class OrderController {

  async getOrder(req, res) {
    try {
      const data = await orderService.getById(req.params.id, req.user.id);
      res.send(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  }

  async addOrder(req, res) {
    try {
      const data = await orderService.add(req.body, req.user.id);
      res.send(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  }

  async changeOrder(req, res) {
    try {
      const data = await orderService.changeOrder(req.body, req.params.id, req.user.id);
      res.send(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  }

  async deleteOrder(req, res) {
    try {
      const data = await orderService.deleteOrder(req.params.id, req.user.id);
      res.send(data);
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = new OrderController();
