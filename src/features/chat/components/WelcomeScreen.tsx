import { FC, useMemo } from 'react';
import styled from 'styled-components';

import Logotype from '@/components/Logotype';
import useAppSelector from '@/store/hooks/useAppSelector';
import { IConversation } from '@/features/conversations/models';

const StyledWelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0 !important;
`;

const LogotypeWrapper = styled.div`
  margin-top: auto;
`;

const TemplatesContainer = styled.div`
  padding-inline: 80px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  width: 100%;
  margin-top: auto;
`;

const TemplatesItem = styled.button`
  width: 100%;
  padding: 15px 10px 15px 45px;

  display: flex;
  align-items: center;
  column-gap: 10px;

  font-size: 14px;
  font-weight: 400;

  color: #919191;

  border-radius: 12px;
  border: 2px solid #E7E7E7;

  transition: scale 250ms ease;

  &:hover,
  &:focus-visible {
    scale: 1.025;
  }
`;
const Helper = styled.div`
  font-size: 11px;
  line-height: 13px;
`;

const TemplatesItemText = styled.div`
  text-align:left;
`;

const WelcomeScreen: FC<{ setDefaultPromptValue: (prompt: string) => void }> = ({ setDefaultPromptValue }) => {
  const { activeId: activeConversationId, conversations } = useAppSelector(store => store.conversations);

  const conversation = useMemo<IConversation | undefined>(
    () => conversations.find(conversation => conversation.id === activeConversationId),
    [activeConversationId, conversations]
  );

  return (
    <StyledWelcomeScreen>
      <LogotypeWrapper>
        <Logotype size='large' orientation='vertical' />
      </LogotypeWrapper>
      <TemplatesContainer>
        <TemplatesItem onClick={() => setDefaultPromptValue('Перевести текст')} type='button'>
          <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 4.5H16.5C17.12 4.5 17.67 4.52 18.16 4.59C20.79 4.88 21.5 6.12 21.5 9.5V15.5C21.5 18.88 20.79 20.12 18.16 20.41C17.67 20.48 17.12 20.5 16.5 20.5H7.5C6.88 20.5 6.33 20.48 5.84 20.41C3.21 20.12 2.5 18.88 2.5 15.5V9.5C2.5 6.12 3.21 4.88 5.84 4.59C6.33 4.52 6.88 4.5 7.5 4.5Z" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M13.5 10.5H17" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M7 16H7.02H17" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M10.0946 10.5H10.1036" stroke="#2E3038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M7.0946 10.5H7.10359" stroke="#2E3038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <TemplatesItemText>
            Перевести текст
            <Helper>переведет текст с любого языка на русский</Helper>
          </TemplatesItemText>
          
        </TemplatesItem>
        <TemplatesItem onClick={() => setDefaultPromptValue('Написать формулу в Excel')} type='button'>
          <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 4.5H16.5C17.12 4.5 17.67 4.52 18.16 4.59C20.79 4.88 21.5 6.12 21.5 9.5V15.5C21.5 18.88 20.79 20.12 18.16 20.41C17.67 20.48 17.12 20.5 16.5 20.5H7.5C6.88 20.5 6.33 20.48 5.84 20.41C3.21 20.12 2.5 18.88 2.5 15.5V9.5C2.5 6.12 3.21 4.88 5.84 4.59C6.33 4.52 6.88 4.5 7.5 4.5Z" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M13.5 10.5H17" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M7 16H7.02H17" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M10.0946 10.5H10.1036" stroke="#2E3038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M7.0946 10.5H7.10359" stroke="#2E3038" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <TemplatesItemText>
            Написать формулу в Excel
            <Helper>напишет любую формулу для Excel или Google</Helper>
          </TemplatesItemText>
          
        </TemplatesItem>
        {(conversation?.model === 'gpt-4' || activeConversationId === null) &&
        (<TemplatesItem onClick={() => setDefaultPromptValue('Провести анализ документа')} type='button'>
          <svg width="25" height="25" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10.5V16.5C21 20.5 20 21.5 16 21.5H6C2 21.5 1 20.5 1 16.5V6.5C1 2.5 2 1.5 6 1.5H7.5C9 1.5 9.33 1.94 9.9 2.7L11.4 4.7C11.78 5.2 12 5.5 13 5.5H16C20 5.5 21 6.5 21 10.5Z" stroke="#2E3038" strokeWidth="1.5" strokeMiterlimit="10" />
          </svg>
          <TemplatesItemText>
            Провести анализ документа
            <Helper>проанализирует любой вложеный документ Word</Helper>
          </TemplatesItemText>
          
        </TemplatesItem> )
        }
        <TemplatesItem onClick={() => setDefaultPromptValue('Составь контент план')} type='button'>
          <svg width="25" height="25" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10.5V16.5C21 20.5 20 21.5 16 21.5H6C2 21.5 1 20.5 1 16.5V6.5C1 2.5 2 1.5 6 1.5H7.5C9 1.5 9.33 1.94 9.9 2.7L11.4 4.7C11.78 5.2 12 5.5 13 5.5H16C20 5.5 21 6.5 21 10.5Z" stroke="#2E3038" strokeWidth="1.5" strokeMiterlimit="10" />
          </svg>
          <TemplatesItemText>
            Составь контент план
            <Helper>напишет четко организованный контент план на любую тему</Helper>
          </TemplatesItemText>          
        </TemplatesItem>
        <TemplatesItem onClick={() => setDefaultPromptValue('Исправить проблему в коде')} type='button'>
          <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22.5H7C3 22.5 2 21.5 2 17.5V7.5C2 3.5 3 2.5 7 2.5H8.5C10 2.5 10.33 2.94001 10.9 3.70001L12.4 5.70001C12.78 6.20001 13 6.5 14 6.5H17C21 6.5 22 7.5 22 11.5V13.5" stroke="#2E3038" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M13.7601 18.82C11.4101 18.99 11.4101 22.39 13.7601 22.56H19.3201C19.9901 22.56 20.6501 22.31 21.1401 21.86C22.7901 20.42 21.91 17.54 19.74 17.27C18.96 12.58 12.1801 14.36 13.7801 18.83" stroke="#2E3038" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <TemplatesItemText>
            Исправить проблему в коде
            <Helper>напишет или исправит проблему с кодом на Python, Java, C#, PHP, SQL и т.д.</Helper>
          </TemplatesItemText>       
          
        </TemplatesItem>
        <TemplatesItem onClick={() => setDefaultPromptValue('Написать статью как эксперт')} type='button'>
          <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22.5H7C3 22.5 2 21.5 2 17.5V7.5C2 3.5 3 2.5 7 2.5H8.5C10 2.5 10.33 2.94001 10.9 3.70001L12.4 5.70001C12.78 6.20001 13 6.5 14 6.5H17C21 6.5 22 7.5 22 11.5V13.5" stroke="#2E3038" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M13.7601 18.82C11.4101 18.99 11.4101 22.39 13.7601 22.56H19.3201C19.9901 22.56 20.6501 22.31 21.1401 21.86C22.7901 20.42 21.91 17.54 19.74 17.27C18.96 12.58 12.1801 14.36 13.7801 18.83" stroke="#2E3038" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <TemplatesItemText>
            Написать статью как эксперт
            <Helper>напишет статью на любую тему от лица эксперта</Helper>
          </TemplatesItemText>       
          
        </TemplatesItem>
      </TemplatesContainer>
    </StyledWelcomeScreen>
  );
};

export default WelcomeScreen;
