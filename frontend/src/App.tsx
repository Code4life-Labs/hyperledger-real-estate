import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TunangnModal } from 'tunangn-react-modal';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import HomePage from './pages/HomePage';
import TestAPIPage from './pages/TestAPIPage';
import DocumentPage from './pages/DocumentPage';

// Import components
import NavSide from './components/sides/NavSide';
import ContentSide from './components/sides/ContentSide';

import { __SideMenuNames } from './components/sides/utils';

// Import route names
import { RouteNames } from './routenames';

// Import themes
import { Theme } from './objects/Theme';
import { NormalTheme } from './themes/normal';

function App() {
  // Enable theme
  React.useEffect(function() {
    // Initialize CSS Variables for Theme Properties
    // Theme.initializeCSSVariables();

    // Install theme
    Theme.install(NormalTheme);

    // Enable theme
    NormalTheme.enable("light");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path={RouteNames.Home.Path}
            element={<HomePage />}
          />
          <Route
            path={RouteNames.TestAPI.Path}
            element={<TestAPIPage />}
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
        <Route path={RouteNames.Document.Path + "/*"} element={<DocumentPage />} />
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
