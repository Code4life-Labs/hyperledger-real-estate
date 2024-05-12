import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TunangnModal } from 'tunangn-react-modal';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import HomePage from './pages/HomePage';
import ManagementPage from './pages/ManagementPage';

// Import components
import NavSide from './components/sides/NavSide';
import ContentSide from './components/sides/ContentSide';
import RealEstate from './components/real_estate/RealEstate';
import Client from './components/client/Client';
import RealEstateDetail from './components/real_estate_detail/RealEstateDetail';
import ClientDetail from './components/client_detail/ClientDetail';
import RealEstateForm from './components/real_estate_form/RealEstateForm';
import ClientForm from './components/client_form/ClientForm';

import { __SideMenuNames } from './components/sides/utils';

// Import route names
import { RouteNames } from './routenames';

function App() {
  return (
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

export default App
