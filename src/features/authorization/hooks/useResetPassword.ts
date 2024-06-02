import api from '@/utils/api';
import { IPasswordResetForm } from '../models/forms';

interface IPasswordResetInput extends IPasswordResetForm {
  token: string;
  email: string;
}

const useResetPassword = () => {
  return (data: IPasswordResetInput) =>
    api.post('password/reset', { json: data }).json<IPasswordResetInput>();
};

export default useResetPassword;
