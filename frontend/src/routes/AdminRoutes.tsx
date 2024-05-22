import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// Import themes
import { AdminTheme } from 'src/themes/admin';

// Import hooks
import { useThemeActions } from 'src/hooks/useTheme';

// Import layouts
import MainLayout from 'src/layouts/MainLayout';

// Import pages
const HomePage = React.lazy(() => import('src/pages/HomePage'));
const ManagementPage = React.lazy(() => import('src/pages/ManagementPage'));

// Import components
const Client = React.lazy(() => import('src/components/client/Client'));
const RealEstate = React.lazy(() => import('src/components/real_estate/RealEstate'));
const User = React.lazy(() => import('src/components/user/User'));
const RealEstateDetail = React.lazy(() => import('src/components/real_estate_detail/RealEstateDetail'));
const ClientDetail = React.lazy(() => import('src/components/client_detail/ClientDetail'));
const UserDetail = React.lazy(() => import('src/components/user_detail/UserDetail'));
const RealEstateForm = React.lazy(() => import('src/components/real_estate_form/RealEstateForm'));
const ClientForm = React.lazy(() => import('src/components/client_form/ClientForm'));
const UserForm = React.lazy(() => import('src/components/user_form/UserForm'));

// Import route names
import { RouteNames } from 'src/routenames';

export default function AdminRoutes() {
  const themeDispatchers = useThemeActions();

  React.useEffect(function() {
    themeDispatchers.changeTheme(AdminTheme.name);
  }, []);

  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: RouteNames.Home.Path,
          element: <HomePage />
        },
        {
          path: "/",
          element: <Navigate to={RouteNames.Home.Path} replace />
        }
      ]
    },
    {
      path: RouteNames.Management.Path + "/*",
      element: <ManagementPage />,
      children: [
        {
          path: RouteNames.Management.Routes.RealEstates.Path,
          element: <RealEstate />
        },
        {
          path: RouteNames.Management.Routes.RealEstates.Path + "/:id",
          element: <RealEstateDetail />
        },
        {
          path: RouteNames.Management.Routes.RealEstates.Path + "/:id/:action",
          element: <RealEstateForm />
        },
        {
          path: ":action" + "/" + RouteNames.Management.Routes.RealEstate.Path,
          element: <RealEstateForm />
        },
        {
          path: RouteNames.Management.Routes.Clients.Path,
          element: <Client />
        },
        {
          path: RouteNames.Management.Routes.Clients.Path + "/:id",
          element: <ClientDetail />
        },
        {
          path: RouteNames.Management.Routes.Clients.Path + "/:id/:action",
          element: <ClientForm />
        },
        {
          path: ":action" + "/" + RouteNames.Management.Routes.Client.Path,
          element: <ClientForm />
        },
        {
          path: RouteNames.Management.Routes.Users.Path,
          element: <User />
        },
        {
          path: RouteNames.Management.Routes.Users.Path + "/:id",
          element: <UserDetail />
        },
        {
          path: RouteNames.Management.Routes.Users.Path + "/:id/:action",
          element: <UserForm />
        },
        {
          path: ":action" + "/" + RouteNames.Management.Routes.User.Path,
          element: <UserForm />
        }
      ]
    }
  ]);
}