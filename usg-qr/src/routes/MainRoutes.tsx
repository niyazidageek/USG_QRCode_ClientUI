import { lazy } from "react";

// project imports
import MainLayout from "../layouts/MainLayout";
import Loadable from "../components/Loadable";
import { Navigate } from "react-router-dom";

// dashboard routing

const Dashboard = Loadable(lazy(() => import("../views/pages/dashboard")));
const Settings = Loadable(lazy(() => import("../views/pages/settings")));
const Services = Loadable(lazy(() => import("../views/pages/services")));
const Books = Loadable(lazy(() => import("../views/pages/books")));
const Issues = Loadable(lazy(() => import("../views/pages/issues")));
const Clients = Loadable(lazy(() => import("../views/pages/clients")));
const Profile = Loadable(lazy(() => import("../views/pages/profile")));
const BookDetail = Loadable(lazy(() => import("../views/pages/books/bookDetail")));

const MainRoutes = (isLoggedIn: any, isAuhtorized: any, goBack: any) => ({
  path: "/",
  element:
    isLoggedIn && !isAuhtorized ? (
      goBack(-1)
    ) : isLoggedIn ? (
      <MainLayout />
    ) : (
      <Navigate to="/auth/login" />
    ),
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "services",
      element: <Services />,
    },
    {
      path: "books",
      element: <Books />,
    },
    {
      path: "books/:id",
      element: <BookDetail />,
    },
    {
      path: "issues",
      element: <Issues />,
    },
    {
      path: "clients",
      element: <Clients />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "profile/settings",
      element: <Profile />,
    },
  ],
});

export default MainRoutes;
