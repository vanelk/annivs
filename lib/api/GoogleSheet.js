const { google } = require('googleapis');
const gAuth = require("./GoogleAuth");
sheets = google.sheets({ version: 'v4' });
/**
 * 
 * @param {*} spreadsheetId 
 * @param {*} range 
 * @returns 
 */
async function getRows(spreadsheetId, range, token, onError) {
    let auth = gAuth.getOauthFromToken(token);
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
            auth
        }, (err, res) => {
            if (err) return reject(onError(err));
            resolve(res.data.values)
        });
    })
}
async function batchGetRows(spreadsheetId, ranges, token, onError) {
    let auth = gAuth.getOauthFromToken(token);
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.batchGet({
            spreadsheetId,
            ranges,
            auth
        }, (err, res) => {
            if (err) return reject(onError(err));
            resolve(res.data.valueRanges.map(({ values }) => values))
        });
    })
}
async function appendRows(spreadsheetId, range, values, token, onError) {
    let auth = gAuth.getOauthFromToken(token);
    let resource = { values, majorDimension: 'ROWS' };
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
            auth
        }, (err, res) => {
            if (err) return reject(onError(err));
            resolve(res.data)
        });
    })
}
async function clearRows(spreadsheetId, range, token, onError) {
    let auth = gAuth.getOauthFromToken(token);
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.clear({
            spreadsheetId,
            range,
            auth
        }, (err, res) => {
            if (err) return reject(onError(err));
            resolve(res.data)
        });
    })
}
/**
 * 
 * @param {*} spreadsheetId 
 * @param {*} range 
 * @param {*} values 
 * @returns 
 */
async function updateRows(spreadsheetId, range, values, token, onError) {
    let auth = gAuth.getOauthFromToken(token);
    const resource = { values };
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
            auth
        }, (err, result) => {
            if (err) return reject(onError(err));
            resolve(result.data);
        });
    })
}
async function create(title, token, onError){
    let auth = gAuth.getOauthFromToken(token);
    const resource = {
        properties: {
          title,
        },
      };
      return new Promise((resolve, reject)=>{
          sheets.spreadsheets.create({
            resource,
            fields: 'spreadsheetId',
            auth
          }, (err, spreadsheet) =>{
            if (err) return reject(onError(err));
              resolve(spreadsheet.spreadsheetId);
          });
      })
}
module.exports = { getRows, batchGetRows, appendRows, clearRows, updateRows, create };