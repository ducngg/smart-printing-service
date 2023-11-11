import { API_URL } from 'config';
import { axios } from 'helpers/custom-axios';
import { ResponseData, User } from 'types';

const UserService = {
  getMyProfile: async () => axios.get<ResponseData<User>>(`${API_URL}auth/me`),
};

export default UserService;
