import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/components/Form';
import FormLabel from '@/components/ui/FormLabel';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { IPasswordResetForm } from '../models/forms';
import useResetPassword from '../hooks/useResetPassword';

type PasswordResetFormProps = {
  email: string;
  token: string;
};

const PasswordResetForm = ({ email, token }: PasswordResetFormProps) => {
  const resetPassword = useResetPassword();
  const navigate = useNavigate();

  const { handleSubmit, register, watch, formState: { errors } } = useForm<IPasswordResetForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<IPasswordResetForm> = data => {
    resetPassword({ ...data, email, token }).then(() => {
      navigate('/signin');
    });
  };

  const requiredOptions = {
    value: true,
    message: 'Это поле обязательно к заполнению'
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      body={
        <>
          <FormLabel label='Введите пароль' errorText={errors.password?.message}>
            <Input type='password' {...register('password', { required: requiredOptions })} />
          </FormLabel>
          <FormLabel label='Повторите пароль' errorText={errors.password_confirmation?.message}>
            <Input type='password' {...register('password_confirmation', {
              required: requiredOptions,
              validate: value => value === watch('password') || 'Проверьте правильность введённых данных'
            })} />
          </FormLabel>
        </>
      }
      footer={
        <Button type='submit' $fluid>Сохранить</Button>
      }
    />
  );
};

export default PasswordResetForm;
