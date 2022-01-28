import { lazy } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Loadable from "../components/Loadable"
import AuthenticationLayout from '../layouts/AuthenticationLayout'

const Login = Loadable(lazy(() => import('../views/pages/authentication/login/Login')));
const ForgotPassword = Loadable(lazy(() => import('../views/pages/authentication/login/ForgotPassword')));



const AuthenticationRoutes = (isLoggedIn:any) => ({
    path: '/auth',
    element:  <AuthenticationLayout/>,
    children: [
        {
            path: 'login',
            element: isLoggedIn ? <Navigate to='/' /> : <Login />
        },
        {
            path: 'forgotpassword',
            element: isLoggedIn ? <Navigate to='/' /> : <Login />   
        }
    ]
});



export default AuthenticationRoutes;
