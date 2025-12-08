import type { Document } from '../../types/types';
import CategoryBadge from './CategoryBadge';
import { Calendar, Eye, Download, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

interface DocumentCardProps {
    document: Document;
}

function DocumentCard({ document }: DocumentCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Link
            to={PATHS.DOCUMENT_DETAIL.replace(':id', document.id)}
            className="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 hover:-translate-y-1"
        >
            <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                    <CategoryBadge category={document.category} size="sm" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {document.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{document.description}</p>

                {/* Author */}
                <Link
                    to={PATHS.PERSON_PROFILE.replace(':id', document.author.id)}
                    className="flex items-center gap-2 mb-4 hover:text-blue-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    {document.author.avatar ? (
                        <img
                            src={document.author.avatar}
                            alt={document.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User size={16} className="text-blue-600" />
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{document.author.name}</span>
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {document.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                    {document.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 text-gray-500">+{document.tags.length - 3}</span>
                    )}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(document.date)}</span>
                    </div>
                    {document.views !== undefined && (
                        <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{document.views}</span>
                        </div>
                    )}
                    {document.downloads !== undefined && (
                        <div className="flex items-center gap-1">
                            <Download size={14} />
                            <span>{document.downloads}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default DocumentCard;
