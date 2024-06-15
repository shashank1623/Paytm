import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
    alert("Please login or signup to access this page")
  return token ? element : <Navigate to="/signin" />;
};


