const router = require("express").Router();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
    if (!req.cookies.jid) return res.send(JSON.stringify({ error:"No refresh token found" })).status(401);
    try {
        let payload = jwt.verify(req.cookies.jid, process.env.refresh_token_secret);
        let user = await User.findById(payload.id);
        if (!user) return res.send(JSON.stringify({ error:"User not found" })).status(401);
        if( payload.exp * 1000 <= Date.now()+150*24*3600*1000){
            res.cookie('jid',
            refreshToken = jwt.sign({id: user.id}, process.env.refresh_token_secret, {expiresIn: '200d'}),
            { httpOnly: true })
        }
        let accessToken = jwt.sign({ id: user.id }, process.env.access_token_secret, { expiresIn: '30m' });
        res.send(JSON.stringify({ accessToken })) 
    } catch (e) {
        res.send(JSON.stringify({ error:"Invalid token" })).status(401);
    }
})
module.exports = router;