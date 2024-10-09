const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("admin/admin.ejs");
});

router.get("/report", (req, res) => {
    res.render("admin/admin-report.ejs", {
        stylesheet: "/styles/admin.css",
    });
});

module.exports = router;