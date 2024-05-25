import React from 'react';

// Import hooks
import { useUserState } from 'src/hooks/useUser';

// Import routes
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';

export default function AuthorizationDecision() {
  const user = useUserState();

  return (
    user.role === "user"
      ? <UserRoutes />
      : <AdminRoutes />
  )
}