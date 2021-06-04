const router = require("express").Router();
const path = require("path");
router.get("/privacy", (_, res)=>{
    res.sendFile(path.join(__dirname, "..", "legal", "privacy.html"));
})
router.get("/terms", (_, res)=>{
    res.sendFile(path.join(__dirname, "..", "legal", "terms.html"));
})
module.exports = router;