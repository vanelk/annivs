const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const gAuth = require("../apis/GoogleAuth");
router.get("/login", (req, res) => {
    if (req.cookies.jid) {
        try {
            jwt.verify(req.cookies.jid, process.env.refresh_token_secret);
            return res.redirect(process.env.tmp_app_path);
        } catch (e) {
            res.redirect(gAuth.getAuthUrl());
        }
    }
    res.redirect(gAuth.getAuthUrl());
});

router.get("/login/callback", async (req, res) => {
    let code = req.query.code;
    if (!code) return res.sendStatus(401);
    await gAuth.authorize(code);
    let info = await gAuth.getUserInfo();
    let resp = await User.findOne({ email: info.email });
    if (!resp) {
        let user = new User({
            name: info.name,
            email: info.email,
            picture: null
        })
        resp = await user.save();
    }
    res.cookie(
        "jid",
        jwt.sign({ id: resp.id }, process.env.refresh_token_secret, { expiresIn: '200d' }),
        { httpOnly: true }
    );
    res.redirect(process.env.tmp_app_path);
});

router.get("/logout", (_, res)=>{
    res.clearCookie("jid");
    res.redirect(process.env.tmp_app_path);
});

module.exports = router;