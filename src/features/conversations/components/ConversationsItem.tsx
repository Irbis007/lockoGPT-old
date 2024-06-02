import { useState, useEffect, memo, useRef } from 'react';
import styled from 'styled-components';

type ConversationsItemProps = {
  id: number;
  name: string;
  isActive?: boolean;
  onActive: (id: number) => void;
  onDelete: (id: number) => void;
  onRename: (id: number, name: string) => void;
};

const StyledConversationsItem = styled.button<{ $isActive: boolean; }>`
  width: 100%;

  display: flex;
  align-items: center;
  
  text-align: left;

  border-radius: 10px;
  background-color: ${({ $isActive }) => $isActive ? '#F2FAFD' : 'transparent'};

  &:hover,
  &:focus-visible {
    background-color: #F2FAFD;
  }
`;

const TextContainer = styled.input`
  padding: 10px;
  width: 100%;
  
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;

  overflow-x: hidden;
  white-space: nowrap;

  &:read-only {
    cursor: pointer;
  }
`;

const ButtonsContainer = styled.div`
  flex-shrink: 0;
  padding-right: 10px;

  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const ConversationsItem = memo(({ id, name, isActive, onActive, onDelete, onRename }: ConversationsItemProps) => {
  const [isEditMode, setEditMode] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const textContainerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!event.composedPath().includes(buttonRef.current!) && isEditMode) {
        setEditMode(false);
        textContainerRef.current!.value = name;
      }
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [isEditMode, name]);

  useEffect(() => {
    if (textContainerRef.current !== null) {
      textContainerRef.current.value = name;
    }
  }, [name]);

  useEffect(() => {
    if (isEditMode) {
      textContainerRef.current?.focus();
    }
  }, [textContainerRef, isEditMode]);

  const active = () => {
    if (textContainerRef.current!.readOnly) {
      onActive(id);
    }
  };

  const enableEditMode = () => {
    const textContainer = textContainerRef.current!;
    textContainer.selectionStart = textContainer.value.length;
    textContainer.selectionEnd = textContainer.selectionStart;
    setEditMode(true);
  };

  const rename = () => {
    setEditMode(false);

    if (textContainerRef.current!.value.length && textContainerRef.current!.value !== name) {
      onRename(id, textContainerRef.current!.value);
    } else {
      textContainerRef.current!.value = name;
    }
  };

  const cancelRename = () => {
    setEditMode(false);
    textContainerRef.current!.value = name;
  };

  return (
    <StyledConversationsItem
      ref={buttonRef}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      $isActive={!!isActive} type='button'
    >
      <TextContainer ref={textContainerRef} defaultValue={name} readOnly={!isEditMode} onClick={active} />
      {showButtons &&
        <>
          <ButtonsContainer style={{ display: isEditMode ? '' : 'none' }}>
            
            <svg
              onClick={rename}
              width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.50002 18.3333H12.5C16.6667 18.3333 18.3334 16.6666 18.3334 12.5V7.49996C18.3334 3.33329 16.6667 1.66663 12.5 1.66663H7.50002C3.33335 1.66663 1.66669 3.33329 1.66669 7.49996V12.5C1.66669 16.6666 3.33335 18.3333 7.50002 18.3333Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path opacity="0.34" d="M6.45831 10.0001L8.81665 12.3584L13.5416 7.64172" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg
              onClick={cancelRename}
              width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity=".4" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7.642 12.358 4.716-4.716M12.358 12.358 7.642 7.642" />
              </g>
              <path d="M7.5 18.333h5c4.167 0 5.833-1.666 5.833-5.833v-5c0-4.167-1.666-5.833-5.833-5.833h-5c-4.167 0-5.833 1.666-5.833 5.833v5c0 4.167 1.666 5.833 5.833 5.833Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ButtonsContainer>
          <ButtonsContainer style={{ display: isEditMode ? 'none' : '' }}>
            <svg
              onClick={enableEditMode}
              width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#a)">
                <path d="M18.207 13.185V8.642c0-3.786-1.655-5.3-5.793-5.3H7.448c-4.138 0-5.793 1.514-5.793 5.3v4.543c0 3.786 1.655 5.3 5.793 5.3h4.966c4.138 0 5.793-1.514 5.793-5.3Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <path d="M16.545 2.824c-1.088-.73-2.725-.392-3.639.747l-7.308 9.107c-.253.316-.51.879-.577 1.256l-.22 1.323c-.258 1.524.776 2.219 2.289 1.537l1.313-.588c.374-.171.884-.564 1.138-.88l7.308-9.107c.914-1.138.776-2.669-.304-3.395Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13.001 2.32c1.1-1.327 3.14-1.606 4.555-.624 1.415.983 1.671 2.855.572 4.181l-1.51 1.821-5.126-3.558 1.51-1.82Z" fill="#E7E7E7" />
              <defs>
                <clipPath id="a">
                  <path fill="#fff" transform="translate(0 1.827)" d="M0 0h19.862v18.173H0z" />
                </clipPath>
              </defs>
            </svg>
            <div>
              <svg
                onClick={() => onDelete(id)}
                width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.667 6.542c0-1.542.825-1.667 1.85-1.667h12.966c1.025 0 1.85.125 1.85 1.667 0 1.791-.825 1.666-1.85 1.666H3.517c-1.025 0-1.85.125-1.85-1.666Z" stroke="#292D32" strokeWidth="1.5" />
                <g opacity=".4" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M7.341 1.667 4.324 4.692M12.658 1.667l3.016 3.025" strokeMiterlimit="10" strokeLinejoin="round" />
                  <path d="M8.133 11.667v2.958M11.966 11.667v2.958" />
                </g>
                <path d="m2.917 8.333 1.175 7.2c.266 1.617.908 2.8 3.291 2.8h5.025c2.592 0 2.975-1.133 3.275-2.7l1.4-7.3" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </ButtonsContainer>
        </>
      }
    </StyledConversationsItem>
  );
});

export default ConversationsItem;
