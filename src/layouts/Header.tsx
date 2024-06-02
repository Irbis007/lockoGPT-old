import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

import Container from './Container';
import Logotype from '@/components/Logotype';
import StyledButton from '@/components/ui/Button';
import ProfileBadge from '@/components/ProfileBadge';

import useAuth from '@/features/authorization/hooks/useAuth';

const StyledHeader = styled.div`
  padding-block: 15px;
  border-bottom: 1px solid #E7E7E7;
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  const { pathname } = useLocation();
  const { name, isAuthorized } = useAuth();

  return (
    <StyledHeader>
      <StyledContainer>
        <Link to='/'><Logotype size='medium' orientation='horizontal' /></Link>
        {isAuthorized && (
          pathname === '/profile'
            ? <Link to='/'><StyledButton type='button'>Вернуться в LockoGPT</StyledButton></Link>
            : <Link to='/profile'><ProfileBadge fullName={name} /></Link>
        )}
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
