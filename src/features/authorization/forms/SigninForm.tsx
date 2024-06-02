import { SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/components/Form';
import FormLabel from '@/components/ui/FormLabel';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { ISigninForm } from '../models/forms';
import useSignin from '../hooks/useSignin';

const SigninForm = () => {
  const signin = useSignin();

  const { handleSubmit, register, setError, formState: { errors } } = useForm<ISigninForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<ISigninForm> = data => {
    signin(data).catch(() => {
      setError('email', { message: 'Проверьте правильность введённых данных' });
      setError('password', { message: 'Проверьте правильность введённых данных' });
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
          <FormLabel label='Введите почту' errorText={errors.email?.message}>
            <Input type='email' {...register('email', { required: requiredOptions })} />
          </FormLabel>
          <FormLabel label='Введите пароль' errorText={errors.password?.message}>
            <Input type='password' {...register('password', { required: requiredOptions })} />
          </FormLabel>
        </>
      }
      footer={
        <Button type='submit' $fluid>Войти</Button>
      }
    />
  );
};

export default SigninForm;
