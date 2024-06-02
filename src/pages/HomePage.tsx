import styled from 'styled-components';

import Container from '@/layouts/Container';
import GPTVersionSelector from '@/components/GPTVersionSelector';
import Conversations from '@/features/conversations/components/Conversations';
import ChatScreen from '@/features/chat/components/ChatScreen';

const StyledHomePage = styled(Container)`
  display: flex;
  height: calc(100% - 81.11px);
`;

const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 300px);

  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

const Sidebar = styled.div`
  flex-shrink: 0;
  padding: 25px 15px 25px 15px;

  display: flex;
  flex-direction: column;
  row-gap: 20px;

  width: 300px;
  height: 100%;

  border-right: 1px solid #E7E7E7;
  overflow-y: auto;

  background: #f9f9f9;
`;

const HomePage = () => {
  return (
    <StyledHomePage>
      <Sidebar>
        <GPTVersionSelector />
        <Conversations />
      </Sidebar>
      <Wrapper>
        <ChatScreen />
      </Wrapper>
    </StyledHomePage>
  );
};

export default HomePage;
