import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ToastProvider from './context/ToastProvider';
import router from './routes/routes';

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </UserProvider>
  );
}

export default App;