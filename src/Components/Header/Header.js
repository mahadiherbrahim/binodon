import React from 'react';
import './Header.css'
const Header = () => {
    return (
        <div>
            <span onClick={() => window.scroll(0, 0)} className="header">🎬 R&R Hub🎥</span>
        </div>
    );
};

export default Header;