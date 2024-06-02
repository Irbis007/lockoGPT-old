import styled from 'styled-components';

const Button = styled.button<{ $fluid?: boolean; $outlined?: boolean }>`
  padding: 10px 25px;

  display: block;
  width: ${({ $fluid }) => $fluid ? '100%' : 'fit-content'};

  font: inherit;
  font-weight: 600;
  text-align: center;

  color: ${({ $outlined }) => $outlined ? '#F49B4E' : '#FFF'};
  background-color: ${({ $outlined }) => $outlined ? 'transparent' : '#F49B4E'};

  border: ${({ $outlined }) => $outlined ? '1px solid #F49B4E' : 'none'};
  outline: none;

  cursor: pointer;
  user-select: none;

  border-radius: 12px;
`;

export default Button;
