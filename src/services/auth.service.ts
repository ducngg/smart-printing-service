import { API_URL } from 'config';
import { axios } from 'helpers/custom-axios';
import { ResponseData, User } from 'types';

const AuthService = {
  changePassword: async (oldSystemKey: string, newSystemKey: string) =>
    axios.post<ResponseData<User>>(`${API_URL}auth/system-key`, { oldSystemKey, newSystemKey }),
};

export default AuthService;
