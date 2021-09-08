import React, {useState} from 'react'
import Data from './Data';
// import Cookies from 'js-cookies';

export const Context = React.createContext();

export const Provider = (props) => {

    // const cookie = Cookies.get('authenticatedUser');

    const [authenticatedUser, setAuthenticatedUser] = useState(
        /*cookie ? JSON.parse(cookie): */ null
    )

    const [ data ] = useState(new Data());

    const signIn = async (emailAddress, password) => {
        const user = await data.getUser(emailAddress, password);
        if (user !== null) {
            user.password = password;
            setAuthenticatedUser(user)
            // Cookies.set('authenticatedUser', JSON.stringify(user), {expires:1});
            console.log(user)
        }
        return user;
    }

    const signOut = () => {
        setAuthenticatedUser(null);
        // Cookies.remove('authenticatedUser')
    }

    return (
        <Context.Provider value={{
            authenticatedUser,
            data,
            actions: {signIn, signOut}
        }}>
            {props.children}
        </Context.Provider>
    )
    
}
