import { SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/components/Form';
import FormLabel from '@/components/ui/FormLabel';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { ISignupForm } from '../models/forms';
import useSignup from '../hooks/useSignup';

const SignupForm = () => {
  const signup = useSignup();

  const { handleSubmit, register, watch, setError, formState: { errors } } = useForm<ISignupForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<ISignupForm> = async data => {
    const result = await signup(data);

    if (result === null) {
      return;
    }

    result.errors?.name?.[0] && setError('name', { message: result.errors?.name?.[0] });
    result.errors?.email?.[0] && setError('email', { message: result.errors?.email?.[0] });
    result.errors?.password?.[0] && setError('password', { message: result.errors?.password?.[0] });
    result.errors?.password_confirmation?.[0] && setError('password_confirmation', { message: result.errors?.password_confirmation?.[0] });
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
          <FormLabel label='Введите имя' errorText={errors.name?.message}>
            <Input type='text' {...register('name', { required: requiredOptions })} />
          </FormLabel>
          <FormLabel label='Введите почту' errorText={errors.email?.message}>
            <Input type='email' {...register('email', { required: requiredOptions })} />
          </FormLabel>
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
        <Button type='submit' $fluid>Регистрация</Button>
      }
    />
  );
};

export default SignupForm;
