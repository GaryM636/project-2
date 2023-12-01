const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Games extends Model { }

Games.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        game_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        popularity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'game',
    });

    module.exports = Games;