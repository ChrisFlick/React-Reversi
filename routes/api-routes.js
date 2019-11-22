// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function (app) {

  app.post("/api/auth/", function (req, res) { // Authenticates login requests
    let profile = req.body

    console.log("request", req.body)
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
      games: "", // Holdes ids of all games played for game history
      imgUrl: profile.imgUrl
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

        let wins = user.wins;
        let loses = user.loses

        if (win === "true") {
          wins++
        } else if (win === "false") {
          loses++
        }

        // Calculate users new ELO rating
        let totalElo = parseInt(user.opponentElo) + parseInt(opponent.elo)
        let winLossRatio = wins - loses
        let elo = totalElo + winLossRatio * 400
        let games = user.wins + user.loses + 1
        elo = elo / games


        if (elo < 1) { // Ensurre ELO never drops below 1
          elo = 1;
        }
        db.Profile.update(
          {
            opponentElo: totalElo,
            wins: wins,
            loses: loses,
            elo: elo
          },
          {
            where: {
              name: req.params.user
            }
          }).then((results) => {
            res.end()
          })
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
    let ID_LENGTH = 10;

    db.Lobby.create({
      id: makeid(ID_LENGTH),
      name: lobby.name,
      player1: lobby.player1,
      hasRoom: true
    })
    res.end();
  })

  app.get("/api/lobbies/all", function (req, res) {
    db.Lobby.findAll({})
      .then(function (results) {
        res.json(results)
      })
  })

  app.get("/api/lobbies/:id", function (req, res) {
    db.Lobby.findAll({
      where: {
        id: req.params.id,
      }
    }).then(function (results) {
      res.json(results)
    })
  })

  app.put("/api/lobbies/:id", function (req, res) {
    let lobby = req.body;

    db.Lobby.update(
      { player2: lobby.player2 },
      { where: { id: req.params.id } }
    )
    res.end();
  })
}



// Internal Functions

function makeid(length) { // Makes a random ID for peerJS
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }


  return result;
}