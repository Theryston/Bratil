const db = require('./db')

const TermsSearch = db.sequelize.define('termssearches', {
  tags: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  response: {
    type: db.Sequelize.TEXT,
    allowNull: false
  }
})


TermsSearch.sync({ force: false })


module.exports = TermsSearch;