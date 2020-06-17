const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const oauth_sign = require('oauth-sign');
const qs = require('querystring');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.render('pages/index', { title: 'Hey', message: 'Hello, beautiful world!' }));

app.get('/about', (req, res) => res.render('pages/about', { title: 'About', message: "my_javascript_variable" }));

app.all('/', (req,res) => {
	var oauth_consumer_key = req.body.oauth_consumer_key;
	var oauth_nonce = req.body.oauth_nonce;
	var oauth_signature_method = req.body.oauth_signature_method;
	var oauth_timestamp = req.body.oauth_timestamp;
	var oauth_version = req.body.oauth_version;
	var oauth_callback = req.body.oauth_callback;
	
	if (req.body.lis_person_name_given && req.body.lis_person_name_family) {
		var full_name = req.body.lis_person_name_given + ' ' + req.body.lis_person_name_family;
	} else {
		var full_name = 'friend';
	}
	var message = 'hello, ' + full_name + '!';
	res.render('pages/index', { title: 'Hey', message: message })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//todo
//remove node_modules file
//.ds_store files in a bunch of directories, get rid of those as well
//use git ignore
