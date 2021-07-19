const { verifyToken,isAdmin } = require("../middleware/authjwt");
const controller = require("../controllers/test.controllers");

const express=require('express')
const router =express.Router()

  router.get("/all", controller.allAccess);

  router.get("/user", [verifyToken], controller.userBoard);

 

  router.get(
    "/admin",
    [verifyToken,isAdmin],
    controller.adminBoard
  );
  module.exports=router