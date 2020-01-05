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
    "username": "zjg3jx1djhlz40yr",
    "password": "m2dzp26b3t6psb5r",
    "database": "yieaqvry0192bicx",
    "host": "hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
  }
}
