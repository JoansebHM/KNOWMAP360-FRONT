import { useState } from 'react';
import { X } from 'lucide-react';
import type { SearchFilters } from '../../types/types';
import { DocumentCategory } from '../../types/types';
import { getPopularTags } from '../../services/api/documentService';
import { useEffect } from 'react';

interface FilterPanelProps {
    filters: SearchFilters;
    onFilterChange: (filters: SearchFilters) => void;
}

function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
    const [popularTags, setPopularTags] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.categories || []);
    const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
    const [dateFrom, setDateFrom] = useState(filters.dateFrom || '');
    const [dateTo, setDateTo] = useState(filters.dateTo || '');

    useEffect(() => {
        setPopularTags(getPopularTags(15));
    }, []);

    useEffect(() => {
        onFilterChange({
            ...filters,
            categories: selectedCategories.length > 0 ? (selectedCategories as any[]) : undefined,
            tags: selectedTags.length > 0 ? selectedTags : undefined,
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
        });
    }, [selectedCategories, selectedTags, dateFrom, dateTo]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedTags([]);
        setDateFrom('');
        setDateTo('');
    };

    const categories = Object.values(DocumentCategory);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                {(selectedCategories.length > 0 || selectedTags.length > 0 || dateFrom || dateTo) && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Limpiar todo
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categorías</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Date Range */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Rango de fechas</h4>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Desde</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Hasta</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Popular Tags */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Tags populares</h4>
                <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-3 py-1.5 rounded-full transition-all ${selectedTags.includes(tag)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3 text-sm">Filtros activos</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                            <span
                                key={category}
                                className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                            >
                                {category}
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="hover:bg-blue-200 rounded-full p-0.5"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        {selectedTags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full"
                            >
                                {tag}
                                <button
                                    onClick={() => toggleTag(tag)}
                                    className="hover:bg-green-200 rounded-full p-0.5"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterPanel;
