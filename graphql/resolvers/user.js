const checkAuth = require("../../utils/checkAuth");
const drive = require("../../lib/api/GoogleDrive");
const { validateSetSpreadSheet } = require("../../utils/validate");
const { UserInputError } = require("apollo-server-errors");
const User = require("../../models/User");
module.exports = {
    Query:{
        listDriveSpreadSheets: async (_, d, context) => {
            let { token } = await checkAuth(context, {spreadsheet: true});
            let data = await drive.listSpreadSheets(JSON.parse(token));
            return data;
        },
    },
    Mutation: {
        setSpreadSheetId: async (_, {spreadsheetId}, context) => {
            let { id } = await checkAuth(context, {spreadsheet: true});      
            const { valid, errors } = validateSetSpreadSheet(spreadsheetId);
            if (!valid) throw new UserInputError('Errors', { errors });
            await User.findByIdAndUpdate(id, {spreadsheetId});
            return spreadsheetId;
        }
    }
}