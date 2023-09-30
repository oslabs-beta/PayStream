var axios = require("axios");
var qs = require("qs");
let data = qs.stringify({
  grant_type: "refresh_token",
  client_id: process.env.SALESFORCE_CLIENT_ID,
  client_secret: process.env.SALESFORCE_CLIENT_SECRET,
  refresh_token: process.env.SALESFORCE_REFRESH_TOKEN,
});

var config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://escsocal--lc001.sandbox.my.salesforce.com/services/oauth2/token",
  headers: {
    "Content-Type":
      "application/x-www-form-urlencoded, application/x-www-form-urlencoded",
  },
  data: data,
};
axios
  .request(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
