const axios = require('axios')

function AdminOwner(req, res, next) {
	async function AdminOwnerThen() {
		const cookie = req.headers.cookie
		var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
		login = login.data;
		var branch = await axios(req.protocol+'://'+req.headers.host+'/admin/branch/'+login.user.branch+'/api')
		branch = branch.data

		if (login.error) {
			res.render('user/login')
		} else if (login.user.branch == 1) {
			next()
		} else {
			res.redirect(branch.router)
		}
	}

	AdminOwnerThen()
}

module.exports = AdminOwner;