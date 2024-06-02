import api from '@/utils/api';
import { IEmailForm } from '../models/forms';

const useForgotPassword = () => {
  return (data: IEmailForm) =>
    api.post('password/forgot', { json: data }).json();
};

export default useForgotPassword;
