import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const AuthGuard = ({ children }) => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthGuard;
