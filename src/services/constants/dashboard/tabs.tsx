import { Home, Settings, User2, Users, FileCheck } from 'lucide-react';
import { DASHBOARD_PATHS } from '../../../routes/paths';

export const dashboardTabs = [
    {
        label: 'Inicio',
        icon: <Home size={18} />,
        path: DASHBOARD_PATHS.HOME,
    },
    {
        label: 'Gestión de Usuarios',
        icon: <Users size={18} />,
        path: DASHBOARD_PATHS.USER_MANAGEMENT,
    },
    {
        label: 'Aprobar Documentos',
        icon: <FileCheck size={18} />,
        path: DASHBOARD_PATHS.DOCUMENT_APPROVAL,
    },
    {
        label: 'Configuración',
        icon: <Settings size={18} />,
        path: DASHBOARD_PATHS.SETTINGS,
    },
    {
        label: 'Datos Personales',
        icon: <User2 size={18} />,
        path: DASHBOARD_PATHS.PERSONAL_DATA,
    },
];
