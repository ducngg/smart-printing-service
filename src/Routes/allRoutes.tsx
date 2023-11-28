import { Navigate } from 'react-router-dom';

import Login from 'pages/Authentication/login';
import Logout from 'pages/Authentication/Logout';
import NoPermission from 'pages/Authentication/NoPermission';
import BuyPage from 'pages/User/BuyPage';
import PrintDocuments from 'pages/User/PrintDocuments';
import PrintHistory from 'pages/User/PrintHistory';
import Report from 'pages/User/Report';
import UserProfile from 'pages/User/UserProfile';
import NotFoundPage from 'pages/Utility/NotFound';

type RouteObject = {
  path: string;
  component: JSX.Element;
  exact?: boolean;
};

const authProtectedRoutes: RouteObject[] = [
  { path: '/print-documents', component: <PrintDocuments /> },
  { path: '/print-history', component: <PrintHistory /> },
  { path: '/buy-page', component: <BuyPage /> },
  { path: '/profile', component: <UserProfile /> },
  { path: '/report', component: <Report /> },
  { path: '/', exact: true, component: <Navigate to='/print-documents' /> },
];

const publicRoutes: RouteObject[] = [
  { path: '/login', component: <Login /> },
  { path: '/nopermission', component: <NoPermission /> },
  { path: '/logout', component: <Logout /> },
  { path: '*', component: <NotFoundPage /> },
];
export { authProtectedRoutes, publicRoutes };
