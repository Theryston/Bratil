const db = require('./db')
const Search = require('./Search')
const User = require('./User')

const ResearchEngagement = db.sequelize.define('researchengagements', {
	like: {
		type: db.Sequelize.BOOLEAN,
		defaultValue: false
	},
	dislike: {
		type: db.Sequelize.BOOLEAN,
		defaultValue: false
	},
	time: {
		type: db.Sequelize.INTEGER,
		defaultValue: 0
	}
})

ResearchEngagement.belongsTo(Search)
ResearchEngagement.belongsTo(User)

ResearchEngagement.sync({
	force: false
})


module.exports = ResearchEngagement;