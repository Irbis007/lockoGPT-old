import { HTTPError } from 'ky';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlice';

import api from '@/utils/api';
import { ISignupErrorResponse } from '../authorization/models/api';

import { IProfileForm } from './IProfileForm';

const useProfileUpdate = () => {
  const dispatch = useAppDispatch();

  return async (data: IProfileForm) => {
    try {
      await api.post('profile', { json: data });
      dispatch(setUser({ name: data.name, email: data.email, isAuthorized: true }));
      return null;
    } catch (error: unknown) {
      return (await (error as HTTPError).response.json() as ISignupErrorResponse);
    }
  };
};

export default useProfileUpdate;
