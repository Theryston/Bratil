const db = require('./db')

const Search = db.sequelize.define('searches', {
  title: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: db.Sequelize.TEXT,
    allowNull: false
  }
})


Search.sync({ force: false })


module.exports = Search;