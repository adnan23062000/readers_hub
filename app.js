require("dotenv").config();

const express = require("express");

const app = express();

const userRouter = require("./router/user.router");

const indexRouter2 = require("./router");


app.use(express.json());

app.use('/', indexRouter2);

app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT: ", process.env.APP_PORT);
});