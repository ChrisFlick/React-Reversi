// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function (app) {

  app.get("/api/auth/", function (req, res) { // Authenticates login requests
    profile = req.body

    db.Profile.findAll({
      where: {
        name: profile.name
      }
    }).then(function (results) {
      if (results[0].dataValues.password === profile.password) { // Compare password given with profile password
        console.log(`${profile.name} has logged in`)
        res.json(true)

      } else {
        console.log(`Failed to log in ${profile.name}`)
        res.json(false)
      }
    })
  })

  /*********************
  ****** Profiles ******
  *********************/

  app.post("/api/profiles", function (req, res) { // Create new profile
    let profile = req.body;
    console.log(`Creating profile for ${profile.name}`)

    db.Profile.create({
      name: profile.name,
      password: profile.password,
      elo: 1000, //Starting ELO Rating set to one thousand.
      wins: 0,
      loses: 0,
      games: [] // Holdes ids of all games played for game history
    })

    res.end();

  })

  app.get("/api/profiles/:id", function (req, res) {
    db.Profile.findAll({
      where: {
        name: req.params.id
      }
    }).then( function (results) {
      profile = results[0].dataValues

      res.json({ // Returns profile information without password
        name: profile.name,
        elo: profile.elo,
        wins: profile.wins,
        loses: profile.loses,
        games: profile.games
      })
    })
  })

  app.delete("/api/profiles/:id", function (req, res) {
    console.log(`DELETING ${req.params.id}`)

    db.Profile.destroy({
      where: {
        name: req.params.id
      }
    }).then(function (results) {
      res.end();
    })
  })

  //   app.delete("/api/lobbies/:id", function (req, res) {
  //     console.log(`DELETING ${req.params.id}`)
  //     db.Lobby.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     })
  //     res.end();
  //   })

  // app.get('/api/lobbies', function(req,res){
  //   db.Lobby.findAll({}).then(function (results) {
  //     res.json(results)
  //   })
  // })

  // app.get('/api/lobbies/:id', function(req, res) {
  //   db.Lobby.findAll({
  //     where: {
  //       id: req.params.id,
  //     }
  //   }).then(function (results) {
  //     res.json(results)
  //   })
  // })

  // app.post("/api/lobbies", function (req, res) {
  //   let lobby = req.body

  //   console.log(`deleting ${lobby.name}`)
  //   db.Lobby.create({
  //     id: lobby.id,
  //     lobby_name: lobby.name,
  //     user2Id: null
  //   })
  //   res.end();
  // })



  //   app.put("/api/lobbies/:id", function (req, res) {
  //     db.Lobby.update(
  //       {user2Id: JSON.stringify(req.body.user2Id) },
  //       {where: {id: req.params.id}}
  //     )
  //     res.end();
  //   })
}
