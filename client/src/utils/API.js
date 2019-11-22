 const axios = require("axios") ;

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
  }

  /*********************
  ******* Lobby ********
  *********************/
};

  



module.exports = API

