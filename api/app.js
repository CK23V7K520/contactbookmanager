const express = require('express');
const cors = require('cors');

const contactsRouter = require("./app/routers/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

app.use("/api/contacts", contactsRouter);

//handle 404 reponse
app.use((req, res, next) => {
    //running code when route don't valication
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calles
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    });
});

module.exports = app;