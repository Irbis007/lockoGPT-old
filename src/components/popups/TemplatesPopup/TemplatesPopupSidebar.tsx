import styled from 'styled-components';

import TemplatesPopupSidebarTabs from './TemplatesPopupSidebarTabs';
import TemplatesPopupSidebarItems from './TemplatesPopupSidebarItems';

const StyledTemplatesPopupSidebar = styled.div`
  width: 450px;

  display: flex;
  flex-direction: column;
  
  row-gap: 20px;
  padding: 40px 20px 20px 20px;

  box-shadow: inset -15px 0px 15px 0px rgba(152, 152, 152, 0.05);
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;

  font-size: 34px;
`;



const TemplatesPopupSidebar = () => {
  return (
    <StyledTemplatesPopupSidebar>
      <Title>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M6.125 31.5V12.25C6.125 5.25 7.875 3.5 14.875 3.5H27.125C34.125 3.5 35.875 5.25 35.875 12.25V29.75C35.875 29.995 35.875 30.24 35.8575 30.485" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.1125 26.25H35.875V32.375C35.875 35.7525 33.1275 38.5 29.75 38.5H12.25C8.8725 38.5 6.125 35.7525 6.125 32.375V31.2375C6.125 28.49 8.365 26.25 11.1125 26.25Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path opacity="0.4" d="M14 12.25H28" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path opacity="0.4" d="M14 18.375H22.75" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Ваши шаблоны
      </Title>
      <TemplatesPopupSidebarTabs />
      <TemplatesPopupSidebarItems />
    </StyledTemplatesPopupSidebar>
  );
};

export default TemplatesPopupSidebar;
