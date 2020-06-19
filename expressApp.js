const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const oauth_sign = require('oauth-sign');
const qs = require('querystring');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/about', (req, res) => res.render('pages/about', { title: 'About', message: "my_javascript_variable" }));

app.all('/', (req,res) => {
	var oauth_consumer_key = req.body.oauth_consumer_key;
	var oauth_nonce = req.body.oauth_nonce;
	var oauth_signature_method = req.body.oauth_signature_method;
	var oauth_timestamp = req.body.oauth_timestamp;
	var oauth_version = req.body.oauth_version;
	var oauth_callback = req.body.oauth_callback;
	var oauth_signature = req.body.oauth_signature;
	
	var expected_signature = oauth_sign.sign('HMAC-SHA1', 'POST', 'https://10ae4c584e2f.ngrok.io', 
	{ oauth_callback: oauth_callback
	  , oauth_consumer_key: oauth_consumer_key
	  , oauth_nonce: oauth_nonce
	  , oauth_signature_method: oauth_signature_method
	  , oauth_timestamp: oauth_timestamp
	  , oauth_version: oauth_version
	});
	
	if (oauth_signature == expected_signature) {
		if (req.body.lis_person_name_given && req.body.lis_person_name_family) {
			var full_name = req.body.lis_person_name_given + ' ' + req.body.lis_person_name_family;
		} else {
			var full_name = 'friend';
		}
		var message = 'hello, ' + full_name + '!';
		var title = 'Hey!';
	} else {
		var message = 'Please be sure to launch this from within Schoology!';
		var title = 'Oops!';
	}

	res.render('pages/index', { title: title, message: message });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
