import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TunangnModal } from 'tunangn-react-modal';

// Import hooks
import { useUser } from './hooks/useUser';

// Import authorization descision
import AuthorizationDecision from './routes/AuthorizationDecision';

// Import pages
import LoginPage from './pages/LoginPage';

// Import components
import ContentSide from './components/modal_items/ContentSide';
import NavSide from './components/modal_items/NavSide';
import Snackbar from './components/modal_items/Snackbar';

import { __ModalItemNames } from './components/modal_items/utils';

function App() {
  const { user } = useUser();
  
  return (
    <>
      <React.Suspense>
        {
          !user.isAuthorized
          ? <LoginPage />
          : <AuthorizationDecision />
        }
      </React.Suspense>

      {/* Global UI Components */}
      <TunangnModal
        items={{
          [__ModalItemNames.ContentSide]: {
            element: ContentSide,
            placeOn: "left",
            type: "side"
          },
          [__ModalItemNames.NavSide]: {
            element: NavSide,
            placeOn: "right",
            type: "side"
          },
          [__ModalItemNames.Snackbar]: {
            element: Snackbar,
            position: "top",
            type: "snack-bar"
          }
        }}
      />
    </>
  )
}

export default App
