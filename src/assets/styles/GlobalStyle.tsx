import { createGlobalStyle } from 'styled-components';

import Reset from './Reset';
import Typography from './Typography';

const GlobalStyle = createGlobalStyle`
  ${Reset}
  ${Typography}

  :root {
    --table-border-radius: 8px;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #E7E7E7 transparent;
    -webkit-tap-highlight-color: transparent;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #E7E7E7;
    }
  }

  p + div>table{
    margin-top:10px;
  }

  p + p {
    margin-top:10px;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom:10px;

    thead tr {
      &:first-child th {
        &:first-child {
          border-top-left-radius: var(--table-border-radius);
        }

        &:last-child {
          border-top-right-radius: var(--table-border-radius);
        }
      }

      th {
        padding: 10px 15px;

        font-size: 14px;
        font-weight: 500;

        text-align: left;
        white-space: nowrap;

        color: #000000;
        background-color: #E7E7E7;

        &:not(:last-child) {
          padding-right: 0;
        }
      }
    }

    tbody tr {
      &:last-child td {
        &:first-child {
          border-bottom-left-radius: var(--table-border-radius);
        }

        &:last-child {
          border-bottom-right-radius: var(--table-border-radius);
        }
      }

      td {
        padding: 10px 15px;

        font-size: 12px;
        font-weight: 400;

        color: #000000;
        background-color: #FFF;

        border: 1px solid #E7E7E7;
        border-top: none;

        

        &:not(:last-child) {
          border-right: none;
        }
      }
    }
  }

  body {
    margin: 0;

    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;

    color: #2E3038;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100dvh;
  }
`;

export default GlobalStyle;

