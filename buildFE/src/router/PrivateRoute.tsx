import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<any> = ({ children }) => {
  let user = useSelector((state: any) => state.user);

  return <div>{user ? children : <Navigate to={"/auth/login"} />}</div>;
};

export default PrivateRoute;
