import { X } from 'lucide-react';

type NotificationModalProps = {
    onClose: () => void;
};

function NotificationModal({ onClose }: NotificationModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Notificaciones</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                <div className="mb-4">
                    <p>Contenido Notificaciones</p>
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
