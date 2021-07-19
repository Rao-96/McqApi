const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middleware/verifysignup");
const controller = require("../controllers/user.auth.controller");

const express=require('express')
const router =express.Router()



 router.post(
    "/signup",
    [
     checkDuplicateUsernameOrEmail,
     checkRolesExisted
    ],
    controller.signup
  );

  router.post("/signin", controller.signin);
  router.post("/refreshtoken", controller.refreshToken);
  module.exports=router