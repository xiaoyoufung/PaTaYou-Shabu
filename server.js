const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const store = new session.MemoryStore();

const listOrder = require("./model/listOrder");

const app = express();

const PORT = 3200;

const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");


// define session
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 3600000 },
    saveUninitialized: false,
    store
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    res.redirect("/user/menu");
});

app.use('/user', userRoutes);

app.use('/cart', cartRoutes);

app.use('/admin', adminRoutes);

app.get('/submit-orders', async (req, res) => {
    const customerID = 62;
    const getOrder = await listFood.findAll();
    const orderID = getOrder.lenght;

    const orderItem = req.session.cart.items;

    orderItem.forEach(order => {
        order.item.FoodID,
        order.qty,
        order.price
    });

    const ordersToInsert = [
        { OrderID: 1001, CustomerID: 5001, FoodID: 101, OrderQuantity: 2 },
        { OrderID: 1002, CustomerID: 5002, FoodID: 102, OrderQuantity: 1 },
        { OrderID: 1003, CustomerID: 5003, FoodID: 103, OrderQuantity: 3 }
      ];
      
      const result = await yourDatabaseInstance.createMultipleOrders(ordersToInsert);

    if(req.session.cart){
        console.log();
    }
})

app.get('/submit-order', async (req, res) => {
    try {
      const customerID = 62; // This should probably come from the authenticated user session
      
      // Get the current highest order ID
      const getOrder = await listOrder.findAll();
      const newOrderID = getOrder.length + 1; // Assuming OrderID is sequential
  
      console.log('Cart contents:', JSON.stringify(req.session.cart, null, 2));
  
      if (!req.session.cart || !req.session.cart.items || typeof req.session.cart.items !== 'object') {
        return res.status(400).json({ error: 'Invalid cart structure' });
      }
  
      const cartItems = Object.values(req.session.cart.items);
  
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
  
      const ordersToInsert = cartItems.map(order => ({
        OrderID: newOrderID + 1,
        CustomerID: customerID,
        FoodID: order.item.FoodID,
        order_quantity: parseInt(order.qty)
      }));
  
      console.log('Orders to insert:', JSON.stringify(ordersToInsert, null, 2));
  
      const result = await listOrder.createMultipleOrders(ordersToInsert);
  
      // Clear the cart after successful order submission
      req.session.cart = { items: {} };

      res.redirect("/admin");
  
    } catch (error) {
      console.error('Error submitting order:', error);
      res.status(500).json({ error: 'An error occurred while submitting the order' });
    }
  });

app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
});