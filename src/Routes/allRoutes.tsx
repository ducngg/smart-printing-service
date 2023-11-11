import { Navigate } from 'react-router-dom';

import Login from 'pages/Authentication/login';
import Logout from 'pages/Authentication/Logout';
import NoPermission from 'pages/Authentication/NoPermission';
import PrintDocuments from 'pages/User/PrintDocuments';
import NotFoundPage from 'pages/Utility/NotFound';

type RouteObject = {
  path: string;
  component: JSX.Element;
  exact?: boolean;
};

const authProtectedRoutes: RouteObject[] = [
  { path: '/print-documents', component: <PrintDocuments /> },
  { path: '/', exact: true, component: <Navigate to='/print-documents' /> },
];

const publicRoutes: RouteObject[] = [
  { path: '/login', component: <Login /> },
  { path: '/nopermission', component: <NoPermission /> },
  { path: '/logout', component: <Logout /> },
  { path: '*', component: <NotFoundPage /> },
];
export { authProtectedRoutes, publicRoutes };
