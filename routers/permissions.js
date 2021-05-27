const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const gAuth = require("../lib/api/GoogleAuth");
router.get("/", (_, res)=>{
    res.redirect(gAuth.getPermissionUrl())
});
router.get("/callback", async (req, res)=>{
    let code = req.query.code;
    if (!code) return res.sendStatus(401);
    try{
        let token = await gAuth.authorizePerm(code); 
        if (req.cookies.jid) {
            try {
                let {id} = jwt.verify(req.cookies.jid, process.env.refresh_token_secret);
                await User.findByIdAndUpdate(id, {token: JSON.stringify(token)});
                res.status(200).send("Operation successfull please close window to continue");
            } catch (e) {
                res.sendStatus(401);
            }
        }
    } catch(e){
        console.error(e);
    }
})
module.exports = router;