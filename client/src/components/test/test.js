const API = require("./utils/API")

API.auth("player1", "password").then(res => {
console.log(res)
}).catch(err=>console.log(err))