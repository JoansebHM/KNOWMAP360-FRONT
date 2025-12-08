import { X, User, Calendar, Check } from 'lucide-react';
import type { Document } from '../../types/types';
import CategoryBadge from '../documents/CategoryBadge';

interface PendingDocument extends Document {
    status: 'pending' | 'approved' | 'rejected';
    submittedBy: string;
    submittedAt: string;
}

interface DocumentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    document: PendingDocument | null;
    onApprove: (doc: PendingDocument) => void;
    onReject: (doc: PendingDocument) => void;
}

function DocumentDetailModal({
    isOpen,
    onClose,
    document,
    onApprove,
    onReject,
}: DocumentDetailModalProps) {
    if (!isOpen || !document) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <CategoryBadge category={document.category} size="md" />
                        <h2 className="text-2xl font-bold text-gray-900 mt-3">{document.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-700 mb-4">{document.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {document.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>Subido por: {document.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Fecha: {document.submittedAt}</span>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => onReject(document)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        <X size={20} />
                        Rechazar
                    </button>
                    <button
                        onClick={() => onApprove(document)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                        <Check size={20} />
                        Aprobar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DocumentDetailModal;
