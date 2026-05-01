import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import SurveyDetailsPage from '../pages/apps/survey/surveyDetails';
import SurveyResult from '../sections/apps/survey/SurveyResult';

const SurveysPage = Loadable(lazy(() => import('pages/apps/survey/survey')));
const FAQs = Loadable(lazy(() => import('pages/apps/FAQs')));
const UserTabHistoryJoin = Loadable(lazy(() => import('sections/apps/profiles/user/TabHistoryJoin')));
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));
const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));

const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('sections/apps/profiles/account/TabProfile')));
const AccountTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/account/TabPersonal')));
const AccountTabAccount = Loadable(lazy(() => import('sections/apps/profiles/account/TabAccount')));
const AccountTabPassword = Loadable(lazy(() => import('sections/apps/profiles/account/TabPassword')));
const AccountTabRole = Loadable(lazy(() => import('sections/apps/profiles/account/TabRole')));
const AccountTabSettings = Loadable(lazy(() => import('sections/apps/profiles/account/TabSettings')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'survey',
          children: [
            {
              path: '',
              element: <SurveysPage />
            },
            {
              path: ':id',
              element: <SurveyDetailsPage />
            },
            {
              path: 'survey-result',
              element: <SurveyResult />
            }
          ]
        },
        {
          path: 'faqs',
          element: <FAQs />
        },
        {
          path: 'user',
          element: <UserProfile />,
          children: [
            {
              path: 'personal',
              element: <UserTabPersonal />
            },
            {
              path: 'payment',
              element: <UserTabPayment />
            },

            {
              path: 'password',
              element: <UserTabPassword />
            },
            {
              path: 'settings',
              element: <UserTabSettings />
            }
          ]
        },
        {
          path: 'profiles',
          children: [
            {
              path: 'account',
              element: <AccountProfile />,
              children: [
                {
                  path: 'basic',
                  element: <AccountTabProfile />
                },

                {
                  path: 'personal',
                  element: <AccountTabPersonal />
                },
                {
                  path: 'my-account',
                  element: <AccountTabAccount />
                },
                {
                  path: 'password',
                  element: <AccountTabPassword />
                },
                {
                  path: 'role',
                  element: <AccountTabRole />
                },
                {
                  path: 'settings',
                  element: <AccountTabSettings />
                }
              ]
            },
            {
              path: 'user',
              element: <UserProfile />,
              children: [
                {
                  path: 'personal',
                  element: <UserTabPersonal />
                },
                {
                  path: 'history-join',
                  element: <UserTabHistoryJoin />
                },
                {
                  path: 'payment',
                  element: <UserTabPayment />
                },
                {
                  path: 'password',
                  element: <UserTabPassword />
                },
                {
                  path: 'settings',
                  element: <UserTabSettings />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;
