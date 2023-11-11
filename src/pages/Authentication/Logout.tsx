import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import withRouter from 'Components/Common/withRouter';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RootState } from 'slices';

import { logoutUser } from '../../slices/thunk';

//redux

const Logout = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state: RootState) => ({
    isAuthenticated: state.Login.isAuthenticated,
  }));

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <></>;
};

export default withRouter(Logout);
