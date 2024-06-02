import { Outlet } from 'react-router-dom';

import Header from './Header';
import GlobalStyle from '@/assets/styles/GlobalStyle';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <GlobalStyle />
    </>
  );
};

export default Layout;
