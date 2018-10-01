const config = require('./config');
const Sequelize = require('sequelize');

let sequelize = new Sequelize(config.dbConnectionString);

require('sequelize-values')(sequelize);

module.exports = sequelize;
