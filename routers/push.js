const jwt = require("jsonwebtoken");
const PushSubscriptions = require("../models/PushSubscriptions");
const findAndPushNotifications = require("../utils/notificationFunc");
const router = require("express").Router();
router.post("/subscribe", async(req, res)=>{
    const pushSubscription = req.body;
    try{
        let { id } = jwt.verify(req.cookies.jid, process.env.refresh_token_secret);
        let pushSub = new PushSubscriptions({
            user: id,
            ...pushSubscription
        });
        await pushSub.save();
        res.sendStatus(200);
    } catch(e){
        res.sendStatus(401);
    }
})
router.post("/scheddule", (req, res)=>{
    findAndPushNotifications();
    res.sendStatus(200)
})
module.exports = router;