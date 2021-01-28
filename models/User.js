const db = require('./db')

const User = db.sequelize.define('users', {
	name: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	gender: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	branch: {
		type: db.Sequelize.INTEGER,
		defaultValue: 0
	}
})


User.sync({
	force: false
})


module.exports = User;