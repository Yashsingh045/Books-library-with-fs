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

    const groupedByGenre = filteredBooks.reduce((acc, book) => {
        if (!acc[book.genre]) acc[book.genre] = [];
        acc[book.genre].push(book);
        return acc;
    }, {});

    const latestBooks = [...filteredBooks].sort((a, b) => b.publishedYear - a.publishedYear).slice(0, 4);

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
                <>
                    {!searchTerm && latestBooks.length > 0 && (
                        <div className="category-section">
                            <h2 className="category-title">Latest Releases</h2>
                            <div className="book-grid">
                                {latestBooks.map(book => (
                                    <BookCard key={`latest-${book.id}`} book={book} onDelete={handleDelete} />
                                ))}
                            </div>
                        </div>
                    )}

                    {Object.keys(groupedByGenre).map(genre => (
                        <div className="category-section" key={genre}>
                            <h2 className="category-title">{genre}</h2>
                            <div className="book-grid">
                                {groupedByGenre[genre].map(book => (
                                    <BookCard key={book.id} book={book} onDelete={handleDelete} />
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default BookList;
