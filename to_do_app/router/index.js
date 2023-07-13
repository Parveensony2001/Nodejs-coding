const express = require('express');
const route = express.Router();
const homeController = require('../controllor/home_controllor');
route.get('/ram',homeController.home);
route.post('/create-contact',homeController.create);
route.get('/delete-contect',homeController.delete);


console.log("router is start");

module.exports = route;