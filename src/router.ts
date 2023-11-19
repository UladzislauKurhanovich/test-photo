import { createBrowserRouter } from 'react-router-dom';
import { loginAction } from './helpers/route-actions';
import { loginLoader, logoutLoader, protectedLoader, rootLoader } from './helpers/route-loaders';
import { Login } from './routes/login'; 
import { Photos } from './routes/photos';

export const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        children: [
            {
                index: true,
                loader: rootLoader,
            },
            {
                path: 'login',
                action: loginAction,
                loader: loginLoader,
                Component: Login,
            },
            {
                path: 'photos',
                loader: protectedLoader,
                Component: Photos,
            },
        ],
    },
    {
        path: '/logout',
        loader: logoutLoader,
    },
]);
