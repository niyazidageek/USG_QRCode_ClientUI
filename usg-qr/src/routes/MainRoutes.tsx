import { lazy } from 'react';

// project imports
import MainLayout from '../layouts/MainLayout';
import Loadable from '../components/Loadable';

// dashboard routing

const Dashboard = Loadable(lazy(() => import('../views/pages/dashboard')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        }
    ]
};

export default MainRoutes;
