import { FunctionComponent, useContext } from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthenticationLevels } from '../../Models/User';
import { UserContext } from '../../context';

interface IProtectedRoutes {
    authLevel: AuthenticationLevels;
}

export const ProtectedRoutes: FunctionComponent<IProtectedRoutes> = (
    props: IProtectedRoutes
) => {
    // This component protects users from accessing unwanted routes

    // The user should have logged in, if the user did not login, re-direct them to login
    // Get User Context
    const { user } = useContext(UserContext);

    const location = useLocation();
    const navigate = useNavigate();

    // Access User Context - check isAuthenticatedField
    if (!user?.isAuthenticated) {
        navigate('/');
    }

    if (props.authLevel === user?.authLevel) {
        return <Outlet />;
    } else {
        return <Navigate to='/' replace state={{ from: location }} />;
    }
};
