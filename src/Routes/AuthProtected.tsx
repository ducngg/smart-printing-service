import React from 'react';
import { Navigate } from 'react-router-dom';

import useAppSelector from 'hooks/useAppSelector';
import { RootState } from 'slices';

type AuthProtectedProps = {
  children: React.ReactNode;
};

/**
 * Protected route
 * @props children - Page to be rendered
 * @props permissions - Permissions required to access the page
 * @props isManager - If the page is only for manager
 * @returns
 */
const AuthProtected = (
  { children }: AuthProtectedProps = {
    children: null,
  }
) => {
  const { isAuthenticated, loading } = useAppSelector((state: RootState) => state.Login);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;
