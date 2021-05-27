const sheet = require("../../lib/api/GoogleSheet");
const Hasher = require("../../lib/Hasher");
const checkAuth = require("../../utils/checkAuth");
const onAPIError = require("../../utils/onAPIError");
module.exports = {
    Query: {
        getBirthdate: async (_, { value }, context) => {
            const { spreadsheetId, token } = await checkAuth(context);
            let date = new Date(value);
            if (isNaN(date)) return;
            let col = Hasher.getColumnName(Hasher.dayOfYear(date));
            let res = await sheet.getRows(spreadsheetId, `${col}:${col}`, JSON.parse(token), onAPIError(context));
            if (!res) return;
            let rows = res;
            return {
                timestamp: date.getTime(),
                isoString: date.toISOString(),
                individuals: rows.map((json, i) => {
                    let { name } = JSON.parse(json);
                    let id = Hasher.toBase64(col + (i + 1));
                    return ({
                        id,
                        name
                    })
                })
            }

        },

        getBirthdates: async (_, { startDate, endDate }, context) => {
            const { spreadsheetId, token } = await checkAuth(context);
            let start = new Date(startDate);
            let end = new Date(endDate);
            if (isNaN(start) || isNaN(end)) return;
            if (start > end) [end, start] = [start, end];
            let col1 = Hasher.getColumnName(Hasher.dayOfYear(start));
            let col2 = Hasher.getColumnName(Hasher.dayOfYear(end));
            let results = [];
            let rows = await sheet.getRows(spreadsheetId, `${col1}:${col2}`, JSON.parse(token), onAPIError(context));
            if(!rows) return;
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                for (let x = 0; x < row.length; x++) {
                    if (row[x].length < 1) continue;
                    let { name, dob } = JSON.parse(row[x]);
                    dob = new Date(dob);
                    let id = Hasher.toBase64(Hasher.getColumnName(Hasher.dayOfYear(dob))+(i+1))
                    if (results[x] === undefined) {
                        results[x] = ({
                            timestamp: dob.getTime(),
                            isoString: dob.toISOString(),
                            individuals: [ {  id,  name }  ]
                        })
                    } else {
                        results[x].individuals.push({ id, name })
                    }
                }
            }
            return results.filter(x => x);
        }
    }
}