// getting-started.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017', { dbName: "BackendDetabse"})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start executing your code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });