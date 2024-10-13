const express = require("express");

const router = express.Router();

const listFood = require("../model/listFood");



router.get("/", async (req, res) => {
    const getOrder = await listFood.findByOrderdetail();
    console.log(getOrder);
    res.render("admin/admin-table.ejs", {
        orderDetail: getOrder,
    });
});

router.get("/report", (req, res) => {
    res.render("admin/admin-report.ejs", {
        stylesheet: "/styles/admin.css",
    });
});

module.exports = router;