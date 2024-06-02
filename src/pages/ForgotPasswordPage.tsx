import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from '@/components/ui/Card';
import EmailForm from '@/features/authorization/forms/EmailForm';
import PasswordResetForm from '@/features/authorization/forms/PasswordResetForm';

import useQuery from '@/hooks/useQuery';

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

const ForgotPasswordPage = () => {
  const query = useQuery();

  return (
    <Page>
      <Title>Восстановление пароля</Title>
      <StyledCard>
        <CardHeader>
          <Subtitle>
            {query.has('token') && query.has('email') ? 'Подтверждение пароля' : 'Восстановление пароля'}
          </Subtitle>
        </CardHeader>
        <CardBody>
          {query.has('token') && query.has('email') ? <PasswordResetForm email={query.get('email')!} token={query.get('token')!} /> : <EmailForm />}
        </CardBody>
        {
          !query.has('token') && !query.has('email') &&
          <CardFooter>
            <StyledLink to='/signin'>Вспомнил пароль</StyledLink>
          </CardFooter>
        }
      </StyledCard>
    </Page>
  );
};

export default ForgotPasswordPage;
