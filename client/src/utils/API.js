const axios = require("axios");

const API = {
  auth: function (name, password) { // Authenticates given a user name and password
    return axios.post(`/api/auth/`, {
      name: name,
      password: password,
    })
  },

  /*********************
  ****** Profile *******
  *********************/

  createProfile: function (name, password, imgUrl) {
    return axios.post("/api/profiles", {
      name: name,
      password: password,
      imgUrl: imgUrl
    })
  },

  deleteProfile: function (name) { // Deletes profile given the name
    return axios.delete(`/api/profiles/${name}`)
  },

  getProfile: function (name) { // Searches for profile based on name
    return axios.get(`/api/profiles/${name}`)
  },

  updateElo: function (user, opponent, win) {
    return axios.put(`/api/elo/${user}/${opponent}/${win}`)
  },

  /*********************
  ******* Lobby ********
  *********************/

  createLobby: function (name, player1) {
    return axios.post("/api/lobbies", {
      name: name,
      player1: player1,
    })
  },

  updateLobby: function (id, player2) {
    return axios.put(`/api/lobbies/${id}`, {
      player2: player2,
    })
  },

  getLobby: function (id) {
    if (id) {
      return axios.get(`/api/lobbies/${id}`)
    }
    return axios.get(`/api/lobbies/all`)
    
  },

  /*********************
  ****** Game **********
  *********************/

  createGame: function (id, player1, player2) {
    return axios.post(`/api/games`, {
      id: id,
      player1: player1,
      player2: player2,
    })
  },

  getGames: function (name) {
    return axios.get(`/api/games/${name}`)
  },

  updateGame: function(id, moves) {
    return axios.put(`/api/games/${id}`,{
      moves: moves
    })
  }
};

  


module.exports = API



