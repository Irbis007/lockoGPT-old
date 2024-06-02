import api from '@/utils/api';
import { HTTPError } from 'ky';
import { ISignupForm } from '../models/forms';
import { AuthResponse } from '../models/api';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlice';

import { ISignupErrorResponse } from '../models/api';

const useSignup = () => {
  const dispatch = useAppDispatch();

  return async (data: ISignupForm) => {
    try {
      const response = await api.post('register', { json: data });
      const { data: { name, email }, access_token } = await response.json<AuthResponse>();

      localStorage.setItem('token', access_token);
      dispatch(setUser({ name, email, isAuthorized: true }));

      return null;
    } catch (error: unknown) {
      return (await (error as HTTPError).response.json() as ISignupErrorResponse);
    }
  };
};

export default useSignup;
