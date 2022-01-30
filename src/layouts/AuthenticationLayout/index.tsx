import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MinimalLayout = () => {
  return <Outlet />;
};

export default MinimalLayout;
