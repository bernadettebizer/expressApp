'use strict';

const oauthSign = require('oauth-sign');

function createSignature(formData) {
  delete formData.oauth_signature;
  return oauthSign.sign(formData.oauth_signature_method, 'POST', 'https://8992fff12ffc.ngrok.io',
    formData, 'this_is_the_secret');
}

function checkSignature(body) {
  let message;
  let title;
  let fullName;
  let oauthSignature = body.oauth_signature
  let expectedSignature = createSignature(body);

  if (oauthSignature === expectedSignature) {
    if (body.lis_person_name_given && body.lis_person_name_family) {
      fullName = `${body.lis_person_name_given} ${body.lis_person_name_family}`;
    } else {
      fullName = 'friend';
    }
    message = `hello, ${fullName}!`;
    title = 'Hey!';
  } else {
    message = 'Please be sure to launch this from within Schoology!';
    title = 'Oops!';
  }
  
  return { title, message };
}

module.exports = { checkSignature };
