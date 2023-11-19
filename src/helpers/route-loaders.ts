import { redirect } from 'react-router-dom';
import { sessionAuthDataHandler } from './sessionAuthDataHandler';

export const rootLoader = () => {
    const { jwtToken } = sessionAuthDataHandler.getTokens();
    if (!jwtToken) {
        return redirect('/login');
    }

    return redirect('/photos');
};

export const loginLoader = () => {
    const { jwtToken } = sessionAuthDataHandler.getTokens();

    if (jwtToken) {
        return redirect('/photos');
    }

    return null;
};

export const protectedLoader = () => {
    const { jwtToken } = sessionAuthDataHandler.getTokens();

    if (!jwtToken) {
        return redirect('/login');
    }

    return null;
};

export const logoutLoader = async () => {
    sessionAuthDataHandler.clearTokens();

    return redirect('/login');
}
