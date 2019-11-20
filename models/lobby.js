module.exports = function (sequelize, DataTypes) { // Creating a game module
    var Lobby = sequelize.define("Lobby", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        player1: {
            type: DataTypes.STRING,
            allowNull: false
        },

        player2: {
            type: DataTypes.STRING,
        },
        hasRoom: {
            type: DataTypes.BOOLEAN
        }
    });
    return Lobby;
};