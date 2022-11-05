const { DataTypes, Model, Sequelize } = require('sequelize');
const db = require('../config/database');

class Book extends Model {}
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pageCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publishedDate: {
            type: DataTypes.DATE,
        },
        thumbnailUrl: {
            type: DataTypes.STRING(255)
        },
        longDescription: {
            type: DataTypes.STRING(255)
        },
        shortDescription: {
            type: DataTypes.STRING(255)
        },
        status: {
            type: DataTypes.ENUM('PUBLISHED', 'NOT PUBLISHED'),
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'book',
        timestamps: false,
    }
);

module.exports = Book;