const { model, Schema } = require('mongoose');
const pushSubscriptionSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    endpoint: { type: String, unique: true },
    keys: {
        p256dh: { type: String },
        auth: { type: String }
    },
});
module.exports = model('pushSubscription', pushSubscriptionSchema);