'use client';

import { useAuth } from '@payloadcms/ui';

export const MyComponent = () => {
  const { user, token } = useAuth();
  return (
    <div>
      <p><strong>Logged in as:</strong> {user?.firstName} {user?.lastName}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};