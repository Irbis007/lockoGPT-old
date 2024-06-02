import { useState, useEffect } from 'react';
import styled from 'styled-components';

import useAppSelector from '@/store/hooks/useAppSelector';
import useAppDispatch from '@/store/hooks/useAppDispatch';
import { fetchTemplates, setActiveTemplateId, addFavoriteTemplate, removeFavoriteTemplate } from '@/store/slices/templatesSlice';

import api from '@/utils/api';

import TemplatesPopupTemplateForm from './TemplatesPopupTemplateForm';
import TemplatesPopupTemplateUse from './TemplatesPopupTemplateUse';

type TemplatesPopupTemplateProps = {
  onClose: () => void;
  onUse: (prompt: string) => void;
};

const StyledTemplatesPopupTemplate = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 40px;
  padding: 40px;

  width: 600px;
  overflow-y: auto;
`;

const Controls = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
  width: fit-content;
  column-gap: 20px;

  >svg {
    cursor: pointer;
    user-select: none;
  }
`;

const Title = styled.div`
  font-size: 34px;
`;

const TemplatesPopupTemplate = ({ onClose, onUse }: TemplatesPopupTemplateProps) => {
  const dispatch = useAppDispatch();
  const { activeTemplateId, user: userTemplates, favorites } = useAppSelector(store => store.templates);

  const [mode, setMode] = useState<'create' | 'use' | 'edit'>('create');

  useEffect(() => {
    setMode(activeTemplateId === null ? 'create' : 'use');
  }, [activeTemplateId]);

  const close = () => {
    dispatch(setActiveTemplateId(null));
    onClose();
  };

  const deleteTemplate = () => {
    api.delete(`templates/${activeTemplateId}`).then(() => {
      dispatch(fetchTemplates());
    });
    dispatch(setActiveTemplateId(null));
  };

  const toggleFavoriteTemplate = () => {
    const template = favorites.find(template => template.id === activeTemplateId);
    dispatch(template !== undefined ? dispatch(removeFavoriteTemplate(activeTemplateId!)) : addFavoriteTemplate(activeTemplateId!));
  };

  return (
    <StyledTemplatesPopupTemplate>
      <Controls>
        {activeTemplateId !== null && (
          <>
            <svg onClick={() => setMode('edit')} width="24" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_40_5411)">
                <path d="M19.1177 15.8222V10.3704C19.1177 5.82717 17.3798 4.00989 13.0349 4.00989H7.82108C3.47622 4.00989 1.73828 5.82717 1.73828 10.3704V15.8222C1.73828 20.3654 3.47622 22.1827 7.82108 22.1827H13.0349C17.3798 22.1827 19.1177 20.3654 19.1177 15.8222Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <path d="M17.3721 3.38891C16.2304 2.51235 14.5113 2.91862 13.5521 4.28467L5.87848 15.213C5.61204 15.5925 5.34249 16.2681 5.27267 16.7206L5.04178 18.3084C4.77059 20.1378 5.85627 20.9713 7.44429 20.1529L8.82391 19.4471C9.21593 19.2419 9.75165 18.7707 10.0181 18.3912L17.6917 7.46286C18.6509 6.09682 18.5069 4.26009 17.3721 3.38891Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13.725 2.68147C14.8391 1.14579 16.9471 0.856649 18.4335 2.03565C19.9199 3.21466 20.2218 5.41534 19.1077 6.95102L17.4487 9.2379L12.066 4.96835L13.725 2.68147Z" fill="#E7E7E7" />
              <defs>
                <clipPath id="clip0_40_5411">
                  <rect width="20.8553" height="21.8074" fill="white" transform="translate(0 2.19263)" />
                </clipPath>
              </defs>
            </svg>
            <svg onClick={deleteTemplate} width="24" height="24" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66602 7.19588C1.66602 5.50005 2.49102 5.36255 3.51602 5.36255H16.4827C17.5077 5.36255 18.3327 5.50005 18.3327 7.19588C18.3327 9.16672 17.5077 9.02922 16.4827 9.02922H3.51602C2.49102 9.02922 1.66602 9.16672 1.66602 7.19588Z" stroke="#292D32" strokeWidth="1.5" />
              <g opacity="0.4">
                <path d="M7.34089 1.83337L4.32422 5.16087" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.6582 1.83337L15.6749 5.16087" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.13281 12.8334V16.0875" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11.9648 12.8334V16.0875" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <path d="M2.91602 9.16663L4.09102 17.0866C4.35768 18.865 4.99935 20.1666 7.38268 20.1666H12.4077C14.9993 20.1666 15.3827 18.92 15.6827 17.1966L17.0827 9.16663" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg onClick={toggleFavoriteTemplate} width="22" height="22" viewBox="0 0 22 20" fill={favorites.find(template => template.id === activeTemplateId) !== undefined ? '#F49B4E' : 'none'} xmlns="http://www.w3.org/2000/svg">
              <path d="M11.62 18.71C11.28 18.83 10.72 18.83 10.38 18.71C7.48 17.72 1 13.59 1 6.59C1 3.5 3.49 1 6.56 1C8.38 1 9.99 1.88 11 3.24C12.01 1.88 13.63 1 15.44 1C18.51 1 21 3.5 21 6.59C21 13.59 14.52 17.72 11.62 18.71Z" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
        <svg onClick={close} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 19L1 1" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 19L19 1" stroke="#2E3038" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Controls>
      <Title>
        {mode === 'create' && 'Создание шаблона'}
        {mode === 'edit' && 'Редактирование шаблона'}
        {mode === 'use' && userTemplates.find(template => template.id === activeTemplateId)?.name}
      </Title>
      {mode === 'use' && <TemplatesPopupTemplateUse onClose={onClose} onUse={onUse} />}
      {mode !== 'use' && <TemplatesPopupTemplateForm onClose={onClose} mode={mode} setMode={setMode} />}
    </StyledTemplatesPopupTemplate>
  );
};

export default TemplatesPopupTemplate;
