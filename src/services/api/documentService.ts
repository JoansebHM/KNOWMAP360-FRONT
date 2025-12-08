import type {
    Document,
    SearchFilters,
    SearchResult,
    SortOption,
} from '../../types/types';
import { DocumentCategory } from '../../types/types';
import { mockDocuments, mockPersons } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchDocuments = async (
    filters: SearchFilters = {},
    page: number = 1,
    pageSize: number = 12,
    sortBy: SortOption = 'relevance'
): Promise<SearchResult> => {
    await delay(300); // Simulate network delay

    let filteredDocuments = [...mockDocuments];

    // Filter by search query
    if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredDocuments = filteredDocuments.filter(
            (doc) =>
                doc.title.toLowerCase().includes(query) ||
                doc.description.toLowerCase().includes(query) ||
                doc.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                doc.author.name.toLowerCase().includes(query) ||
                doc.abstract?.toLowerCase().includes(query)
        );
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
        filteredDocuments = filteredDocuments.filter((doc) =>
            filters.categories!.includes(doc.category)
        );
    }

    // Filter by authors
    if (filters.authors && filters.authors.length > 0) {
        filteredDocuments = filteredDocuments.filter((doc) =>
            filters.authors!.includes(doc.author.id)
        );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
        filteredDocuments = filteredDocuments.filter((doc) =>
            filters.tags!.some((tag) => doc.tags.includes(tag))
        );
    }

    // Filter by date range
    if (filters.dateFrom) {
        filteredDocuments = filteredDocuments.filter((doc) => doc.date >= filters.dateFrom!);
    }
    if (filters.dateTo) {
        filteredDocuments = filteredDocuments.filter((doc) => doc.date <= filters.dateTo!);
    }

    // Sort documents
    filteredDocuments = sortDocuments(filteredDocuments, sortBy);

    // Pagination
    const total = filteredDocuments.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

    return {
        documents: paginatedDocuments,
        total,
        page,
        pageSize,
    };
};

export const getDocumentById = async (id: string): Promise<Document | null> => {
    await delay(200);
    return mockDocuments.find((doc) => doc.id === id) || null;
};

export const getDocumentsByCategory = async (
    category: DocumentCategory,
    page: number = 1,
    pageSize: number = 12
): Promise<SearchResult> => {
    return searchDocuments({ categories: [category] }, page, pageSize);
};

export const getRelatedDocuments = async (
    documentId: string,
    limit: number = 4
): Promise<Document[]> => {
    await delay(200);
    const document = mockDocuments.find((doc) => doc.id === documentId);
    if (!document) return [];

    // Find documents with similar tags or same category
    const related = mockDocuments
        .filter((doc) => doc.id !== documentId)
        .map((doc) => {
            let score = 0;
            if (doc.category === document.category) score += 3;
            if (doc.author.id === document.author.id) score += 2;
            const commonTags = doc.tags.filter((tag) => document.tags.includes(tag));
            score += commonTags.length;
            return { doc, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.doc);

    return related;
};

export const getAllTags = (): string[] => {
    const tagsSet = new Set<string>();
    mockDocuments.forEach((doc) => {
        doc.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
};

export const getPopularTags = (limit: number = 20): string[] => {
    const tagCounts = new Map<string, number>();
    mockDocuments.forEach((doc) => {
        doc.tags.forEach((tag) => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
    });

    return Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map((entry) => entry[0]);
};

export const getSearchSuggestions = async (query: string): Promise<string[]> => {
    await delay(100);
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    // Add matching titles
    mockDocuments.forEach((doc) => {
        if (doc.title.toLowerCase().includes(queryLower)) {
            suggestions.add(doc.title);
        }
    });

    // Add matching tags
    mockDocuments.forEach((doc) => {
        doc.tags.forEach((tag) => {
            if (tag.toLowerCase().includes(queryLower)) {
                suggestions.add(tag);
            }
        });
    });

    // Add matching author names
    mockPersons.forEach((person) => {
        if (person.name.toLowerCase().includes(queryLower)) {
            suggestions.add(person.name);
        }
    });

    return Array.from(suggestions).slice(0, 8);
};

// Helper function to sort documents
const sortDocuments = (documents: Document[], sortBy: SortOption): Document[] => {
    const sorted = [...documents];

    switch (sortBy) {
        case 'date-desc':
            return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'date-asc':
            return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'views':
            return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
        case 'relevance':
        default:
            return sorted; // Already filtered by relevance
    }
};
