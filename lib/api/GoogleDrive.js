const { google } = require("googleapis");
const gauth = require("./GoogleAuth");
const drive = google.drive("v3");
function listSpreadSheets(token, onError){
    const auth = gauth.getOauthFromToken(token);
    return new Promise((resolve, reject)=>{
        drive.files.list({
            q: "mimeType='application/vnd.google-apps.spreadsheet'",
            auth
        }, function(err, res){
            if(err){
                reject(onError(err));
            } 
            resolve(res.data.files);
        });
    })
}

module.exports = { listSpreadSheets };