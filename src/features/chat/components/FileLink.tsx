import { FC } from 'react';
import styled from 'styled-components';

type FileLinkProps = {
  name: string;
  url: string;
};

const StyledFileLink = styled.a`
  width: fit-content;

  display: flex;
  align-items: center;
  column-gap: 10px;

  font-size: 14px;
  font-weight: 400;

  color: #919191;
`;

const FileLink: FC<FileLinkProps> = ({ name, url }) => {
  return (
    <StyledFileLink href={url.replace(`${location.protocol}//${location.host}`, '')} download={name}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9152 10.201L10.3101 16.8061C8.51233 18.6038 5.81613 18.8161 3.98318 16.9832C2.18541 15.1854 2.41906 12.5809 4.25201 10.748L11.6768 3.32315C12.8132 2.18679 14.6426 2.18679 15.779 3.32315C16.9154 4.45951 16.9154 6.28895 15.779 7.42531L8.22379 14.9805C7.6574 15.5469 6.7391 15.5469 6.17272 14.9805C5.60633 14.4141 5.60633 13.4958 6.17272 12.9294L12.9082 6.19396" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {name}
    </StyledFileLink>
  );
};

export default FileLink;