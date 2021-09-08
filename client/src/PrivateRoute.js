import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authenticatedUser } = useContext(Context);
    return (<Route 
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