import styled from 'styled-components';

import TemplatesPopupSidebar from './TemplatesPopupSidebar';
import TemplatesPopupTemplate from './TemplatesPopupTemplate';

type TemplatesPopupProps = {
  onClose: () => void;
  onUse: (prompt: string) => void;
};

const StyledTemplatesPopup = styled.div`
  display: flex;
  height: 700px;

  border-radius: 12px;
  background-color: #FFF;
  
  box-shadow: -2px 2px 50px 0px #98989833;
` ;

const TemplatesPopup = ({ onClose, onUse }: TemplatesPopupProps) => {
  return (
    <StyledTemplatesPopup>
      <TemplatesPopupSidebar />
      <TemplatesPopupTemplate onClose={onClose} onUse={onUse} />
    </StyledTemplatesPopup>
  );
};

export default TemplatesPopup;
