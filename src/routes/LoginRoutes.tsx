import { lazy } from 'react';

// project-imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
import { SimpleLayoutType } from '../config';
import SimpleLayout from '../layout/LayoutNoneBackground';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth1/forgot-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth1/check-mail')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth1/reset-password')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth1/code-verification')));
const ContactUS = Loadable(lazy(() => import('pages/home/contact-us')));
const AuthLogin3 = Loadable(lazy(() => import('pages/auth/auth3/login3')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthLogin3 />
        },
        {
          path: '/',
          element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
          children: [
            {
              path: 'contact-us',
              element: <ContactUS />
            }
          ]
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    }
  ]
};

export default LoginRoutes;
