import api from '@/utils/api';

import { ISigninForm } from '../models/forms';
import { AuthResponse } from '../models/api';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlice';

const useSignin = () => {
  const dispatch = useAppDispatch();

  return (data: ISigninForm) => {
    return api.post('login', { json: data }).json<AuthResponse>().then(({ data: { name, email }, access_token }) => {
      localStorage.setItem('token', access_token);
      dispatch(setUser({ name, email, isAuthorized: true }));
    });
  };
};

export default useSignin;
