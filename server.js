const express=require('express');
require("dotenv").config();
const app=require('./src/app');


const connectToDb=require("./src/config/db")
connectToDb();
app.listen(3000, () => {
    console.log("server started on port 3000");
});