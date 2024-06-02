import { useState, ComponentProps, forwardRef, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

const StyledInputBox = css`
  padding: 10px 15px;
  border-radius: 12px;
  border: 2px solid rgb(231, 231, 231);
  background-color: #FFF;
`;

const StyledInput = styled.input`
  ${StyledInputBox}
`;

const StyledPasswordInput = styled.input`
  ${StyledInputBox}
  padding-right: 55px;
`;

const StyledPasswordInputWrapper = styled.div`
  position: relative;
`;

const StyledPasswordInputIcon = styled.svg`
  position: absolute;
  translate: 0 -50%;

  top: 50%;
  right: 15px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  user-select: none;
`;

const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setVisible(isVisible => !isVisible);
  };

  return (
    <StyledPasswordInputWrapper>
      <StyledPasswordInput ref={ref} {...props} type={isVisible ? 'text' : 'password'} />
      {
        isVisible
          ? <StyledPasswordInputIcon fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleVisibility}>
            <path d="M12 15.58c-1.98 0-3.58-1.6-3.58-3.58s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58-1.6 3.58-3.58 3.58Z" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" opacity=".4" />
            <path d="M21.11 14.59c.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68 3.53 0 6.82-2.08 9.11-5.68Z" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" />
          </StyledPasswordInputIcon>
          : <StyledPasswordInputIcon fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleVisibility}>
            <path d="M9.47 14.53a3.576 3.576 0 1 1 5.06-5.06l-5.06 5.06Z" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity=".4" />
            <path d="M15.51 12.7a3.566 3.566 0 0 1-2.82 2.82" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity=".4" />
            <path d="M9.47 14.53 2 22M22 2l-7.47 7.47" stroke="#292D32" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          </StyledPasswordInputIcon>
      }
    </StyledPasswordInputWrapper>
  );
});

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => {
  if (props.type === 'password') {
    return <PasswordInput ref={ref} {...props} />;
  }

  return <StyledInput ref={ref} {...props} />;
});

export default Input;
