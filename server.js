const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const store = new session.MemoryStore();

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

app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
});