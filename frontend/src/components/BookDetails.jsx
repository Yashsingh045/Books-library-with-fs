import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Tag, Edit2 } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        fetch(`${baseApiUrl}/api/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!book) return <div className="loading">Loading details...</div>;

    return (
        <div className="glass-card details-container">
            <button className="btn-icon back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={20} />
            </button>

            <div className="details-header">
                <h1>{book.title}</h1>
                <span className="book-genre">{book.genre}</span>
            </div>

            <div className="details-grid">
                <div className="detail-item">
                    <User className="text-muted" />
                    <div>
                        <label>Author</label>
                        <p>{book.author}</p>
                    </div>
                </div>
                <div className="detail-item">
                    <Calendar className="text-muted" />
                    <div>
                        <label>Published Year</label>
                        <p>{book.publishedYear}</p>
                    </div>
                </div>
                <div className="detail-item">
                    <Tag className="text-muted" />
                    <div>
                        <label>Book ID</label>
                        <p>#{book.id}</p>
                    </div>
                </div>
            </div>

            <div className="details-actions">
                <Link to={`/edit/${book.id}`} className="btn btn-primary">
                    <Edit2 size={20} />
                    <span>Edit Book Details</span>
                </Link>
            </div>
        </div>
    );
};

export default BookDetails;
