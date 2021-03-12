const db = require('./db')
const Search = require('./Search')

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

ResearchEngagement.sync({
	force: false
})


module.exports = ResearchEngagement;