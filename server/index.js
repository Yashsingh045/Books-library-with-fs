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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
