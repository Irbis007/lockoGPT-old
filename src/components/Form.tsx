import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';

interface FormProps {
  body: ReactNode;
  footer: ReactNode;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const FormFooter = styled.div``;

const Form = ({ body, footer, ...props }: FormProps & ComponentProps<'form'>) => {
  return (
    <StyledForm {...props}>
      <FormBody>{body}</FormBody>
      <FormFooter>{footer}</FormFooter>
    </StyledForm>
  );
};

export default Form;
