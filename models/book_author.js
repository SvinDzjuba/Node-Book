const { DataTypes, Model} = require('sequelize');
const db = require('../config/database');
const Book = require('./book');
const Author = require('./author');

class BookAuthor extends Model {}
BookAuthor.init(
    {
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book,
                key: 'id'
            }
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Author,
                key: 'id'
            }
        }
    },
    {
        sequelize: db,
        modelName: 'book_author'
    },
    Book.hasMany(Author)
);

module.exports = BookAuthor;