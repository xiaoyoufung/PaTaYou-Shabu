const express = require("express");
const router = express.Router();
const listFood = require("../model/listFood");

const app = express();


router.get("/menu", async (req, res) => {
    const foods = await listFood.findAll();
    const foundedFoods = foods.filter((food) => food.food_image_url !== null);

    //console.log(foundedFoods);
    
    res.render("user/menu.ejs", {
        foodlists: foundedFoods,
    });
});

router.get("/menu/:foodId", async (req, res) => {
    const foodId = req.params['foodId'];
    const foundedFood = await listFood.findAllByKey("FoodID", foodId);

    res.render("user/menu-detail", {
        food: foundedFood[0],
    });
})

module.exports = router;