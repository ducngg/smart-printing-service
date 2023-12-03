import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import HorizotanlLayout from 'Layouts/HorizotanlLayout';
import NonAuthLayout from 'Layouts/NonLayout';
import VerticalLayout from 'Layouts/VerticalLayout';
import { authProtectedRoutes, publicRoutes } from 'Routes/allRoutes';
import AuthProtected from 'Routes/AuthProtected';
import { RootState } from 'slices';
import { getProfile } from 'slices/thunk';
import { LayoutTypes } from 'types';

import './assets/scss/theme.scss';
import 'react-toastify/dist/ReactToastify.css';

const getLayout = (layoutType: LayoutTypes) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case LayoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case LayoutTypes.HORIZONTAL:
      Layout = HorizotanlLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const App = () => {
  const { layoutTypes } = useAppSelector((state: RootState) => ({
    layoutTypes: state.Layout.layoutTypes,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const Layout = getLayout(layoutTypes);

  const { user } = useAppSelector((state: RootState) => state.Login);

  return (
    <Suspense fallback={null}>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
          />
        ))}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <React.Fragment>
                <AuthProtected>
                  <Layout>{route.component}</Layout>
                </AuthProtected>
              </React.Fragment>
            }
          />
        ))}
        <Route
          path='/'
          element={
            <Navigate
              to={
                user?.role === 'User'
                  ? 'print-documents'
                  : user?.role === 'Manage'
                  ? 'manage-printer'
                  : user?.role === 'Financial'
                  ? 'expense-report'
                  : 'reported-issues'
              }
              replace={true}
            />
          }
        />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </Suspense>
  );
};

export default App;
