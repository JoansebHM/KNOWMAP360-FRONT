import { FolderKanban, Home, Settings } from 'lucide-react';

export const dashboardTabs = [
    {
        label: 'Inicio',
        icon: <Home size={18} />,
    },
    {
        label: 'Procesos',
        icon: <FolderKanban size={18} />,
    },
    {
        label: 'Configuración',
        icon: <Settings size={18} />,
    },
];
