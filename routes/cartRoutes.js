// Shopping Cart
const express = require("express");
const Cart = require('../model/cart');
const router = express.Router();

const listFood = require("../model/listFood");

router.get("/", function (req, res, next) {
    if(!req.session.cart) {
      return res.render('user/cart', {products: null});
    }
    let cart = new Cart(req.session.cart);
    //console.log(cart)
    res.render("user/cart", {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
    });
  });

  // add item to cart
router.get('/add-to-cart/:id', async function(req, res) {
    let foodId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
  
    const food = await listFood.findAllByKey("FoodID", foodId);
    if(!food) {
      return res.redirect('/');
    } else {
        //console.log(product.product_id);
      cart.add(food[0], food[0].FoodID);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/user/menu');
    }
  });

router.get('/add-to-cart/:id/:qty', async (req, res) => {
  let foodId = req.params.id;
  let foodQty = req.params.qty;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  const food = await listFood.findAllByKey("FoodID", foodId);

  if(!food) {
    return res.redirect('/');
  } else {
      //console.log(product.product_id);
    cart.addIndividule(food[0], food[0].FoodID, foodQty);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/user/menu');
  }

});

  // decrease qty of item when click 'minus' button in shopping-cart
router.get('/reduce/:reItem', function(req, res){
    let productId = req.params.reItem;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
  });
  
// increase qty of item when click 'plus' button in shopping-cart
router.get('/add/:reItem', function(req, res){
    let productId = req.params.reItem;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
  });
  
// remove all items when click 'bin' button in shopping-cart
router.get('/remove/:reItem', function(req, res){
    let productId = req.params.reItem;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
  });

module.exports = router;