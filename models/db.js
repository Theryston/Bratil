const Sequelize = require('sequelize');

const sequelize = new Sequelize('bait', 'root', 'Theryston10', {
  host: "localhost",
  dialect: "mysql"
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};