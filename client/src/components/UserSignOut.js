import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context'

function SignOut() {
    //this will set the authenticated user value to '' empty so that the header will reset and private route will be unavailable again
    const { actions } = useContext(Context);
    useEffect(() => actions.signOut());
    return (
        <Redirect to='/' />
    )
}

export default SignOut
