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
    "use_env_variable":"JAWSDB_URL"
  }
}
