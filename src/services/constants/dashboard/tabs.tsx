import { FolderKanban, Home, Settings, User2 } from 'lucide-react';
import { DASHBOARD_PATHS } from '../../../routes/paths';

export const dashboardTabs = [
    {
        label: 'Inicio',
        icon: <Home size={18} />,
        path: DASHBOARD_PATHS.HOME,
    },
    {
        label: 'Procesos',
        icon: <FolderKanban size={18} />,
        path: DASHBOARD_PATHS.PROCESSES,
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
