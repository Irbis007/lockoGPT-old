import { useState } from 'react';
import styled from 'styled-components';

import Card from '@/components/ui/Card';
import ProfileForm from '@/features/profile/ProfileForm';

import OverlayingPopup from '@/components/popups/OverlayingPopup';
import ConfirmDialogPopup from '@/components/popups/ConfirmDialogPopup';

import useAppDispatch from '@/store/hooks/useAppDispatch';
import { logoutUser } from '@/store/slices/userSlice';

const StyledCard = styled(Card) <{ $disabled: boolean; }>`
  margin: 150px auto 0 auto;
  padding: 20px 125px;
  min-width: 660px;

  ${({ $disabled }) => $disabled && `
    opacity: .5;
  `}
`;

const Title = styled.div`
  font-size: 34px;
  text-align: center;
  margin-bottom: 40px;
`;

const ModalButton = styled.button`
  margin: 20px auto 0 auto;
  color: #0039A6;
  font-size: 14px;
  text-decoration: underline;
`;

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
  };

  return (
    <StyledCard $disabled={isLogoutModalOpen}>
      <Title>Профиль</Title>
      <ProfileForm />
      <ModalButton onClick={() => setLogoutModalOpen(true)} type='button'>Выйти из аккаунта</ModalButton>
      <OverlayingPopup isOpened={isLogoutModalOpen}>
        <ConfirmDialogPopup
          title='Подтвердите действие'
          text='Вы уверены, что хотите выйти из системы?'
          cancelButtonText='Отмена'
          cancelButtonHandler={() => setLogoutModalOpen(false)}
          submitButtonText='Выйти'
          submitButtonHandler={logout}
        />
      </OverlayingPopup>
    </StyledCard>
  );
};

export default ProfilePage;
