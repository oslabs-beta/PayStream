
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
	'grant_type': 'refresh_token',
	'client_id': process.env.SALESFORCE_CLIENT_ID,
	'client_secret': process.env.SALESFORCE_CLIENT_SECRET,
	'refresh_token': process.env.SALESFORCE_REFRESH_TOKEN
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
