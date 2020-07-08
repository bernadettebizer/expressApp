const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const oauth_sign = require('oauth-sign');
const qs = require('querystring');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/about', (req, res) => res.render('pages/about', { title: 'About', message: "Select a book to view the first page!" }));
app.get('/lotr', (req, res) => res.render('partials/lotr'));
app.get('/hpatss', (req, res) => res.render('partials/hpatss'));

app.get('/', (req,res) => {
	let message = 'hello, friend!';
	let title = 'Hey!';
	res.render('pages/index', { title: title, message: message })
})
//let is saying 
app.post('/', (req,res) => {
	expected_signature = createSignature(req.body);

	console.log(expected_signature,req.body.oauth_signature);
	
	if (req.body.oauth_signature == expected_signature) {
		if (req.body.lis_person_name_given && req.body.lis_person_name_family) {
			let full_name = req.body.lis_person_name_given + ' ' + req.body.lis_person_name_family;
		} else {
			let full_name = 'friend';
		}
		let message = 'hello, ' + full_name + '!';
		let title = 'Hey!';
		res.render('pages/index', { title: title, message: message });
	} else {
		let message = 'Please be sure to launch this from within Schoology!';
		let title = 'Oops!';
		res.render('pages/index', { title: title, message: message });
	}
});

function createSignature(form_data) {
	return oauth_sign.sign(form_data.oauth_signature_method, 'POST', 'https://245d468dc337.ngrok.io', 
		{
			lti_message_type: form_data.lti_message_type ,
			lti_version: form_data.lti_version ,
			launch_presentation_document_target: form_data.launch_presentation_document_target ,
			tool_consumer_info_product_family_code: form_data.tool_consumer_info_product_family_code ,
			tool_consumer_info_version: form_data.tool_consumer_info_version ,
			ext_lms: form_data.ext_lms ,
			oauth_callback: form_data.oauth_callback ,
			user_id: form_data.user_id ,
			roles: form_data.roles ,
			launch_presentation_locale: form_data.launch_presentation_locale ,
		}, "this_is_the_secret");
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));