import { useNavigate, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from "react-redux";
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';
import { useEffect } from 'react';
import { useValidateToken } from '../hooks/useValidateToken';
import { roles } from '../store/roles';
import { useAuthorize } from '../hooks/useAuthorize';


export default function ThemeRoutes() {
    const navigate = useNavigate();
    const a = useSelector((state:any)=>{
      console.log(state.authReducer)
    })
    const isLoggedIn = useSelector(
        (state:any) => state.authReducer.isLoggedIn && state.authReducer.jwt !== null
      );
      
    useValidateToken();

    const isAuthorizedMain = useAuthorize([roles.Admin, roles.Member])

    return useRoutes([AuthenticationRoutes(isLoggedIn), MainRoutes(isLoggedIn, isAuthorizedMain, navigate)]);
}
