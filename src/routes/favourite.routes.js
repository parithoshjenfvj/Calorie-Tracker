const express=require("express")
const router=express.Router();
const favouriteController=require("../controllers/favouriteItem.controller");
const loggedIn=require("../middleware/loggedIn.middleware");
router.post("/add",loggedIn,favouriteController.addFavourite);
router.get("/getall",loggedIn,favouriteController.getFavourites);
router.post("/addtoday",loggedIn,favouriteController.addFavoriteToToday);
module.exports=router;