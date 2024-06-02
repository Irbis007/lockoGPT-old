import { useState, useEffect } from 'react';
import styled from 'styled-components';

type CopyButtonProps = {
  onCopy: () => string;
};

const StyledCopyButton = styled.button`
  padding: 4px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #919191;
  background-color: #FFF;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  position: relative;

  &:hover {
    color: #000;
  }

  &:hover div {
    display: flex;
  }
`;

const Helper = styled.div`
  padding: 4px;
  display: none;
  align-items: center;
  column-gap: 10px;
  font-size: 11px;
  font-weight: 400;
  color: #919191;
  background-color: #FFF;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  position: absolute;
  bottom: -30px;
  left: -23px;

  &:before {
    content: "";
    width: 7px;
    height: 7px;
    border-top: 1px solid #E7E7E7;
    border-right: 1px solid #E7E7E7;
    margin-right: 10px;
    position: absolute;
    top: -3px;
    transform: rotate(-44deg);
    left: 31px;
    background: #fff;
  }
`;

const CopyButton = ({ onCopy }: CopyButtonProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopy = () => {
    const text = onCopy();
    navigator.clipboard.writeText(text);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <StyledCopyButton onClick={handleCopy} type='button'>
      {showSuccess && <svg width="16" height="16" className="success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z" fill="currentColor"></path></svg>}
      {!showSuccess && <svg width="16" height="16" className="copy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z" fill="currentColor"></path></svg>}
      <Helper>Копировать</Helper>
    </StyledCopyButton>
  );
};

export default CopyButton;
