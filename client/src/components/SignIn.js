import React from 'react'

function SignIn() {
    return (
        <div className='form--centered'>
            <h2>Sign In</h2>
            <form>
                <label htmlFor="emailAddress">Email Address</label>
                <input type="text" id="emailAddress" name="emailAddress" />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" />
                <button className="button" type="submit">Sign In</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
            <p>Don't Have a user account? Click here to <a href='/signup'>sign up</a>!</p>
        </div>
    )
}

export default SignIn;
