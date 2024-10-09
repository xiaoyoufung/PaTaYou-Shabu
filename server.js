const express = require("express");
const listFood = require("./model/listFood");

const app = express();

const PORT = 3200;

app.get("/", async (req, res) => {
    const foods = await listFood.findAll();
    res.render("login");

    try{
        console.log(foods);
    } catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error" + error);
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
});