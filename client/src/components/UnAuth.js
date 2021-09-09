import React from 'react';
import { Link } from 'react-router-dom';

function UnAuth() {
    return (
        <div className="form--centered">
            <h2>Access Denied</h2>
            <p>Sorry, you are not allowed to perform any action on this course because you dont have permission to perform actions on other users courses</p>
            
            
                <Link className="button" to='/'>Return Home</Link>
            
                <Link className="button button-secondary" to='/signin'>Switch Account</Link>

        </div>
    )
}

export default UnAuth
