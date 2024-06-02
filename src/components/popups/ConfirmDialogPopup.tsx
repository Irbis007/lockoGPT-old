import styled from 'styled-components';

import Card from '../ui/Card';
import Button from '../ui/Button';

type ConfirmDialogPopupProps = {
  title: string;
  text: string;
  cancelButtonText: string;
  cancelButtonHandler: () => void;
  submitButtonText: string;
  submitButtonHandler: () => void;
};

const StyledCard = styled(Card)`
  padding: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 50px;
`;

const Title = styled.div`
  font-size: 34px;
`;

const CloseButton = styled.svg`
  width: 16px;
  height: 16px;

  cursor: pointer;
  user-select: none;
`;

const Text = styled.div`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  column-gap: 40px;
  margin-top: 40px;
`;

const ConfirmDialogPopup = ({ title, text, ...props }: ConfirmDialogPopupProps) => {
  return (
    <StyledCard>
      <Header>
        <div></div>
        <Title>{title}</Title>
        <CloseButton onClick={props.cancelButtonHandler} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 16L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 16L16 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </CloseButton>
      </Header>
      <Text>{text}</Text>
      <ButtonsWrapper>
        <Button onClick={props.cancelButtonHandler} type='button' $outlined $fluid>{props.cancelButtonText}</Button>
        <Button onClick={props.submitButtonHandler} type='button' $fluid>{props.submitButtonText}</Button>
      </ButtonsWrapper>
    </StyledCard>
  );
};

export default ConfirmDialogPopup;
