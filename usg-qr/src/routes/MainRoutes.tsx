import { lazy } from 'react';

// project imports
import MainLayout from '../layouts/MainLayout';
import Loadable from '../components/Loadable';

// dashboard routing

const Dashboard = Loadable(lazy(() => import('../views/pages/dashboard')));
const Settings = Loadable(lazy(() => import('../views/pages/settings')));
const Services = Loadable(lazy(() => import('../views/pages/services')));
const Books = Loadable(lazy(() => import('../views/pages/books')));
const Issues = Loadable(lazy(() => import('../views/pages/issues')));
const Clients = Loadable(lazy(() => import('../views/pages/clients')));



const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'settings',
            element: <Settings />
        },
        {
            path: 'services',
            element: <Services />
        },
        {
            path: 'books',
            element: <Books />
        },
        {
            path: 'issues',
            element: <Issues />
        },
        {
            path: 'clients',
            element: <Clients />
        }
    ]
};

export default MainRoutes;
