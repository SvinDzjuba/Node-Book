// NPM require
const express = require('express');
const cors = require('cors');

// Routing
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

require('./routes/api/categoriesRoute')(app);
require('./routes/api/authorsRoute')(app);
require('./routes/api/booksRoute')(app);
require('./routes/api/bookAuthorRoute')(app);
require('./routes/api/bookCategoryRoute')(app);

require('./routes/views/categoriesRoute')(app);
require('./routes/views/authorsRoute')(app);
require('./routes/views/booksRoute')(app);
require('./routes/views/bookAuthorRoute')(app);
require('./routes/views/bookCategoryRoute')(app);

app.listen(3000);
// -------------------

// Models relations
let Category = require('./models/category');
let Book = require('./models/book');
let Author = require('./models/author');
let BookCategory = require('./models/book_category');
let BookAuthor = require('./models/book_author');

Book.belongsToMany(Author, { through: BookAuthor });
Book.belongsToMany(Category, { through: BookCategory });
// ----------------------------------------------------
Author.belongsToMany(Book, { through: BookAuthor });
// ------------------------------------------------
Category.belongsToMany(Book, { through: BookCategory });
// ----------------------------------------------------

// JSON parsing -> creation
const db = require('./config/database');
const books_json = require('./data/books_json');
const createBooks = require('./data/insert_data');

async function fetchBooks() {
    const str_books_json = JSON.stringify(books_json);
    const books = JSON.parse(str_books_json);
    await db.sync({ alter: true });
    return books;
}
fetchBooks().then(books => {
    createBooks(books);
});
// -------------------------

// Swagger configuration
// const initSwagger = require('./config/swagger');
// initSwagger(app);
// ------------------

// Layout access
app.get('/', function(req, res) {
    res.render('index', { title: 'Books Database Application', message: 'Books Database Application' });
});