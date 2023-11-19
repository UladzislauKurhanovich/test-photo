import { AuthorizationSuccessResult } from './types';

export const sessionAuthDataHandler = {
  storeTokens: ({ jwtToken, refreshToken }: AuthorizationSuccessResult) => {
    const authData = {
      jwtToken,
      refreshToken,
    };
    localStorage.setItem('isAuth', 'true');
    sessionStorage.setItem('authData', JSON.stringify(authData));
  },
  getTokens: (): AuthorizationSuccessResult => {
    const storedAuthData = sessionStorage.getItem('authData');
    if (!storedAuthData) {
      return { jwtToken: '', refreshToken: '' };
    }

    return JSON.parse(storedAuthData);
  },
  clearTokens: () => {
    sessionStorage.removeItem('authData');
    localStorage.removeItem('isAuth');
  },
};
