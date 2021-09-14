import React, {useContext, useState} from 'react'
import { Context } from '../Context'
import { useHistory } from 'react-router-dom';

function SignIn(props) {
    let history = useHistory();
    const { actions, data } = useContext(Context);

    //react hook to set the account obj
    const [account, setAccount] = useState({
        emailAddress: '',
        password: '',
        errors:[]
    });

    //deconstruct variables
    const { emailAddress, password, errors } = account;

    //update val function to be used on an event in the input fields to update the values in the account state as the user types
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

        //sets the authenticated user context so that the application allows access to certain private Routes
        /**
         * if user received from the context actions.signIn function then set errors in account state to 'sign-in was unsuccessful' 
         * so that the users know the information they entered was wrong
         * else 
         * send if the func successfully fetched a user and 'signed-In' then redirect them to the pervious page they were on using history.goBack();
        */
        actions.signIn(emailAddress, password)
            .then((user) => {
                console.log(user)
                if (user === null) {
                    setAccount({ 
                        errors: ['Sign-in was unsuccessful'],
                        emailAddress: '',
                        password: ''
                    })
                } else {
                    history.goBack();
                    console.log('You\'ve signed in successfully');
                }
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            })
    
    }

    return (
        <div className='form--centered'>
            <h2>Sign In</h2>
            {/* if errors greater then 0 display the error messages else null */}
            {
                errors.length > 0 ?
                <div className='validation--errors'><h3>{errors}</h3></div>
                : null
            }
            <form onSubmit={submit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input type="email" id="emailAddress" name="emailAddress" onChange={updateVal} value={account.emailAddress} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={updateVal} value={account.password} />
                <button className="button" type='submit'>Sign In</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
            <p>Don't Have a user account? Click here to <a href='/signup'>sign up</a>!</p>
        </div>
    )
}

export default SignIn;
