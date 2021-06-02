const router = require("express").Router();
const authRouter =  require("./auth");
const permissionRouter = require("./permissions");
const refreshTokenRouter = require("./refreshToken");
const avatarRouter = require("./avatar");
const pushRouter = require("./push");

router.use("/auth", authRouter);
router.use("/permissions", permissionRouter);
router.use("/refresh_token", refreshTokenRouter);
router.use("/avatars", avatarRouter);
router.use("/push", pushRouter);



module.exports = router;