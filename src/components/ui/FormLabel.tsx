import { ComponentProps } from 'react';
import styled from 'styled-components';

interface FormLabelProps {
  label: string;
  errorText?: string;
}

const StyledFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const FormLabelText = styled.span`
  padding-left: 15px;
  user-select: none;
`;

const FormLabelErrorText = styled.span`
  user-select: none;
  
  padding-left: 15px;
  color: #F93B3B;

  font-size: 12px;
  font-weight: 300;
  font-style: italic;
`;

const FormLabel = ({ label, errorText, children, ...props }: FormLabelProps & ComponentProps<'label'>) => {
  return (
    <StyledFormLabel {...props}>
      <FormLabelText>{label}</FormLabelText>
      {children}
      {errorText && <FormLabelErrorText>{errorText}</FormLabelErrorText>}
    </StyledFormLabel>
  );
};

export default FormLabel;
