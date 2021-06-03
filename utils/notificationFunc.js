const webpush = require("web-push");
const Contacts = require("../models/Contacts");
const PushSubscriptions = require("../models/PushSubscriptions");
webpush.setVapidDetails(
    'mailto:test@test.com',
    process.env.vapid_public_key,
    process.env.vapid_private_key
);
async function findAndPushNotifications() {
    let date = new Date(2021, 5, 4);
    let contacts = await Contacts.aggregate([
        { $project: { name: 1, picture: 1, month: { $month: '$birthdate' }, date: { $dayOfMonth: '$birthdate' }, user: 1 } },
        { $match: { month: date.getMonth() + 1, date: date.getDate() } }
    ])
    let userIds = {};
    for (let contact of contacts) {
        if (!userIds[contact.user]) {
            userIds[contact.user] = [contact];
        } else {
            userIds[contact.user].push(contact)
        }
    }
    for (let id in userIds) {
        const title = 'Wish Happy Birthday';
        let body = `It's ${userIds[id][0].name} birthday today!`
        let picture = userIds[id][0].picture
        let target = userIds[id][0]._id;
        if (userIds[id].length > 1) {
            // aggregate notification for multiple people
        }
        let subscriptions = await PushSubscriptions.find({user: id});
        for(let subscription of subscriptions){
            try {
               await webpush.sendNotification(subscription, JSON.stringify({ title, picture, body, target }));
            } catch (e) {
                // invalid key just delete
                await PushSubscriptions.findByIdAndRemove(subscription._id)
            }
        }
    }
}
module.exports = findAndPushNotifications;