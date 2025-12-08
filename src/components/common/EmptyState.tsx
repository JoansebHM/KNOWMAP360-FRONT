import { SearchX } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

function EmptyState({
    title = 'No se encontraron resultados',
    message = 'Intenta ajustar tus filtros de búsqueda o explora otras categorías.',
    icon,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                {icon || <SearchX size={48} className="text-gray-400" />}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}

export default EmptyState;
