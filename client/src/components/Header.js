import React from 'react';
import { NavLink }from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className='header--logo' alt='Courses'>
                    <a href='/'>Courses</a>
                </h1>
                <nav>
                    <ul className='header--signedin'>
                        <li><NavLink to='/signup'>Sign Up</NavLink></li>
                        <li><NavLink to='/signin'>Sign In</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
