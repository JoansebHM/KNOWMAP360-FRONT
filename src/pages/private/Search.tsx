import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3x3, List, Loader2 } from 'lucide-react';
import type { Document, SearchFilters, SortOption, ViewMode } from '../../types/types';
import { searchDocuments, getSearchSuggestions } from '../../services/api/documentService';
import DocumentCard from '../../components/documents/DocumentCard';
import FilterPanel from '../../components/search/FilterPanel';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import PublicHeader from '../../components/layout/PublicHeader';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({});
    const [documents, setDocuments] = useState<Document[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const pageSize = 12;

    useEffect(() => {
        performSearch();
    }, [filters, currentPage, sortBy]);

    useEffect(() => {
        if (query.length >= 2) {
            const timer = setTimeout(async () => {
                const results = await getSearchSuggestions(query);
                setSuggestions(results);
                setShowSuggestions(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query]);

    const performSearch = async () => {
        setLoading(true);
        try {
            const result = await searchDocuments({ ...filters, query }, currentPage, pageSize, sortBy);
            setDocuments(result.documents);
            setTotal(result.total);
        } catch (error) {
            console.error('Error searching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, query });
        setCurrentPage(1);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setFilters({ ...filters, query: suggestion });
        setCurrentPage(1);
        setShowSuggestions(false);
    };

    const handleFilterChange = (newFilters: SearchFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setQuery('');
        setFilters({});
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicHeader />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Documentos</h1>
                    <p className="text-gray-600">
                        Encuentra trabajos de grado, proyectos, artículos y más
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Busca por título, autor, tags o palabras clave..."
                                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            />
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Search size={16} className="text-gray-400" />
                                            <span className="text-gray-700">{suggestion}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal size={18} />
                            <span>Filtros</span>
                        </button>

                        {Object.keys(filters).length > 0 && (
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="relevance">Relevancia</option>
                            <option value="date-desc">Más recientes</option>
                            <option value="date-asc">Más antiguos</option>
                            <option value="title">Título A-Z</option>
                            <option value="views">Más vistos</option>
                        </select>

                        {/* View Mode */}
                        <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                title="Vista de cuadrícula"
                            >
                                <Grid3x3 size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                title="Vista de lista"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    {showFilters && (
                        <div className="w-80 flex-shrink-0">
                            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
                        </div>
                    )}

                    {/* Results */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="animate-spin text-blue-600" size={48} />
                            </div>
                        ) : documents.length > 0 ? (
                            <>
                                <div className="mb-4 text-sm text-gray-600">
                                    {total} {total === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                                </div>

                                <div
                                    className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                            : 'flex flex-col gap-4'
                                    }
                                >
                                    {documents.map((doc) => (
                                        <DocumentCard key={doc.id} document={doc} />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(total / pageSize)}
                                    onPageChange={setCurrentPage}
                                    totalItems={total}
                                    itemsPerPage={pageSize}
                                />
                            </>
                        ) : (
                            <EmptyState
                                title="No se encontraron documentos"
                                message="Intenta ajustar tus filtros de búsqueda o usa términos diferentes."
                                action={{
                                    label: 'Limpiar filtros',
                                    onClick: handleClearFilters,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
