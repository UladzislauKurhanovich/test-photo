import { RouterProvider } from 'react-router-dom';
import { sessionAuthDataHandler } from './helpers/sessionAuthDataHandler';
import { router } from './router';

export const App = () => {
  const token = localStorage.getItem('token');

  if (token) {
    sessionAuthDataHandler.storeTokens({ jwtToken: token, refreshToken: token });
  }

  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}
