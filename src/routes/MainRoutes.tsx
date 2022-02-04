import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import Loadable from "../components/Loadable";
import { Navigate } from "react-router-dom";

const Dashboard = Loadable(lazy(() => import("../views/pages/dashboard")));
const Settings = Loadable(lazy(() => import("../views/pages/settings")));
const Services = Loadable(lazy(() => import("../views/pages/services")));
const Books = Loadable(lazy(() => import("../views/pages/books")));
const Issues = Loadable(lazy(() => import("../views/pages/issues")));
const Clients = Loadable(lazy(() => import("../views/pages/clients")));
// const Profile = Loadable(lazy(() => import("../views/pages/profile")));
const BookDetail = Loadable(
  lazy(() => import("../views/pages/books/bookDetail"))
);
const IssueDetail = Loadable(
  lazy(() => import("../views/pages/issues/issueDetail"))
);
const ClientDetail = Loadable(
  lazy(() => import("../views/pages/clients/clientDetail"))
);
const ScanDetail = Loadable(
  lazy(() => import("../views/pages/scans/scanDetail"))
);
const Scans = Loadable(lazy(() => import("../views/pages/scans")));
const NotFound = Loadable(lazy(() => import("../views/pages/notfound")));

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
      path: "issues/:id",
      element: <IssueDetail />,
    },
    {
      path: "clients",
      element: <Clients />,
    },
    {
      path: "clients/:id",
      element: <ClientDetail />,
    },
    {
      path: "scans",
      element: <Scans />,
    },
    {
      path: "scans/:id",
      element: <ScanDetail />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
});

export default MainRoutes;
