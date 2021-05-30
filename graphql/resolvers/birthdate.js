const Contact = require("../../models/Contacts");
const checkAuth = require("../../utils/checkAuth");
module.exports = {
    Query: {
        getBirthdatesByDate: async (_, { date }, context) => {
            const { id } = await checkAuth(context);
            if (isNaN(date)) return;
            let contacts = await Contact.aggregate([
                {$project: {name: 1, birthdate: 1, picture:1, month: {$month: '$birthdate'}, date:{$dayOfMonth:'$birthdate'}, user:{$toString: '$user'}}},
                {$match: { user: id, month: date.getMonth() + 1, date: date.getDate()}}
            ])
            return contacts

        },

        getBirthdatesByMonth: async (_, { month }, context) => {
            const { id } = await checkAuth(context);
            let contacts = await Contact.aggregate([
                {$project: {name: 1, birthdate: 1, picture:1, month: {$month: '$birthdate'}, user:{$toString: '$user'}}},
                {$match: {user:id, month: month + 1}}
              ])
            return contacts;
        }
    }
}