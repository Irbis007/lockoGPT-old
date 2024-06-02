import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from '@/components/ui/Card';
import SigninForm from '@/features/authorization/forms/SigninForm';
import SignupForm from '@/features/authorization/forms/SignupForm';

interface AuthorizationPageProps {
  type: 'signin' | 'signup' | 'password-forgot' | 'password-reset';
}

const Page = styled.div`
  margin-inline: auto;
  margin-top: 75px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 40px;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 34px;
  text-align: center;
`;

const StyledCard = styled(Card)`
  margin: 50px auto 0 auto;
  padding: 25px 125px;
  min-width: 660px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const CardBody = styled.div`
  margin-block: 40px 20px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #0039A6;
  text-decoration: underline;
`;

const AuthorizationPage = ({ type }: AuthorizationPageProps) => {
  return (
    <Page>
      <Title>Добро пожаловать в LockoGPT</Title>
      <StyledCard>
        <CardHeader>
          <Subtitle>
            {type === 'signin' && 'Авторизация'}
            {type === 'signup' && 'Регистрация'}
          </Subtitle>
        </CardHeader>
        <CardBody>
          {type === 'signin' && <SigninForm />}
          {type === 'signup' && <SignupForm />}
        </CardBody>
        <CardFooter>
          {type === 'signin' && <>
            <StyledLink to='/forgot-password'>Не помню пароль</StyledLink>
            <div>Нет аккаунта? <StyledLink to='/signup'>Зарегиструйтесь</StyledLink></div>
          </>}
          {type === 'signup' && <div>У вас уже есть аккаунт? <StyledLink to='/signin'>Авторизуйтесь</StyledLink></div>}
        </CardFooter>
      </StyledCard>
    </Page>
  );
};

export default AuthorizationPage;
