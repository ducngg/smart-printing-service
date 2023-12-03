import { Dispatch } from 'redux';

import { User } from 'types';

import { loginSuccess, logoutUserSuccess } from './reducer';

export const login = (role: User['role']) => (dispatch: Dispatch) => {
  try {
    dispatch(
      loginSuccess({
        name: 'Hung',
        email: 'truongquochung@gmail.com',
        picture: 'https://picsum.photos/200/300',
        faculty: 'Faculty of Computer Science and Engineering',
        studentId: '2153414',
        role,
      })
    );

    localStorage.setItem('token', '123');
    localStorage.setItem('role', role);
  } catch (error) {
    return error;
  }
};

export const getProfile = () => (dispatch: Dispatch) => {
  try {
    let role = localStorage.getItem('role') as User['role'];
    if (!localStorage.getItem('token')) {
      throw new Error('No token');
    }
    if (!role) {
      role = 'User';
    }
    dispatch(
      loginSuccess({
        name: 'Hung',
        email: 'truongquochung@gmail.com',
        picture: 'https://picsum.photos/200/300',
        faculty: 'Faculty of Computer Science and Engineering',
        studentId: '2153414',
        role,
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
    localStorage.removeItem('role');
    dispatch(logoutUserSuccess());
  } catch (error) {
    return error;
  }
};
