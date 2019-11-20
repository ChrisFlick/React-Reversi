module.exports = function (sequelize, DataTypes) { // Creating a game module
    var Game = sequelize.define("Game", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },

        player1: {
            type: DataTypes.STRING,
            allowNull: false
        },

        player2: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
        moves: {
            type: DataTypes.STRING // Stringify of an array
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
       
    });
    return Game;
};