require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const indexRouter = require("./router/index.router");
const syncModels = require('./model/index.model');
const database = require('./config/databaseSequelize');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: [process.env.CROSS_ORIGIN_1, process.env.CROSS_ORIGIN_2],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
}));


database.connectToDB();
syncModels();

app.use('/api/v1', indexRouter);

app.use('*', (req, res) => {
    return res.status(404).json({
        success: 0,
        message: "Page not found"
    })
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log("server up and running on PORT: ", process.env.APP_HOST, process.env.APP_PORT);
});