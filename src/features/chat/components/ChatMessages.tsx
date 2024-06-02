import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { IMessage } from '../models/api';
import ChatMessage from './ChatMessage';

type ChatMessagesProps = {
  messages: IMessage[];
};

const StyledChatMessages = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  
  overflow-y: auto;
`;

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
 

  useEffect(() => {
    const container = containerRef.current!;
    container.scrollTo({ top: container.scrollHeight, behavior: 'instant' });
  }, [messages]);

  return (
    <StyledChatMessages ref={containerRef}>
      {messages.map((message, messageIndex) => <ChatMessage key={messageIndex} role={message.role} content={message.content} files={message.files} />)}
    </StyledChatMessages>
  );
};

export default ChatMessages;
