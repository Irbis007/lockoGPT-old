import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import api from './utils/api';
import { IProfile } from '@/features/authorization/models/api';

import useAppDispatch from './store/hooks/useAppDispatch';
import { setUser, logoutUser, setLoading } from '@/store/slices/userSlice';

import Layout from './layouts/Layout';

import AuthorizationPage from './pages/AuthorizationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

import useAuth from './features/authorization/hooks/useAuth';
import ProtectedRoute from './utils/ProtectedRoute';

const Application = () => {
  const dispatch = useAppDispatch();
  const { isAuthorized, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthorized) {
      return;
    }

    const abortController = new AbortController();

    api.get('authorization/me', {
      signal: abortController.signal
    }).json<IProfile>()
      .then(user => {
        dispatch(setUser({ ...user, isAuthorized: true}))
      })
      .catch(() => {
        dispatch(logoutUser())
      }).finally(() => {
        if(!localStorage.getItem('token')){
          dispatch(setLoading(false))
        }
      });

    return () => abortController.abort();
  }, [isAuthorized, dispatch]);




  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ProtectedRoute isAllowed={isAuthorized} redirectTo='signin' />,
          children: [
            { path: '/', element: <HomePage /> },
            { path: '/profile', element: <ProfilePage /> }
          ]
        },
        {
          path: '/',
          element: <ProtectedRoute isAllowed={!isAuthorized} redirectTo='/' />,
          children: [
            { path: 'signin', element: <AuthorizationPage type='signin' /> },
            { path: 'signup', element: <AuthorizationPage type='signup' /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> }
          ]
        }
      ]
    }
  ]);



  if(isLoading){
    return
  }
  
  return <RouterProvider router={router} />;
};

export default Application;
