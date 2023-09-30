
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
	'grant_type': 'refresh_token',
	'client_id': '3MVG9xfrbKQ6hBytByscaxk3UqTgUA31TpVAaIYQMo5VRc9GoYkzcAKjSOO8RIgck.dawLEk1eNmQL5KMQMfW',
	'client_secret': '2C81C069932F2AC9C2D22FE8C6BFDDA6FEB56AAEC540D75A24242DC3753F187E',
	'refresh_token': '00DEi000000QlCz!AQEAQGYl948n4sMhiALpmpajgN0Q0HI1s9_dMTGdmp_C3fl9C54DPPx6R2eXQjVs7fT1djeYXcrVx.ihbGhXTjczrWNR6zxJ'
});

let config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'https://escsocal--lc001.sandbox.my.salesforce.com/services/oauth2/token',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded, application/json'
	},
	data: data
};

axios.request(config)
	.then((response: any) => {
		console.log(JSON.stringify(response.data));
	})
	.catch((error: any) => {
		console.log(error);
	});
