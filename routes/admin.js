const express = require('express');
const router = express.Router();
const AdminUser = require('../authentications/AdminUser')
const AdminOwner = require('../authentications/AdminOwner')
const BranchCodeModule = require('../models/BranchCode')
const UserModule = require('../models/User')

router.get('/', AdminOwner, (req, res) => {
	res.render('admin/index')
});

router.get('/users', AdminUser, async (req, res) => {

	const users = await UserModule.findAll({
		raw: true
	})

	users.forEach((user) => {
		user.password = '********'
	})

	res.render('admin/users', {
		users: users
	})
})

router.get('/branch/api', async (req, res) => {
	const BranchCode = await BranchCodeModule.findAll()

	res.json(BranchCode)
})

router.get('/branch/:code/api', async (req, res) => {
	const code = req.params.code
	const BranchCode = await BranchCodeModule.findOne({
		where: {
			code: code
		}})

	res.json(BranchCode)
})


router.post('/add/branch/api', (req, res) => {
	const code = req.body.code
	const name = req.body.name
	const router = req.body.router

	BranchCodeModule.create({
		name: name,
		router: router,
		code: code
	}).then(() => {
		res.send('ok')
	}).catch(() => {
		res.send('error')
	})

})

module.exports = router;