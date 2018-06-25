import express from "express";
const router = express.Router();

function initRoutes(app)
{
    router.get('/client', setInterval);
}

module.exports = {
    "router": router,
    "initRoutes": initRoutes
};