const sequelize = require('../db');

const Orders = require('../models').Order;
const Users = require('../models').User;
const UserInOrder = require('../models').UserInOrder;

class OrderService {

  async getById(orderId, userId) {
    const order = await Orders.findById(orderId);
    if (order.user_id == userId) {
      return order;
    } else {
      return {};
    }
  }

  async add(order, userId) {
    const newOrder = await Orders.create({ title: order.title, text: order.text, user_id: userId });
    await this.addUserToOrder(newOrder.id, order.users);
    return newOrder;
  }

  async addUserToOrder(orderId, users) {
    if (!users || !users.length) {
      return;
    }
    await UserInOrder.destroy({ where: { order_id: orderId } });
    await Promise.all(users.map(async (item) => {
      const [order, user] = await Promise.all([
        Orders.findById(orderId),
        Users.findById(item)
      ]);
      await order.addUser(user);
    }));
    return orderId;
  }

  async deleteOrder(orderId, userId) {
    const oldOrder = await Orders.findById(orderId);
    if (oldOrder.user_id !== userId) {
      return;
    }
    const transaction = await sequelize.transaction();
    try {
      await UserInOrder.destroy({ where: { order_id: orderId }, transaction });
      await Orders.destroy({ where: { id: orderId }, transaction });
    } catch (err) {
      transaction.rollback();
      throw new Error(err);
    }
    return oldOrder;
  }

  async changeOrder(order, orderId, userId) {
    const oldOrder = await Orders.findById(orderId);
    if (oldOrder.user_id !== userId) {
      return;
    }
    await Orders.update({ title: order.title, text: order.text }, { returning: true, where: { id: orderId } });
    await this.addUserToOrder(orderId, item);
    return orderId;
  }
}

module.exports = new OrderService();
