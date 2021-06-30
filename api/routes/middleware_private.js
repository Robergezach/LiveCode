const express = require("express");
const router = express.Router();
require("../services/service-index");

router.post("/", async function (req, res, next) {
    try {
        const { serviceName, parameters } = req.body;
        console.log(req.body);

        if (global.services[serviceName]) {
            const results = await global.services[serviceName](parameters);
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ error: "Service Not Found" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
