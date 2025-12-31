const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read books data' });
    }
};

const getBook = async (req, res) => {
    try {
        const book = await Book.getBookById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read books data' });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        if (!title || !author || !genre || !publishedYear) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            genre,
            publishedYear
        };
        const savedBook = await Book.addBook(newBook);
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save book' });
    }
};

const updateBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        const updatedBook = await Book.updateBook(req.params.id, { title, author, genre, publishedYear });
        if (updatedBook) {
            res.json(updatedBook);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const success = await Book.deleteBook(req.params.id);
        if (success) {
            res.json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};
