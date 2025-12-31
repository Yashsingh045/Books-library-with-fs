import React from 'react';
import { Calendar, User, Info, Edit2, Trash2 } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete, onView }) => {
    return (
        <div className="glass-card book-card">
            <div className="book-card-header">
                <h3 className="book-title">{book.title}</h3>
                <span className="book-genre">{book.genre}</span>
            </div>
            <div className="book-card-body">
                <div className="book-info-item">
                    <User size={16} className="text-muted" />
                    <span>{book.author}</span>
                </div>
                <div className="book-info-item">
                    <Calendar size={16} className="text-muted" />
                    <span>{book.publishedYear}</span>
                </div>
            </div>
            <div className="book-card-actions">
                <button className="btn-icon" onClick={() => onView(book.id)}>
                    <Info size={18} />
                </button>
                <button className="btn-icon" onClick={() => onEdit(book.id)}>
                    <Edit2 size={18} />
                </button>
                <button className="btn-icon btn-icon-danger" onClick={() => onDelete(book.id)}>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default BookCard;
