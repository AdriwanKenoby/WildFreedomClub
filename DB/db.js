//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = require('../config/dbUri');

mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log("Connexion à la base OK");
});

db.once('disconnected', function () {
  console.error('Successfully disconnected from ' + dbURL);
});
