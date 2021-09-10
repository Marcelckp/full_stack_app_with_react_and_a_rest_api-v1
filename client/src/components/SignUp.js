import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { useHistory, Redirect } from 'react-router-dom';

function SignUp() {

    let history = useHistory();
    const { data, actions } = useContext(Context);

    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        emailAddress:'',
        password:'',
        errors:[]
    });

    const {emailAddress, password, firstName, lastName, errors} = user;

    const updateVal = (e) => {
        setUser(prevVal => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }))
    }


    const submit = (e) => {
        const account = {firstName, lastName, emailAddress, password}
        e.preventDefault();
        console.log(account)
        data.createUser(account)
            .then(err => {
                if (err.length > 0) {
                    setUser({
                        errors: err,
                        firstName: '',
                        lastName: '',
                        emailAddress: '',
                        password: '',
                    })
                } else {
                    actions.signIn(emailAddress, password)
                        .then(() => history.goBack())
                        console.log('Account Created')
                }
            })
            .catch(error => {
                console.log(error);
                return <Redirect to='/error' />
            })
    }

    return (
        <div className='form--centered'>
            <h2>Sign Up</h2>

            {
                errors.length > 0 ?
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((err, i) => {
                            return <li key={i}>{err}</li>
                        })}
                    </ul>
                </div>  
                : null  
            }
            
            <form onSubmit={submit}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' name='firstName' onChange={updateVal} value={firstName} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' name='lastName' onChange={updateVal} value={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input type="email" id='emailAddress' name='emailAddress' onChange={updateVal} value={emailAddress} />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' onChange={updateVal} value={password} />
                <button className='button' type='submit'>Sign Up</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
            <p>Already have a user account? Click here to <a href='/signin'>sign in</a>!</p>
        </div>
    )
}

export default SignUp
