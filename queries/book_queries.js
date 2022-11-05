// const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Book = require('../models/book');
const Category = require('../models/category');
const BookCategory = require('../models/book_category');

module.exports = async function createBook(books) {
    const publishedDate = books.map(book => book.publishedDate);
    const categories = books.map(book => book.categories);
    const authors = books.map(book => book.authors);

    // Create category
    let categoriesArr = [];
    categories.forEach(el => {
        for (let i = 0; i < el.length; i++) {
            if(el[i] != '') {
                let category_name = el[i].charAt(0).toUpperCase() + el[i].slice(1);
                categoriesArr.push(category_name);
            }
        }
    });
    const uniqCategoriesArr = new Set(categoriesArr);
    const uniqCategories = Array.from(uniqCategoriesArr);
    for (let i = 0; i < uniqCategories.length; i++) {
        await Category.findOrCreate({
            where: { name: uniqCategories[i] },
        });
    }

    // Create book
    for (let i = 0; i < books.length; i++) {
        let book = await Book.create({
            title: typeof books[i].title !== 'undefined' ? books[i].title : '',
            isbn: typeof books[i].isbn !== 'undefined' ? books[i].isbn : '',
            pageCount: typeof books[i].pageCount !== 'undefined' ? books[i].pageCount : '',
            publishedDate: typeof publishedDate[i] !== 'undefined' ? publishedDate[i].$date : null,
            thumbnailUrl: typeof books[i].thumbnailUrl !== 'undefined' ? books[i].thumbnailUrl : '',
            shortDescription: typeof books[i].shortDescription !== 'undefined' ? books[i].shortDescription : '',
            longDescription: typeof books[i].longDescription !== 'undefined' ? books[i].longDescription : '',
            status: typeof books[i].status !== 'undefined' ? books[i].status : ''
        });

        for(let item of categories[i]) {
            if(item !== '') {
                item = item.charAt(0).toUpperCase() + item.slice(1);
                let category = await Category.findOne({
                    where: { name: item },
                    attributes: ['id'],
                    raw: true
                });
                await BookCategory.findOrCreate({
                    where: {
                        bookId: book.id, 
                        categoryId: category.id,
                    }
                });
            }
        }
    }
}