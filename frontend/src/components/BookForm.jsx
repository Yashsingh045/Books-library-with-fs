import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        publishedYear: ''
    });

    useEffect(() => {
        if (isEdit) {
            const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            fetch(`${baseApiUrl}/api/books/${id}`)
                .then(res => res.json())
                .then(data => setFormData(data))
                .catch(err => console.error(err));
        }
    }, [id, isEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const url = isEdit
            ? `${baseApiUrl}/api/books/${id}`
            : `${baseApiUrl}/api/books`;
        const method = isEdit ? 'PUT' : 'POST';

        const payload = {
            ...formData,
            publishedYear: parseInt(formData.publishedYear)
        };

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to save book');
                return res.json();
            })
            .then(() => navigate('/'))
            .catch(err => {
                console.error(err);
                alert('Error saving book. Please try again.');
            });
    };

    return (
        <div className="glass-card form-container">
            <h2>{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="input-field"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    className="input-field"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Genre"
                    className="input-field"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Published Year"
                    className="input-field"
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                    required
                />
                <div className="form-actions">

                    <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>

                    <button type="submit" className="btn btn-primary">
                        <Save size={20} />
                        <span>{isEdit ? 'Update Book' : 'Save Book'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
