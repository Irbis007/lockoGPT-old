import styled from 'styled-components';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import useAppSelector from '@/store/hooks/useAppSelector';

import { setActiveTemplatesTabId } from '@/store/slices/templatesSlice';

const Container = styled.div`
  display: flex;
  column-gap: 45px;
  justify-content: space-between;
`;

const Item = styled.button<{ $isActive?: boolean; }>`
  width: fit-content;

  padding: 10px;
  font-size: 14px;

  border: 1px solid #E7E7E7;
  border-radius: 10px;

  ${({ $isActive }) => $isActive && `
    border-color: transparent;
    background-color: #00A1DE0D;
  `}
`;

const TemplatesPopupSidebarTabs = () => {
  const dispatch = useAppDispatch();
  const { activeTabId } = useAppSelector(store => store.templates);

  return (
    <Container>
      <Item onClick={() => dispatch(setActiveTemplatesTabId('system'))} $isActive={activeTabId === 'system'}>Системные</Item>
      <Item onClick={() => dispatch(setActiveTemplatesTabId('user'))} $isActive={activeTabId === 'user'}>Мои</Item>
      <Item onClick={() => dispatch(setActiveTemplatesTabId('favorites'))} $isActive={activeTabId === 'favorites'}>Избранные</Item>
    </Container>
  );
};

export default TemplatesPopupSidebarTabs;
