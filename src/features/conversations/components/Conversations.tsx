import { useEffect } from 'react';
import styled from 'styled-components';

import api from '@/utils/api';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import useAppSelector from '@/store/hooks/useAppSelector';
import { setActiveConversationId, fetchConversations, deleteConversation, renameConversation } from '@/store/slices/conversationsSlice';

import ConversationsItem from './ConversationsItem';



const StyledConversations = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const Title = styled.div`
  font-size: 34px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const ItemsContainerTitle = styled.div`
  font-size: 14px;
  color: #919191;
`;

const Conversations = () => {
  const dispatch = useAppDispatch();
  const { activeId, conversations, formattedConversations } = useAppSelector(store => store.conversations);

  const currentPrompt = useAppSelector(state => state.prompt.currentPrompt);

  useEffect(() => {  

    const abortController = new AbortController();
    dispatch(fetchConversations(abortController.signal));
    return () => abortController.abort();
    
  }, [dispatch]);

  useEffect(() => {
    const conversation = conversations.find(conversation => conversation.id === activeId);
    if (currentPrompt && activeId && conversation && (conversation?.name == 'gpt-3.5-turbo' || conversation?.name == 'gpt-4')) {
        let trimmedPrompt = currentPrompt;
        if (trimmedPrompt.length > 20) {
          trimmedPrompt = trimmedPrompt.substring(0, 20) + '...';  
        }
        onRenameConversation(activeId, trimmedPrompt);
    }    
  }, [currentPrompt]);

 

  const onActiveConversation = (id: number) => {
    dispatch(setActiveConversationId(id));
  };

  const onDeleteConversation = (id: number) => {
    api.delete(`conversations/${id}`);
    dispatch(deleteConversation(id));
    dispatch(setActiveConversationId(null));
  };

  const onRenameConversation = (id: number, name: string) => {
    api.put(`conversations/${id}`, { json: { name } });
    dispatch(renameConversation({ id, name }));
  };

  if (!conversations.length) {
    return null;
  }

  return (
    <StyledConversations>
      <Title>История</Title>
      {!!formattedConversations.today.length &&
        <ItemsContainer>
          <ItemsContainerTitle>Сегодня</ItemsContainerTitle>
          {formattedConversations.today.map(conversation =>
            <ConversationsItem key={conversation.id} id={conversation.id} name={conversation.name} onActive={onActiveConversation} isActive={conversation.id === activeId} onDelete={onDeleteConversation} onRename={onRenameConversation} />
          )}
        </ItemsContainer>
      }
      {!!formattedConversations.thisWeek.length &&
        <ItemsContainer>
          <ItemsContainerTitle>В течение недели</ItemsContainerTitle>
          {formattedConversations.thisWeek.map(conversation =>
            <ConversationsItem key={conversation.id} id={conversation.id} name={conversation.name} onActive={onActiveConversation} isActive={conversation.id === activeId} onDelete={onDeleteConversation} onRename={onRenameConversation} />
          )}
        </ItemsContainer>
      }
      {!!formattedConversations.thisMonth.length &&
        <ItemsContainer>
          <ItemsContainerTitle>В течение месяца</ItemsContainerTitle>
          {formattedConversations.thisMonth.map(conversation =>
            <ConversationsItem key={conversation.id} id={conversation.id} name={conversation.name} onActive={onActiveConversation} isActive={conversation.id === activeId} onDelete={onDeleteConversation} onRename={onRenameConversation} />
          )}
        </ItemsContainer>
      }
      {!!formattedConversations.later.length &&
        <ItemsContainer>
          <ItemsContainerTitle>Позднее</ItemsContainerTitle>
          {formattedConversations.later.map(conversation =>
            <ConversationsItem key={conversation.id} id={conversation.id} name={conversation.name} onActive={onActiveConversation} isActive={conversation.id === activeId} onDelete={onDeleteConversation} onRename={onRenameConversation} />
          )}
        </ItemsContainer>
      }
    </StyledConversations>
  );
};

export default Conversations;
