import { css } from 'styled-components';

const Reset = css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  img {
    display: block;
    max-width: 100%;
  }

  svg {
    display: block;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  input {
    padding: 0;

    display: block;
    width: 100%;

    font: inherit;
    font-weight: 400;
    font-size: 14px;

    color: inherit;
    background-color: transparent;

    border: none;
    outline: none;

    &::placeholder {
      opacity: 1;
      color: inherit;
    }
  }

  button {
    padding: 0;

    display: block;
    width: fit-content;

    color: inherit;
    background: none;

    border: none;
    outline: none;

    font: inherit;
    text-align: center;

    cursor: pointer;
    user-select: none;
  }

  textarea {
    display: block;
    padding: 0;

    font: inherit;
    color: inherit;

    border: none;
    outline: none;
  }
`;

export default Reset;
