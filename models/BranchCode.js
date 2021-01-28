const db = require('./db')

const BranchCode = db.sequelize.define('branchcodes', {
	name: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	router: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	code: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	}
})


BranchCode.sync({
	force: false
})


module.exports = BranchCode;