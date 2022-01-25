import { lazy } from 'react';

// project imports
import Loadable from "../components/Loadable"
import AuthenticationLayout from '../layouts/AuthenticationLayout'

// login option 3 routing
const Login = Loadable(lazy(() => import('../views/pages/authentication/login/Login')));
const ForgotPassword = Loadable(lazy(() => import('../views/pages/authentication/login/ForgotPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //


const AuthenticationRoutes = {
    path: '/auth',
    element: <AuthenticationLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'forgotpassword',
            element: <ForgotPassword />
        }
    ]
};


export default AuthenticationRoutes;
