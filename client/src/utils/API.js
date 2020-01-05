const axios = require("axios");
const url = "https://reversi-server.herokuapp.com"

const API = {  
  auth: function (name, password) {
    console.log(name, password)
    return axios.post(`/api/auth/`, {
      name: name,
      password: password,
    })
  },

  /*********************
  ****** Profile *******
  *********************/

  createProfile: function (name, password, pic) {
    return axios.post(url + "/api/profiles", {
      name: name,
      password: password,
      pic: pic
    })
  },

  deleteProfile: function (name) { // Deletes profile given the name
    return axios.delete(`${url}/api/profiles/${name}`)
  },

  getProfile: function (name) { // Searches for profile based on name
    return axios.get(`${url}/api/profiles/${name}`)
  },

  updateElo: function (user, opponent, win) {
    return axios.put(`${url}/api/elo/${user}/${opponent}/${win}`)
  },

  /*********************
  ******* Lobby ********
  *********************/

  createLobby: function (name, player1) {
    return axios.post(url + "/api/lobbies", {
      name: name,
      player1: player1,
    })
  },

  updateLobby: function (id, player2) {
    return axios.put(`${url}/api/lobbies/${id}`, {
      player2: player2,
    })
  },

  getLobby: function (id) {
    if (id) {
      return axios.get(`${url}/api/lobbies/${id}`)
    }
    return axios.get(`${url}/api/lobbies/all`)
    
  },

  /*********************
  ****** Game **********
  *********************/

  createGame: function (id, player1, player2) {
    return axios.post(`${url}/api/games`, {
      id: id,
      player1: player1,
      player2: player2,
    })
  },

  getGames: function (name) {
    return axios.get(`${url}/api/games/${name}`)
  },

  updateGame: function(id, moves) {
    return axios.put(`${url}/api/games/${id}`,{
      moves: moves
    })
  }
};

  


module.exports = API



