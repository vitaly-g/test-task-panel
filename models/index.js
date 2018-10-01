const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('users', {
  login: Sequelize.STRING,
  password: Sequelize.STRING,
}, { indexes: [{ unique: true, fields: ['login'] }] });

const Order = sequelize.define('orders', {
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { indexes: [{ unique: false, fields: ['user_id'] }] });

const UserInOrder = sequelize.define('user_in_orders', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  order_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id'
    }
  }
}, { indexes: [{ unique: false, fields: ['user_id'] }, { unique: false, fields: ['order_id'] }] });

User.belongsToMany(Order, { through: 'user_in_orders', foreignKey: 'user_id' });
Order.belongsToMany(User, { through: 'user_in_orders', foreignKey: 'order_id' });

module.exports = {
  User,
  Order,
  UserInOrder
}
