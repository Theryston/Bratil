const axios = require('axios')

function UserLogin(req, res, next) {
	async function Athen() {
		const cookie = req.headers.cookie
		var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
		login = login.data;

		if (login.error) {
			res.render('user/login')
		} else {
			next()
		}
	}

	Athen()
}

module.exports = UserLogin;