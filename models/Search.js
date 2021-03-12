const db = require('./db')
const User = require('./User')

const Search = db.sequelize.define('searches', {
  title: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  main: {
  	type: db.Sequelize.TEXT,
  	allowNull: false
  },
  content: {
    type: db.Sequelize.TEXT,
    allowNull: false
  }
})

Search.belongsTo(User)


Search.sync({ force: false })


module.exports = Search;
