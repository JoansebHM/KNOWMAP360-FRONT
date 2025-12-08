import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Mail,
    Briefcase,
    Building2,
    ArrowLeft,
    User,
    Linkedin,
    Github,
    Twitter,
    FileText,
    Eye,
    Download,
} from 'lucide-react';
import type { Person, Document } from '../../types/types';
import { getPersonById, getPersonDocuments, getPersonStats } from '../../services/api/personService';
import DocumentCard from '../../components/documents/DocumentCard';
import CategoryBadge from '../../components/documents/CategoryBadge';
import { PATHS } from '../../routes/paths';

function PersonProfile() {
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<Person | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPersonData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const [personData, docsData, statsData] = await Promise.all([
                    getPersonById(id),
                    getPersonDocuments(id),
                    getPersonStats(id),
                ]);
                setPerson(personData);
                setDocuments(docsData.documents);
                setStats(statsData);
            } catch (error) {
                console.error('Error loading person data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPersonData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!person) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Persona no encontrada</h2>
                <Link to={PATHS.SEARCH} className="text-blue-600 hover:text-blue-700 font-medium">
                    Volver a la búsqueda
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    to={PATHS.SEARCH}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
                >
                    <ArrowLeft size={20} />
                    Volver
                </Link>

                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row gap-6 -mt-16">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {person.avatar ? (
                                    <img
                                        src={person.avatar}
                                        alt={person.name}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-blue-100 flex items-center justify-center">
                                        <User size={64} className="text-blue-600" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 mt-16 md:mt-4">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{person.name}</h1>
                                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                                    {person.position && (
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={18} />
                                            <span>{person.position}</span>
                                        </div>
                                    )}
                                    {person.department && (
                                        <div className="flex items-center gap-2">
                                            <Building2 size={18} />
                                            <span>{person.department}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Mail size={18} />
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            {person.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Social Links */}
                                {person.socialLinks && (
                                    <div className="flex gap-3">
                                        {person.socialLinks.linkedin && (
                                            <a
                                                href={person.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                            >
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        {person.socialLinks.github && (
                                            <a
                                                href={person.socialLinks.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {person.socialLinks.twitter && (
                                            <a
                                                href={person.socialLinks.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
                                            >
                                                <Twitter size={20} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bio */}
                        {person.bio && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                                    Biografía
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{person.bio}</p>
                            </div>
                        )}

                        {/* Expertise */}
                        {person.expertise && person.expertise.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                                    Áreas de experiencia
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {person.expertise.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FileText className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
                                    <p className="text-sm text-gray-600">Documentos</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Eye className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                                    <p className="text-sm text-gray-600">Vistas totales</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Download className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
                                    <p className="text-sm text-gray-600">Descargas</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                    Por categoría
                                </p>
                                <div className="space-y-1">
                                    {Object.entries(stats.categoryCounts).map(([category, count]) => (
                                        <div key={category} className="flex items-center justify-between text-sm">
                                            <CategoryBadge category={category as any} size="sm" />
                                            <span className="font-medium text-gray-700">{count as number}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Contribuciones ({documents.length})
                    </h2>
                    {documents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {documents.map((doc) => (
                                <DocumentCard key={doc.id} document={doc} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <p className="text-gray-600">No hay documentos disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PersonProfile;
