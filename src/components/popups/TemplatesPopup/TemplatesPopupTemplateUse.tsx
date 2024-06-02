import styled from 'styled-components';

import useAppSelector from '@/store/hooks/useAppSelector';
import Button from '@/components/ui/Button';
import { useDispatch } from 'react-redux';
import { findTemplate } from '@/store/slices/templatesSlice';

type TemplatesPopupTemplateUseProps = {
  onClose: () => void;
  onUse: (prompt: string) => void;
};

const StyledTemplatesPopupTemplateUse = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const Prompt = styled.div`
  font-size: 14px;
`;

const TemplatesPopupTemplateUse = ({ onUse, onClose }: TemplatesPopupTemplateUseProps) => {
  const { activeTemplateId, user: userTemplates } = useAppSelector(store => store.templates);
  const dispatch = useDispatch()
  if (activeTemplateId === null) {
    return null;
  }

  const template = userTemplates.find(template => template.id === activeTemplateId);

  return (
    <StyledTemplatesPopupTemplateUse>
      <Prompt>{template?.prompt}</Prompt>
      <Button onClick={() => { onUse(template!.prompt); onClose(); dispatch(findTemplate(template?.id))}}>Использовать шаблон</Button>
    </StyledTemplatesPopupTemplateUse>
  );
};

export default TemplatesPopupTemplateUse;
