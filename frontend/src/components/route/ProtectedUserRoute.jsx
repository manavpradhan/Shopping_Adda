import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    !loading && (
      <Fragment>
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} />}
      </Fragment>
    )
  );
};

export default ProtectedUserRoute;
