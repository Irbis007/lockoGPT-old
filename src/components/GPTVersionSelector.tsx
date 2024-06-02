import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFloating, autoUpdate, useInteractions, useClick, useDismiss, FloatingPortal } from '@floating-ui/react';

import useAppSelector from '@/store/hooks/useAppSelector';
import useAppDispatch from '@/store/hooks/useAppDispatch';

import { setActiveConversationId, setModel } from '@/store/slices/conversationsSlice';

// import api from '@/utils/api';
// import { IConversation } from '@/features/conversations/models';

import Logotype from './Logotype';
import { clearMessages } from '@/store/slices/messagesSlice';

type Version = 'gpt-3.5-turbo' | 'gpt-4';

const Button = styled.button<{ $isExpanded: boolean; $isHide?: boolean }>`
  padding: 10px;
  width: 100%;

  display: flex;
  align-items: center;
  column-gap: 15px;

  border: 1px solid #E7E7E7;
  border-radius: 12px;
  justify-content: center;
  background: #fff;

  ${({ $isExpanded }) => $isExpanded && `
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  `}

  ${({ $isHide }) => $isHide && `
    display:none;
  `}
`;

const ItemsContainer = styled.div`
  border: 1px solid #E7E7E7;
  border-top: none;

  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;

  background-color: #FFF;
`;

const Item = styled.button<{ $isActive?: boolean; }>`
  padding: 10px;

  display: flex;
  column-gap: 10x;

  ${({ $isActive }) => !!$isActive && 'background-color: #00A1DE0D;'}
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const ItemTitle = styled.div`
  font-size: 14px;
  text-align: left;
`;

const ItemDescription = styled.div`
  font-size: 12px;
  color: #919191;
  text-align: left;
`;

const StateIcon = ({ isActive }: { isActive?: boolean; }) => {
  return (
    isActive ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.47021 10.74L12.0002 14.26L15.5302 10.74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  );
};

const GPTVersionSelector = () => {
  const dispatch = useAppDispatch();
  const { activeId: activeConversationId, conversations, model } = useAppSelector(store => store.conversations);
  
  const isHide = false;

  const [isExpanded, setExpanded] = useState(false);
  const [buttonWidth, setButtonWidth] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(model);
  const [isDisabled, setDisabled] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isExpanded,
    onOpenChange: setExpanded,
    whileElementsMounted: autoUpdate
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context)
  ]);

  useEffect(() => {
    if (refs.reference.current !== null) {
      setButtonWidth(getComputedStyle(refs.reference.current as Element).width);
    }
  }, [refs.reference, isExpanded]);

  useEffect(() => {
    const conversation = conversations.find(conversation => conversation.id === activeConversationId);

    if (conversation === undefined) {
      return;
    }

    setSelectedVersion(conversation.model);
  }, [activeConversationId, conversations]);

  const createNewConversation = (model: Version) => {
    
    // setDisabled(true);
    // api.post('conversations', { json: { name: model, model } }).json<IConversation>().then(conversation => {
    //   dispatch(setActiveConversationId(conversation.id));
    //   dispatch(fetchConversations());
    // }).finally(() => {
    //   setExpanded(false);
    //   setDisabled(false);
    // });
    dispatch(setModel(model))
    setExpanded(false)
    setSelectedVersion(model);
    setDisabled(false)
    dispatch(setActiveConversationId(null))
    dispatch(clearMessages())
  };

  return (
    <>
      <Button  ref={refs.setReference} {...getReferenceProps()} type='button' $isExpanded={isExpanded} $isHide={isHide} >
        <Logotype size='small' orientation='horizontal' />
        <svg width="18" height="18" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.00002 8.79989C8.30002 8.79989 7.60002 8.52989 7.07002 7.99989L0.55002 1.47989C0.26002 1.18989 0.26002 0.709893 0.55002 0.419893C0.84002 0.129893 1.32002 0.129893 1.61002 0.419893L8.13002 6.93989C8.61002 7.41989 9.39002 7.41989 9.87002 6.93989L16.39 0.419893C16.68 0.129893 17.16 0.129893 17.45 0.419893C17.74 0.709893 17.74 1.18989 17.45 1.47989L10.93 7.99989C10.4 8.52989 9.70002 8.79989 9.00002 8.79989Z" fill="currentColor" />
        </svg>
      </Button>
      {
        isExpanded && (
          <FloatingPortal>
            <ItemsContainer
              ref={refs.setFloating}
              style={{ ...floatingStyles, width: buttonWidth }}
              {...getFloatingProps()}
            >
              <Item onClick={() => createNewConversation('gpt-3.5-turbo')} $isActive={selectedVersion === 'gpt-3.5-turbo' ? true : false} type='button' disabled={isDisabled}>
                <ItemWrapper>
                  <ItemTitle>GPT-3,5</ItemTitle>
                  <ItemDescription>Использование без ограничений каждый день</ItemDescription>
                </ItemWrapper>
                <StateIcon isActive={selectedVersion === 'gpt-3.5-turbo' ? true : false} />
              </Item>
              <Item onClick={() => createNewConversation('gpt-4')} $isActive={selectedVersion === 'gpt-4' ? true : false} type='button' disabled={isDisabled}>
                <ItemWrapper>
                  <ItemTitle>GPT-4</ItemTitle>
                  <ItemDescription>Для сложных задач (работа с файлами)</ItemDescription>
                </ItemWrapper>
                <StateIcon isActive={selectedVersion === 'gpt-4' ? true : false} />
              </Item>
            </ItemsContainer>
          </FloatingPortal>
        )
      } 
      { (selectedVersion === 'gpt-3.5-turbo' || selectedVersion === 'gpt-4') && (
            <Button  type='button' onClick={() => createNewConversation(model)} $isExpanded={isExpanded}>             
              Начать новый чат
            </Button>
        )
      }

    </>
  );
};

export default GPTVersionSelector;
