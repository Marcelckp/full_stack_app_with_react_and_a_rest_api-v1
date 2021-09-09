import React, {useContext, useState} from 'react'
import { Context } from '../Context'
import { useHistory, Redirect } from 'react-router-dom';

function SignIn(props) {
    let history = useHistory();
    const { actions, data } = useContext(Context);

    const [account, setAccount] = useState({
        emailAddress: '',
        password: '',
        errors:[]
    });

    const { emailAddress, password, errors } = account;

    const updateVal = (e) => {
        setAccount(prevVal => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }))
    }

    const submit = (e) => {
        e.preventDefault();
        // console.log({emailAddress}, {password})

        const userVal =  data.getUser(emailAddress, password)
        console.log(userVal)

        actions.signIn(emailAddress, password)
            .then((user) => {
                console.log(user)
                if (user === null) {
                    setAccount({ errors: ['Sign-in was unsuccessful']})
                } else {
                    history.goBack();
                    console.log('You\'ve signed in successfully');
                }
            })
            .catch((err) => {
                console.log(err);
                return <Redirect to='/error' />
            })
    }

    return (
        <div className='form--centered'>
            <h2>Sign In</h2>
            {
                errors.length > 0 ?
                <div className='validation--errors'><h3>{errors}</h3></div>
                : null
            }
            <form onSubmit={submit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input type="email" id="emailAddress" name="emailAddress" onChange={updateVal} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={updateVal} />
                <button className="button" type='submit'>Sign In</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
            <p>Don't Have a user account? Click here to <a href='/signup'>sign up</a>!</p>
        </div>
    )
}

export default SignIn;
