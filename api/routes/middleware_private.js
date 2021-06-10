const express = require("express");
const router = express.Router();

router.post("/", async function (req, res, next) {
    const { serviceName, parameters } = req.body;
    console.log(req.body);

    global["send-event"](parameters);

    return res.status(200).json({ done: "true" });
});

module.exports = router;
