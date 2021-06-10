const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const privateServiceLayer = require("./routes/middleware_private");
app.use("/private", privateServiceLayer);

function eventsHandler(req, res, next) {
    // Mandatory headers and http status to keep connection open
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    // After client opens connection send all nests as string
    const data = `data: ${JSON.stringify(nests)}\n\n`;
    res.write(data);
    // Generate an id based on timestamp and save res
    // object of client connection on clients list
    // Later we'll iterate it and send updates to each client
    const sessionId = req.path.split("/").pop();
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        sessionId,
        res,
    };
    clients[sessionId] = newClient;
    // clients.push(newClient);
    // When client closes connection we update the clients list
    // avoiding the disconnected one
    req.on("close", () => {
        console.log(`${clientId} Connection closed`);
        // clients = clients.filter((c) => c.id !== clientId);
    });
}

global["send-event"] = async function sendEventsToAll(newNest) {
    try {
        for (const client in clients) {
            clients[client].res.write(`data: ${JSON.stringify(newNest)}\n\n`);
        }
    } catch (e) {
        console.log(e);
    }
};

async function addNest(req, res, next) {
    const newNest = req.body;
    // nests.push(newNest);
    // Send recently added nest as POST result
    res.json(newNest);
    // Invoke iterate and send function
    return await global["send-event"](newNest);
}

app.post("/nest", addNest);
app.get("/events/:id?", eventsHandler);
app.get("/status", (req, res) => res.json({ clients }));
let clients = {};
let nests = [];

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
