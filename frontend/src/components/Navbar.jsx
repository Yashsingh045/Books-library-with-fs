import React from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar glass-card">
            <Link to="/" className="nav-logo">
                <BookOpen size={28} />
                <span>LibFlow</span>
            </Link>
            <div className="nav-links">
                <Link to="/add" className="btn btn-primary">
                    <PlusCircle size={20} />
                    <span>Add Book</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
