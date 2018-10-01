const Users = require('../models').User;
const Orders = require('../models').Order;

class UserService {

  async addUser(user) {
    await Users.create(user);
  }

  async getUserByLogin(login) {
    const user = await Users.findOne({ where: { login } });
    return user;
  }

  async getAppointedOrders(userId) {
    const user = await Users.findById(userId);
    const orders = await user.getOrders();
    return orders;
  }

  async getMyOrders(userId) {
    const orders = await Orders.findAll({ where: { user_id: userId } });
    return orders;
  }
}

module.exports = new UserService();
