import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
// routes
// import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes, MainRoutes]);
}
