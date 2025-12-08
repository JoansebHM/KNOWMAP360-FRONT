import { useState } from 'react';
import { FileText, Check, X, Eye, Calendar, User, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Document } from '../../../types/types';
import { DocumentCategory } from '../../../types/types';
import CategoryBadge from '../../../components/documents/CategoryBadge';
import DocumentUploadModal from '../../../components/modals/DocumentUploadModal';
import DocumentDetailModal from '../../../components/modals/DocumentDetailModal';

interface PendingDocument extends Document {
    status: 'pending' | 'approved' | 'rejected';
    submittedBy: string;
    submittedAt: string;
}

// Mock pending documents
const mockPendingDocs: PendingDocument[] = [
    {
        id: 'pending-1',
        title: 'Implementación de Blockchain en Sistemas Financieros',
        description:
            'Análisis e implementación de tecnología blockchain para mejorar la seguridad en transacciones financieras.',
        category: DocumentCategory.THESIS,
        author: {
            id: '2',
            name: 'María González',
            email: 'maria.gonzalez@university.edu',
        },
        date: '2024-12-01',
        tags: ['Blockchain', 'Fintech', 'Seguridad', 'Criptografía'],
        views: 0,
        downloads: 0,
        status: 'pending',
        submittedBy: 'María González',
        submittedAt: '2024-12-08',
    },
    {
        id: 'pending-2',
        title: 'Optimización de Algoritmos de Machine Learning para IoT',
        description:
            'Propuesta de optimización de algoritmos ML para dispositivos IoT con recursos limitados.',
        category: DocumentCategory.RESEARCH,
        author: {
            id: '3',
            name: 'Carlos Rodríguez',
            email: 'carlos.rodriguez@university.edu',
        },
        date: '2024-12-05',
        tags: ['Machine Learning', 'IoT', 'Optimización', 'Edge Computing'],
        views: 0,
        downloads: 0,
        status: 'pending',
        submittedBy: 'Carlos Rodríguez',
        submittedAt: '2024-12-07',
    },
];

function DocumentApproval() {
    const [documents, setDocuments] = useState<PendingDocument[]>(mockPendingDocs);
    const [selectedDoc, setSelectedDoc] = useState<PendingDocument | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        title: '',
        description: '',
        category: DocumentCategory.ARTICLE,
        tags: '',
        file: null as File | null,
    });

    const handleApprove = (doc: PendingDocument) => {
        setDocuments(documents.map((d) => (d.id === doc.id ? { ...d, status: 'approved' } : d)));
        toast.success(`Documento "${doc.title}" aprobado`);
        setSelectedDoc(null);
    };

    const handleReject = (doc: PendingDocument) => {
        if (window.confirm(`¿Estás seguro de rechazar "${doc.title}"?`)) {
            setDocuments(documents.map((d) => (d.id === doc.id ? { ...d, status: 'rejected' } : d)));
            toast.error(`Documento "${doc.title}" rechazado`);
            setSelectedDoc(null);
        }
    };

    const handleUpload = () => {
        if (!uploadForm.title || !uploadForm.description || !uploadForm.file) {
            toast.error('Por favor completa todos los campos y selecciona un archivo');
            return;
        }

        const newDoc: PendingDocument = {
            id: `pending-${Date.now()}`,
            title: uploadForm.title,
            description: uploadForm.description,
            category: uploadForm.category,
            author: {
                id: '1',
                name: 'Admin Usuario',
                email: 'admin@knowledge360.com',
            },
            date: new Date().toISOString().split('T')[0],
            tags: uploadForm.tags.split(',').map((t) => t.trim()),
            views: 0,
            downloads: 0,
            status: 'pending',
            submittedBy: 'Admin Usuario',
            submittedAt: new Date().toISOString().split('T')[0],
        };

        setDocuments([newDoc, ...documents]);
        toast.success(`Documento "${uploadForm.title}" subido exitosamente`);
        setShowUploadModal(false);
        setUploadForm({
            title: '',
            description: '',
            category: DocumentCategory.ARTICLE,
            tags: '',
            file: null,
        });
    };

    const closeUploadModal = () => {
        setShowUploadModal(false);
        setUploadForm({
            title: '',
            description: '',
            category: DocumentCategory.ARTICLE,
            tags: '',
            file: null,
        });
    };

    const pendingDocs = documents.filter((d) => d.status === 'pending');
    const approvedDocs = documents.filter((d) => d.status === 'approved');
    const rejectedDocs = documents.filter((d) => d.status === 'rejected');

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Aprobación de Documentos</h1>
                    <p className="text-gray-600">Revisa y aprueba documentos pendientes</p>
                </div>
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    <Upload size={20} />
                    Subir Documento
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <FileText className="text-yellow-600" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-900">{pendingDocs.length}</p>
                            <p className="text-sm text-yellow-700">Pendientes</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Check className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-900">{approvedDocs.length}</p>
                            <p className="text-sm text-green-700">Aprobados</p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-lg">
                            <X className="text-red-600" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-900">{rejectedDocs.length}</p>
                            <p className="text-sm text-red-700">Rechazados</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-semibold text-gray-900">Documentos Pendientes</h2>
                </div>

                {pendingDocs.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {pendingDocs.map((doc) => (
                            <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <CategoryBadge category={doc.category} size="sm" />
                                            <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                                        </div>

                                        <p className="text-gray-600 mb-3">{doc.description}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User size={14} />
                                                <span>{doc.submittedBy}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>Subido: {doc.submittedAt}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {doc.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedDoc(doc)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Ver detalles"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleApprove(doc)}
                                            className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Check size={18} />
                                            <span className="hidden sm:inline">Aprobar</span>
                                        </button>
                                        <button
                                            onClick={() => handleReject(doc)}
                                            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            <X size={18} />
                                            <span className="hidden sm:inline">Rechazar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                        <p>No hay documentos pendientes</p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <DocumentUploadModal
                isOpen={showUploadModal}
                onClose={closeUploadModal}
                onSubmit={handleUpload}
                formData={uploadForm}
                setFormData={setUploadForm}
            />

            {/* Detail Modal */}
            <DocumentDetailModal
                isOpen={selectedDoc !== null}
                onClose={() => setSelectedDoc(null)}
                document={selectedDoc}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
}

export default DocumentApproval;
