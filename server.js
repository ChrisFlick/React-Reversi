// Requiring necessary npm packages
const express = require("express");
const path = require('path');
// Requiring passport as we've configured it
require('dotenv').config();


// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3001;

var db = require("./models");


// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'client/build')));
// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Requiring our routes
require("./routes/api-routes.js")(app);





// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
