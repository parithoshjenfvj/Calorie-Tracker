const favouriteSchema=require("../models/favourites.model")
const Item = require("../models/item.model");
async function addFavourite(req,res){
    try{
        let {itemName,calories,protein,fiber,fat,carbs}=req.body;
        let createdFavourite = await favouriteSchema.create({
            userId:req.user.userId,
            itemName,
            calories,
            protein,
            fiber,
            fat,
            carbs
        })
        res.status(201).json({ message: "Favorite added successfully" });
    }
    catch{
        res.status(500).json({ error: "Server error" });
    }
}

async function getFavourites(req,res){
    try{
        const favorites = await favouriteSchema.find({
            userId: req.user.userId
        });
        res.json(favorites);
    }
    catch{
        res.status(500).json({ error: "Server error" });
    }
}

async function addFavoriteToToday(req, res) {
  try {
    const { favoriteId } = req.body;

    // Find favorite that belongs to logged-in user
    const favorite = await favouriteSchema.findOne({
      _id: favoriteId,
      userId: req.user.userId
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Add it to today's items
    await Item.create({
      userId: req.user.userId,
      itemName: favorite.itemName,
      calories: favorite.calories,
      protein: favorite.protein,
      fiber: favorite.fiber,
      fat: favorite.fat,
      carbs: favorite.carbs,
      date: new Date()
    });

    res.status(201).json({ message: "Favorite added to today's log" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteFavourite(req, res) {
  try {
    const { favoriteId } = req.body;

    const deleted = await favouriteSchema.findOneAndDelete({
      _id: favoriteId,
      userId: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}



module.exports={
    addFavourite,
    getFavourites,
    addFavoriteToToday,
    deleteFavourite
}