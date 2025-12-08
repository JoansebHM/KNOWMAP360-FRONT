import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Calendar,
    Eye,
    Download,
    User,
    Tag,
    ArrowLeft,
    ExternalLink,
    FileText,
} from 'lucide-react';
import type { Document } from '../../types/types';
import { getDocumentById, getRelatedDocuments } from '../../services/api/documentService';
import CategoryBadge from '../../components/documents/CategoryBadge';
import DocumentCard from '../../components/documents/DocumentCard';
import { PATHS } from '../../routes/paths';

function DocumentDetail() {
    const { id } = useParams<{ id: string }>();
    const [document, setDocument] = useState<Document | null>(null);
    const [relatedDocs, setRelatedDocs] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDocument = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const doc = await getDocumentById(id);
                setDocument(doc);
                if (doc) {
                    const related = await getRelatedDocuments(id);
                    setRelatedDocs(related);
                }
            } catch (error) {
                console.error('Error loading document:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDocument();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!document) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Documento no encontrado</h2>
                <Link to={PATHS.SEARCH} className="text-blue-600 hover:text-blue-700 font-medium">
                    Volver a la búsqueda
                </Link>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    to={PATHS.SEARCH}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
                >
                    <ArrowLeft size={20} />
                    Volver a resultados
                </Link>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-200">
                        <div className="mb-4">
                            <CategoryBadge category={document.category} size="md" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{document.title}</h1>

                        <p className="text-lg text-gray-600 mb-6">{document.description}</p>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{formatDate(document.date)}</span>
                            </div>
                            {document.views !== undefined && (
                                <div className="flex items-center gap-2">
                                    <Eye size={16} />
                                    <span>{document.views} vistas</span>
                                </div>
                            )}
                            {document.downloads !== undefined && (
                                <div className="flex items-center gap-2">
                                    <Download size={16} />
                                    <span>{document.downloads} descargas</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Author Section */}
                    <div className="p-8 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                            Autor{document.coAuthors && document.coAuthors.length > 0 ? 'es' : ''}
                        </h3>
                        <div className="space-y-4">
                            {/* Main Author */}
                            <Link
                                to={PATHS.PERSON_PROFILE.replace(':id', document.author.id)}
                                className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                            >
                                {document.author.avatar ? (
                                    <img
                                        src={document.author.avatar}
                                        alt={document.author.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User size={32} className="text-blue-600" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{document.author.name}</h4>
                                    {document.author.position && (
                                        <p className="text-sm text-gray-600">{document.author.position}</p>
                                    )}
                                    {document.author.department && (
                                        <p className="text-sm text-gray-500">{document.author.department}</p>
                                    )}
                                </div>
                                <ExternalLink size={20} className="text-gray-400" />
                            </Link>

                            {/* Co-Authors */}
                            {document.coAuthors && document.coAuthors.length > 0 && (
                                <div className="space-y-2">
                                    {document.coAuthors.map((coAuthor) => (
                                        <Link
                                            key={coAuthor.id}
                                            to={PATHS.PERSON_PROFILE.replace(':id', coAuthor.id)}
                                            className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                                        >
                                            {coAuthor.avatar ? (
                                                <img
                                                    src={coAuthor.avatar}
                                                    alt={coAuthor.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <User size={24} className="text-gray-600" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{coAuthor.name}</h4>
                                                {coAuthor.position && (
                                                    <p className="text-sm text-gray-600">{coAuthor.position}</p>
                                                )}
                                            </div>
                                            <ExternalLink size={18} className="text-gray-400" />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Abstract */}
                    {document.abstract && (
                        <div className="p-8 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                Resumen
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{document.abstract}</p>
                        </div>
                    )}

                    {/* Keywords */}
                    {document.keywords && document.keywords.length > 0 && (
                        <div className="p-8 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                Palabras clave
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {document.keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div className="p-8 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                            <Tag size={16} />
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {document.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-8">
                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                <FileText size={20} />
                                Ver documento
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                <Download size={20} />
                                Descargar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Documents */}
                {relatedDocs.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentos relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedDocs.map((doc) => (
                                <DocumentCard key={doc.id} document={doc} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DocumentDetail;
