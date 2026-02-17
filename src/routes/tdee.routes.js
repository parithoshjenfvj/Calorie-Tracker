const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/loggedIn.middleware");
const tdeeController=require("../controllers/tdee.controller")
router.post("/addtdee",authMiddleware,tdeeController.tdeeCalculate)
module.exports=router;