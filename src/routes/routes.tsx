import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import NotFound from '../pages/general/NotFound';
import Dashboard from '../pages/private/Dashboard';
import { PATHS } from './paths';

export const routes = [
    {
        path: PATHS.HOME,
        element: <div>Home</div>,
    },
    {
        path: PATHS.LOGIN,
        element: <Login />,
    },
    {
        path: PATHS.RECOVER_PASSWORD,
        element: <ForgotPassword />,
    },
    {
        path: PATHS.REGISTER,
        element: <Register />,
    },
    {
        path: PATHS.DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: PATHS.NOT_FOUND,
        element: <NotFound />,
    },
];
