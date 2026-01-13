const fs = require('fs').promises;
const path = require('path');
const booksPath = path.join(__dirname, '../books.json');

const getAllBooks = async () => {
    const data = await fs.readFile(booksPath, 'utf8');
    return JSON.parse(data);
};

const getBookById = async (id) => {
    const books = await getAllBooks();
    return books.find(b => b.id === id);
};

const addBook = async (newBook) => {
    const books = await getAllBooks();
    books.push(newBook);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return newBook;
};

const updateBook = async (id, updatedData) => {
    let books = await getAllBooks();
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedData };
        await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
        return books[index];
    }
    return null;
};

const deleteBook = async (id) => {
    let books = await getAllBooks();
    const filteredBooks = books.filter(b => b.id !== id);
    if (books.length !== filteredBooks.length) {
        await fs.writeFile(booksPath, JSON.stringify(filteredBooks, null, 2));
        return true;
    }
    return false;
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};
