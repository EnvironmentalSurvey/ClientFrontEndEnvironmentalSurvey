import { createBrowserRouter } from 'react-router-dom';

// project-imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

import { SimpleLayoutType } from 'config';
import SimpleLayout from 'layout/LayoutBackground';
import Home from '../pages/home/home';

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SimpleLayout layout={SimpleLayoutType.LANDING} />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    LoginRoutes,
    MainRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
