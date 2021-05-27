const router = require("express").Router();
// const spreadsheetId = '1BNlzp2HQ33_kpI6tJ3rVSX13NIFsPil2HmTmtMIjGwU';
const authRouter =  require("./auth");
const permissionRouter = require("./permissions");
const refreshTokenRouter = require("./refreshToken");

router.use("/auth", authRouter);
router.use("/permissions", permissionRouter);
router.use("/refresh_token", refreshTokenRouter);




module.exports = router;