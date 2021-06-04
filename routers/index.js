const router = require("express").Router();
const authRouter =  require("./auth");
const permissionRouter = require("./permissions");
const refreshTokenRouter = require("./refreshToken");
const avatarRouter = require("./avatar");
const pushRouter = require("./push");
const documentsRouter = require("./documents")

router.use("/auth", authRouter);
router.use("/permissions", permissionRouter);
router.use("/refresh_token", refreshTokenRouter);
router.use("/avatars", avatarRouter);
router.use("/push", pushRouter);
router.use("/documents", documentsRouter);



module.exports = router;