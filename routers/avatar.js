const path = require("path");
const router = require("express").Router();
router.get("/:avatarId", (req, res)=>{
    let id = req.params.avatarId;
    let code = parseInt(id, 16);
    if(!code) return res.sendFile(path.join(__dirname, "../assets/av0.png"));
    let index = code%8;
    res.sendFile(path.join(__dirname, `../assets/av${index}.png`));
})
module.exports = router;