import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import useAppSelector from '@/store/hooks/useAppSelector';

import { fetchTemplates, setActiveTemplateId } from '@/store/slices/templatesSlice';

import Button from '@/components/ui/Button';

const StyledTemplatesPopupSidebarItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100%;
`;

const Search = styled.input`
  padding: 10px 44px 10px 10px;

  font-size: 14px;
  font-weight: 500;

  border-radius: 12px;
  border: 1px solid #E7E7E7;

  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="%232E3038" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M22 22L20 20" stroke="%232E3038" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');

  &::placeholder {
    opacity: 1;
    color: #919191;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  row-gap: 10px;

  overflow-y: auto;
`;

const Item = styled.button<{ $isActive?: boolean; }>`
  width: 100%;
  padding: 10px;

  font-size: 14px;

  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  border-radius: 12px;
  overflow-x: hidden;

  ${({ $isActive }) => $isActive && `
    background-color: #00A1DE0D;
  `}
`;

const TemplatesPopupSidebarItems = () => {
  const dispatch = useAppDispatch();
  const { activeTabId, activeTemplateId, system: systemTemplates, user: userTemplates, favorites: favoritesTemplates } = useAppSelector(store => store.templates);

  const [search, setSearch] = useState('');
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchTemplates(abortController.signal));
    return () => abortController.abort();
  }, [dispatch]);

  const searchQueryIncludesInTemplateName = (name: string) => {
    return name.toLowerCase().includes(search.trim().toLowerCase());
  };

  return (
    <StyledTemplatesPopupSidebarItems>
      <Search onInput={event => setSearch(event.currentTarget.value)} type='text' placeholder='Поиск шаблона...' />
      <Items ref={itemsContainerRef}>
        {activeTabId === 'system' && (
          systemTemplates.map(template => searchQueryIncludesInTemplateName(template.name) && (
            <div key={template.id}>
              <Item
                onClick={() => dispatch(setActiveTemplateId(template.id))}
                $isActive={activeTemplateId === template.id}
                type='button'
              >
                {template.name}
              </Item>
            </div>
          ))
        )}
        {activeTabId === 'user' && (
          userTemplates.map(template => searchQueryIncludesInTemplateName(template.name) && (
            <div key={template.id}>
              <Item
                onClick={() => dispatch(setActiveTemplateId(template.id))}
                $isActive={activeTemplateId === template.id}
                type='button'
              >
                {template.name}
              </Item>
            </div>
          ))
        )}
        {activeTabId === 'favorites' && (
          favoritesTemplates.map(template => searchQueryIncludesInTemplateName(template.name) && (
            <div key={template.id}>
              <Item
                onClick={() => dispatch(setActiveTemplateId(template.id))}
                $isActive={activeTemplateId === template.id}
                type='button'
              >
                {template.name}
              </Item>
            </div>
          ))
        )}
      </Items>
      {activeTemplateId !== null && activeTabId === 'user' && (
        <Button
          onClick={() => dispatch(setActiveTemplateId(null))}
          style={{ width: '100%' }}
        >
          Создать шаблон
        </Button>
      )}
    </StyledTemplatesPopupSidebarItems>
  );
};

export default TemplatesPopupSidebarItems;
