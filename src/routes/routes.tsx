import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import NotFound from '../pages/general/NotFound';
import Dashboard from '../pages/private/Dashboard';
import { DASHBOARD_PATHS, PATHS } from './paths';

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
        subRoutes: [
            {
                path: DASHBOARD_PATHS.HOME,
                element: <div>Dashboard Home</div>,
            },
            {
                path: DASHBOARD_PATHS.PROCESSES,
                element: <div>Dashboard Processes</div>,
            },
            {
                path: DASHBOARD_PATHS.SETTINGS,
                element: <div>Dashboard Settings</div>,
            },
            {
                path: DASHBOARD_PATHS.PERSONAL_DATA,
                element: <div>Datos personales Settings</div>,
            },
        ],
    },
    {
        path: PATHS.NOT_FOUND,
        element: <NotFound />,
    },
];
