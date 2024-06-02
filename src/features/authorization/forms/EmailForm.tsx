import { SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/components/Form';
import FormLabel from '@/components/ui/FormLabel';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { IEmailForm } from '../models/forms';
import useForgotPassword from '../hooks/useForgotPassword';

const EmailForm = () => {
  const forgotPassword = useForgotPassword();
  const { handleSubmit, register, formState: { errors } } = useForm<IEmailForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<IEmailForm> = data => {
    forgotPassword(data).then(() => alert('Ссылка для восстановления пароля отправлена на почту'));
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      body={
        <FormLabel label='Введите почту' errorText={errors.email?.message}>
          <Input type='email' {...register('email', { required: { value: true, message: 'Это поле обязательно к заполнению' } })} />
        </FormLabel>
      }
      footer={
        <Button type='submit' $fluid>Отправить</Button>
      }
    />
  );
};

export default EmailForm;
