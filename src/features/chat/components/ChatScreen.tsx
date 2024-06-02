import { useEffect, useState } from "react";
import styled from "styled-components";

import useAppDispatch from "@/store/hooks/useAppDispatch";
import useAppSelector from "@/store/hooks/useAppSelector";

import { fetchConversations, setActiveConversationId } from "@/store/slices/conversationsSlice";
import { fetchMessages, sendMessage, setMessagesIsSending, setMessagesLoading } from "@/store/slices/messagesSlice";

import api from "@/utils/api";
import { IConversation } from "@/features/conversations/models";

import ChatMessages from "@/features/chat/components/ChatMessages";
import PreloaderScreen from "./PreloaderScreen";
import WelcomeScreen from "@/features/chat/components/WelcomeScreen";
import ChatPromptInput from "@/features/chat/components/ChatPromptInput";



const ChatPromptInputWrapper = styled.div`
  position: absolute;

  bottom: 0;
  width: 100%;

  padding-inline: 80px;
  padding-bottom: 40px;
  background: #fff;
`;

const ChatScreen = () => {
  const { activeTemplate } = useAppSelector((store) => store.templates);

  const StyledChatScreen = styled.div`
  display: flex;
  height: 100%;
  padding-bottom: calc( ${activeTemplate ? '210px' : '107.22px'} + 40px);

  > :first-child {
    margin-top: auto;
  }
`;

  const dispatch = useAppDispatch();
  const { activeId: activeConservationId, model } = useAppSelector((store) => store.conversations);
  const { isSending: isMessagesSending } = useAppSelector((store) => store.messages);
  const { messages, isLoading, plugMessages } = useAppSelector((store) => store.messages);
  const [defaultPromptValue, setDefaultPromptValue] = useState("");

  useEffect(() => {
    if (activeConservationId === null) {
      return;
    }

    const abortController = new AbortController();

    dispatch(
      fetchMessages({
        conversationId: activeConservationId,
        abortSignal: abortController.signal,
      })
    );

    return () => abortController.abort();
  }, [activeConservationId, dispatch]);

  const onPromptSubmit = (files: FileList | undefined, prompt: string) => {
    if (activeConservationId === null) {
      dispatch(setMessagesIsSending(true));
      dispatch(setMessagesLoading(true))
      api
        .post("conversations", { json: { name: prompt, model: model} })
        .json<IConversation>()
        .then((conversation) => {
          dispatch(setActiveConversationId(conversation.id));
          dispatch(fetchConversations());
          dispatch(sendMessage({ conversationId: conversation.id, prompt, file: files?.[0] }));
        })
        .catch(() => {
          dispatch(setMessagesIsSending(false));
        })
        .finally(() => {
          dispatch(setMessagesLoading(false))
        })
    } else {
      dispatch(sendMessage({ conversationId: activeConservationId, prompt, file: files?.[0] }));
    }
  };

  return (
    <>
      <StyledChatScreen>
        {isLoading && <PreloaderScreen />}
        {!isLoading  && 
          (messages.length || plugMessages.length ? (
            <ChatMessages messages={!isMessagesSending ? messages : [...messages, ...plugMessages]} />
          ) : (
            <WelcomeScreen setDefaultPromptValue={setDefaultPromptValue} />
          ))}
      </StyledChatScreen>
      <ChatPromptInputWrapper>
        
        <ChatPromptInput onSubmit={onPromptSubmit} defaultValue={defaultPromptValue} />
      </ChatPromptInputWrapper>
    </>
  );
};

export default ChatScreen;
