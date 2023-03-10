require("dotenv").config();

const express = require("express");

const app = express();

const indexRouter = require("./router");


app.use(express.json());

app.use('/', indexRouter);

app.use('*', (req, res) => {
    return res.status(404).json({
        success: 0,
        message: "Page not found"
    })
});

app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT: ", process.env.APP_PORT);
});