exports.configure = function(env) {
  return configs[env];
}

let configs = {
  "development": {
    "username": "root",
    "password": `${process.env.DB_PASSWORD}`,
    "database": "chess_db",
    "host": "localhost",

    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username":"oogskhdc1zuqans2",
    "password": "f835o7h7r3vnazp7",
    "database": "w2fcxieubc35b53y",
    "host": "hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
  }
}
