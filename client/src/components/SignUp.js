import React from 'react'

function SignUp() {
    return (
        <div className='form--centered'>
            <h2>Sign Up</h2>
            <form>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' name='firstName' />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' name='lastName' />
                <label htmlFor="emailAddress">Email Address</label>
                <input type="text" id='emailAddress' name='emailAddress' />
                <label htmlFor="password">Password</label>
                <input type="text" id='password' name='password' />
                <button className='button' type='submit'>Sign Up</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
            <p>Already have a user account? Click here to <a href='/signin'>sign in</a>!</p>
        </div>
    )
}

export default SignUp
