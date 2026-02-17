const express=require("express");
const tdeeSchema=require("../models/tdee.model");
async function tdeeCalculate(req, res) {
  try {
    let { age, weight, height, activity } = req.body;

    // 1️⃣ Calculate BMR (generic formula without gender)
    const bmr = (10 * weight) + (6.25 * height) - (5 * age);

    // 2️⃣ Activity multiplier map
    const activityMultipliers = {
      lightExercise: 1.375,
      moderateExercise: 1.55,
      heavyExercise: 1.725
    };

    // 3️⃣ Get multiplier
    const multiplier = activityMultipliers[activity];

    if (!multiplier) {
      return res.status(400).json("Invalid activity level");
    }

    // 4️⃣ Calculate TDEE
    const calculatedTdee = Math.round(bmr * multiplier);

    // 5️⃣ Save in database
    const newTdee = await tdeeSchema.create({
      userId: req.user.userId,
      age,
      weight,
      height,
      activity,
      calculatedTdee
    });

    res.status(201).json({
      message: "TDEE calculated successfully",
      calculatedTdee
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports={
    tdeeCalculate
}