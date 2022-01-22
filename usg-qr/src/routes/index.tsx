import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
// routes
// import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes]);
}
