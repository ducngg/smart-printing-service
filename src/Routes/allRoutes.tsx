import { Navigate } from 'react-router-dom';

import Login from 'pages/Authentication/login';
import Logout from 'pages/Authentication/Logout';
import NoPermission from 'pages/Authentication/NoPermission';
import NotFoundPage from 'pages/Utility/NotFound';

import Dashboard from '../pages/Dashboard';

type RouteObject = {
  path: string;
  component: JSX.Element;
  exact?: boolean;
};

const authProtectedRoutes: RouteObject[] = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/', exact: true, component: <Navigate to='/dashboard' /> },
];

const publicRoutes: RouteObject[] = [
  { path: '/login', component: <Login /> },
  { path: '/nopermission', component: <NoPermission /> },
  { path: '/logout', component: <Logout /> },
  { path: '*', component: <NotFoundPage /> },
];
export { authProtectedRoutes, publicRoutes };
