const axios = require('axios')

function AdminUser(req, res, next) {
	async function AthenAdmin() {
		const cookie = req.headers.cookie
		var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
		login = login.data;

		if (login.error) {
			res.render('user/login')
		} else if (login.user.branch == 4 || login.user.branch == 1) {
			next()
		} else {
			res.render('admin/lock', {
				code: [1, 4]
			})
		}
	}

	AthenAdmin()
}

module.exports = AdminUser;