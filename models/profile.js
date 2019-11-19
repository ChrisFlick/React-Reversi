module.exports = function (sequelize, DataTypes) { // Creating a profile module
    var Profile = sequelize.define("Profile", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        elo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        opponentElo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        wins: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        loses: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        games: {
            type: DataTypes.STRING // Stringify of an array
        },
    });
    return Profile;
};
