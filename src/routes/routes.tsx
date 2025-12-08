import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import NotFound from '../pages/general/NotFound';
import Dashboard from '../pages/private/Dashboard';
import Search from '../pages/private/Search';
import DocumentDetail from '../pages/private/DocumentDetail';
import PersonProfile from '../pages/private/PersonProfile';
import UserManagement from '../pages/private/dashboard/UserManagement';
import DocumentApproval from '../pages/private/dashboard/DocumentApproval';
import { DASHBOARD_PATHS, PATHS } from './paths';

export const routes = [
    {
        path: PATHS.HOME,
        element: <Search />,
    },
    {
        path: PATHS.SEARCH,
        element: <Search />,
    },
    {
        path: PATHS.DOCUMENTS,
        element: <Search />,
    },
    {
        path: PATHS.DOCUMENT_DETAIL,
        element: <DocumentDetail />,
    },
    {
        path: PATHS.PERSON_PROFILE,
        element: <PersonProfile />,
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
                element: <div>Dashboard Admin Home</div>,
            },
            {
                path: DASHBOARD_PATHS.USER_MANAGEMENT,
                element: <UserManagement />,
            },
            {
                path: DASHBOARD_PATHS.DOCUMENT_APPROVAL,
                element: <DocumentApproval />,
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
