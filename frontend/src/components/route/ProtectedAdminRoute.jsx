import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NotAdmin from "../admin/NotAdmin";

const ProtectedAdminRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  return (
    !loading && (
      <Fragment>
        {isAuthenticated && user.role === "admin" ? <Outlet /> : <NotAdmin />}
      </Fragment>
    )
  );
};

export default ProtectedAdminRoute;
