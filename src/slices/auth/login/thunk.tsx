import { Dispatch } from 'redux';

import { loginSuccess, logoutUserSuccess } from './reducer';

export const login = () => (dispatch: Dispatch) => {
  try {
    dispatch(
      loginSuccess({
        name: 'Hung',
        email: 'truongquochung@gmail.com',
        picture: 'https://picsum.photos/200/300',
      })
    );

    localStorage.setItem('token', '123');
  } catch (error) {
    return error;
  }
};

export const getProfile = () => (dispatch: Dispatch) => {
  try {
    if (!localStorage.getItem('token')) {
      throw new Error('No token');
    }
    dispatch(
      loginSuccess({
        name: 'Hung',
        email: 'truongquochung@gmail.com',
        picture: 'https://picsum.photos/200/300',
      })
    );
  } catch (error) {
    localStorage.removeItem('token');
    dispatch(logoutUserSuccess());
  }
};

export const logoutUser = () => (dispatch: Dispatch) => {
  try {
    localStorage.removeItem('token');
    dispatch(logoutUserSuccess());
  } catch (error) {
    return error;
  }
};
