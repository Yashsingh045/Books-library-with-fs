const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const fs = require('fs').promises;
const path = require('path');
const booksPath = path.join(__dirname, 'books.json');

app.get('/api/books', async (req, res) => {
    try {
        const data = await fs.readFile(booksPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read books data' });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const data = await fs.readFile(booksPath, 'utf8');
        const books = JSON.parse(data);
        const book = books.find(b => b.id === req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read books data' });
    }
});

app.post('/api/books', async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        if (!title || !author || !genre || !publishedYear) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const data = await fs.readFile(booksPath, 'utf8');
        const books = JSON.parse(data);
        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            genre,
            publishedYear
        };
        books.push(newBook);
        await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save book' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
