const { google } = require('googleapis');
const port = process.env.NODE_ENV === 'development' ? ":"+process.env.PORT: '';
const oAuth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  `${process.env.public_url}${port}${process.env.login_redirect_path}`
);
function getPermissionUrl (){
  const scopes = [
    'https://www.googleapis.com/auth/spreadsheets.edit',
    'https://www.googleapis.com/auth/drive.readonly'
  ]
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}
function getAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}
/**
 * 
 * @param {*} code The authorization code
 * @returns a promise with the token
 */
async function authorize(code) {
  return new Promise((resolve, reject) => {
      oAuth2Client.getToken(code, (err, token) => {
      if (err) return reject('Error while trying to retrieve access token', err);
      setToken(token);
      resolve(token);
    });
  })
}
async function authorizePerm(code) {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
    if (err) return reject('Error while trying to retrieve access token', err);
    setToken(token);
    resolve(token);
  });
})
}
/**
 * Sets a token into the oauth client
 * @param {*} token 
 */
function setToken(token){
  oAuth2Client.setCredentials(token);
}
/**
 * returns the access token of the oauth client
 */

function getOauthFromToken(token){
  setToken(token);
  return oAuth2Client;
}

function getUserInfo(){
  return new Promise((resolve, reject)=>{
    let oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2"
    })
    oauth2.userinfo.v2.me.get(function(err, res){
      if(err) return reject("Error getting user info "+err);
      resolve(res.data);
    })
  })
}
module.exports = {getAuthUrl, authorize, setToken, getOauthFromToken, getUserInfo, getPermissionUrl, authorizePerm};