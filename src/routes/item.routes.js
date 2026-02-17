const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/loggedIn.middleware");
const itemControllers=require("../controllers/addItem.controller");
router.post("/add",authMiddleware,itemControllers.addItem);
router.get("/totals",authMiddleware,itemControllers.getTodayTotals);
module.exports=router;