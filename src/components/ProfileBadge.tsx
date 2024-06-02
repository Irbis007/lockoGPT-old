import { ComponentProps } from 'react';
import styled from 'styled-components';

interface ProfileLinkProps {
  fullName: string;
}

const StyledProfileLink = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: fit-content;
`;

const ProfileLinkAvatar = styled.div`
  flex-shrink: 0;

  width: 32px;
  height: 32px;

  font-size: 14px;
  line-height: 32px;
  text-align: center;

  color: #FFF;
  background-color: #0039A6;
  
  border-radius: 4px;
`;

const ProfileBadge = ({ fullName }: ProfileLinkProps & ComponentProps<'a'>) => {
  return (
    <StyledProfileLink>
      <ProfileLinkAvatar>{fullName.split(' ').map(value => value[0].toUpperCase()).join('')}</ProfileLinkAvatar>
      {fullName}
    </StyledProfileLink>
  );
};

export default ProfileBadge;
