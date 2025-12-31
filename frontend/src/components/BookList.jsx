import React, { useState, useEffect } from 'react';
import { Search, Info } from 'lucide-react';
import BookCard from './BookCard';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        setLoading(true);
        fetch('http://localhost:5001/api/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            fetch(`http://localhost:5001/api/books/${id}`, { method: 'DELETE' })
                .then(() => fetchBooks())
                .catch(err => console.error(err));
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading books...</div>;

    return (
        <div className="book-list-view">
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="input-field search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredBooks.length === 0 ? (
                <div className="empty-state glass-card">
                    <Info size={48} className="text-muted" />
                    <h3>No books found</h3>
                    <p>Try adjusting your search or add a new book.</p>
                </div>
            ) : (
                <div className="book-grid">
                    {filteredBooks.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookList;
