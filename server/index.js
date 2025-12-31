const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const bookRoutes = require('./routes/bookRoutes');
app.get("/", (req, res) => {
    res.send("Hello form Server");
});
app.use('/api/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
