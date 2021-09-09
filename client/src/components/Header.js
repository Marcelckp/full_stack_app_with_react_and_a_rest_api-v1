import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../Context';

function Header() {
    const { authenticatedUser } = useContext(Context);

    let authUser = '';
    if (authenticatedUser) {
        authUser = `${authenticatedUser.user.firstName} ${authenticatedUser.user.lastName}`
    }

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className='header--logo' alt='Courses'>
                    <a href='/'>Courses</a>
                </h1>
                <nav>
                    {authenticatedUser ?
                        <ul className='header--signedin'>
                            <li>Welcome, {authUser}!</li>
                            <li><NavLink to='/signout'>Sign Out</NavLink></li>
                        </ul>
                        : 
                        <ul className='header--signedout'>
                            <li><NavLink to='/signup'>Sign Up</NavLink></li>
                            <li><NavLink to='/signin'>Sign In</NavLink></li>
                        </ul>
                    } 
                </nav>
            </div>
        </header>
    )
}

export default Header;
