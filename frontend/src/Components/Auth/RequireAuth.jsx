import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  //   if(isLoggedIn){
  //     if(allowedRoles.find((myRole) => myRole === role)){
  //         return <Outlet />
  //     }else{
  //         return <Navigate to='/denied' />
  //     }
  //   }else{
  //     return <Navigate to='/login' />
  //   }

  return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="login" />
  );
}

export default RequireAuth;
