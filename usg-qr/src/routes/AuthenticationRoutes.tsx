import { lazy } from 'react';

// project imports
import Loadable from "../components/Loadable"
import AuthenticationLayout from '../layouts/AuthenticationLayout'

// login option 3 routing
const Login = Loadable(lazy(() => import('../views/pages/authentication/login/Login')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //




const AuthenticationRoutes = {
    path: '/',
    element: <AuthenticationLayout />,
    children: [
        {
            path: '/login',
            element: <Login />
        }
    ]
};


export default AuthenticationRoutes;
