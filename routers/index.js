const router = require("express").Router();
const authRouter =  require("./auth");
const permissionRouter = require("./permissions");
const refreshTokenRouter = require("./refreshToken");
const avatarRouter = require("./avatar");

router.use("/auth", authRouter);
router.use("/permissions", permissionRouter);
router.use("/refresh_token", refreshTokenRouter);
router.use("/avatars", avatarRouter);



module.exports = router;