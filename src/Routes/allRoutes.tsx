import Login from 'pages/Authentication/login';
import Logout from 'pages/Authentication/Logout';
import NoPermission from 'pages/Authentication/NoPermission';
import ManagerPrinters from 'pages/Manager/ManagePrinters';
import SysConfig from 'pages/Manager/SysConfig';
import SystemUsage from 'pages/Manager/SystemUsage';
import BuyPage from 'pages/User/BuyPage';
import PrintDocuments from 'pages/User/PrintDocuments';
import PrintHistory from 'pages/User/PrintHistory';
import Report from 'pages/User/Report';
import UserProfile from 'pages/User/UserProfile';
import NotFoundPage from 'pages/Utility/NotFound';
import StarterPage from 'pages/Utility/Starter';
import { User } from 'types';

type RouteObject = {
  path: string;
  component: JSX.Element;
  exact?: boolean;
  role?: User['role'];
};

const authProtectedRoutes: RouteObject[] = [
  { path: '/print-documents', component: <PrintDocuments />, role: 'User' },
  { path: '/print-history', component: <PrintHistory />, role: 'User' },
  { path: '/buy-page', component: <BuyPage />, role: 'User' },
  { path: '/manage-printer', component: <ManagerPrinters />, role: 'Manage' },
  { path: '/system-usage', component: <SystemUsage />, role: 'Manage' },
  { path: '/system-config', component: <SysConfig />, role: 'Manage' },
  { path: '/expense-report', component: <StarterPage />, role: 'Financial' },
  { path: '/expense-categories', component: <StarterPage />, role: 'Financial' },
  { path: '/reported-issues', component: <StarterPage />, role: 'Technical' },
  { path: '/notify-maintanence', component: <StarterPage />, role: 'Technical' },
  { path: '/printer-status', component: <StarterPage />, role: 'Technical' },
  { path: '/profile', component: <UserProfile /> },
  { path: '/report', component: <Report /> },
];

const publicRoutes: RouteObject[] = [
  { path: '/login', component: <Login /> },
  { path: '/nopermission', component: <NoPermission /> },
  { path: '/logout', component: <Logout /> },
  { path: '*', component: <NotFoundPage /> },
];
export { authProtectedRoutes, publicRoutes };
