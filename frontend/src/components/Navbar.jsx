import React from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar glass-card">
            <div className="nav-logo">
                <BookOpen size={28} />
                <span>LibFlow</span>
            </div>
            <div className="nav-links">
                <button className="btn btn-primary">
                    <PlusCircle size={20} />
                    <span>Add Book</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
