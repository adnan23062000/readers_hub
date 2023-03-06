require("dotenv").config();

const express = require("express");

const app = express();


app.get("/api", (req, res) => {
    res.send({
        success: 1,
        message: "Rest api working"
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT: ", process.env.APP_PORT);
});