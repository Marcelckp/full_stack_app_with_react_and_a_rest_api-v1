import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authenticatedUser } = useContext(Context);
    //if (authenticatedUser) is true then allow then to access the route else redirect then to the sign in page/route
    
    return (
            <Route 
                {...rest}
                render={props => authenticatedUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname:'/signin',
                        state: {from: props.location}
                    }} />
                )} />)
}

export default PrivateRoute;