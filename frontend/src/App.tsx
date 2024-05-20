import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TunangnModal } from 'tunangn-react-modal';

// Import hooks
import { useUser } from './hooks/useUser';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import LoginPage from './pages/LoginPage';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ManagementPage = React.lazy(() => import('./pages/ManagementPage'));

// Import components
const Client = React.lazy(() => import('./components/client/Client'));
const RealEstate = React.lazy(() => import('./components/real_estate/RealEstate'));
const RealEstateDetail = React.lazy(() => import('./components/real_estate_detail/RealEstateDetail'));
const ClientDetail = React.lazy(() => import('./components/client_detail/ClientDetail'));
const RealEstateForm = React.lazy(() => import('./components/real_estate_form/RealEstateForm'));
const ClientForm = React.lazy(() => import('./components/client_form/ClientForm'));
import ContentSide from './components/sides/ContentSide';
import NavSide from './components/sides/NavSide';

import { __SideMenuNames } from './components/sides/utils';

// Import route names
import { RouteNames } from './routenames';

function App() {
  const { user } = useUser();

  return (
    <React.Suspense>
      {
        user.isAuthenticated
        ? <LoginPage />
        : (
          <>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route
                  path={RouteNames.Home.Path}
                  element={<HomePage />}
                />
                <Route path="/" element={<Navigate to="/home" replace />} />
              </Route>
              <Route path={RouteNames.Management.Path + "/*"} element={<ManagementPage />}>
                <Route path={RouteNames.Management.Routes.RealEstates.Path} element={<RealEstate />} />
                <Route path={RouteNames.Management.Routes.RealEstates.Path + "/:id"} element={<RealEstateDetail />} />
                <Route path={RouteNames.Management.Routes.Clients.Path} element={<Client />} />
                <Route path={RouteNames.Management.Routes.Clients.Path + "/:id"} element={<ClientDetail />} />
                <Route path={RouteNames.Management.Routes.RealEstates.Path + "/:id/:action"} element={<RealEstateForm />} />
                <Route path={RouteNames.Management.Routes.Clients.Path + "/:id/:action"} element={<ClientForm />} />
                <Route path={":action" + "/" + RouteNames.Management.Routes.RealEstate.Path} element={<RealEstateForm />} />
                <Route path={":action" + "/" + RouteNames.Management.Routes.Client.Path} element={<ClientForm />} />
              </Route>
            </Routes>
            <TunangnModal
              items={{
                [__SideMenuNames.ContentSide]: {
                  element: ContentSide,
                  placeOn: "left",
                  type: "side"
                },
                [__SideMenuNames.NavSide]: {
                  element: NavSide,
                  placeOn: "right",
                  type: "side"
                }
              }}
            />
          </>
        )
      }
    </React.Suspense>
  )
}

export default App
