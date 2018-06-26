/*
import express from "express";

const port = process.env.port || 4811;
const app = express();

app.use('/client', require("./client"));
app.use('/temp1', require("./temperature1-service"));
app.use('/temp2', require("./temperature2-service"));
app.use('/led1', require("./led1-service"));
app.use('/led2', require("./led2-service"));
app.use('/humid1', require("./humidity1-service"));
app.use('/bright2', require("./brightness2-service"));

app.listen(port);

console.log("HTTP-Server is running on", "http://localhost:" + port);

module.exports = app;
*/