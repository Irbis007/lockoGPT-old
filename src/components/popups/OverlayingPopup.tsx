import { ReactNode } from 'react';
import styled from 'styled-components';

import Portal from '../Portal';

type OverlayingPopupProps = {
  isOpened: boolean;
  children: ReactNode;
};

const StyledOverlayingPopup = styled.div`
  position: fixed;
  z-index: 1;
  
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const OverlayingPopup = ({ children, isOpened }: OverlayingPopupProps) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <StyledOverlayingPopup>
        {children}
      </StyledOverlayingPopup>
    </Portal>
  );
};

export default OverlayingPopup;
