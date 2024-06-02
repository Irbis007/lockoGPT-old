import { useState, useEffect, useId, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import useAppSelector from '@/store/hooks/useAppSelector';

import OverlayingPopup from '@/components/popups/OverlayingPopup';
import TemplatesPopup from '@/components/popups/TemplatesPopup/TemplatesPopup';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import { setPrompt } from '@/store/slices/promptSlice';
import { addMessage } from '@/store/slices/messagesSlice';
import { findTemplate } from '@/store/slices/templatesSlice';


type ChatPromptInputProps = {
  onSubmit: (file: FileList, prompt: string) => void;
  defaultValue: string;
};

interface IFormInput {
  prompt: string;
  file: FileList;
}

const StyledChatPromptInput = styled.form`
  overflow-y: auto;
  
  display: flex;
  align-items: center;
  column-gap: 20px;

  padding: 20px;
  max-height: 200px;
  
  border-radius: 12px;
  border: 2px solid #E7E7E7;

  background-color: #FFF;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  resize: none;
  
  font-size: 16px;
  font-weight: 400;
  
  color: #2E3038;
  background-color: transparent;

  overflow-y: hidden;

  &::placeholder {
    opacity: 1;
    color: #919191;
  }
`;

const StyledSubmitButton = styled.button`
  margin-top: auto;
  color: #2E3038;

  position: sticky;
  top: calc(100% - 25px);
  right: 0;
`;

const Badge = styled.div`
  position: absolute;

  top: -30%;
  right: -10%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 12px;
  height: 12px;

  font-size: 8px;
  font-weight: 700;
  
  border-radius: 100%;

  color: #FFF;
  background-color: #F49B4E;
`;

const Version = styled.div`
  position: absolute;
  font-size: 12px;
  margin-left: 24px;
  margin-top: 9px;
  color: #919191;
`;

const Templates = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const TemplateName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  padding: 10px 23px;
  border: 1px solid #E7E7E7;
  border-radius: 10px; 
`

const TemplateVariables = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
const Input = styled.input`
  padding: 10px;

  font-size: 14px;
  font-weight: 500;

  border-radius: 12px;
  border: 1px solid #e7e7e7;

  &::placeholder {
    opacity: 1;
    color: #919191;
  }
`;
const InputMain = styled.input`
width: 100%;
resize: none;

font-size: 16px;
font-weight: 400;

color: #2E3038;
background-color: transparent;

overflow-y: hidden;

&::placeholder {
  opacity: 1;
  color: #919191;
}
`;

const ChatPromptInput = ({ onSubmit, defaultValue }: ChatPromptInputProps) => {
  const { isSending: isMessagesSending } = useAppSelector(store => store.messages);
  const { activeId: activeConversationId, conversations, model } = useAppSelector(store => store.conversations);
  const {activeTemplate} = useAppSelector(store => store.templates);
  const [isTemplatesPopupOpen, setTemplatesPopupOpen] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputId = useId();

  const { register, handleSubmit, watch, reset, setValue, resetField } = useForm<IFormInput>();
  const textareaRegister = register('prompt', { required: true });
  const promptValue = watch('prompt', '');
  const fileValue = watch('file', undefined);

  const [fileInputDisabled, setFileInputDisabled] = useState(false);

  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [text3, setText3] = useState<string>('');
  const [text4, setText4] = useState<string>('');
  const [text5, setText5] = useState<string>('');
  

  const dispatch = useAppDispatch();

  useEffect(() => {
    reset();
    setValue('prompt', defaultValue);
  }, [setValue, reset, defaultValue]);

  const resize = () => {
    const textarea = textareaRef.current!;
    textarea.style.height = 'unset';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const form = formRef.current!;
    const textarea = textareaRef.current!;

    const inputHandler = () => {
      resize();
    };

    const keypressHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        form.requestSubmit();
        event.preventDefault();
      }
    };

    textarea.addEventListener('input', inputHandler);
    textarea.addEventListener('keypress', keypressHandler);

    return () => {
      textarea.removeEventListener('input', inputHandler);
      textarea.removeEventListener('keypress', keypressHandler);
    };
  }, []);

  

  useEffect(() => {
    if (activeConversationId === null) {
      return;
    }

    const conversation = conversations.find(conversation => conversation.id === activeConversationId);

    if (conversation === undefined) {
      return;
    }

    if (conversation.model === 'gpt-3.5-turbo') {
      resetField('file');
    }

    setFileInputDisabled(conversation.model === 'gpt-3.5-turbo');
  }, [activeConversationId, conversations, resetField]);

  const submitHandler: SubmitHandler<IFormInput> = ({ prompt, file }) => {

    
    dispatch(findTemplate(null))

    if (!prompt.length) {
      return;
    }
    dispatch(addMessage({role: 'user', content: editText(prompt)}))
    dispatch(setPrompt(editText(prompt)));
    onSubmit(file, editText(prompt));
    reset();
    resize();
  };

  const editText = (text:string): string => {
    let replacements: { [key: string]: string }  = {
      '[TEXT]': text1,
      '[TEXT1]': text1,
      '[TEXT2]': text2,
      '[TEXT3]': text3,
      '[TEXT4]': text4,
      '[TEXT5]': text5,
    };
    return text.replace(/\[TEXT([1-5])?\]/g, (match: string ) => replacements[match]);
  }

  return (
    <>
    {activeTemplate ? (
      <Templates>
      <TemplateName>
      {activeTemplate.name}
      <svg width="13" height="13" style={{cursor: 'pointer',}} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {dispatch(findTemplate(null)); setValue('prompt', '')}}>
        <path d="M12 12L1 1" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M1 12L12 1" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      </TemplateName>
      <TemplateVariables>     
        {activeTemplate.text2  ? <Input placeholder={activeTemplate.text2} required onChange={(e => setText2(e.target.value))}/> : null}
        {activeTemplate.text3  ? <Input placeholder={activeTemplate.text3} required onChange={(e => setText3(e.target.value))}/> : null}
        {activeTemplate.text4  ? <Input placeholder={activeTemplate.text4} required onChange={(e => setText4(e.target.value))}/> : null}
        {activeTemplate.text5  ? <Input placeholder={activeTemplate.text5} required onChange={(e => setText5(e.target.value))}/> : null}
      </TemplateVariables>
    </Templates>
    ) : null}
    
      <StyledChatPromptInput ref={formRef} onSubmit={handleSubmit(submitHandler)}>
        <input id={fileInputId} type='file' {...register('file')} style={{ display: 'none' }} disabled={fileValue !== undefined && fileValue.length > 0} />
        {
          !fileInputDisabled && !isMessagesSending &&
          <label htmlFor={fileInputId} style={{ cursor: 'pointer', userSelect: 'none', position: 'relative' }} onClick={(e) => {
            if (fileValue !== undefined && fileValue.length > 0) {
              resetField('file');
              e.preventDefault();
            }
          }}>
            <svg width="20" height="20" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M14.9152 8.70096L8.3101 15.3061C6.51233 17.1038 3.81613 17.3161 1.98318 15.4832C0.18541 13.6854 0.419062 11.0809 2.25201 9.24799L9.67685 1.82315C10.8132 0.686795 12.6426 0.686794 13.779 1.82315C14.9154 2.95951 14.9154 4.78895 13.779 5.92531L6.22379 13.4805C5.6574 14.0469 4.7391 14.0469 4.17272 13.4805C3.60633 12.9141 3.60633 11.9958 4.17272 11.4294L10.9082 4.69396" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {fileValue !== undefined && fileValue.length > 0 && <Badge>{fileValue.length}</Badge>}
          </label>
        }
        {activeTemplate?.text1 ? 
          <InputMain placeholder={activeTemplate.text1} onChange={(e => setText1(e.target.value))}/> : 
          <StyledTextarea
            {...textareaRegister}
            ref={event => {
              textareaRegister.ref(event);
              textareaRef.current = event;
            }}
            rows={1}
            placeholder={isMessagesSending ? 'Загрузка ответа AI...' : 'Введите сообщение'}
            required
            disabled={isMessagesSending}
          />
        }
        
        {
          !isMessagesSending && (promptValue.length && (activeTemplate?.text1 ? text1.length : true)
          && (activeTemplate?.text2 ? text2.length : true) && (activeTemplate?.text3 ? text3.length : true)
          && (activeTemplate?.text4 ? text4.length : true) && (activeTemplate?.text5 ? text5.length: true )
            ? (
              <StyledSubmitButton type='submit'>
                <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM12.79 10.53L9.26 14.06C9.11 14.21 8.92 14.28 8.73 14.28C8.54 14.28 8.35 14.21 8.2 14.06C7.91 13.77 7.91 13.29 8.2 13L11.2 10L8.2 7C7.91 6.71 7.91 6.23 8.2 5.94C8.49 5.65 8.97 5.65 9.26 5.94L12.79 9.47C13.09 9.76 13.09 10.24 12.79 10.53Z" fill="currentColor" />
                </svg>
              </StyledSubmitButton>
            ) : (
              <button onClick={() => setTemplatesPopupOpen(true)} type='button'>
                <svg width="25" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M3.5 18.5V7.5C3.5 3.5 4.5 2.5 8.5 2.5H15.5C19.5 2.5 20.5 3.5 20.5 7.5V17.5C20.5 17.64 20.5 17.78 20.49 17.92" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.35 15.5H20.5V19C20.5 20.93 18.93 22.5 17 22.5H7C5.07 22.5 3.5 20.93 3.5 19V18.35C3.5 16.78 4.78 15.5 6.35 15.5Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path opacity="0.4" d="M8 7.5H16" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path opacity="0.4" d="M8 11H13" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))
        }
        {isMessagesSending &&
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeDasharray={15} strokeDashoffset={15} strokeLinecap="round" strokeWidth={2} d="M12 3C16.9706 3 21 7.02944 21 12">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate>
              <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
            </path>
          </svg>
        }
      </StyledChatPromptInput>
      {
        isTemplatesPopupOpen && (
          <OverlayingPopup isOpened={isTemplatesPopupOpen}>
            <TemplatesPopup onClose={() => setTemplatesPopupOpen(false)} onUse={prompt => { setValue('prompt', prompt); resize(); }} />
          </OverlayingPopup>
        )
      }
      <Version>Версия чата: <span>{conversations.find(convo => convo.id === activeConversationId)?.model || model}</span></Version>
    </>
  ); 
};

export default ChatPromptInput;
