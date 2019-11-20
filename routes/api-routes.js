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
      opponentElo: 0,
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
    }).then(function (results) {
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

  app.put("/api/elo/:user/:opponent/:win", function (req, res) { // Updates ELO and win/loss

    db.Profile.findAll({ // Search for current user
      where: {
        name: req.params.user
      }
    }).then(function (userResults) {

      db.Profile.findAll({ // Search for opponent user
        where: {
          name: req.params.opponent
        }
      }).then(function (opponentResults) {
        let user = userResults[0].dataValues
        let opponent = opponentResults[0].dataValues
        let win = req.params.win

        // Calculate users new ELO rating
        let totalElo = parseInt(user.opponentElo) + parseInt(opponent.elo)
        let winLossRatio = user.wins - user.loses
        let elo = totalElo + winLossRatio * 400
        let games = user.wins + user.loses + 1
        elo = elo / games


        if (elo < 1) { // Ensurre ELO never drops below 1
          elo = 1;
        }

        if (win === "true") {
          db.Profile.update(
            {
              opponentElo: totalElo,
              wins: user.wins + 1,
              elo: elo
            },
            {
              where: {
                name: req.params.user
              }
            }).then((results) => {
              res.end()
            })
        } else if (win === "false") {
          db.Profile.update(
            {
              opponentElo: totalElo,
              wins: user.loses + 1,
              elo: elo
            },
            {
              where: {
                name: req.params.user
              }
            }).then((results) => {
              res.end()
            })
        }
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

  /*********************
  ******** Game ********
  *********************/

  app.post("/api/games", function (req, res) {
    let game = req.body

    db.Game.create({
      id: game.id,
      player1: game.player1,
      player2: game.player2,
      isActive: true,
      moves: ""
    })

    res.end();
  })

  app.put("/api/games/:id", function (req, res) {
    let game = req.body;

    db.Game.update(
      { moves: game.moves },
      { where: { id: req.params.id } }
    )
  })

  /*********************
  ****** Lobbies *******
  *********************/

  app.post("/api/lobbies", function (req, res) {
    let lobby = req.body;

    console.log(`Creating lobby ${lobby.name}`)
    db.Lobby.create({
      id: lobby.id,
      name: lobby.name,
      player1: lobby.player1
    })
    res.end();
  })


  
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




}



