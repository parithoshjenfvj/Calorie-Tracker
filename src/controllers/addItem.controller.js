const express=require("express");
const itemSchema=require("../models/item.model");
async function addItem(req,res){
    let {itemName,calories,protein,fiber,fat,carbs}=req.body;
    let user=req.user;
    const newItem=await itemSchema.create({
        userId:req.user.userId,
        itemName,
        calories,
        protein,
        fiber,
        fat,
        carbs,
        date:new Date()
    })
    res.status(201).json({ message: "Item added successfully" });
}

async function getTodayTotals(req,res){
    try{
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        await itemSchema.deleteMany({
            userId: req.user.userId,
            date: { $lt: start }
        });

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const items = await itemSchema.find({
            userId: req.user.userId,
            date: { $gte: start, $lte: end }
        });

        let totals = {
        calories: 0,
        protein: 0,
        fiber: 0,
        fat: 0,
        carbs: 0
        };

        items.forEach(item => {
        totals.calories += item.calories;
        totals.protein += item.protein;
        totals.fiber += item.fiber;
        totals.fat += item.fat;
        totals.carbs += item.carbs;
        });

        res.json(totals);
    }
    catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports={
    addItem,
    getTodayTotals
}